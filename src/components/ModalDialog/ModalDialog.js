/**
 * Base ModalDialog Component - Generic and reusable
 * Following SOLID principles for modal functionality
 */
class ModalDialog {
    constructor(id, options = {}) {
        this.id = id;
        this.options = {
            destroyOnClose: false,
            closeOnOverlayClick: true,
            closeOnEsc: true,
            ...options
        };
        
        this.isOpen = false;
        this.element = null;
        this.overlay = null;
        this.content = null;
        this.header = null;
        this.body = null;
        this.footer = null;
        
        this.onOpen = null;
        this.onClose = null;
        this.onDestroy = null;
        
        this.createModal();
        this.bindEvents();
    }
    
    createModal() {
        // Create main modal container
        this.element = document.createElement('div');
        this.element.id = this.id;
        this.element.className = 'modal';
        this.element.style.display = 'none';
        
        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'modal-overlay';
        this.element.appendChild(this.overlay);
        
        // Create content container
        this.content = document.createElement('div');
        this.content.className = 'modal-content';
        this.element.appendChild(this.content);
        
        // Create header
        this.header = document.createElement('div');
        this.header.className = 'modal-header';
        this.content.appendChild(this.header);
        
        // Create body
        this.body = document.createElement('div');
        this.body.className = 'modal-body';
        this.content.appendChild(this.body);
        
        // Create footer
        this.footer = document.createElement('div');
        this.footer.className = 'modal-footer';
        this.content.appendChild(this.footer);
        
        // Add to DOM
        document.body.appendChild(this.element);
    }
    
    bindEvents() {
        // Close on overlay click
        if (this.options.closeOnOverlayClick) {
            this.overlay.addEventListener('click', () => this.close());
        }
        
        // Close on ESC key
        if (this.options.closeOnEsc) {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.close();
                }
            });
        }
    }
    
    setTitle(title) {
        this.header.innerHTML = `
            <h3>${title}</h3>
            <button class="modal-close" onclick="this.closest('.modal').modalInstance.close()">✕</button>
        `;
        return this;
    }
    
    setBody(content) {
        if (typeof content === 'string') {
            this.body.innerHTML = content;
        } else {
            this.body.innerHTML = '';
            this.body.appendChild(content);
        }
        return this;
    }
    
    setFooter(content) {
        if (typeof content === 'string') {
            this.footer.innerHTML = content;
        } else {
            this.footer.innerHTML = '';
            this.footer.appendChild(content);
        }
        return this;
    }
    
    addFooterButton(text, className = 'action-btn', onclick = null) {
        const button = document.createElement('button');
        button.textContent = text;
        button.className = className;
        if (onclick) {
            button.addEventListener('click', onclick);
        }
        this.footer.appendChild(button);
        return button;
    }
    
    show() {
        if (this.isOpen) return this;
        
        // Force close other modals if needed
        this.closeOtherModals();
        
        // Show modal
        this.element.style.display = 'flex';
        this.element.classList.add('show');
        this.isOpen = true;
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Store reference for close button
        this.element.modalInstance = this;
        
        // Trigger onOpen callback
        if (this.onOpen) {
            this.onOpen();
        }
        
        // Emit custom event after modal is shown
        const event = new CustomEvent('dialogShown', { bubbles: false });
        this.element.dispatchEvent(event);
        
        return this;
    }
    
    close() {
        if (!this.isOpen) return this;
        
        this.element.style.display = 'none';
        this.element.classList.remove('show');
        this.isOpen = false;
        
        // Restore body scroll
        document.body.style.overflow = 'auto';
        
        // Trigger onClose callback
        if (this.onClose) {
            this.onClose();
        }
        
        // Destroy if configured
        if (this.options.destroyOnClose) {
            this.destroy();
        }
        
        return this;
    }
    
    closeOtherModals() {
        // Close any other open modals
        document.querySelectorAll('.modal.show').forEach(modal => {
            if (modal !== this.element && modal.modalInstance) {
                modal.modalInstance.close();
            }
        });
    }
    
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        
        if (this.onDestroy) {
            this.onDestroy();
        }
        
        this.element = null;
        this.overlay = null;
        this.content = null;
        this.header = null;
        this.body = null;
        this.footer = null;
    }
    
    // Event handlers
    onOpenCallback(callback) {
        this.onOpen = callback;
        return this;
    }
    
    onCloseCallback(callback) {
        this.onClose = callback;
        return this;
    }
    
    onDestroyCallback(callback) {
        this.onDestroy = callback;
        return this;
    }
    
    setPadding(padding) {
        if (this.body) {
            this.body.style.padding = (typeof padding === 'number') ? `${padding}px` : padding;
        }
        return this;
    }
    
    /**
     * setBodyContainerMode(true) disables modal body padding and scrolling, for full-size child components (e.g. TabView)
     * setBodyContainerMode(false) restores default modal body padding and scrolling
     */
    setBodyContainerMode(isContainer = true) {
        if (!this.body) return this;
        if (isContainer) {
            this.body.style.padding = '0';
            this.body.style.maxHeight = 'none';
            // Do NOT set overflow here; let TabView handle it
        } else {
            this.body.style.padding = '';
            this.body.style.maxHeight = '';
            // Do NOT set overflow here; let default CSS handle it
        }
        return this;
    }
}

// Web Component for HTML usage
class DotboxModalDialogElement extends HTMLElement {
    constructor() {
        super();
        this.modalInstance = null;
        this.uniqueId = `modal-${Math.random().toString(36).substr(2, 9)}`;
    }

    connectedCallback() {
        // Hide the original content initially
        this.style.display = 'none';
        this.render();
    }

    static get observedAttributes() {
        return ['title', 'destroy-on-close', 'close-on-overlay-click', 'close-on-esc', 'show'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this.modalInstance) {
            if (name === 'show') {
                if (this.hasAttribute('show')) {
                    this.modalInstance.show();
                } else {
                    this.modalInstance.close();
                }
            } else {
                // For other attributes, we need to recreate the modal
                this.render();
            }
        }
    }

    render() {
        const title = this.getAttribute('title') || '';
        const destroyOnClose = this.hasAttribute('destroy-on-close');
        const closeOnOverlayClick = this.hasAttribute('close-on-overlay-click') || !this.hasAttribute('close-on-overlay-click');
        const closeOnEsc = this.hasAttribute('close-on-esc') || !this.hasAttribute('close-on-esc');

        // Clean up previous instance
        if (this.modalInstance) {
            this.modalInstance.destroy();
        }

        // Create new modal instance
        this.modalInstance = new ModalDialog(this.uniqueId, {
            destroyOnClose: destroyOnClose,
            closeOnOverlayClick: closeOnOverlayClick,
            closeOnEsc: closeOnEsc
        });

        // Set up event callbacks
        this.modalInstance.onOpenCallback(() => {
            this.dispatchEvent(new CustomEvent('dotbox-open', {
                detail: { id: this.uniqueId },
                bubbles: true
            }));
        });

        this.modalInstance.onCloseCallback(() => {
            this.removeAttribute('show');
            this.dispatchEvent(new CustomEvent('dotbox-close', {
                detail: { id: this.uniqueId },
                bubbles: true
            }));
        });

        this.modalInstance.onDestroyCallback(() => {
            this.dispatchEvent(new CustomEvent('dotbox-destroy', {
                detail: { id: this.uniqueId },
                bubbles: true
            }));
        });

        // Set title if provided
        if (title) {
            this.modalInstance.setTitle(title);
        }

        // Set body content from slot or innerHTML
        const bodyContent = this.innerHTML.trim();
        if (bodyContent) {
            this.modalInstance.setBody(bodyContent);
        }

        // Show if show attribute is present
        if (this.hasAttribute('show')) {
            this.modalInstance.show();
        }
    }

    // Expose modal methods
    show() {
        this.setAttribute('show', '');
        return this;
    }

    close() {
        this.removeAttribute('show');
        return this;
    }

    setTitle(title) {
        this.setAttribute('title', title);
        return this;
    }

    setBody(content) {
        if (this.modalInstance) {
            this.modalInstance.setBody(content);
        }
        return this;
    }

    setFooter(content) {
        if (this.modalInstance) {
            this.modalInstance.setFooter(content);
        }
        return this;
    }

    addFooterButton(text, className = 'action-btn', onclick = null) {
        if (this.modalInstance) {
            return this.modalInstance.addFooterButton(text, className, onclick);
        }
        return null;
    }

    destroy() {
        if (this.modalInstance) {
            this.modalInstance.destroy();
            this.modalInstance = null;
        }
        return this;
    }

    setPadding(padding) {
        if (this.modalInstance) {
            this.modalInstance.setPadding(padding);
        }
        return this;
    }

    setBodyContainerMode(isContainer = true) {
        if (this.modalInstance) {
            this.modalInstance.setBodyContainerMode(isContainer);
        }
        return this;
    }

    disconnectedCallback() {
        if (this.modalInstance) {
            this.modalInstance.destroy();
            this.modalInstance = null;
        }
    }
}

// Register custom element
if (typeof customElements !== 'undefined') {
    customElements.define('dotbox-modal-dialog', DotboxModalDialogElement);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModalDialog;
} 