/**
 * Enhanced CodeBlock Component with Preview, Toolbar, and JSFiddle integration
 */

// Import JSFiddle utility
const JSFiddle = require('./JSFiddle.js');

class CodeBlock {
    constructor(options = {}) {
        this.id = options.id || `codeblock-${Math.random().toString(36).substr(2, 9)}`;
        this.language = options.language || 'javascript';
        this.code = options.code || '';
        this.preview = options.preview !== false; // Enable preview by default
        this.expandable = options.expandable !== false;
        this.fiddle = options.fiddle !== false;
        this.previewType = options.previewType || 'auto'; // 'auto', 'html', 'javascript'
        this.title = options.title || '';
        this.expanded = false;
        this.originalHeight = '300px';
        this.expandedHeight = '450px';
        
        this.element = null;
        this.previewContainer = null;
        this.codeContainer = null;
        this.toolbar = null;
        this.jsfiddle = options.jsfiddle || new JSFiddle();
        
        this._loadPrism(() => {
            this.element = this._render();
            if (this.preview) {
                this._updatePreview();
            }
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
        const container = document.createElement('div');
        container.className = 'dotbox-codeblock-container';
        container.id = this.id;

        // Create preview pane if enabled
        if (this.preview) {
            this.previewContainer = this._createPreviewPane();
            container.appendChild(this.previewContainer);
        }

        // Create toolbar if needed (between preview and code)
        if (this.expandable || this.fiddle) {
            this.toolbar = this._createToolbar();
            container.appendChild(this.toolbar);
        }

        // Create code block
        this.codeContainer = this._createCodeBlock();
        container.appendChild(this.codeContainer);

        return container;
    }

    _createToolbar() {
        const toolbar = document.createElement('div');
        toolbar.className = 'dotbox-codeblock-toolbar';

        // Title if provided
        if (this.title) {
            const title = document.createElement('span');
            title.className = 'dotbox-codeblock-title';
            title.textContent = this.title;
            toolbar.appendChild(title);
        }

        // Spacer
        const spacer = document.createElement('div');
        spacer.className = 'dotbox-codeblock-spacer';
        toolbar.appendChild(spacer);

        // Expand button
        if (this.expandable) {
            const expandBtn = document.createElement('dotbox-button');
            expandBtn.setAttribute('variant', 'secondary');
            expandBtn.setAttribute('size', 'small');
            expandBtn.textContent = this.expanded ? '📉 Collapse' : '📈 Expand';
            expandBtn.addEventListener('click', () => this._toggleExpand());
            toolbar.appendChild(expandBtn);
            this.expandButton = expandBtn;
        }

        // JSFiddle button using Dotbox Button
        if (this.fiddle) {
            const fiddleBtn = document.createElement('dotbox-button');
            fiddleBtn.setAttribute('variant', 'secondary');
            fiddleBtn.setAttribute('size', 'small');
            fiddleBtn.textContent = '🚀 Try in JSFiddle';
            fiddleBtn.addEventListener('click', () => {
                this.jsfiddle.openInJSFiddle(this.code, {
                    language: this.language,
                    title: this.title || 'Code Demo'
                });
            });
            toolbar.appendChild(fiddleBtn);
        }

        return toolbar;
    }

    _createPreviewPane() {
        const container = document.createElement('div');
        container.className = 'dotbox-codeblock-preview';
        
        const header = document.createElement('div');
        header.className = 'dotbox-codeblock-preview-header';
        header.innerHTML = `
            <span class="dotbox-codeblock-preview-title">Preview</span>
            <button class="dotbox-codeblock-refresh-btn" onclick="this.parentNode.parentNode.querySelector('.dotbox-codeblock').dispatchEvent(new CustomEvent('refresh'))">🔄</button>
        `;
        
        const content = document.createElement('div');
        content.className = 'dotbox-codeblock-preview-content';
        content.id = `${this.id}-preview`;
        
        container.appendChild(header);
        container.appendChild(content);
        
        return container;
    }

    _createCodeBlock() {
        const container = document.createElement('div');
        container.className = 'dotbox-codeblock-wrapper';
        
        const pre = document.createElement('pre');
        pre.className = 'dotbox-codeblock';
        pre.style.height = this.originalHeight;
        
        const code = document.createElement('code');
        code.className = `language-${this.language}`;
        code.contentEditable = this.preview;
        code.textContent = this.code;
        
        // Add input listener for live preview
        if (this.preview) {
            code.addEventListener('input', () => {
                this.code = code.textContent;
                this._updatePreview();
            });
            
            // Add refresh event listener
            pre.addEventListener('refresh', () => {
                this._updatePreview();
            });
        }
        
        pre.appendChild(code);
        container.appendChild(pre);
        
        if (window.Prism) window.Prism.highlightElement(code);
        
        return container;
    }

    _getPreviewType() {
        if (this.previewType !== 'auto') {
            return this.previewType;
        }
        
        // Auto-detect based on language or code content
        if (this.language === 'html' || this.code.includes('<') || this.code.includes('dotbox-')) {
            return 'html';
        } else if (this.language === 'javascript' || this.code.includes('new ') || this.code.includes('Dotbox.')) {
            return 'javascript';
        }
        
        return 'html'; // Default to HTML
    }

    _updatePreview() {
        if (!this.previewContainer) return;
        
        const content = this.previewContainer.querySelector('.dotbox-codeblock-preview-content');
        const type = this._getPreviewType();
        
        try {
            if (type === 'html') {
                // HTML preview (includes Web Components)
                content.innerHTML = this.code;
            } else if (type === 'javascript') {
                // JavaScript preview
                content.innerHTML = '<div id="js-demo"></div>';
                
                // Wait a bit for DOM to update
                setTimeout(() => {
                    try {
                        // Execute JavaScript code
                        const func = new Function('container', `
                            const Dotbox = window.Dotbox;
                            ${this.code}
                        `);
                        func(content.querySelector('#js-demo'));
                    } catch (error) {
                        console.error('Preview execution error:', error);
                        content.innerHTML = `<div style="color: red; padding: 1rem;">Error: ${error.message}</div>`;
                    }
                }, 100);
            }
        } catch (error) {
            console.error('Preview error:', error);
            content.innerHTML = `<div style="color: red; padding: 1rem;">Preview Error: ${error.message}</div>`;
        }
    }

    _toggleExpand() {
        this.expanded = !this.expanded;
        const codeBlock = this.codeContainer.querySelector('.dotbox-codeblock');
        
        if (this.expanded) {
            codeBlock.style.height = this.expandedHeight;
            this.expandButton.textContent = '📉 Collapse';
        } else {
            codeBlock.style.height = this.originalHeight;
            this.expandButton.textContent = '📈 Expand';
        }
    }

    // Public methods
    setCode(code) {
        this.code = code;
        const codeElement = this.element.querySelector('code');
        if (codeElement) {
            codeElement.textContent = code;
            if (window.Prism) window.Prism.highlightElement(codeElement);
        }
        if (this.preview) {
            this._updatePreview();
        }
        return this;
    }

    setLanguage(language) {
        this.language = language;
        const codeElement = this.element.querySelector('code');
        if (codeElement) {
            codeElement.className = `language-${language}`;
            if (window.Prism) window.Prism.highlightElement(codeElement);
        }
        return this;
    }

    togglePreview() {
        if (this.previewContainer) {
            this.previewContainer.style.display = 
                this.previewContainer.style.display === 'none' ? 'block' : 'none';
        }
        return this;
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
        return ['language', 'code', 'preview', 'expandable', 'fiddle', 'preview-type', 'title'];
    }

    attributeChangedCallback() {
        if (this.codeBlockInstance) {
            this.render();
        }
    }

    render() {
        const language = this.getAttribute('language') || 'javascript';
        const code = this.getAttribute('code') || this.textContent.trim() || '';
        const preview = this.getAttribute('preview') !== 'false';
        const expandable = this.getAttribute('expandable') !== 'false';
        const fiddle = this.getAttribute('fiddle') !== 'false';
        const previewType = this.getAttribute('preview-type') || 'auto';
        const title = this.getAttribute('title') || '';

        // Clean up previous instance
        if (this.codeBlockInstance) {
            this.innerHTML = '';
        }

        // Create new codeblock instance
        this.codeBlockInstance = new CodeBlock({
            language: language,
            code: code,
            preview: preview,
            expandable: expandable,
            fiddle: fiddle,
            previewType: previewType,
            title: title
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

    togglePreview() {
        if (this.codeBlockInstance) {
            this.codeBlockInstance.togglePreview();
        }
        return this;
    }
}

// Register custom element
if (typeof customElements !== 'undefined') {
    customElements.define('dotbox-code-block', DotboxCodeBlockElement);
}

if (typeof window !== 'undefined') {
    window.Dotbox = window.Dotbox || {};
    window.Dotbox.CodeBlock = CodeBlock;
}

module.exports = CodeBlock;