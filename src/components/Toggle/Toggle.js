class Toggle {
  constructor(options = {}) {
    this.id = options.id || `toggle-${Math.random().toString(36).substr(2, 9)}`;
    this.label = options.label || '';
    this.checked = options.checked || false;
    this.disabled = options.disabled || false;
    this.size = options.size || 'medium'; // small, medium, large
    this.variant = options.variant || 'primary'; // primary, success, danger
    this.onChange = options.onChange || (() => {});
    this.name = options.name || '';
    this.value = options.value || '';
    
    this.element = this._render();
    this._bindEvents();
  }

  _render() {
    const container = document.createElement('div');
    container.className = `dotbox-toggle-container ${this.size ? `dotbox-toggle-${this.size}` : ''}`;
    
    const toggleElement = document.createElement('label');
    toggleElement.className = `dotbox-toggle ${this.variant ? `dotbox-toggle-${this.variant}` : ''}`;
    
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = this.id;
    input.checked = this.checked;
    input.disabled = this.disabled;
    if (this.name) input.name = this.name;
    if (this.value) input.value = this.value;
    
    const slider = document.createElement('div');
    slider.className = 'dotbox-toggle-slider';
    
    const circle = document.createElement('div');
    circle.className = 'dotbox-toggle-circle';
    
    // Cross icon (unchecked state)
    const crossIcon = document.createElement('div');
    crossIcon.className = 'dotbox-toggle-icon dotbox-toggle-cross';
    crossIcon.innerHTML = `
      <svg xml:space="preserve" viewBox="0 0 365.696 365.696" xmlns="http://www.w3.org/2000/svg">
        <path d="M243.188 182.86 356.32 69.726c12.5-12.5 12.5-32.766 0-45.247L341.238 9.398c-12.504-12.503-32.77-12.503-45.25 0L182.86 122.528 69.727 9.374c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.457c-12.5 12.504-12.5 32.77 0 45.25l113.152 113.152L9.398 295.99c-12.503 12.503-12.503 32.769 0 45.25L24.48 356.32c12.5 12.5 32.766 12.5 45.247 0l113.132-113.132L295.99 356.32c12.503 12.5 32.769 12.5 45.25 0l15.081-15.082c12.5-12.504 12.5-32.77 0-45.25zm0 0" fill="currentColor"/>
      </svg>
    `;
    
    // Checkmark icon (checked state)
    const checkIcon = document.createElement('div');
    checkIcon.className = 'dotbox-toggle-icon dotbox-toggle-checkmark';
    checkIcon.innerHTML = `
      <svg xml:space="preserve" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" fill="currentColor"/>
      </svg>
    `;
    
    circle.appendChild(crossIcon);
    circle.appendChild(checkIcon);
    slider.appendChild(circle);
    
    toggleElement.appendChild(input);
    toggleElement.appendChild(slider);
    
    if (this.label) {
      const labelText = document.createElement('span');
      labelText.className = 'dotbox-toggle-label-text';
      labelText.textContent = this.label;
      container.appendChild(labelText);
    }
    
    container.appendChild(toggleElement);
    
    return container;
  }

  _bindEvents() {
    const input = this.element.querySelector('input[type="checkbox"]');
    input.addEventListener('change', (e) => {
      this.checked = e.target.checked;
      this.onChange(e);
      
      // Dispatch custom event
      this.element.dispatchEvent(new CustomEvent('dotbox-change', {
        detail: { 
          checked: this.checked, 
          value: this.value,
          name: this.name 
        },
        bubbles: true
      }));
    });
  }

  // Public methods
  setChecked(checked) {
    this.checked = checked;
    const input = this.element.querySelector('input[type="checkbox"]');
    if (input) {
      input.checked = checked;
    }
    return this;
  }

  setDisabled(disabled) {
    this.disabled = disabled;
    const input = this.element.querySelector('input[type="checkbox"]');
    if (input) {
      input.disabled = disabled;
    }
    this.element.classList.toggle('dotbox-toggle-disabled', disabled);
    return this;
  }

  setVariant(variant) {
    // Remove old variant classes
    this.element.querySelector('.dotbox-toggle').className = 
      this.element.querySelector('.dotbox-toggle').className.replace(/dotbox-toggle-(primary|success|danger)/g, '');
    
    this.variant = variant;
    this.element.querySelector('.dotbox-toggle').classList.add(`dotbox-toggle-${variant}`);
    return this;
  }

  getElement() {
    return this.element;
  }

  getValue() {
    return {
      checked: this.checked,
      value: this.value,
      name: this.name
    };
  }
}

// Web Component for HTML usage
class DotboxToggleElement extends HTMLElement {
  constructor() {
    super();
    this.toggleInstance = null;
    this._isInternalUpdate = false;
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['checked', 'disabled', 'label', 'size', 'variant', 'name', 'value'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.toggleInstance && !this._isInternalUpdate) {
      if (name === 'checked') {
        this.toggleInstance.setChecked(this.hasAttribute('checked'));
      } else if (name === 'disabled') {
        this.toggleInstance.setDisabled(this.hasAttribute('disabled'));
      } else if (name === 'variant') {
        this.toggleInstance.setVariant(newValue || 'primary');
      } else {
        this.render();
      }
    }
  }

  render() {
    const label = this.getAttribute('label') || '';
    const checked = this.hasAttribute('checked');
    const disabled = this.hasAttribute('disabled');
    const size = this.getAttribute('size') || 'medium';
    const variant = this.getAttribute('variant') || 'primary';
    const name = this.getAttribute('name') || '';
    const value = this.getAttribute('value') || '';

    // Clean up previous instance
    if (this.toggleInstance) {
      this.innerHTML = '';
    }

    // Create new toggle instance
    this.toggleInstance = new Toggle({
      label: label,
      checked: checked,
      disabled: disabled,
      size: size,
      variant: variant,
      name: name,
      value: value,
      onChange: (e) => {
        this._isInternalUpdate = true;
        if (e.target.checked) {
          this.setAttribute('checked', '');
        } else {
          this.removeAttribute('checked');
        }
        this._isInternalUpdate = false;
        
        // Dispatch custom event
        this.dispatchEvent(new CustomEvent('dotbox-change', {
          detail: { 
            checked: e.target.checked, 
            value: value,
            name: name 
          },
          bubbles: true
        }));
      }
    });

    // Clear content and append toggle
    this.innerHTML = '';
    this.appendChild(this.toggleInstance.getElement());
  }

  // Expose toggle methods
  setChecked(checked) {
    if (checked) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
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

  setVariant(variant) {
    this.setAttribute('variant', variant);
    return this;
  }
}

// Register custom element
if (typeof customElements !== 'undefined') {
  customElements.define('dotbox-toggle', DotboxToggleElement);
}

if (typeof window !== 'undefined') {
  window.DotBox = window.DotBox || {};
  window.DotBox.Toggle = Toggle;
}

module.exports = Toggle;