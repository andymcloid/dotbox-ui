/**
 * Icon Component - Reusable icon display for SVG, emoji, images, and predefined icons
 * Supports multiple icon types and standardized sizing
 */
class Icon {
    constructor(options = {}) {
        this.options = {
            type: 'predefined', // predefined, svg, emoji, image
            name: 'info', // For predefined icons
            svg: null, // Custom SVG content
            emoji: null, // Emoji character
            src: null, // Image source URL
            size: 'medium', // small, medium, large, or custom size in px
            color: 'currentColor', // Color for SVG icons
            alt: '', // Alt text for images
            className: '',
            ...options
        };
        
        this.element = null;
        this.createElement();
    }
    
    createElement() {
        this.element = document.createElement('span');
        this.element.className = this.getClasses();
        this.updateContent();
        
        return this.element;
    }
    
    getClasses() {
        let classes = ['dotbox-icon'];
        
        // Add type class
        classes.push(`dotbox-icon-${this.options.type}`);
        
        // Add size class
        classes.push(`dotbox-icon-${this.options.size}`);
        
        // Add custom classes
        if (this.options.className) {
            classes.push(this.options.className);
        }
        
        return classes.join(' ');
    }
    
    updateContent() {
        if (!this.element) return;
        
        let content = '';
        
        switch (this.options.type) {
            case 'predefined':
                content = this.getPredefinedIcon();
                break;
            case 'svg':
                content = this.options.svg || '';
                break;
            case 'emoji':
                content = this.options.emoji || '❓';
                break;
            case 'image':
                content = `<img src="${this.options.src}" alt="${this.options.alt}" style="width: 100%; height: 100%; object-fit: contain;">`;
                break;
            default:
                content = this.getPredefinedIcon();
        }
        
        this.element.innerHTML = content;
        this.applyStyles();
    }
    
    getPredefinedIcon() {
        const predefinedIcons = {
            // Common actions
            'delete': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>',
            'close': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>',
            'check': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>',
            'plus': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>',
            'minus': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M0 10h24v4h-24z"/></svg>',
            
            // Navigation
            'arrow-left': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',
            'arrow-right': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M4 11h12.17l-5.59-5.59L12 4l8 8-8 8-1.41-1.41L16.17 13H4v-2z"/></svg>',
            'arrow-up': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M11 20H13V7.83L18.59 13.41L20 12L12 4L4 12L5.41 13.41L11 7.83V20Z"/></svg>',
            'arrow-down': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M11 4H13V16.17L18.59 10.59L20 12L12 20L4 12L5.41 10.59L11 16.17V4Z"/></svg>',
            
            // Common UI
            'edit': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',
            'search': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>',
            'settings': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></svg>',
            'info': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,17H11V11H13M13,9H11V7H13"/></svg>',
            'warning': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',
            'error': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,17H11V15H13M13,13H11V7H13"/></svg>',
            
            // File operations
            'download': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/></svg>',
            'upload': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/></svg>',
            'save': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z"/></svg>',
            
            // Development
            'code': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z"/></svg>'
        };
        
        return predefinedIcons[this.options.name] || predefinedIcons['info'];
    }
    
    applyStyles() {
        if (!this.element) return;
        
        // Apply color for SVG icons
        if (this.options.type === 'svg' || this.options.type === 'predefined') {
            const svg = this.element.querySelector('svg');
            if (svg && this.options.color && this.options.color !== 'currentColor') {
                const path = svg.querySelector('path');
                if (path) {
                    path.setAttribute('fill', this.options.color);
                }
            }
        }
        
        // Apply custom size if provided as number
        if (typeof this.options.size === 'number') {
            this.element.style.width = `${this.options.size}px`;
            this.element.style.height = `${this.options.size}px`;
        }
    }
    
    // Public methods
    setType(type) {
        this.options.type = type;
        this.element.className = this.getClasses();
        this.updateContent();
        return this;
    }
    
    setName(name) {
        this.options.name = name;
        this.updateContent();
        return this;
    }
    
    setSvg(svg) {
        this.options.svg = svg;
        this.options.type = 'svg';
        this.element.className = this.getClasses();
        this.updateContent();
        return this;
    }
    
    setEmoji(emoji) {
        this.options.emoji = emoji;
        this.options.type = 'emoji';
        this.element.className = this.getClasses();
        this.updateContent();
        return this;
    }
    
    setImage(src, alt = '') {
        this.options.src = src;
        this.options.alt = alt;
        this.options.type = 'image';
        this.element.className = this.getClasses();
        this.updateContent();
        return this;
    }
    
    setSize(size) {
        this.options.size = size;
        this.element.className = this.getClasses();
        this.applyStyles();
        return this;
    }
    
    setColor(color) {
        this.options.color = color;
        this.applyStyles();
        return this;
    }
    
    getElement() {
        return this.element;
    }
    
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.element = null;
    }
}

// Web Component for HTML usage
class DotboxIconElement extends HTMLElement {
    constructor() {
        super();
        this.iconInstance = null;
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['type', 'name', 'svg', 'emoji', 'src', 'size', 'color', 'alt'];
    }

    attributeChangedCallback() {
        if (this.iconInstance) {
            this.render();
        }
    }

    render() {
        const type = this.getAttribute('type') || 'predefined';
        const name = this.getAttribute('name') || 'info';
        const svg = this.getAttribute('svg') || null;
        const emoji = this.getAttribute('emoji') || null;
        const src = this.getAttribute('src') || null;
        const size = this.getAttribute('size') || 'medium';
        const color = this.getAttribute('color') || 'currentColor';
        const alt = this.getAttribute('alt') || '';

        // Clean up previous instance
        if (this.iconInstance) {
            this.innerHTML = '';
        }

        // Create new icon instance
        this.iconInstance = new Icon({
            type: type,
            name: name,
            svg: svg,
            emoji: emoji,
            src: src,
            size: size,
            color: color,
            alt: alt
        });

        // Clear content and append icon
        this.innerHTML = '';
        this.appendChild(this.iconInstance.getElement());
    }

    // Expose icon methods
    setType(type) {
        this.setAttribute('type', type);
        return this;
    }

    setName(name) {
        this.setAttribute('name', name);
        return this;
    }

    setSvg(svg) {
        this.setAttribute('svg', svg);
        return this;
    }

    setEmoji(emoji) {
        this.setAttribute('emoji', emoji);
        return this;
    }

    setImage(src, alt = '') {
        this.setAttribute('src', src);
        this.setAttribute('alt', alt);
        return this;
    }

    setSize(size) {
        this.setAttribute('size', size);
        return this;
    }

    setColor(color) {
        this.setAttribute('color', color);
        return this;
    }
}

// Register custom element
if (typeof customElements !== 'undefined') {
    customElements.define('dotbox-icon', DotboxIconElement);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Icon;
}