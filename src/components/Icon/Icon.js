/**
 * Icon Component - Uses SVG sprite system
 * Supports predefined icons from sprite, emojis, custom SVG, and images
 */

class Icon {
    constructor(options = {}) {
        this.options = {
            name: options.name || 'info',
            size: options.size || '24px',
            color: options.color || 'currentColor',
            className: options.className || '',
            title: options.title || '',
            type: this.detectType(options),
            svg: options.svg || '',
            image: options.image || ''
        };
        
        this.element = null;
        this.spriteLoaded = false;
        
        this.render();
    }
    
    detectType(options) {
        if (options.type) return options.type;
        if (options.svg) return 'svg';
        if (options.image) return 'image';
        if (options.name && this.isEmoji(options.name)) return 'emoji';
        return 'sprite'; // Default to sprite system
    }
    
    isEmoji(str) {
        const emojiRegex = /^(\p{Emoji}|\u200D|\uFE0F)+$/u;
        return emojiRegex.test(str);
    }
    
    render() {
        this.element = document.createElement('span');
        this.element.className = this.getClasses();
        
        if (this.options.title) {
            this.element.setAttribute('title', this.options.title);
        }
        
        this.applyStyles();
        this.updateContent();
        
        return this.element;
    }
    
    getClasses() {
        const classes = ['dotbox-icon'];
        
        // Add type-specific class
        classes.push(`dotbox-icon-${this.options.type}`);
        
        // Add size class
        classes.push(`dotbox-icon-${this.getSizeClass()}`);
        
        // Add custom classes
        if (this.options.className) {
            classes.push(this.options.className);
        }
        
        return classes.join(' ');
    }
    
    getSizeClass() {
        const size = parseInt(this.options.size);
        if (size <= 16) return 'small';
        if (size <= 24) return 'medium';
        if (size <= 32) return 'large';
        return 'xlarge';
    }
    
    updateContent() {
        if (!this.element) return;
        
        let content = '';
        
        switch (this.options.type) {
            case 'sprite':
                content = this.getSpriteIcon();
                break;
            case 'svg':
                content = this.options.svg || '';
                break;
            case 'emoji':
                content = `<span class="dotbox-icon-emoji">${this.options.name}</span>`;
                break;
            case 'image':
                content = `<img src="${this.options.image}" alt="${this.options.title || this.options.name}" />`;
                break;
        }
        
        this.element.innerHTML = content;
    }
    
    getSpriteIcon() {
        // Ensure sprite is loaded
        this.ensureSpriteLoaded();
        
        // Use SVG use element to reference icon from sprite
        return `<svg class="dotbox-icon-svg" width="${this.options.size}" height="${this.options.size}">
            <use xlink:href="/dist/icons.svg#icon-${this.options.name}"></use>
        </svg>`;
    }
    
    ensureSpriteLoaded() {
        if (this.spriteLoaded || typeof window === 'undefined') return;
        
        // Check if sprite is already in DOM
        if (document.querySelector('#dotbox-icon-sprite')) {
            this.spriteLoaded = true;
            return;
        }
        
        // Load sprite into DOM (only once)
        if (!window._dotboxSpriteLoading) {
            window._dotboxSpriteLoading = true;
            
            fetch('/dist/icons.svg')
                .then(response => response.text())
                .then(sprite => {
                    const div = document.createElement('div');
                    div.id = 'dotbox-icon-sprite';
                    div.style.display = 'none';
                    div.innerHTML = sprite;
                    document.body.insertBefore(div, document.body.firstChild);
                    this.spriteLoaded = true;
                    window._dotboxSpriteLoaded = true;
                })
                .catch(error => {
                    console.error('Failed to load icon sprite:', error);
                    // Fallback to inline SVG if available
                    this.fallbackToInline();
                });
        } else if (window._dotboxSpriteLoaded) {
            this.spriteLoaded = true;
        }
    }
    
    fallbackToInline() {
        // Fallback predefined icons (for backward compatibility)
        const fallbackIcons = {
            'delete': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>',
            'close': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>',
            'check': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>',
            'plus': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>',
            'minus': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M0 10h24v4h-24z"/></svg>',
            'arrow-left': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',
            'arrow-right': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M4 11h12.17l-5.59-5.59L12 4l8 8-8 8-1.41-1.41L16.17 13H4v-2z"/></svg>',
            'arrow-up': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M11 20H13V7.83L18.59 13.41L20 12L12 4L4 12L5.41 13.41L11 7.83V20Z"/></svg>',
            'arrow-down': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M11 4H13V16.17L18.59 10.59L20 12L12 20L4 12L5.41 10.59L11 16.17V4Z"/></svg>',
            'info': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,17H11V11H13M13,9H11V7H13"/></svg>',
            'code': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z"/></svg>'
        };
        
        if (fallbackIcons[this.options.name]) {
            this.options.type = 'svg';
            this.options.svg = fallbackIcons[this.options.name];
            this.updateContent();
        }
    }
    
    applyStyles() {
        if (!this.element) return;
        
        // Apply size
        this.element.style.width = this.options.size;
        this.element.style.height = this.options.size;
        this.element.style.display = 'inline-flex';
        this.element.style.alignItems = 'center';
        this.element.style.justifyContent = 'center';
        
        // Apply color for SVG icons
        if (this.options.type === 'svg' || this.options.type === 'sprite') {
            this.element.style.color = this.options.color;
            
            // Wait for content to be added, then apply color to SVG
            setTimeout(() => {
                const svg = this.element.querySelector('svg');
                if (svg) {
                    svg.style.fill = this.options.color;
                    if (this.options.color !== 'currentColor') {
                        const paths = svg.querySelectorAll('path, circle, rect, polygon, polyline');
                        paths.forEach(path => {
                            if (path.hasAttribute('fill') && path.getAttribute('fill') !== 'none') {
                                path.setAttribute('fill', this.options.color);
                            }
                            if (path.hasAttribute('stroke') && path.getAttribute('stroke') !== 'none') {
                                path.setAttribute('stroke', this.options.color);
                            }
                        });
                    }
                }
            }, 10);
        }
    }
    
    // Public methods
    setIcon(name) {
        this.options.name = name;
        this.options.type = this.detectType({ name });
        this.updateContent();
        return this;
    }
    
    setSize(size) {
        this.options.size = size;
        this.applyStyles();
        this.updateContent();
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
}

// Web Component wrapper
class DotboxIconElement extends HTMLElement {
    constructor() {
        super();
        this.iconInstance = null;
    }
    
    connectedCallback() {
        this.render();
    }
    
    static get observedAttributes() {
        return ['name', 'size', 'color', 'type', 'svg', 'image', 'title'];
    }
    
    attributeChangedCallback() {
        if (this.iconInstance) {
            this.render();
        }
    }
    
    render() {
        const options = {
            name: this.getAttribute('name') || 'info',
            size: this.getAttribute('size') || '24px',
            color: this.getAttribute('color') || 'currentColor',
            type: this.getAttribute('type'),
            svg: this.innerHTML.trim() || this.getAttribute('svg'),
            image: this.getAttribute('image'),
            title: this.getAttribute('title') || ''
        };
        
        // Clear existing content
        this.innerHTML = '';
        
        // Create new icon instance
        this.iconInstance = new Icon(options);
        this.appendChild(this.iconInstance.getElement());
    }
}

// Register custom element
if (typeof customElements !== 'undefined') {
    customElements.define('dotbox-icon', DotboxIconElement);
}

// Export for use in other components
if (typeof window !== 'undefined') {
    window.Dotbox = window.Dotbox || {};
    window.Dotbox.Icon = Icon;
}

module.exports = Icon;