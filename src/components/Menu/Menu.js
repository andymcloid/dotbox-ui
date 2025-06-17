class Menu {
  constructor(options = {}) {
    this.id = options.id || `menu-${Math.random().toString(36).substr(2, 9)}`;
    this.items = options.items || [];
    this.selected = options.selected || null;
    this.onSelect = options.onSelect || (() => {});
    this._loadCSS();
    this.element = this._render();
  }

  _loadCSS() {
    if (!document.getElementById('dotbox-menu-css')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/components/Menu/Menu.css';
      link.id = 'dotbox-menu-css';
      document.head.appendChild(link);
    }
  }

  _render() {
    const menu = document.createElement('nav');
    menu.className = 'dotbox-menu';
    menu.id = this.id;
    this.items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'dotbox-menu-item' + (item.id === this.selected ? ' selected' : '');
      el.textContent = item.label;
      el.onclick = () => {
        this.select(item.id);
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
}

if (typeof window !== 'undefined') {
  window.DotBox = window.DotBox || {};
  window.DotBox.Menu = Menu;
}

module.exports = Menu; 