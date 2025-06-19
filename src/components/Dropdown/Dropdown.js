/**
 * Dropdown Component - Select dropdown with TextBox-like styling
 */
class Dropdown {
    constructor(options = {}) {
        this.options = {
            label: '',
            placeholder: 'Select an option...',
            allowNull: true, // Allow placeholder/null selection
            options: [], // Array of {value, label, disabled} objects
            value: '',
            disabled: false,
            required: false,
            helpText: '',
            error: false,
            success: false,
            size: 'medium', // small, medium, large
            onChange: null,
            onFocus: null,
            onBlur: null,
            ...options
        };
        
        this.container = null;
        this.selectElement = null;
        this.labelElement = null;
        this.helpTextElement = null;
        
        this.createElement();
        this.bindEvents();
    }
    
    createElement() {
        // Create container
        this.container = document.createElement('div');
        this.container.className = this.getContainerClasses();
        
        // Create label if provided
        if (this.options.label) {
            this.labelElement = document.createElement('label');
            this.labelElement.className = 'dropdown-label';
            this.labelElement.textContent = this.options.label;
            if (this.options.required) {
                this.labelElement.textContent += ' *';
            }
            this.container.appendChild(this.labelElement);
        }
        
        // Create wrapper for select and arrow
        const wrapper = document.createElement('div');
        wrapper.className = 'dropdown-wrapper';
        
        // Create select element
        this.selectElement = document.createElement('select');
        this.selectElement.className = 'dropdown-select';
        this.selectElement.disabled = this.options.disabled;
        
        if (this.options.required) {
            this.selectElement.required = true;
        }
        
        // Add placeholder option only if allowNull is true
        if (this.options.allowNull && this.options.placeholder) {
            const placeholderOption = document.createElement('option');
            placeholderOption.value = '';
            placeholderOption.textContent = this.options.placeholder;
            placeholderOption.disabled = true;
            placeholderOption.selected = !this.options.value;
            this.selectElement.appendChild(placeholderOption);
        }
        
        // Add options
        this.updateOptions();
        
        // Create arrow icon
        const arrow = document.createElement('span');
        arrow.className = 'dropdown-arrow';
        arrow.innerHTML = '▼';
        
        wrapper.appendChild(this.selectElement);
        wrapper.appendChild(arrow);
        this.container.appendChild(wrapper);
        
        // Create help text if provided
        if (this.options.helpText) {
            this.helpTextElement = document.createElement('div');
            this.helpTextElement.className = 'dropdown-help-text';
            this.helpTextElement.textContent = this.options.helpText;
            this.container.appendChild(this.helpTextElement);
        }
        
        return this.container;
    }
    
    getContainerClasses() {
        let classes = ['dropdown-container'];
        
        if (this.options.size !== 'medium') {
            classes.push(`dropdown-${this.options.size}`);
        }
        
        if (this.options.error) {
            classes.push('dropdown-error');
        } else if (this.options.success) {
            classes.push('dropdown-success');
        }
        
        return classes.join(' ');
    }
    
    updateOptions() {
        // Clear existing options (except placeholder)
        const placeholder = this.selectElement.querySelector('option[value=""]');
        this.selectElement.innerHTML = '';
        
        if (placeholder) {
            this.selectElement.appendChild(placeholder);
        }
        
        // Add new options
        this.options.options.forEach(optionData => {
            const option = document.createElement('option');
            option.value = optionData.value || optionData.label;
            option.textContent = optionData.label;
            option.disabled = optionData.disabled || false;
            
            if (this.options.value === option.value) {
                option.selected = true;
            }
            
            this.selectElement.appendChild(option);
        });
    }
    
    bindEvents() {
        if (this.selectElement) {
            this.selectElement.addEventListener('change', (e) => {
                this.options.value = e.target.value;
                if (this.options.onChange) {
                    this.options.onChange(e);
                }
            });
            
            this.selectElement.addEventListener('focus', (e) => {
                if (this.options.onFocus) {
                    this.options.onFocus(e);
                }
            });
            
            this.selectElement.addEventListener('blur', (e) => {
                if (this.options.onBlur) {
                    this.options.onBlur(e);
                }
            });
        }
    }
    
    // Public methods
    getValue() {
        return this.selectElement ? this.selectElement.value : this.options.value;
    }
    
    setValue(value) {
        this.options.value = value;
        if (this.selectElement) {
            this.selectElement.value = value;
        }
        return this;
    }
    
    setOptions(options) {
        this.options.options = options;
        if (this.selectElement) {
            this.updateOptions();
        }
        return this;
    }
    
    addOption(option) {
        this.options.options.push(option);
        if (this.selectElement) {
            this.updateOptions();
        }
        return this;
    }
    
    removeOption(value) {
        this.options.options = this.options.options.filter(opt => 
            (opt.value || opt.label) !== value
        );
        if (this.selectElement) {
            this.updateOptions();
        }
        return this;
    }
    
    setDisabled(disabled) {
        this.options.disabled = disabled;
        if (this.selectElement) {
            this.selectElement.disabled = disabled;
        }
        return this;
    }
    
    setError(error, helpText = null) {
        this.options.error = error;
        this.options.success = false;
        
        if (helpText !== null) {
            this.setHelpText(helpText);
        }
        
        if (this.container) {
            this.container.className = this.getContainerClasses();
        }
        return this;
    }
    
    setSuccess(success, helpText = null) {
        this.options.success = success;
        this.options.error = false;
        
        if (helpText !== null) {
            this.setHelpText(helpText);
        }
        
        if (this.container) {
            this.container.className = this.getContainerClasses();
        }
        return this;
    }
    
    setHelpText(helpText) {
        this.options.helpText = helpText;
        
        if (this.helpTextElement) {
            this.helpTextElement.textContent = helpText;
        } else if (helpText && this.container) {
            this.helpTextElement = document.createElement('div');
            this.helpTextElement.className = 'dropdown-help-text';
            this.helpTextElement.textContent = helpText;
            this.container.appendChild(this.helpTextElement);
        }
        return this;
    }
    
    focus() {
        if (this.selectElement) {
            this.selectElement.focus();
        }
        return this;
    }
    
    getElement() {
        return this.selectElement;
    }
    
    getContainer() {
        return this.container;
    }
    
    destroy() {
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        this.container = null;
        this.selectElement = null;
        this.labelElement = null;
        this.helpTextElement = null;
    }
}

// Web Component for HTML usage
class DotboxDropdownElement extends HTMLElement {
    constructor() {
        super();
        this.dropdownInstance = null;
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['label', 'placeholder', 'value', 'disabled', 'required', 'help-text', 'error', 'success', 'size', 'options', 'allow-null'];
    }

    attributeChangedCallback() {
        if (this.dropdownInstance) {
            this.render();
        }
    }

    render() {
        const label = this.getAttribute('label') || '';
        const placeholder = this.getAttribute('placeholder') || 'Select an option...';
        const allowNull = this.hasAttribute('allow-null') || !this.hasAttribute('allow-null'); // Default to true for backwards compatibility
        const value = this.getAttribute('value') || '';
        const disabled = this.hasAttribute('disabled');
        const required = this.hasAttribute('required');
        const helpText = this.getAttribute('help-text') || '';
        const error = this.hasAttribute('error');
        const success = this.hasAttribute('success');
        const size = this.getAttribute('size') || 'medium';
        
        // Parse options from attribute or child option elements
        let options = [];
        
        // Try to parse from options attribute first
        const optionsAttr = this.getAttribute('options');
        if (optionsAttr) {
            try {
                options = JSON.parse(optionsAttr);
            } catch (e) {
                console.warn('Invalid JSON in options attribute:', e);
            }
        }
        
        // If no options attribute, parse from child option elements
        if (options.length === 0) {
            const optionElements = this.querySelectorAll('option');
            options = Array.from(optionElements).map(opt => ({
                value: opt.value,
                label: opt.textContent,
                disabled: opt.disabled
            }));
        }

        // Clean up previous instance
        if (this.dropdownInstance) {
            this.innerHTML = '';
        }

        // Create new dropdown instance
        this.dropdownInstance = new Dropdown({
            label: label,
            placeholder: placeholder,
            allowNull: allowNull,
            options: options,
            value: value,
            disabled: disabled,
            required: required,
            helpText: helpText,
            error: error,
            success: success,
            size: size,
            onChange: (e) => {
                this.setAttribute('value', e.target.value);
                // Dispatch custom event
                this.dispatchEvent(new CustomEvent('dotbox-change', {
                    detail: { 
                        value: e.target.value,
                        selectedOption: options.find(opt => (opt.value || opt.label) === e.target.value)
                    },
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

        // Clear content and append dropdown
        this.innerHTML = '';
        this.appendChild(this.dropdownInstance.getContainer());
    }

    // Expose dropdown methods
    getValue() {
        return this.dropdownInstance ? this.dropdownInstance.getValue() : this.getAttribute('value') || '';
    }

    setValue(value) {
        this.setAttribute('value', value);
        return this;
    }

    setOptions(options) {
        this.setAttribute('options', JSON.stringify(options));
        return this;
    }

    addOption(option) {
        if (this.dropdownInstance) {
            this.dropdownInstance.addOption(option);
            // Update the options attribute
            const currentOptions = this.dropdownInstance.options.options;
            this.setAttribute('options', JSON.stringify(currentOptions));
        }
        return this;
    }

    removeOption(value) {
        if (this.dropdownInstance) {
            this.dropdownInstance.removeOption(value);
            // Update the options attribute
            const currentOptions = this.dropdownInstance.options.options;
            this.setAttribute('options', JSON.stringify(currentOptions));
        }
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

    setError(error, helpText = null) {
        if (error) {
            this.setAttribute('error', '');
            this.removeAttribute('success');
        } else {
            this.removeAttribute('error');
        }
        
        if (helpText !== null) {
            this.setAttribute('help-text', helpText);
        }
        return this;
    }

    setSuccess(success, helpText = null) {
        if (success) {
            this.setAttribute('success', '');
            this.removeAttribute('error');
        } else {
            this.removeAttribute('success');
        }
        
        if (helpText !== null) {
            this.setAttribute('help-text', helpText);
        }
        return this;
    }

    focus() {
        if (this.dropdownInstance) {
            this.dropdownInstance.focus();
        }
        return this;
    }
}

// Register custom element
if (typeof customElements !== 'undefined') {
    customElements.define('dotbox-dropdown', DotboxDropdownElement);
}

// Export for global and module usage
if (typeof window !== 'undefined') {
    window.Dotbox = window.Dotbox || {};
    window.Dotbox.Dropdown = Dropdown;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Dropdown;
}