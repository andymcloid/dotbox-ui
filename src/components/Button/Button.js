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
            size: 'small', // small, medium, large
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
        
        // Determine button layout type
        if (!this.options.icon) {
            classes.push('btn-no-icon');
        } else if (!this.options.text || this.options.text.trim() === '') {
            classes.push('btn-icon-only');
        }
        
        // Add custom classes
        if (this.options.className) {
            classes.push(this.options.className);
        }
        
        this.element.className = classes.join(' ');
    }
    
    updateContent() {
        let content = '';
        const hasText = this.options.text && this.options.text.trim() !== '';
        
        if (this.options.loading) {
            if (this.options.icon && hasText) {
                content = `
                    <span class="btn-text">
                        <span class="btn-spinner">⟳</span> Loading...
                    </span>
                    <span class="btn-icon">
                        <span class="btn-divider"></span>
                        ${this.getIconHtml()}
                    </span>
                `;
            } else if (this.options.icon && !hasText) {
                // Icon-only loading
                content = `
                    <span class="btn-icon">
                        <span class="btn-spinner">⟳</span>
                    </span>
                `;
            } else {
                content = '<span class="btn-text"><span class="btn-spinner">⟳</span> Loading...</span>';
            }
        } else if (this.options.icon && hasText) {
            // Smart button with both text and icon (has animations)
            content = `
                <span class="btn-text">${this.options.text}</span>
                <span class="btn-icon">
                    <span class="btn-divider"></span>
                    ${this.getIconHtml()}
                </span>
            `;
        } else if (this.options.icon && !hasText) {
            // Icon-only button (no animations)
            content = `
                <span class="btn-icon">
                    ${this.getIconHtml()}
                </span>
            `;
        } else {
            // Simple button without icon
            content = `<span class="btn-text">${this.options.text}</span>`;
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
    
    getIconHtml() {
        if (!this.options.icon) return '';
        
        // Default icons for common variants
        const defaultIcons = {
            'delete': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#eee" d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>',
            'close': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#eee" d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>',
            'check': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#eee" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>',
            'plus': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#eee" d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>'
        };
        
        return defaultIcons[this.options.icon] || this.options.icon;
    }
    
    // Public methods
    setText(text) {
        this.options.text = text;
        this.updateContent();
        return this;
    }
    
    setIcon(icon) {
        this.options.icon = icon;
        this.updateClasses();
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
        const size = this.getAttribute('size') || 'small';
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