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

if (typeof window !== 'undefined') {
  window.DotBox = window.DotBox || {};
  window.DotBox.CodeBlock = CodeBlock;
}

module.exports = CodeBlock; 