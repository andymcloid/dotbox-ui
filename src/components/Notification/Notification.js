/**
 * Notification Component
 * A versatile notification system that can display as static badges or animated popups
 */

class Notification {
    constructor(options = {}) {
        this.options = {
            message: options.message || 'Notification message',
            variant: options.variant || 'success', // success, danger, warning, info
            mode: options.mode || 'static', // static, popup
            position: options.position || 'bottom-right', // bottom-right, bottom-left, top-right, top-left
            autoClose: options.autoClose !== false, // true by default
            timeout: options.timeout || 3000, // 3 seconds default
            showCloseButton: options.showCloseButton !== undefined ? options.showCloseButton : (options.mode === 'popup'), // only true by default for popups
            icon: options.icon || null, // custom icon, will use default if null
            onClose: options.onClose || null,
            ...options
        };

        this.element = null;
        this.timeoutId = null;
        this.isVisible = false;

        this.init();
    }

    init() {
        this.createElement();
        this.bindEvents();

        if (this.options.mode === 'popup') {
            this.showPopup();
        }
    }

    createElement() {
        // Create main container
        this.element = document.createElement('div');
        this.element.className = this.getClasses();

        // Get icon for the variant
        const icon = this.getIcon();

        // Create content
        this.element.innerHTML = `
            <div class="dotbox-notification-icon">
                ${icon}
            </div>
            <div class="dotbox-notification-content">
                <div class="dotbox-notification-message">${this.options.message}</div>
            </div>
            ${this.options.showCloseButton ? `
                <button class="dotbox-notification-close" type="button" aria-label="Close notification">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
            ` : ''}
        `;

        // Add to popup container if in popup mode
        if (this.options.mode === 'popup') {
            this.ensurePopupContainer();
            this.getPopupContainer().appendChild(this.element);
        }
    }

    getClasses() {
        let classes = ['dotbox-notification'];
        classes.push(`dotbox-notification-${this.options.variant}`);
        classes.push(`dotbox-notification-${this.options.mode}`);
        
        if (this.options.mode === 'popup') {
            classes.push(`dotbox-notification-popup-${this.options.position}`);
        }

        return classes.join(' ');
    }

    getIcon() {
        if (this.options.icon) {
            return this.options.icon;
        }

        const icons = {
            success: `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `,
            danger: `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                </svg>
            `,
            warning: `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                </svg>
            `,
            info: `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                </svg>
            `
        };

        return icons[this.options.variant] || icons.info;
    }

    bindEvents() {
        // Close button click
        const closeBtn = this.element.querySelector('.dotbox-notification-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        // Auto-close timer for popups
        if (this.options.mode === 'popup' && this.options.autoClose) {
            this.timeoutId = setTimeout(() => {
                this.close();
            }, this.options.timeout);
        }

        // Pause auto-close on hover
        if (this.options.mode === 'popup' && this.options.autoClose) {
            this.element.addEventListener('mouseenter', () => {
                if (this.timeoutId) {
                    clearTimeout(this.timeoutId);
                }
            });

            this.element.addEventListener('mouseleave', () => {
                this.timeoutId = setTimeout(() => {
                    this.close();
                }, this.options.timeout);
            });
        }
    }

    ensurePopupContainer() {
        const containerId = `dotbox-notifications-${this.options.position}`;
        let container = document.getElementById(containerId);

        if (!container) {
            container = document.createElement('div');
            container.id = containerId;
            container.className = `dotbox-notifications-container dotbox-notifications-${this.options.position}`;
            document.body.appendChild(container);
        }

        return container;
    }

    getPopupContainer() {
        return document.getElementById(`dotbox-notifications-${this.options.position}`);
    }

    showPopup() {
        this.isVisible = true;
        
        // Trigger animation after a small delay to ensure proper rendering
        setTimeout(() => {
            this.element.classList.add('dotbox-notification-show');
        }, 10);
    }

    close() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        if (this.options.mode === 'popup') {
            this.element.classList.add('dotbox-notification-hide');
            
            setTimeout(() => {
                this.destroy();
            }, 300); // Match CSS animation duration
        } else {
            this.destroy();
        }

        // Call onClose callback
        if (this.options.onClose) {
            this.options.onClose(this);
        }

        // Emit custom event
        this.element.dispatchEvent(new CustomEvent('dotbox-notification-close', {
            detail: { notification: this }
        }));
    }

    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        
        this.isVisible = false;
        
        // Clean up empty popup containers
        if (this.options.mode === 'popup') {
            const container = this.getPopupContainer();
            if (container && container.children.length === 0) {
                container.parentNode.removeChild(container);
            }
        }
    }

    getElement() {
        return this.element;
    }

    // Static method to create popup notifications easily
    static show(message, variant = 'success', options = {}) {
        return new Notification({
            message,
            variant,
            mode: 'popup',
            ...options
        });
    }

    // Static method to create success notifications
    static success(message, options = {}) {
        return Notification.show(message, 'success', options);
    }

    // Static method to create danger notifications
    static danger(message, options = {}) {
        return Notification.show(message, 'danger', options);
    }

    // Static method to create warning notifications
    static warning(message, options = {}) {
        return Notification.show(message, 'warning', options);
    }

    // Static method to create info notifications
    static info(message, options = {}) {
        return Notification.show(message, 'info', options);
    }
}

// Web Component
class DotboxNotification extends HTMLElement {
    constructor() {
        super();
        this.notification = null;
    }

    connectedCallback() {
        const mode = this.getAttribute('mode') || 'static';
        const options = {
            message: this.getAttribute('message') || this.textContent || 'Notification',
            variant: this.getAttribute('variant') || 'success',
            mode: mode,
            position: this.getAttribute('position') || 'bottom-right',
            autoClose: this.getAttribute('auto-close') !== 'false',
            timeout: parseInt(this.getAttribute('timeout')) || 3000,
            showCloseButton: this.getAttribute('show-close-button') !== null ? this.getAttribute('show-close-button') !== 'false' : (mode === 'popup'),
            icon: this.getAttribute('icon') || null
        };

        this.notification = new Notification(options);
        
        if (options.mode === 'static') {
            this.appendChild(this.notification.getElement());
        }
    }

    disconnectedCallback() {
        if (this.notification) {
            this.notification.destroy();
        }
    }
}

// Register Web Component
customElements.define('dotbox-notification', DotboxNotification);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Notification;
}