/**
 * Base Button Component - Generic and reusable button
 * Following SOLID principles for button functionality
 */
class Button {
    constructor(options = {}) {
        this.options = {
            text: 'Button',
            type: 'button',
            variant: 'primary', // primary, secondary, danger, success
            size: 'medium', // small, medium, large
            disabled: false,
            loading: false,
            icon: null,
            className: '',
            ...options
        };
        
        this.element = null;
        this.onClick = options.onClick || null;
        
        this.createElement();
        this.bindEvents();
    }
    
    createElement() {
        this.element = document.createElement('button');
        this.element.type = this.options.type;
        this.element.disabled = this.options.disabled;
        
        this.updateClasses();
        this.updateContent();
        
        return this.element;
    }
    
    updateClasses() {
        let classes = ['btn'];
        
        // Add variant class
        classes.push(`btn-${this.options.variant}`);
        
        // Add size class
        classes.push(`btn-${this.options.size}`);
        
        // Add loading class
        if (this.options.loading) {
            classes.push('btn-loading');
        }
        
        // Add custom classes
        if (this.options.className) {
            classes.push(this.options.className);
        }
        
        this.element.className = classes.join(' ');
    }
    
    updateContent() {
        let content = '';
        
        if (this.options.loading) {
            content = '<span class="btn-spinner">⟳</span> Loading...';
        } else {
            if (this.options.icon) {
                content = `${this.options.icon} ${this.options.text}`;
            } else {
                content = this.options.text;
            }
        }
        
        this.element.innerHTML = content;
    }
    
    bindEvents() {
        if (this.onClick) {
            this.element.addEventListener('click', (e) => {
                if (!this.options.disabled && !this.options.loading) {
                    this.onClick(e);
                }
            });
        }
    }
    
    // Public methods
    setText(text) {
        this.options.text = text;
        this.updateContent();
        return this;
    }
    
    setIcon(icon) {
        this.options.icon = icon;
        this.updateContent();
        return this;
    }
    
    setLoading(loading) {
        this.options.loading = loading;
        this.element.disabled = loading || this.options.disabled;
        this.updateClasses();
        this.updateContent();
        return this;
    }
    
    setDisabled(disabled) {
        this.options.disabled = disabled;
        this.element.disabled = disabled || this.options.loading;
        this.updateClasses();
        return this;
    }
    
    setVariant(variant) {
        this.options.variant = variant;
        this.updateClasses();
        return this;
    }
    
    // Get the DOM element
    getElement() {
        return this.element;
    }
    
    // Destroy button
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.element = null;
    }
}

// Web Component for HTML usage
class DotboxButtonElement extends HTMLElement {
    constructor() {
        super();
        this.buttonInstance = null;
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['variant', 'size', 'disabled', 'text', 'icon', 'loading'];
    }

    attributeChangedCallback() {
        if (this.buttonInstance) {
            this.render();
        }
    }

    render() {
        const variant = this.getAttribute('variant') || 'primary';
        const size = this.getAttribute('size') || 'medium';
        const disabled = this.hasAttribute('disabled');
        const loading = this.hasAttribute('loading');
        const icon = this.getAttribute('icon') || null;
        const text = this.getAttribute('text') || this.textContent.trim() || 'Button';

        // Clean up previous instance
        if (this.buttonInstance) {
            this.innerHTML = '';
        }

        // Create new button instance
        this.buttonInstance = new Button({
            text: text,
            variant: variant,
            size: size,
            disabled: disabled,
            loading: loading,
            icon: icon,
            onClick: () => {
                // Dispatch custom event
                this.dispatchEvent(new CustomEvent('dotbox-click', {
                    detail: { variant, size, text, disabled, loading, icon },
                    bubbles: true
                }));
            }
        });

        // Clear content and append button
        this.innerHTML = '';
        this.appendChild(this.buttonInstance.getElement());
    }

    // Expose button methods
    setDisabled(disabled) {
        if (disabled) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
        return this;
    }

    setText(text) {
        this.setAttribute('text', text);
        return this;
    }

    setVariant(variant) {
        this.setAttribute('variant', variant);
        return this;
    }

    setLoading(loading) {
        if (loading) {
            this.setAttribute('loading', '');
        } else {
            this.removeAttribute('loading');
        }
        return this;
    }

    setIcon(icon) {
        if (icon) {
            this.setAttribute('icon', icon);
        } else {
            this.removeAttribute('icon');
        }
        return this;
    }
}

// Register custom element
if (typeof customElements !== 'undefined') {
    customElements.define('dotbox-button', DotboxButtonElement);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Button;
} 