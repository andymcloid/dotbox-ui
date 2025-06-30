/**
 * Base ModalDialog Component - Generic and reusable
 * Following SOLID principles for modal functionality
 */
const Modal = require('../Modal/Modal');

class ModalDialog {
    constructor(options = {}) {
        console.log('ModalDialog: constructor', options);
        this.options = {
            destroyOnClose: false,
            closeOnOverlayClick: true,
            closeOnEsc: true,
            ...options
        };
        
        this.modal = new Modal(this.options);
        this.element = this.modal.element;
        this.content = this.modal.content;

        this.header = document.createElement('div');
        this.header.className = 'modal-header';
        this.content.appendChild(this.header);

        this.body = document.createElement('div');
        this.body.className = 'modal-body';
        this.content.appendChild(this.body);

        this.footer = document.createElement('div');
        this.footer.className = 'modal-footer';
        this.content.appendChild(this.footer);
    }
    
    setTitle(title) {
        console.log('ModalDialog: setTitle', title);
        this.header.innerHTML = `
            <h3>${title}</h3>
            <button class="modal-close" onclick="this.closest('.modal').modalInstance.close()">✕</button>
        `;
        return this;
    }
    
    setBody(content) {
        console.log('ModalDialog: setBody');
        if (typeof content === 'string') {
            this.body.innerHTML = content;
        } else {
            this.body.innerHTML = '';
            this.body.appendChild(content);
        }
        return this;
    }
    
    setFooter(content) {
        console.log('ModalDialog: setFooter');
        if (typeof content === 'string') {
            this.footer.innerHTML = content;
        } else {
            this.footer.innerHTML = '';
            this.footer.appendChild(content);
        }
        return this;
    }
    
    addFooterButton(text, className = 'action-btn', onclick = null) {
        console.log('ModalDialog: addFooterButton', text);
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
        console.log('ModalDialog: show');
        // Force close other modals if needed
        this.closeOtherModals();

        this.modal.show();
        // Store reference for close button
        this.element.modalInstance = this;
        return this;
    }

    closeOtherModals() {
        console.log('ModalDialog: closeOtherModals');
        document.querySelectorAll('.modal.show').forEach(modal => {
            if (modal !== this.element && modal.modalInstance) {
                modal.modalInstance.close();
            }
        });
    }

    close() {
        console.log('ModalDialog: close');
        this.modal.close();
        return this;
    }

    destroy() {
        console.log('ModalDialog: destroy');
        this.modal.destroy();
        return this;
    }
    
    onOpenCallback(callback) {
        console.log('ModalDialog: onOpenCallback');
        this.modal.onOpenCallback(callback);
        return this;
    }

    onCloseCallback(callback) {
        console.log('ModalDialog: onCloseCallback');
        this.modal.onCloseCallback(callback);
        return this;
    }

    onDestroyCallback(callback) {
        console.log('ModalDialog: onDestroyCallback');
        this.modal.onDestroyCallback(callback);
        return this;
    }
    
    setPadding(padding) {
        console.log('ModalDialog: setPadding');
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
        console.log('ModalDialog: setBodyContainerMode');
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
        console.log('DotboxModalDialogElement: constructor');
        this.modalInstance = null;
        this.uniqueId = `modal-${Math.random().toString(36).substr(2, 9)}`;

        const destroyOnClose = this.hasAttribute('destroy-on-close');
        const closeOnOverlayClick = this.hasAttribute('close-on-overlay-click') || !this.hasAttribute('close-on-overlay-click');
        const closeOnEsc = this.hasAttribute('close-on-esc') || !this.hasAttribute('close-on-esc');

        this.modalInstance = new ModalDialog({
            destroyOnClose: destroyOnClose,
            closeOnOverlayClick: closeOnOverlayClick,
            closeOnEsc: closeOnEsc
        });

        this.modalInstance.onOpenCallback(() => {
            console.log('DotboxModalDialogElement: dotbox-open event');
            this.dispatchEvent(new CustomEvent('dotbox-open', {
                detail: { id: this.uniqueId },
                bubbles: true
            }));
        });

        this.modalInstance.onCloseCallback(() => {
            console.log('DotboxModalDialogElement: dotbox-close event');
            this.dispatchEvent(new CustomEvent('dotbox-close', {
                detail: { id: this.uniqueId },
                bubbles: true
            }));
        });

        this.modalInstance.onDestroyCallback(() => {
            console.log('DotboxModalDialogElement: dotbox-destroy event');
            this.dispatchEvent(new CustomEvent('dotbox-destroy', {
                detail: { id: this.uniqueId },
                bubbles: true
            }));
        });
    }

    connectedCallback() {
        console.log('DotboxModalDialogElement: connectedCallback');
        this.style.display = 'none';

        const title = this.getAttribute('title') || '';

        if (title) {
            this.modalInstance.setTitle(title);
        }

        // Move child nodes to the modal body
        while (this.firstChild) {
            this.modalInstance.body.appendChild(this.firstChild);
        }
        // Clear the original content of the Web Component
        this.innerHTML = '';
    }

    // Expose modal methods
    show() {
        console.log('DotboxModalDialogElement: show');
        this.modalInstance.show();
        return this;
    }

    close() {
        console.log('DotboxModalDialogElement: close');
        this.modalInstance.close();
        return this;
    }

    setTitle(title) {
        console.log('DotboxModalDialogElement: setTitle');
        if (this.modalInstance) {
            this.modalInstance.setTitle(title);
        }
        return this;
    }

    setBody(content) {
        console.log('DotboxModalDialogElement: setBody');
        if (this.modalInstance) {
            this.modalInstance.setBody(content);
        }
        return this;
    }

    setFooter(content) {
        console.log('DotboxModalDialogElement: setFooter');
        if (this.modalInstance) {
            this.modalInstance.setFooter(content);
        }
        return this;
    }

    addFooterButton(text, className = 'action-btn', onclick = null) {
        console.log('DotboxModalDialogElement: addFooterButton');
        if (this.modalInstance) {
            return this.modalInstance.addFooterButton(text, className, onclick);
        }
        return null;
    }

    destroy() {
        console.log('DotboxModalDialogElement: destroy');
        if (this.modalInstance) {
            this.modalInstance.destroy();
            this.modalInstance = null;
        }
        return this;
    }

    setPadding(padding) {
        console.log('DotboxModalDialogElement: setPadding');
        if (this.modalInstance) {
            this.modalInstance.setPadding(padding);
        }
        return this;
    }

    setBodyContainerMode(isContainer = true) {
        console.log('DotboxModalDialogElement: setBodyContainerMode');
        if (this.modalInstance) {
            this.modalInstance.setBodyContainerMode(isContainer);
        }
        return this;
    }

    disconnectedCallback() {
        console.log('DotboxModalDialogElement: disconnectedCallback');
        if (this.modalInstance) {
            this.modalInstance.destroy();
            this.modalInstance = null;
        }
    }
} 