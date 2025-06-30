
class Modal {
    constructor(options = {}) {
        console.log('Modal: constructor', options);
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
        
        this.onOpen = null;
        this.onClose = null;
        this.onDestroy = null;
        
        this.createModal();
        this.bindEvents();
    }
    
    createModal() {
        console.log('Modal: createModal');
        // Create main modal container
        this.element = document.createElement('div');
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
        
        // Add to DOM
        document.body.appendChild(this.element);
    }
    
    bindEvents() {
        console.log('Modal: bindEvents');
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
    
    setContent(content) {
        console.log('Modal: setContent');
        if (typeof content === 'string') {
            this.content.innerHTML = content;
        } else {
            this.content.innerHTML = '';
            this.content.appendChild(content);
        }
        return this;
    }
    
    show() {
        console.log('Modal: show');
        if (this.isOpen) return this;
        
        this.element.style.display = 'flex';
        this.element.classList.add('show');
        this.isOpen = true;
        
        document.body.style.overflow = 'hidden';
        
        if (this.onOpen) {
            this.onOpen();
        }
        
        const event = new CustomEvent('modal-shown', { bubbles: false });
        this.element.dispatchEvent(event);
        
        return this;
    }
    
    close() {
        console.log('Modal: close');
        if (!this.isOpen) return this;
        
        this.element.style.display = 'none';
        this.element.classList.remove('show');
        this.isOpen = false;
        
        document.body.style.overflow = 'auto';
        
        if (this.onClose) {
            this.onClose();
        }
        
        if (this.options.destroyOnClose) {
            this.destroy();
        }
        
        return this;
    }
    
    destroy() {
        console.log('Modal: destroy');
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        
        if (this.onDestroy) {
            this.onDestroy();
        }
        
        this.element = null;
        this.overlay = null;
        this.content = null;
    }
    
    onOpenCallback(callback) {
        console.log('Modal: onOpenCallback');
        this.onOpen = callback;
        return this;
    }
    
    onCloseCallback(callback) {
        console.log('Modal: onCloseCallback');
        this.onClose = callback;
        return this;
    }
    
    onDestroyCallback(callback) {
        console.log('Modal: onDestroyCallback');
        this.onDestroy = callback;
        return this;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Modal;
}
