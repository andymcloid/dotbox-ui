class Menu {
  constructor(options = {}) {
    this.id = options.id || `menu-${Math.random().toString(36).substr(2, 9)}`;
    this.items = options.items || [];
    this.selected = options.selected || null;
    this.onSelect = options.onSelect || (() => {});
    this.bordered = options.bordered !== false; // Default to true
    this.compact = options.compact || false; // Compact mode for tighter spacing
    this.routingMode = options.routingMode || false; // Enable hash-based routing
    this.collapsibleHeaders = options.collapsibleHeaders || false; // Enable collapsible headers
    this.headerArrowPosition = options.headerArrowPosition || 'right'; // Arrow position: 'left' or 'right'
    this.collapsedGroups = new Set(); // Track collapsed groups
    
    this.element = this._render();
    
    // Set up routing if enabled
    if (this.routingMode) {
      this._setupRouting();
    }
  }

  _render() {
    const menu = document.createElement('nav');
    let classes = ['dotbox-menu'];
    classes.push(this.bordered ? 'dotbox-menu-bordered' : 'dotbox-menu-borderless');
    if (this.compact) {
      classes.push('dotbox-menu-compact');
    }
    if (this.collapsibleHeaders) {
      classes.push('dotbox-menu-collapsible');
    }
    menu.className = classes.join(' ');
    menu.id = this.id;
    
    if (this.collapsibleHeaders) {
      this._renderWithHeaders(menu);
    } else {
      this._renderFlat(menu);
    }
    
    return menu;
  }
  
  _renderFlat(menu) {
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
  }
  
  _renderWithHeaders(menu) {
    // Group items by header
    const groups = {};
    this.items.forEach(item => {
      const group = item.group || 'default';
      if (!groups[group]) {
        groups[group] = {
          header: item.groupHeader || group,
          items: []
        };
      }
      groups[group].items.push(item);
    });
    
    // Render each group
    Object.keys(groups).forEach(groupKey => {
      const group = groups[groupKey];
      const isCollapsed = this.collapsedGroups.has(groupKey);
      
      // Create header element
      const headerEl = document.createElement('div');
      headerEl.className = 'dotbox-menu-header' + (isCollapsed ? ' collapsed' : '');
      
      // Create icon using Icon component or fallback
      let arrowIcon;
      if (typeof window !== 'undefined' && window.Dotbox && window.Dotbox.Icon) {
        const iconComponent = new window.Dotbox.Icon({
          name: isCollapsed ? 'arrow-right' : 'arrow-down',
          size: '12px'
        });
        arrowIcon = `<span class="dotbox-menu-header-icon">${iconComponent.getElement().outerHTML}</span>`;
      } else {
        // Fallback to SVG icons
        const chevronRight = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>';
        const chevronDown = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>';
        arrowIcon = `<span class="dotbox-menu-header-icon">${isCollapsed ? chevronRight : chevronDown}</span>`;
      }
      
      const headerText = `<span class="dotbox-menu-header-text">${group.header}</span>`;
      
      if (this.headerArrowPosition === 'left') {
        headerEl.innerHTML = `${arrowIcon}${headerText}`;
      } else {
        headerEl.innerHTML = `${headerText}${arrowIcon}`;
      }
      
      headerEl.classList.add(`dotbox-menu-header-arrow-${this.headerArrowPosition}`);
      headerEl.onclick = () => this._toggleGroup(groupKey);
      menu.appendChild(headerEl);
      
      // Create group container
      const groupEl = document.createElement('div');
      groupEl.className = 'dotbox-menu-group' + (isCollapsed ? ' collapsed' : '');
      groupEl.setAttribute('data-group', groupKey);
      
      // Add items to group
      group.items.forEach(item => {
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
        groupEl.appendChild(el);
      });
      
      menu.appendChild(groupEl);
    });
  }
  
  _toggleGroup(groupKey) {
    const isCollapsed = this.collapsedGroups.has(groupKey);
    
    if (isCollapsed) {
      this.collapsedGroups.delete(groupKey);
    } else {
      this.collapsedGroups.add(groupKey);
    }
    
    // Re-render the menu
    const newElement = this._render();
    this.element.parentNode.replaceChild(newElement, this.element);
    this.element = newElement;
  }

  select(id) {
    this.selected = id;
    
    if (this.collapsibleHeaders) {
      // For collapsible headers, find items within groups
      const allItems = this.element.querySelectorAll('.dotbox-menu-item');
      allItems.forEach(item => {
        // Find the corresponding data item by matching text content
        const itemText = item.textContent;
        const dataItem = this.items.find(dataItem => dataItem.label === itemText && dataItem.id === id);
        item.classList.toggle('selected', !!dataItem);
      });
    } else {
      // For flat structure, use the original logic
      Array.from(this.element.children).forEach((el, i) => {
        if (el.classList.contains('dotbox-menu-item')) {
          el.classList.toggle('selected', this.items[i].id === id);
        }
      });
    }
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
    return ['selected', 'bordered', 'compact', 'items', 'data-items', 'routing-mode', 'collapsible-headers', 'header-arrow-position'];
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
    const compact = this.hasAttribute('compact');
    const routingMode = this.hasAttribute('routing-mode');
    const collapsibleHeaders = this.hasAttribute('collapsible-headers');
    const headerArrowPosition = this.getAttribute('header-arrow-position') || 'right';

    // Clean up previous instance
    if (this.menuInstance) {
      this.innerHTML = '';
    }

    // Create new menu instance
    this.menuInstance = new Menu({
      items: this.items,
      selected: selected,
      bordered: bordered,
      compact: compact,
      routingMode: routingMode,
      collapsibleHeaders: collapsibleHeaders,
      headerArrowPosition: headerArrowPosition,
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
  
  toggleGroup(groupKey) {
    if (this.menuInstance && this.menuInstance.collapsibleHeaders) {
      this.menuInstance._toggleGroup(groupKey);
    }
    return this;
  }
  
  expandAllGroups() {
    if (this.menuInstance && this.menuInstance.collapsibleHeaders) {
      this.menuInstance.collapsedGroups.clear();
      this.render();
    }
    return this;
  }
  
  collapseAllGroups() {
    if (this.menuInstance && this.menuInstance.collapsibleHeaders) {
      const groups = new Set();
      this.items.forEach(item => {
        const group = item.group || 'default';
        groups.add(group);
      });
      this.menuInstance.collapsedGroups = groups;
      this.render();
    }
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