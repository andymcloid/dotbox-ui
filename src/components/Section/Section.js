// Section Component - Basic content section container
class Section {
    constructor(options = {}) {
        this.options = {
            title: '',
            className: '',
            id: '',
            ...options
        };
        this.element = null;
        this.titleElement = null;
        this.contentElement = null;
        this.uniqueId = this.options.id || `section-${Math.random().toString(36).substr(2, 9)}`;
        this.createElement();
    }

    createElement() {
        this.element = document.createElement('section');
        this.element.className = this.getClasses();
        this.element.id = this.uniqueId;

        // Add title if provided
        if (this.options.title) {
            this.titleElement = document.createElement('h2');
            this.titleElement.className = 'dotbox-section-title';
            this.titleElement.textContent = this.options.title;
            this.element.appendChild(this.titleElement);
        }

        // Create content container
        this.contentElement = document.createElement('div');
        this.contentElement.className = 'dotbox-section-content';
        this.element.appendChild(this.contentElement);

        return this.element;
    }

    getClasses() {
        let classes = ['dotbox-section'];
        if (this.options.className) {
            classes.push(this.options.className);
        }
        return classes.join(' ');
    }

    // Public methods
    setTitle(title) {
        this.options.title = title;
        if (title && !this.titleElement) {
            this.titleElement = document.createElement('h2');
            this.titleElement.className = 'dotbox-section-title';
            this.titleElement.textContent = title;
            this.element.insertBefore(this.titleElement, this.contentElement);
        } else if (title && this.titleElement) {
            this.titleElement.textContent = title;
        } else if (!title && this.titleElement) {
            this.element.removeChild(this.titleElement);
            this.titleElement = null;
        }
        return this;
    }

    setContent(content) {
        if (typeof content === 'string') {
            this.contentElement.innerHTML = content;
        } else if (content instanceof HTMLElement) {
            this.contentElement.innerHTML = '';
            this.contentElement.appendChild(content);
        }
        return this;
    }

    appendChild(element) {
        this.contentElement.appendChild(element);
        return this;
    }

    // Get the DOM elements
    getElement() {
        return this.element;
    }

    getContentElement() {
        return this.contentElement;
    }

    // Destroy section
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.element = null;
        this.titleElement = null;
        this.contentElement = null;
    }
}

// Web Component Definition
class DotboxSectionElement extends HTMLElement {
    constructor() {
        super();
        this.sectionInstance = null;
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['title'];
    }

    attributeChangedCallback() {
        if (this.sectionInstance) {
            this.render();
        }
    }

    render() {
        const title = this.getAttribute('title') || '';
        const content = this.innerHTML.trim();

        if (this.sectionInstance) {
            // Store current content before re-rendering
            const currentContent = this.sectionInstance.getContentElement().innerHTML;
            this.innerHTML = '';
        }

        this.sectionInstance = new Section({
            title
        });

        // Set content from innerHTML if available
        if (content) {
            this.sectionInstance.setContent(content);
        }

        this.innerHTML = '';
        this.appendChild(this.sectionInstance.getElement());
    }

    // Expose section methods
    setTitle(title) {
        this.setAttribute('title', title);
        return this;
    }

    setContent(content) {
        if (this.sectionInstance) {
            this.sectionInstance.setContent(content);
        }
        return this;
    }

    appendContent(element) {
        if (this.sectionInstance) {
            this.sectionInstance.appendChild(element);
        }
        return this;
    }
}

// Register Web Component
if (typeof customElements !== 'undefined') {
    customElements.define('dotbox-section', DotboxSectionElement);
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Section;
}