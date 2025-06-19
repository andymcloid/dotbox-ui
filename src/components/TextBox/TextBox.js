/**
 * Base TextBox Component - Generic and reusable input field
 * Following SOLID principles for input functionality
 */
class TextBox {
    constructor(options = {}) {
        this.options = {
            type: 'text',
            placeholder: '',
            value: '',
            label: '',
            required: false,
            disabled: false,
            readonly: false,
            min: null,
            max: null,
            step: null,
            pattern: null,
            helpText: '',
            errorText: '',
            className: '',
            ...options
        };
        
        this.container = null;
        this.label = null;
        this.inputWrapper = null;
        this.input = null;
        this.inputBorder = null;
        this.helpElement = null;
        this.errorElement = null;
        
        this.onChange = options.onChange || null;
        this.onInput = options.onInput || null;
        this.onFocus = options.onFocus || null;
        this.onBlur = options.onBlur || null;
        
        this.createElement();
        this.bindEvents();
    }
    
    createElement() {
        // Create container
        this.container = document.createElement('div');
        this.container.className = `textbox-group ${this.options.className}`;
        
        // Create label if provided
        if (this.options.label) {
            this.label = document.createElement('label');
            this.label.textContent = this.options.label;
            this.label.className = 'textbox-label';
            this.container.appendChild(this.label);
        }
        
        // Create input wrapper for the animated border effect
        this.inputWrapper = document.createElement('div');
        this.inputWrapper.className = 'textbox-input-wrapper';
        
        // Create input
        this.input = document.createElement('input');
        this.input.type = this.options.type;
        this.input.placeholder = this.options.placeholder;
        this.input.value = this.options.value;
        this.input.required = this.options.required;
        this.input.disabled = this.options.disabled;
        this.input.readOnly = this.options.readonly;
        this.input.className = 'textbox-input';
        
        // Set numeric attributes if applicable
        if (this.options.min !== null) this.input.min = this.options.min;
        if (this.options.max !== null) this.input.max = this.options.max;
        if (this.options.step !== null) this.input.step = this.options.step;
        if (this.options.pattern) this.input.pattern = this.options.pattern;
        
        // Create animated border
        this.inputBorder = document.createElement('span');
        this.inputBorder.className = 'textbox-input-border';
        
        this.inputWrapper.appendChild(this.input);
        this.inputWrapper.appendChild(this.inputBorder);
        this.container.appendChild(this.inputWrapper);
        
        // Create help text if provided
        if (this.options.helpText) {
            this.helpElement = document.createElement('small');
            this.helpElement.textContent = this.options.helpText;
            this.helpElement.className = 'textbox-help';
            this.container.appendChild(this.helpElement);
        }
        
        // Create error element (hidden by default)
        this.errorElement = document.createElement('small');
        this.errorElement.className = 'textbox-error hidden';
        this.container.appendChild(this.errorElement);
        
        // Link label to input
        if (this.label && !this.input.id) {
            const id = 'textbox_' + Math.random().toString(36).substr(2, 9);
            this.input.id = id;
            this.label.setAttribute('for', id);
        }
        
        return this.container;
    }
    
    bindEvents() {
        if (this.onChange) {
            this.input.addEventListener('change', (e) => this.onChange(e));
        }
        
        if (this.onInput) {
            this.input.addEventListener('input', (e) => this.onInput(e));
        }
        
        if (this.onFocus) {
            this.input.addEventListener('focus', (e) => this.onFocus(e));
        }
        
        if (this.onBlur) {
            this.input.addEventListener('blur', (e) => this.onBlur(e));
        }
    }
    
    // Public methods
    getValue() {
        return this.input.value;
    }
    
    setValue(value) {
        this.input.value = value;
        return this;
    }
    
    setPlaceholder(placeholder) {
        this.input.placeholder = placeholder;
        return this;
    }
    
    setLabel(label) {
        if (this.label) {
            this.label.textContent = label;
        } else if (label) {
            this.label = document.createElement('label');
            this.label.textContent = label;
            this.label.className = 'textbox-label';
            this.container.insertBefore(this.label, this.input);
        }
        return this;
    }
    
    setHelpText(text) {
        if (this.helpElement) {
            this.helpElement.textContent = text;
        } else if (text) {
            this.helpElement = document.createElement('small');
            this.helpElement.textContent = text;
            this.helpElement.className = 'textbox-help';
            this.container.appendChild(this.helpElement);
        }
        return this;
    }
    
    setDisabled(disabled) {
        this.input.disabled = disabled;
        this.container.classList.toggle('textbox-disabled', disabled);
        return this;
    }
    
    setRequired(required) {
        this.input.required = required;
        this.container.classList.toggle('textbox-required', required);
        return this;
    }
    
    showError(message) {
        this.errorElement.textContent = message;
        this.errorElement.classList.remove('hidden');
        this.container.classList.add('textbox-error-state');
        return this;
    }
    
    hideError() {
        this.errorElement.classList.add('hidden');
        this.container.classList.remove('textbox-error-state');
        return this;
    }
    
    validate() {
        const isValid = this.input.checkValidity();
        if (!isValid) {
            this.showError(this.input.validationMessage);
        } else {
            this.hideError();
        }
        return isValid;
    }
    
    focus() {
        this.input.focus();
        return this;
    }
    
    blur() {
        this.input.blur();
        return this;
    }
    
    // Get the DOM elements
    getContainer() {
        return this.container;
    }
    
    getInput() {
        return this.input;
    }
    
    // Destroy textbox
    destroy() {
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        this.container = null;
        this.label = null;
        this.inputWrapper = null;
        this.input = null;
        this.inputBorder = null;
        this.helpElement = null;
        this.errorElement = null;
    }
}

// Web Component for HTML usage
class DotboxTextboxElement extends HTMLElement {
    constructor() {
        super();
        this.textboxInstance = null;
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['label', 'placeholder', 'type', 'value', 'required', 'disabled', 'readonly', 'help-text', 'error-text'];
    }

    attributeChangedCallback() {
        if (this.textboxInstance) {
            this.render();
        }
    }

    render() {
        const label = this.getAttribute('label') || '';
        const placeholder = this.getAttribute('placeholder') || '';
        const type = this.getAttribute('type') || 'text';
        const value = this.getAttribute('value') || '';
        const required = this.hasAttribute('required');
        const disabled = this.hasAttribute('disabled');
        const readonly = this.hasAttribute('readonly');
        const helpText = this.getAttribute('help-text') || '';
        const errorText = this.getAttribute('error-text') || '';

        // Clean up previous instance
        if (this.textboxInstance) {
            this.innerHTML = '';
        }

        // Create new textbox instance
        this.textboxInstance = new TextBox({
            label: label,
            placeholder: placeholder,
            type: type,
            value: value,
            required: required,
            disabled: disabled,
            readonly: readonly,
            helpText: helpText,
            errorText: errorText,
            onChange: (e) => {
                // Update value attribute
                this.setAttribute('value', e.target.value);
                // Dispatch custom event
                this.dispatchEvent(new CustomEvent('dotbox-change', {
                    detail: { value: e.target.value },
                    bubbles: true
                }));
            },
            onInput: (e) => {
                this.dispatchEvent(new CustomEvent('dotbox-input', {
                    detail: { value: e.target.value },
                    bubbles: true
                }));
            },
            onFocus: (e) => {
                this.dispatchEvent(new CustomEvent('dotbox-focus', {
                    detail: { value: e.target.value },
                    bubbles: true
                }));
            },
            onBlur: (e) => {
                this.dispatchEvent(new CustomEvent('dotbox-blur', {
                    detail: { value: e.target.value },
                    bubbles: true
                }));
            }
        });

        // Clear content and append textbox
        this.innerHTML = '';
        this.appendChild(this.textboxInstance.getContainer());
    }

    // Expose textbox methods
    getValue() {
        return this.textboxInstance ? this.textboxInstance.getValue() : '';
    }

    setValue(value) {
        this.setAttribute('value', value);
        return this;
    }

    setDisabled(disabled) {
        if (disabled) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
        return this;
    }

    showError(message) {
        this.setAttribute('error-text', message);
        return this;
    }

    hideError() {
        this.removeAttribute('error-text');
        return this;
    }

    focus() {
        if (this.textboxInstance) {
            this.textboxInstance.focus();
        }
        return this;
    }
}

// Register custom element
if (typeof customElements !== 'undefined') {
    customElements.define('dotbox-textbox', DotboxTextboxElement);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TextBox;
} 