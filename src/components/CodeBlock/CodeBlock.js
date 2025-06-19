class CodeBlock {
  constructor(options = {}) {
    this.id = options.id || `codeblock-${Math.random().toString(36).substr(2, 9)}`;
    this.language = options.language || 'javascript';
    this.code = options.code || '';
    this._loadPrism(() => {
      this.element = this._render();
    });
  }

  _loadPrism(cb) {
    if (window.Prism) return cb();
    
    // Load Prism CSS
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css';
    document.head.appendChild(css);
    
    // Load Prism JS
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js';
    script.onload = cb;
    document.head.appendChild(script);
  }

  _render() {
    const pre = document.createElement('pre');
    pre.className = 'dotbox-codeblock';
    pre.id = this.id;
    const code = document.createElement('code');
    code.className = `language-${this.language}`;
    code.textContent = this.code;
    pre.appendChild(code);
    if (window.Prism) window.Prism.highlightElement(code);
    return pre;
  }

  getElement() {
    if (!this.element) this.element = this._render();
    return this.element;
  }
}

// Web Component for HTML usage
class DotboxCodeBlockElement extends HTMLElement {
  constructor() {
    super();
    this.codeBlockInstance = null;
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['language', 'code'];
  }

  attributeChangedCallback() {
    if (this.codeBlockInstance) {
      this.render();
    }
  }

  render() {
    const language = this.getAttribute('language') || 'javascript';
    const code = this.getAttribute('code') || this.textContent.trim() || '';

    // Clean up previous instance
    if (this.codeBlockInstance) {
      this.innerHTML = '';
    }

    // Create new codeblock instance
    this.codeBlockInstance = new CodeBlock({
      language: language,
      code: code
    });

    // Clear content and append codeblock
    this.innerHTML = '';
    this.appendChild(this.codeBlockInstance.getElement());
  }

  // Expose codeblock methods
  setCode(code) {
    this.setAttribute('code', code);
    return this;
  }

  setLanguage(language) {
    this.setAttribute('language', language);
    return this;
  }
}

// Register custom element
if (typeof customElements !== 'undefined') {
  customElements.define('dotbox-code-block', DotboxCodeBlockElement);
}

if (typeof window !== 'undefined') {
  window.DotBox = window.DotBox || {};
  window.DotBox.CodeBlock = CodeBlock;
}

module.exports = CodeBlock; 