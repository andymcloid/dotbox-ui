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
            width: null, // Custom width (e.g., '100px', '10em', '50%', etc.)
            animation: true, // Enable/disable hover animations
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
        this.applyCustomStyles();
        
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
        
        // Add animation class
        if (!this.options.animation) {
            classes.push('btn-no-animation');
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
    
    applyCustomStyles() {
        if (this.options.width) {
            this.element.style.width = this.options.width;
        }
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
        
        // Determine icon type and properties
        let iconType = 'predefined';
        let iconProps = { name: this.options.icon, color: 'currentColor' };
        
        // Check if it's an emoji
        if (/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(this.options.icon)) {
            iconType = 'emoji';
            iconProps = { emoji: this.options.icon };
        }
        // Check if it's custom SVG (contains '<svg')
        else if (this.options.icon.includes('<svg')) {
            iconType = 'svg';
            iconProps = { svg: this.options.icon };
        }
        // Check if it's an image URL
        else if (this.options.icon.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i) || this.options.icon.startsWith('http')) {
            iconType = 'image';
            iconProps = { src: this.options.icon, alt: 'Icon' };
        }
        
        // Create Icon component and return its HTML
        if (typeof Icon !== 'undefined') {
            const icon = new Icon({
                type: iconType,
                size: 'medium',
                ...iconProps
            });
            return icon.getElement().outerHTML;
        } else {
            // Fallback if Icon component not available
            const predefinedIcons = {
                'delete': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>',
                'close': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>',
                'check': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>',
                'plus': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>',
                'code': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z"/></svg>',
                'arrow-up': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M11 20H13V7.83L18.59 13.41L20 12L12 4L4 12L5.41 13.41L11 7.83V20Z"/></svg>',
                'arrow-down': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M11 4H13V16.17L18.59 10.59L20 12L12 20L4 12L5.41 10.59L11 16.17V4Z"/></svg>'
            };
            return predefinedIcons[this.options.icon] || this.options.icon;
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
        this.updateClasses();
        this.updateContent();
        return this;
    }
    
    setWidth(width) {
        this.options.width = width;
        this.applyCustomStyles();
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
        return ['variant', 'size', 'disabled', 'text', 'icon', 'loading', 'width', 'animation'];
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
        const width = this.getAttribute('width') || null;
        const animation = this.getAttribute('animation') !== 'false'; // Default to true unless explicitly false
        let text = this.getAttribute('text') || this.textContent.trim() || (icon ? '' : 'Button');
        
        // If text contains the same emoji as the icon, remove it from text
        if (icon && text && /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(icon)) {
            // Remove the emoji from text if it's the same as the icon
            text = text.replace(icon, '').trim();
        }

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
            width: width,
            animation: animation,
            onClick: () => {
                // Dispatch custom event
                this.dispatchEvent(new CustomEvent('dotbox-click', {
                    detail: { variant, size, text, disabled, loading, icon, width, animation },
                    bubbles: true
                }));
            }
        });

        // Clear content and append button
        this.innerHTML = '';
        this.appendChild(this.buttonInstance.getElement());
        
        // Apply width to Web Component itself if specified
        if (width) {
            this.style.width = width;
            this.style.display = 'block'; // Ensure it can take full width
        }
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
    
    setWidth(width) {
        if (width) {
            this.setAttribute('width', width);
        } else {
            this.removeAttribute('width');
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