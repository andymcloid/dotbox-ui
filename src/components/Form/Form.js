// Form Component - Layout container for organizing form elements
class Form {
    constructor(options = {}) {
        this.options = {
            layout: 'vertical', // vertical, horizontal, grid
            gap: 'medium', // small, medium, large
            columns: 2, // for grid layout
            submitButton: null,
            cancelButton: null,
            className: '',
            onSubmit: null,
            onReset: null,
            ...options
        };
        this.element = null;
        this.formElement = null;
        this.fieldsContainer = null;
        this.buttonsContainer = null;
        this.uniqueId = this.options.id || `form-${Math.random().toString(36).substr(2, 9)}`;
        this.createElement();
        this.bindEvents();
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.className = this.getClasses();
        this.element.id = this.uniqueId;

        this.formElement = document.createElement('form');
        this.formElement.className = 'dotbox-form-element';

        // Create fields container
        this.fieldsContainer = document.createElement('div');
        this.fieldsContainer.className = 'dotbox-form-fields';
        this.formElement.appendChild(this.fieldsContainer);

        // Create buttons container
        this.buttonsContainer = document.createElement('div');
        this.buttonsContainer.className = 'dotbox-form-buttons';
        this.formElement.appendChild(this.buttonsContainer);

        this.element.appendChild(this.formElement);

        // Add default buttons if specified
        if (this.options.submitButton) {
            this.addSubmitButton(this.options.submitButton);
        }
        if (this.options.cancelButton) {
            this.addCancelButton(this.options.cancelButton);
        }

        return this.element;
    }

    getClasses() {
        let classes = ['dotbox-form'];
        classes.push(`dotbox-form-${this.options.layout}`);
        classes.push(`dotbox-form-gap-${this.options.gap}`);
        
        if (this.options.layout === 'grid') {
            classes.push(`dotbox-form-columns-${this.options.columns}`);
        }
        
        if (this.options.className) {
            classes.push(this.options.className);
        }
        return classes.join(' ');
    }

    bindEvents() {
        this.formElement.addEventListener('submit', (e) => {
            if (this.options.onSubmit) {
                e.preventDefault();
                const formData = this.getFormData();
                this.options.onSubmit(formData, e);
            }
        });

        this.formElement.addEventListener('reset', (e) => {
            if (this.options.onReset) {
                this.options.onReset(e);
            }
        });
    }

    // Public methods
    addField(element) {
        if (element instanceof HTMLElement) {
            this.fieldsContainer.appendChild(element);
        } else if (element && element.getElement) {
            // Support for component instances
            this.fieldsContainer.appendChild(element.getElement());
        } else if (element && element.getContainer) {
            // Support for components with getContainer method
            this.fieldsContainer.appendChild(element.getContainer());
        }
        return this;
    }

    addFields(elements) {
        elements.forEach(element => this.addField(element));
        return this;
    }

    addSubmitButton(options = {}) {
        const buttonOptions = {
            text: 'Submit',
            type: 'submit',
            variant: 'primary',
            ...options
        };
        
        const button = document.createElement('button');
        button.type = buttonOptions.type;
        button.className = `btn btn-${buttonOptions.variant}`;
        button.textContent = buttonOptions.text;
        
        if (buttonOptions.onClick) {
            button.addEventListener('click', buttonOptions.onClick);
        }
        
        this.buttonsContainer.appendChild(button);
        return button;
    }

    addCancelButton(options = {}) {
        const buttonOptions = {
            text: 'Cancel',
            type: 'button',
            variant: 'secondary',
            ...options
        };
        
        const button = document.createElement('button');
        button.type = buttonOptions.type;
        button.className = `btn btn-${buttonOptions.variant}`;
        button.textContent = buttonOptions.text;
        
        if (buttonOptions.onClick) {
            button.addEventListener('click', buttonOptions.onClick);
        }
        
        this.buttonsContainer.appendChild(button);
        return button;
    }

    addButton(options = {}) {
        const buttonOptions = {
            text: 'Button',
            type: 'button',
            variant: 'secondary',
            ...options
        };
        
        const button = document.createElement('button');
        button.type = buttonOptions.type;
        button.className = `btn btn-${buttonOptions.variant}`;
        button.textContent = buttonOptions.text;
        
        if (buttonOptions.onClick) {
            button.addEventListener('click', buttonOptions.onClick);
        }
        
        this.buttonsContainer.appendChild(button);
        return button;
    }

    setLayout(layout) {
        this.options.layout = layout;
        this.element.className = this.getClasses();
        return this;
    }

    setGap(gap) {
        this.options.gap = gap;
        this.element.className = this.getClasses();
        return this;
    }

    setColumns(columns) {
        this.options.columns = columns;
        this.element.className = this.getClasses();
        return this;
    }

    getFormData() {
        const formData = new FormData(this.formElement);
        const data = {};
        
        // Convert FormData to regular object
        for (let [key, value] of formData.entries()) {
            if (data[key]) {
                // Handle multiple values (like checkboxes with same name)
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }
        
        return data;
    }

    reset() {
        this.formElement.reset();
        return this;
    }

    // Get the DOM elements
    getElement() {
        return this.element;
    }

    getFormElement() {
        return this.formElement;
    }

    getFieldsContainer() {
        return this.fieldsContainer;
    }

    // Destroy form
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.element = null;
        this.formElement = null;
        this.fieldsContainer = null;
        this.buttonsContainer = null;
    }
}

// Web Component Definition
class DotboxFormElement extends HTMLElement {
    constructor() {
        super();
        this.formInstance = null;
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['layout', 'gap', 'columns'];
    }

    attributeChangedCallback() {
        if (this.formInstance) {
            this.render();
        }
    }

    render() {
        const layout = this.getAttribute('layout') || 'vertical';
        const gap = this.getAttribute('gap') || 'medium';
        const columns = parseInt(this.getAttribute('columns')) || 2;
        const content = this.innerHTML.trim();

        if (this.formInstance) {
            this.innerHTML = '';
        }

        this.formInstance = new Form({
            layout,
            gap,
            columns,
            onSubmit: (data, e) => {
                this.dispatchEvent(new CustomEvent('dotbox-submit', {
                    detail: { data, originalEvent: e },
                    bubbles: true
                }));
            },
            onReset: (e) => {
                this.dispatchEvent(new CustomEvent('dotbox-reset', {
                    detail: { originalEvent: e },
                    bubbles: true
                }));
            }
        });

        // Parse and add child elements
        if (content) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = content;
            
            Array.from(tempDiv.children).forEach(child => {
                this.formInstance.addField(child);
            });
        }

        this.innerHTML = '';
        this.appendChild(this.formInstance.getElement());
    }

    // Expose form methods
    addField(element) {
        if (this.formInstance) {
            this.formInstance.addField(element);
        }
        return this;
    }

    setLayout(layout) {
        this.setAttribute('layout', layout);
        return this;
    }

    getFormData() {
        return this.formInstance ? this.formInstance.getFormData() : {};
    }

    reset() {
        if (this.formInstance) {
            this.formInstance.reset();
        }
        return this;
    }
}

// Register Web Component
if (typeof customElements !== 'undefined') {
    customElements.define('dotbox-form', DotboxFormElement);
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Form;
}