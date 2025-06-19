class Menu {
  constructor(options = {}) {
    this.id = options.id || `menu-${Math.random().toString(36).substr(2, 9)}`;
    this.items = options.items || [];
    this.selected = options.selected || null;
    this.onSelect = options.onSelect || (() => {});
    this.bordered = options.bordered !== false; // Default to true
    this.routingMode = options.routingMode || false; // Enable hash-based routing
    
    this.element = this._render();
    
    // Set up routing if enabled
    if (this.routingMode) {
      this._setupRouting();
    }
  }

  _render() {
    const menu = document.createElement('nav');
    menu.className = `dotbox-menu ${this.bordered ? 'dotbox-menu-bordered' : 'dotbox-menu-borderless'}`;
    menu.id = this.id;
    this.items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'dotbox-menu-item' + (item.id === this.selected ? ' selected' : '');
      el.textContent = item.label;
      el.onclick = () => {
        this.select(item.id);
        if (this.routingMode) {
          window.location.hash = item.id;
        }
        this.onSelect(item.id);
      };
      menu.appendChild(el);
    });
    return menu;
  }

  select(id) {
    this.selected = id;
    Array.from(this.element.children).forEach((el, i) => {
      el.classList.toggle('selected', this.items[i].id === id);
    });
  }

  getElement() {
    return this.element;
  }

  _setupRouting() {
    // Listen for hash changes
    window.addEventListener('hashchange', () => {
      this._handleHashChange();
    });
    
    // Handle initial hash on load
    this._handleHashChange();
  }

  _handleHashChange() {
    const hash = window.location.hash.substring(1); // Remove #
    if (hash && this.items.find(item => item.id === hash)) {
      this.select(hash);
      this.onSelect(hash);
    }
  }
}

// Web Component for HTML usage
class DotboxMenuElement extends HTMLElement {
  constructor() {
    super();
    this.menuInstance = null;
    this.items = [];
    this._isInternalUpdate = false; // Flag to prevent infinite loops
  }

  connectedCallback() {
    this.parseItems();
    this.render();
  }

  static get observedAttributes() {
    return ['selected', 'bordered', 'items', 'data-items', 'routing-mode'];
  }

  attributeChangedCallback(name) {
    if (this.menuInstance && !this._isInternalUpdate) {
      if (name === 'items' || name === 'data-items') {
        this.parseItems();
        this.render();
      } else if (name === 'selected') {
        // Just update the selection, don't re-render the whole component
        const selected = this.getAttribute('selected');
        if (this.menuInstance && selected !== this.menuInstance.selected) {
          this.menuInstance.select(selected);
        }
      } else {
        this.render();
      }
    }
  }

  parseItems() {
    // Parse child elements as menu items
    const children = Array.from(this.children);
    this.items = children.map(child => {
      if (child.tagName.toLowerCase() === 'dotbox-menu-item') {
        return {
          id: child.getAttribute('id') || child.textContent.trim().toLowerCase().replace(/\s+/g, '-'),
          label: child.getAttribute('label') || child.textContent.trim()
        };
      }
      return null;
    }).filter(Boolean);

    // If no child items, try to parse from data attribute
    if (this.items.length === 0 && (this.hasAttribute('items') || this.hasAttribute('data-items'))) {
      try {
        const itemsAttr = this.getAttribute('items') || this.getAttribute('data-items');
        this.items = JSON.parse(itemsAttr);
      } catch (e) {
        console.warn('Invalid items JSON in dotbox-menu:', e);
      }
    }
  }

  render() {
    const selected = this.getAttribute('selected') || null;
    const bordered = this.getAttribute('bordered') !== 'false';
    const routingMode = this.hasAttribute('routing-mode');

    // Clean up previous instance
    if (this.menuInstance) {
      this.innerHTML = '';
    }

    // Create new menu instance
    this.menuInstance = new Menu({
      items: this.items,
      selected: selected,
      bordered: bordered,
      routingMode: routingMode,
      onSelect: (id) => {
        this._isInternalUpdate = true;
        this.setAttribute('selected', id);
        this._isInternalUpdate = false;
        // Dispatch custom event
        this.dispatchEvent(new CustomEvent('dotbox-select', {
          detail: { selectedId: id, items: this.items },
          bubbles: true
        }));
      }
    });

    // Clear content and append menu
    this.innerHTML = '';
    this.appendChild(this.menuInstance.getElement());
  }

  // Expose menu methods
  select(id) {
    this.setAttribute('selected', id);
    return this;
  }

  addItem(item) {
    this.items.push(item);
    this.render();
    return this;
  }

  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.render();
    return this;
  }
}

// Register custom element
if (typeof customElements !== 'undefined') {
  customElements.define('dotbox-menu', DotboxMenuElement);
}

if (typeof window !== 'undefined') {
  window.DotBox = window.DotBox || {};
  window.DotBox.Menu = Menu;
}

module.exports = Menu; 