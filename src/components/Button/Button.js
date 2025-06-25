/**
 * Base Button Component - Generic and reusable button
 * Following SOLID principles for button functionality
 */
class Button {
    constructor(options = {}) {
        this.options = {
            text: 'Button',
            type: 'button',
            variant: 'primary', // primary, secondary, danger, success, delete
            size: 'small', // small, medium, large
            disabled: false,
            loading: false,
            icon: null,
            className: '',
            animation: false, // Enable animation for delete variant
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
        } else if (this.options.variant === 'delete' && this.options.animation && this.options.icon) {
            // Special structure for delete variant with animation
            const defaultIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg>';
            const iconHtml = this.options.icon === 'delete' ? defaultIcon : this.options.icon;
            content = `<span class="btn-text">${this.options.text}</span><span class="btn-icon">${iconHtml}</span>`;
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
    
    setAnimation(animation) {
        this.options.animation = animation;
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
        return ['variant', 'size', 'disabled', 'text', 'icon', 'loading', 'animation'];
    }

    attributeChangedCallback() {
        if (this.buttonInstance) {
            this.render();
        }
    }

    render() {
        const variant = this.getAttribute('variant') || 'primary';
        const size = this.getAttribute('size') || 'small';
        const disabled = this.hasAttribute('disabled');
        const loading = this.hasAttribute('loading');
        const animation = this.hasAttribute('animation');
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
            animation: animation,
            onClick: () => {
                // Dispatch custom event
                this.dispatchEvent(new CustomEvent('dotbox-click', {
                    detail: { variant, size, text, disabled, loading, icon, animation },
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
    
    setAnimation(animation) {
        if (animation) {
            this.setAttribute('animation', '');
        } else {
            this.removeAttribute('animation');
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