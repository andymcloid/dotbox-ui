/**
 * Loader Component - Animated SVG loading indicator
 */
class Loader {
    constructor(options = {}) {
        this.options = {
            size: 'medium', // small, medium, large
            variant: 'primary', // primary, secondary, success, danger
            className: '',
            ...options
        };
        this.element = null;
        this.createElement();
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.className = this.getClasses();
        
        // Create the SVG with polylines
        this.element.innerHTML = `
            <svg width="64px" height="48px" viewBox="0 0 64 48">
                <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back"></polyline>
                <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front"></polyline>
            </svg>
        `;
        
        return this.element;
    }

    getClasses() {
        let classes = ['dotbox-loader'];
        
        classes.push(this.options.size);
        classes.push(this.options.variant);
        
        if (this.options.className) {
            classes.push(this.options.className);
        }
        
        return classes.join(' ');
    }

    // Public methods
    setSize(size) {
        this.options.size = size;
        this.element.className = this.getClasses();
        return this;
    }

    setVariant(variant) {
        this.options.variant = variant;
        this.element.className = this.getClasses();
        return this;
    }

    show() {
        if (this.element) {
            this.element.style.display = 'inline-flex';
        }
        return this;
    }

    hide() {
        if (this.element) {
            this.element.style.display = 'none';
        }
        return this;
    }

    // Get the DOM element
    getElement() {
        return this.element;
    }

    // Destroy loader
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.element = null;
    }
}

// Web Component for HTML usage
class DotboxLoaderElement extends HTMLElement {
    constructor() {
        super();
        this.loaderInstance = null;
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['size', 'variant'];
    }

    attributeChangedCallback() {
        if (this.loaderInstance) {
            this.render();
        }
    }

    render() {
        const size = this.getAttribute('size') || 'medium';
        const variant = this.getAttribute('variant') || 'primary';

        // Clean up previous instance
        if (this.loaderInstance) {
            this.innerHTML = '';
        }

        // Create new loader instance
        this.loaderInstance = new Loader({
            size: size,
            variant: variant
        });

        this.innerHTML = '';
        this.appendChild(this.loaderInstance.getElement());
    }

    // Expose loader methods
    setSize(size) {
        this.setAttribute('size', size);
        return this;
    }

    setVariant(variant) {
        this.setAttribute('variant', variant);
        return this;
    }

    show() {
        if (this.loaderInstance) {
            this.loaderInstance.show();
        }
        return this;
    }

    hide() {
        if (this.loaderInstance) {
            this.loaderInstance.hide();
        }
        return this;
    }
}

// Register custom element
if (typeof customElements !== 'undefined') {
    customElements.define('dotbox-loader', DotboxLoaderElement);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Loader;
}