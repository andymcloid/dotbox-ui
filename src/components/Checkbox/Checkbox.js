/**
 * Checkbox Component - Animated checkbox with SVG checkmark
 */
class Checkbox {
    constructor(options = {}) {
        this.options = {
            label: 'Checkbox',
            checked: false,
            disabled: false,
            size: 'medium', // small, medium, large
            variant: 'primary', // primary, success, danger
            name: '',
            value: '',
            id: '',
            className: '',
            onChange: null,
            ...options
        };
        this.element = null;
        this.input = null;
        this.uniqueId = this.options.id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
        this.createElement();
        this.bindEvents();
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.className = this.getClasses();
        
        // Create checkbox input
        this.input = document.createElement('input');
        this.input.type = 'checkbox';
        this.input.id = this.uniqueId;
        this.input.checked = this.options.checked;
        this.input.disabled = this.options.disabled;
        
        if (this.options.name) {
            this.input.name = this.options.name;
        }
        
        if (this.options.value) {
            this.input.value = this.options.value;
        }

        // Create label with checkbox visual and text
        const label = document.createElement('label');
        label.htmlFor = this.uniqueId;
        label.className = 'dotbox-checkbox-label';
        
        // Create checkbox visual container
        const checkboxBox = document.createElement('span');
        checkboxBox.className = 'dotbox-checkbox-box';
        
        // Create SVG checkmark
        checkboxBox.innerHTML = `
            <svg viewBox="0 0 12 10" height="10px" width="12px">
                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
            </svg>
        `;
        
        // Create text span
        const textSpan = document.createElement('span');
        textSpan.className = 'dotbox-checkbox-text';
        textSpan.textContent = this.options.label;
        
        // Assemble the structure
        label.appendChild(checkboxBox);
        label.appendChild(textSpan);
        
        this.element.appendChild(this.input);
        this.element.appendChild(label);
        
        return this.element;
    }

    getClasses() {
        let classes = ['dotbox-checkbox-container'];
        
        classes.push(this.options.size);
        classes.push(this.options.variant);
        
        if (this.options.className) {
            classes.push(this.options.className);
        }
        
        return classes.join(' ');
    }

    bindEvents() {
        if (this.options.onChange) {
            this.input.addEventListener('change', (e) => {
                this.options.checked = e.target.checked;
                this.options.onChange(e);
            });
        }
    }

    // Public methods
    setChecked(checked) {
        this.options.checked = checked;
        this.input.checked = checked;
        return this;
    }

    getChecked() {
        return this.input.checked;
    }

    setDisabled(disabled) {
        this.options.disabled = disabled;
        this.input.disabled = disabled;
        this.element.className = this.getClasses();
        return this;
    }

    setLabel(label) {
        this.options.label = label;
        const textSpan = this.element.querySelector('.dotbox-checkbox-text');
        if (textSpan) {
            textSpan.textContent = label;
        }
        return this;
    }

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

    focus() {
        this.input.focus();
        return this;
    }

    // Get the DOM elements
    getElement() {
        return this.element;
    }

    getInput() {
        return this.input;
    }

    // Destroy checkbox
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.element = null;
        this.input = null;
    }
}

// Web Component for HTML usage
class DotboxCheckboxElement extends HTMLElement {
    constructor() {
        super();
        this.checkboxInstance = null;
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['label', 'checked', 'disabled', 'size', 'variant', 'name', 'value'];
    }

    attributeChangedCallback() {
        if (this.checkboxInstance) {
            this.render();
        }
    }

    render() {
        const label = this.getAttribute('label') || this.textContent.trim() || 'Checkbox';
        const checked = this.hasAttribute('checked');
        const disabled = this.hasAttribute('disabled');
        const size = this.getAttribute('size') || 'medium';
        const variant = this.getAttribute('variant') || 'primary';
        const name = this.getAttribute('name') || '';
        const value = this.getAttribute('value') || '';

        // Clean up previous instance
        if (this.checkboxInstance) {
            this.innerHTML = '';
        }

        // Create new checkbox instance
        this.checkboxInstance = new Checkbox({
            label: label,
            checked: checked,
            disabled: disabled,
            size: size,
            variant: variant,
            name: name,
            value: value,
            onChange: (e) => {
                // Update the checked attribute
                if (e.target.checked) {
                    this.setAttribute('checked', '');
                } else {
                    this.removeAttribute('checked');
                }
                
                // Dispatch custom event
                this.dispatchEvent(new CustomEvent('dotbox-change', {
                    detail: { 
                        checked: e.target.checked,
                        value: e.target.value || value,
                        name: name
                    },
                    bubbles: true
                }));
            }
        });

        this.innerHTML = '';
        this.appendChild(this.checkboxInstance.getElement());
    }

    // Expose checkbox methods
    setChecked(checked) {
        if (checked) {
            this.setAttribute('checked', '');
        } else {
            this.removeAttribute('checked');
        }
        return this;
    }

    getChecked() {
        return this.checkboxInstance ? this.checkboxInstance.getChecked() : false;
    }

    setDisabled(disabled) {
        if (disabled) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
        return this;
    }

    setLabel(label) {
        this.setAttribute('label', label);
        return this;
    }

    focus() {
        if (this.checkboxInstance) {
            this.checkboxInstance.focus();
        }
        return this;
    }
}

// Register custom element
if (typeof customElements !== 'undefined') {
    customElements.define('dotbox-checkbox', DotboxCheckboxElement);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Checkbox;
}