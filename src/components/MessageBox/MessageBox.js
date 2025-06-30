/**
 * MessageBox Component
 * A card-style message dialog with variants, title, content, and configurable buttons
 */

const Modal = require('../Modal/Modal');

class MessageBox {
    constructor(options = {}) {
        this.options = {
            title: options.title || 'Message',
            message: options.message || 'This is a message',
            variant: options.variant || 'primary', // success, danger, warning, info, primary
            closable: options.closable !== false, // true by default
            buttons: options.buttons || [], // Array of button configs
            onClose: options.onClose || null,
            maxWidth: options.maxWidth || '380px',
            ...options
        };

        this.modal = new Modal({
            closeOnOverlayClick: false, // MessageBox handles its own closing
            closeOnEsc: false
        });
        this.element = this.modal.content;
        this.modalElement = this.modal.element;
        this.isVisible = false;

        this.init();
    }

    init() {
        this.createElement();
        this.bindEvents();
        this.modal.setContent(this.element);
    }

    createElement() {
        // Create main container
        this.element = document.createElement('div');
        this.element.className = this.getClasses();
        this.element.style.maxWidth = this.options.maxWidth;
        this.element.style.display = 'none'; // Initially hide the content

        // Get icon for the variant
        const icon = this.getIcon();

        // Create content
        this.element.innerHTML = `
            ${this.options.closable ? `
                <button type="button" class="dotbox-messagebox-dismiss" aria-label="Close message">×</button>
            ` : ''}
            <div class="dotbox-messagebox-header">
                <div class="dotbox-messagebox-icon">
                    ${icon}
                </div>
                <div class="dotbox-messagebox-content">
                    <span class="dotbox-messagebox-title">${this.options.title}</span>
                    <p class="dotbox-messagebox-message">${this.options.message}</p>
                </div>
            </div>
            ${this.options.buttons.length > 0 ? `
                <div class="dotbox-messagebox-actions">
                    ${this.renderButtons()}
                </div>
            ` : ''}
        `;
    }

    getClasses() {
        let classes = ['dotbox-messagebox'];
        classes.push(`dotbox-messagebox-${this.options.variant}`);
        return classes.join(' ');
    }

    getIcon() {
        const icons = {
            success: `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" d="M20 7L9.00004 18L3.99994 13"></path>
                </svg>
            `,
            danger: `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2.5" d="M18 6L6 18M6 6l12 12"></path>
                </svg>
            `,
            warning: `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            `,
            info: `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            `,
            primary: `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            `
        };

        return icons[this.options.variant] || icons.primary;
    }

    renderButtons() {
        return this.options.buttons.map((button, index) => {
            const variant = button.variant || 'secondary';
            const text = button.text || 'Button';
            const id = button.id || `btn-${index}`;
            
            return `<dotbox-button 
                variant="${variant}" 
                data-button-id="${id}"
                ${button.disabled ? 'disabled' : ''}
                ${button.size ? `size="${button.size}"` : ''}
            >${text}</dotbox-button>`;
        }).join('');
    }

    bindEvents() {
        // Close button click
        const closeBtn = this.element.querySelector('.dotbox-messagebox-dismiss');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        // Button clicks
        const actionButtons = this.element.querySelectorAll('[data-button-id]');
        actionButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const buttonId = e.target.getAttribute('data-button-id');
                const buttonConfig = this.options.buttons.find(b => (b.id || `btn-${this.options.buttons.indexOf(b)}`) === buttonId);
                
                if (buttonConfig && buttonConfig.onClick) {
                    buttonConfig.onClick(this, buttonConfig);
                }

                // Emit custom event
                this.element.dispatchEvent(new CustomEvent('dotbox-messagebox-button', {
                    detail: { 
                        buttonId, 
                        buttonConfig, 
                        messageBox: this 
                    }
                }));
            });
        });
    }

    close() {
        // Call onClose callback
        if (this.options.onClose) {
            this.options.onClose(this);
        }

        // Emit custom event
        this.element.dispatchEvent(new CustomEvent('dotbox-messagebox-close', {
            detail: { messageBox: this }
        }));

        this.modal.close();
        this.isVisible = false;
    }

    show() {
        this.modal.show();
        this.element.style.display = ''; // Show the content
        this.isVisible = true;
        
        // Emit custom event
        this.element.dispatchEvent(new CustomEvent('dotbox-messagebox-show', {
            detail: { messageBox: this }
        }));
    }

    hide() {
        this.modal.close();
        this.element.style.display = 'none'; // Hide the content
        this.isVisible = false;
    }

    setTitle(title) {
        this.options.title = title;
        const titleElement = this.element.querySelector('.dotbox-messagebox-title');
        if (titleElement) {
            titleElement.textContent = title;
        }
        return this;
    }

    setMessage(message) {
        this.options.message = message;
        const messageElement = this.element.querySelector('.dotbox-messagebox-message');
        if (messageElement) {
            messageElement.textContent = message;
        }
        return this;
    }

    setVariant(variant) {
        // Remove old variant class
        this.element.classList.remove(`dotbox-messagebox-${this.options.variant}`);
        
        // Add new variant class
        this.options.variant = variant;
        this.element.classList.add(`dotbox-messagebox-${variant}`);
        
        // Update icon
        const iconElement = this.element.querySelector('.dotbox-messagebox-icon');
        if (iconElement) {
            iconElement.innerHTML = this.getIcon();
        }
        
        return this;
    }

    getElement() {
        return this.modalElement;
    }

    // Static methods for common use cases
    static success(title, message, buttons = []) {
        return new MessageBox({
            title,
            message,
            variant: 'success',
            buttons
        });
    }

    static danger(title, message, buttons = []) {
        return new MessageBox({
            title,
            message,
            variant: 'danger',
            buttons
        });
    }

    static warning(title, message, buttons = []) {
        return new MessageBox({
            title,
            message,
            variant: 'warning',
            buttons
        });
    }

    static info(title, message, buttons = []) {
        return new MessageBox({
            title,
            message,
            variant: 'info',
            buttons
        });
    }

    static confirm(title, message, onConfirm, onCancel) {
        return new Promise((resolve, reject) => {
            const messageBox = new MessageBox({
                title,
                message,
                variant: 'primary',
                buttons: [
                    {
                        id: 'cancel',
                        text: 'Cancel',
                        variant: 'secondary',
                        onClick: (messageBox) => {
                            if (onCancel) onCancel();
                            messageBox.close();
                            resolve(false);
                        }
                    },
                    {
                        id: 'confirm',
                        text: 'Confirm',
                        variant: 'primary',
                        onClick: (messageBox) => {
                            if (onConfirm) onConfirm();
                            messageBox.close();
                            resolve(true);
                        }
                    }
                ]
            });
            
            // Add to body and show
            document.body.appendChild(messageBox.getElement());
            messageBox.show();
        });
    }

    static error(title, message, buttons = []) {
        const defaultButtons = buttons.length > 0 ? buttons : [
            {
                id: 'ok',
                text: 'OK',
                variant: 'danger',
                onClick: (messageBox) => messageBox.close()
            }
        ];
        
        const messageBox = new MessageBox({
            title,
            message,
            variant: 'danger',
            buttons: defaultButtons
        });
        
        // Add to body and show
        document.body.appendChild(messageBox.getElement());
        messageBox.show();
        return messageBox;
    }

    static show(options = {}) {
        return new Promise((resolve, reject) => {
            // Add default OK button if no buttons provided
            if (!options.buttons || options.buttons.length === 0) {
                options.buttons = [
                    {
                        id: 'ok',
                        text: 'OK',
                        variant: options.variant || 'primary',
                        onClick: (messageBox) => {
                            messageBox.close();
                            resolve(true);
                        }
                    }
                ];
            } else {
                // Add resolve to existing button callbacks
                options.buttons = options.buttons.map(button => ({
                    ...button,
                    onClick: (messageBox, buttonConfig) => {
                        if (button.onClick) {
                            button.onClick(messageBox, buttonConfig);
                        }
                        messageBox.close();
                        resolve(button.id || button.text);
                    }
                }));
            }

            const messageBox = new MessageBox(options);
            
            // Add to body and show
            document.body.appendChild(messageBox.getElement());
            messageBox.show();
        });
    }
}

// Web Component
class DotboxMessageBox extends HTMLElement {
    constructor() {
        super();
        this.messageBox = null;
    }

    connectedCallback() {
        const buttonsData = this.getAttribute('buttons');
        let buttons = [];
        
        if (buttonsData) {
            try {
                buttons = JSON.parse(buttonsData);
            } catch (e) {
                console.warn('Invalid buttons JSON in dotbox-messagebox:', e);
            }
        }

        const options = {
            title: this.getAttribute('title') || 'Message',
            message: this.getAttribute('message') || this.textContent || 'This is a message',
            variant: this.getAttribute('variant') || 'primary',
            closable: this.getAttribute('closable') !== 'false',
            maxWidth: this.getAttribute('max-width') || '380px',
            buttons: buttons
        };

        this.messageBox = new MessageBox(options);
        this.appendChild(this.messageBox.getElement());
    }

    disconnectedCallback() {
        if (this.messageBox) {
            this.messageBox.close();
        }
    }

    // Methods for programmatic control
    setTitle(title) {
        if (this.messageBox) {
            this.messageBox.setTitle(title);
        }
        return this;
    }

    setMessage(message) {
        if (this.messageBox) {
            this.messageBox.setMessage(message);
        }
        return this;
    }

    setVariant(variant) {
        if (this.messageBox) {
            this.messageBox.setVariant(variant);
        }
        return this;
    }

    close() {
        if (this.messageBox) {
            this.messageBox.close();
        }
    }
}

// Register Web Component
customElements.define('dotbox-messagebox', DotboxMessageBox);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MessageBox;
}