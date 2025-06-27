(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/components/Button/Button.js
  var require_Button = __commonJS({
    "src/components/Button/Button.js"(exports, module) {
      var Button = class {
        constructor(options = {}) {
          this.options = {
            text: "Button",
            type: "button",
            variant: "primary",
            // primary, secondary, danger, success
            size: "small",
            // small, medium, large
            disabled: false,
            loading: false,
            icon: null,
            width: null,
            // Custom width (e.g., '100px', '10em', '50%', etc.)
            animation: true,
            // Enable/disable hover animations
            className: "",
            ...options
          };
          this.element = null;
          this.onClick = options.onClick || null;
          this.createElement();
          this.bindEvents();
        }
        createElement() {
          this.element = document.createElement("button");
          this.element.type = this.options.type;
          this.element.disabled = this.options.disabled;
          this.updateClasses();
          this.updateContent();
          this.applyCustomStyles();
          return this.element;
        }
        updateClasses() {
          let classes = ["btn"];
          classes.push(`btn-${this.options.variant}`);
          classes.push(`btn-${this.options.size}`);
          if (this.options.loading) {
            classes.push("btn-loading");
          }
          if (!this.options.icon) {
            classes.push("btn-no-icon");
          } else if (!this.options.text || this.options.text.trim() === "") {
            classes.push("btn-icon-only");
          }
          if (!this.options.animation) {
            classes.push("btn-no-animation");
          }
          if (this.options.className) {
            classes.push(this.options.className);
          }
          this.element.className = classes.join(" ");
        }
        updateContent() {
          let content = "";
          const hasText = this.options.text && this.options.text.trim() !== "";
          if (this.options.loading) {
            if (this.options.icon && hasText) {
              content = `
                    <span class="btn-text">
                        <span class="btn-spinner">\u27F3</span> Loading...
                    </span>
                    <span class="btn-icon">
                        <span class="btn-divider"></span>
                        ${this.getIconHtml()}
                    </span>
                `;
            } else if (this.options.icon && !hasText) {
              content = `
                    <span class="btn-icon">
                        <span class="btn-spinner">\u27F3</span>
                    </span>
                `;
            } else {
              content = '<span class="btn-text"><span class="btn-spinner">\u27F3</span> Loading...</span>';
            }
          } else if (this.options.icon && hasText) {
            content = `
                <span class="btn-text">${this.options.text}</span>
                <span class="btn-icon">
                    <span class="btn-divider"></span>
                    ${this.getIconHtml()}
                </span>
            `;
          } else if (this.options.icon && !hasText) {
            content = `
                <span class="btn-icon">
                    ${this.getIconHtml()}
                </span>
            `;
          } else {
            content = `<span class="btn-text">${this.options.text}</span>`;
          }
          this.element.innerHTML = content;
        }
        applyCustomStyles() {
          if (this.options.width) {
            this.element.style.width = this.options.width;
          }
        }
        bindEvents() {
          if (this.onClick) {
            this.element.addEventListener("click", (e) => {
              if (!this.options.disabled && !this.options.loading) {
                this.onClick(e);
              }
            });
          }
        }
        getIconHtml() {
          if (!this.options.icon) return "";
          let iconType = "predefined";
          let iconProps = { name: this.options.icon, color: "currentColor" };
          if (/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(this.options.icon)) {
            iconType = "emoji";
            iconProps = { emoji: this.options.icon };
          } else if (this.options.icon.includes("<svg")) {
            iconType = "svg";
            iconProps = { svg: this.options.icon };
          } else if (this.options.icon.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i) || this.options.icon.startsWith("http")) {
            iconType = "image";
            iconProps = { src: this.options.icon, alt: "Icon" };
          }
          if (typeof Icon !== "undefined") {
            const icon = new Icon({
              type: iconType,
              size: "medium",
              ...iconProps
            });
            return icon.getElement().outerHTML;
          } else {
            const predefinedIcons = {
              "delete": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>',
              "close": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>',
              "check": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>',
              "plus": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>',
              "code": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z"/></svg>',
              "arrow-up": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M11 20H13V7.83L18.59 13.41L20 12L12 4L4 12L5.41 13.41L11 7.83V20Z"/></svg>',
              "arrow-down": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M11 4H13V16.17L18.59 10.59L20 12L12 20L4 12L5.41 10.59L11 16.17V4Z"/></svg>'
            };
            return predefinedIcons[this.options.icon] || this.options.icon;
          }
        }
        // Public methods
        setText(text) {
          this.options.text = text;
          this.updateContent();
          return this;
        }
        setIcon(icon) {
          this.options.icon = icon;
          this.updateClasses();
          this.updateContent();
          return this;
        }
        setWidth(width) {
          this.options.width = width;
          this.applyCustomStyles();
          return this;
        }
        setLoading(loading) {
          this.options.loading = loading;
          this.element.disabled = loading || this.options.disabled;
          this.updateClasses();
          this.updateContent();
          return this;
        }
        setDisabled(disabled) {
          this.options.disabled = disabled;
          this.element.disabled = disabled || this.options.loading;
          this.updateClasses();
          return this;
        }
        setVariant(variant) {
          this.options.variant = variant;
          this.updateClasses();
          return this;
        }
        // Get the DOM element
        getElement() {
          return this.element;
        }
        // Destroy button
        destroy() {
          if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
          }
          this.element = null;
        }
      };
      var DotboxButtonElement = class extends HTMLElement {
        constructor() {
          super();
          this.buttonInstance = null;
        }
        connectedCallback() {
          this.render();
        }
        static get observedAttributes() {
          return ["variant", "size", "disabled", "text", "icon", "loading", "width", "animation"];
        }
        attributeChangedCallback() {
          if (this.buttonInstance) {
            this.render();
          }
        }
        render() {
          const variant = this.getAttribute("variant") || "primary";
          const size = this.getAttribute("size") || "small";
          const disabled = this.hasAttribute("disabled");
          const loading = this.hasAttribute("loading");
          const icon = this.getAttribute("icon") || null;
          const width = this.getAttribute("width") || null;
          const animation = this.getAttribute("animation") !== "false";
          let text = this.getAttribute("text") || this.textContent.trim() || (icon ? "" : "Button");
          if (icon && text && /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(icon)) {
            text = text.replace(icon, "").trim();
          }
          if (this.buttonInstance) {
            this.innerHTML = "";
          }
          this.buttonInstance = new Button({
            text,
            variant,
            size,
            disabled,
            loading,
            icon,
            width,
            animation,
            onClick: () => {
              this.dispatchEvent(new CustomEvent("dotbox-click", {
                detail: { variant, size, text, disabled, loading, icon, width, animation },
                bubbles: true
              }));
            }
          });
          this.innerHTML = "";
          this.appendChild(this.buttonInstance.getElement());
          if (width) {
            this.style.width = width;
            this.style.display = "block";
          }
        }
        // Expose button methods
        setDisabled(disabled) {
          if (disabled) {
            this.setAttribute("disabled", "");
          } else {
            this.removeAttribute("disabled");
          }
          return this;
        }
        setText(text) {
          this.setAttribute("text", text);
          return this;
        }
        setVariant(variant) {
          this.setAttribute("variant", variant);
          return this;
        }
        setLoading(loading) {
          if (loading) {
            this.setAttribute("loading", "");
          } else {
            this.removeAttribute("loading");
          }
          return this;
        }
        setIcon(icon) {
          if (icon) {
            this.setAttribute("icon", icon);
          } else {
            this.removeAttribute("icon");
          }
          return this;
        }
        setWidth(width) {
          if (width) {
            this.setAttribute("width", width);
          } else {
            this.removeAttribute("width");
          }
          return this;
        }
      };
      if (typeof customElements !== "undefined") {
        customElements.define("dotbox-button", DotboxButtonElement);
      }
      if (typeof module !== "undefined" && module.exports) {
        module.exports = Button;
      }
    }
  });

  // src/components/Checkbox/Checkbox.js
  var require_Checkbox = __commonJS({
    "src/components/Checkbox/Checkbox.js"(exports, module) {
      var Checkbox = class {
        constructor(options = {}) {
          this.options = {
            label: "Checkbox",
            checked: false,
            disabled: false,
            size: "medium",
            // small, medium, large
            variant: "primary",
            // primary, success, danger
            name: "",
            value: "",
            id: "",
            className: "",
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
          this.element = document.createElement("div");
          this.element.className = this.getClasses();
          this.input = document.createElement("input");
          this.input.type = "checkbox";
          this.input.id = this.uniqueId;
          this.input.checked = this.options.checked;
          this.input.disabled = this.options.disabled;
          if (this.options.name) {
            this.input.name = this.options.name;
          }
          if (this.options.value) {
            this.input.value = this.options.value;
          }
          const label = document.createElement("label");
          label.htmlFor = this.uniqueId;
          label.className = "dotbox-checkbox-label";
          const checkboxBox = document.createElement("span");
          checkboxBox.className = "dotbox-checkbox-box";
          checkboxBox.innerHTML = `
            <svg viewBox="0 0 12 10" height="10px" width="12px">
                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
            </svg>
        `;
          const textSpan = document.createElement("span");
          textSpan.className = "dotbox-checkbox-text";
          textSpan.textContent = this.options.label;
          label.appendChild(checkboxBox);
          label.appendChild(textSpan);
          this.element.appendChild(this.input);
          this.element.appendChild(label);
          return this.element;
        }
        getClasses() {
          let classes = ["dotbox-checkbox-container"];
          classes.push(this.options.size);
          classes.push(this.options.variant);
          if (this.options.className) {
            classes.push(this.options.className);
          }
          return classes.join(" ");
        }
        bindEvents() {
          if (this.options.onChange) {
            this.input.addEventListener("change", (e) => {
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
          const textSpan = this.element.querySelector(".dotbox-checkbox-text");
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
      };
      var DotboxCheckboxElement = class extends HTMLElement {
        constructor() {
          super();
          this.checkboxInstance = null;
        }
        connectedCallback() {
          this.render();
        }
        static get observedAttributes() {
          return ["label", "checked", "disabled", "size", "variant", "name", "value"];
        }
        attributeChangedCallback() {
          if (this.checkboxInstance) {
            this.render();
          }
        }
        render() {
          const label = this.getAttribute("label") || this.textContent.trim() || "Checkbox";
          const checked = this.hasAttribute("checked");
          const disabled = this.hasAttribute("disabled");
          const size = this.getAttribute("size") || "medium";
          const variant = this.getAttribute("variant") || "primary";
          const name = this.getAttribute("name") || "";
          const value = this.getAttribute("value") || "";
          if (this.checkboxInstance) {
            this.innerHTML = "";
          }
          this.checkboxInstance = new Checkbox({
            label,
            checked,
            disabled,
            size,
            variant,
            name,
            value,
            onChange: (e) => {
              if (e.target.checked) {
                this.setAttribute("checked", "");
              } else {
                this.removeAttribute("checked");
              }
              this.dispatchEvent(new CustomEvent("dotbox-change", {
                detail: {
                  checked: e.target.checked,
                  value: e.target.value || value,
                  name
                },
                bubbles: true
              }));
            }
          });
          this.innerHTML = "";
          this.appendChild(this.checkboxInstance.getElement());
        }
        // Expose checkbox methods
        setChecked(checked) {
          if (checked) {
            this.setAttribute("checked", "");
          } else {
            this.removeAttribute("checked");
          }
          return this;
        }
        getChecked() {
          return this.checkboxInstance ? this.checkboxInstance.getChecked() : false;
        }
        setDisabled(disabled) {
          if (disabled) {
            this.setAttribute("disabled", "");
          } else {
            this.removeAttribute("disabled");
          }
          return this;
        }
        setLabel(label) {
          this.setAttribute("label", label);
          return this;
        }
        focus() {
          if (this.checkboxInstance) {
            this.checkboxInstance.focus();
          }
          return this;
        }
      };
      if (typeof customElements !== "undefined") {
        customElements.define("dotbox-checkbox", DotboxCheckboxElement);
      }
      if (typeof module !== "undefined" && module.exports) {
        module.exports = Checkbox;
      }
    }
  });

  // src/components/CodeBlock/JSFiddle.js
  var require_JSFiddle = __commonJS({
    "src/components/CodeBlock/JSFiddle.js"(exports, module) {
      var JSFiddle = class {
        constructor(options = {}) {
          this.prerender = options.prerender || null;
          this.defaultTitle = options.defaultTitle || "Code Demo";
          this.defaultDescription = options.defaultDescription || "Interactive code demo";
        }
        /**
         * Generate basic HTML content (just the code by default)
         * @param {string} code - The code to include
         * @param {object} options - Generation options
         */
        generateHTML(code, options = {}) {
          const { title = this.defaultTitle } = options;
          return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>
<body>
    ${code}
</body>
</html>`;
        }
        /**
         * Generate basic CSS content (empty by default)
         * @param {object} options - CSS generation options
         */
        generateCSS(options = {}) {
          const { additionalCSS = "" } = options;
          return `body {
    font-family: Arial, sans-serif;
    margin: 1rem;
    padding: 0;
}

${additionalCSS}`;
        }
        /**
         * Generate basic JavaScript content (empty by default)
         * @param {string} code - JavaScript code if needed
         * @param {object} options - JS generation options
         */
        generateJS(code = "", options = {}) {
          const { additionalJS = "" } = options;
          return `${code}

${additionalJS}`;
        }
        /**
         * Open code in JSFiddle
         * @param {string} code - The code to demonstrate
         * @param {object} options - JSFiddle options
         */
        openInJSFiddle(code, options = {}) {
          const {
            title = this.defaultTitle,
            description = this.defaultDescription,
            language = "html",
            // 'html', 'css', 'js'
            additionalCSS = "",
            additionalJS = "",
            resources = ""
          } = options;
          let htmlContent, cssContent, jsContent;
          if (this.prerender) {
            const prerendered = this.prerender(code, options);
            htmlContent = prerendered.html || this.generateHTML(code, options);
            cssContent = prerendered.css || this.generateCSS({ additionalCSS });
            jsContent = prerendered.js || this.generateJS(additionalJS, options);
          } else {
            if (language === "html") {
              htmlContent = this.generateHTML(code, options);
              cssContent = this.generateCSS({ additionalCSS });
              jsContent = this.generateJS(additionalJS, options);
            } else if (language === "css") {
              htmlContent = this.generateHTML("<div>CSS Demo</div>", options);
              cssContent = this.generateCSS({ additionalCSS: code + "\n" + additionalCSS });
              jsContent = this.generateJS(additionalJS, options);
            } else if (language === "js" || language === "javascript") {
              htmlContent = this.generateHTML('<div id="demo">JavaScript Demo</div>', options);
              cssContent = this.generateCSS({ additionalCSS });
              jsContent = this.generateJS(code + "\n" + additionalJS, options);
            } else {
              htmlContent = this.generateHTML(code, options);
              cssContent = this.generateCSS({ additionalCSS });
              jsContent = this.generateJS(additionalJS, options);
            }
          }
          this.submitToJSFiddle({
            title,
            description,
            html: htmlContent,
            css: cssContent,
            js: jsContent,
            resources
          });
        }
        /**
         * Submit data to JSFiddle API (generic implementation)
         * @param {object} data - JSFiddle submission data
         */
        submitToJSFiddle(data) {
          const { title, description, html, css, js, resources = "" } = data;
          const form = document.createElement("form");
          form.method = "POST";
          form.action = "https://jsfiddle.net/api/post/library/pure/";
          form.target = "_blank";
          form.style.display = "none";
          const fields = {
            title,
            description,
            html,
            css,
            js,
            wrap: "l"
            // No wrap
          };
          if (resources) {
            fields.resources = resources;
          }
          Object.entries(fields).forEach(([name, value]) => {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = name;
            input.value = value;
            form.appendChild(input);
          });
          document.body.appendChild(form);
          form.submit();
          document.body.removeChild(form);
          console.log("Opening JSFiddle with:", { title, description });
        }
        /**
         * Create JSFiddle button for CodeBlock toolbar
         * @param {string} code - The code to demonstrate
         * @param {object} options - Button options
         */
        createButton(code, options = {}) {
          const {
            text = "\u{1F680} Try in JSFiddle",
            variant = "secondary",
            size = "small",
            buttonClass = "jsfiddle-button",
            ...jsfiddleOptions
          } = options;
          const button = document.createElement("button");
          button.className = buttonClass;
          button.textContent = text;
          button.style.cssText = `
            padding: 0.5rem 1rem;
            border: 1px solid #ccc;
            background: #f8f9fa;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.875rem;
            transition: all 0.15s ease;
        `;
          button.addEventListener("mouseenter", () => {
            button.style.background = "#e9ecef";
            button.style.borderColor = "#007bff";
          });
          button.addEventListener("mouseleave", () => {
            button.style.background = "#f8f9fa";
            button.style.borderColor = "#ccc";
          });
          button.addEventListener("click", () => {
            this.openInJSFiddle(code, jsfiddleOptions);
          });
          return button;
        }
        /**
         * Set a custom prerender function
         * @param {Function} prerenderFunc - Function that takes (code, options) and returns {html, css, js}
         */
        setPrerender(prerenderFunc) {
          this.prerender = prerenderFunc;
          return this;
        }
      };
      if (typeof module !== "undefined" && module.exports) {
        module.exports = JSFiddle;
      }
      if (typeof window !== "undefined") {
        window.JSFiddle = JSFiddle;
      }
    }
  });

  // src/components/CodeBlock/CodeBlock.js
  var require_CodeBlock = __commonJS({
    "src/components/CodeBlock/CodeBlock.js"(exports, module) {
      var JSFiddle = require_JSFiddle();
      var CodeBlock = class {
        constructor(options = {}) {
          this.id = options.id || `codeblock-${Math.random().toString(36).substr(2, 9)}`;
          this.language = options.language || "javascript";
          this.code = options.code || "";
          this.preview = options.preview !== false;
          this.expandable = options.expandable !== false;
          this.fiddle = options.fiddle !== false;
          this.previewType = options.previewType || "auto";
          this.title = options.title || "";
          this.expanded = false;
          this.originalHeight = "300px";
          this.expandedHeight = "450px";
          this.element = null;
          this.previewContainer = null;
          this.codeContainer = null;
          this.toolbar = null;
          this.jsfiddle = options.jsfiddle || new JSFiddle();
          this._loadPrism(() => {
            this.element = this._render();
            if (this.preview) {
              this._schedulePreviewUpdate();
            }
          });
        }
        _schedulePreviewUpdate() {
          const checkAndUpdate = () => {
            if (typeof window.Dotbox !== "undefined" && window.customElements && document.readyState === "complete") {
              setTimeout(() => {
                this._updatePreview();
              }, 200);
            } else {
              setTimeout(checkAndUpdate, 100);
            }
          };
          checkAndUpdate();
        }
        _loadPrism(cb) {
          if (window.Prism) return cb();
          const css = document.createElement("link");
          css.rel = "stylesheet";
          css.href = "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css";
          document.head.appendChild(css);
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js";
          script.onload = cb;
          document.head.appendChild(script);
        }
        _render() {
          const container = document.createElement("div");
          container.className = "dotbox-codeblock-container";
          container.id = this.id;
          if (this.preview) {
            this.previewContainer = this._createPreviewPane();
            container.appendChild(this.previewContainer);
          }
          if (this.expandable || this.fiddle) {
            this.toolbar = this._createToolbar();
            container.appendChild(this.toolbar);
          }
          this.codeContainer = this._createCodeBlock();
          container.appendChild(this.codeContainer);
          return container;
        }
        _createToolbar() {
          const toolbar = document.createElement("div");
          toolbar.className = "dotbox-codeblock-toolbar";
          if (this.title) {
            const title = document.createElement("span");
            title.className = "dotbox-codeblock-title";
            title.textContent = this.title;
            toolbar.appendChild(title);
          }
          const spacer = document.createElement("div");
          spacer.className = "dotbox-codeblock-spacer";
          toolbar.appendChild(spacer);
          if (this.expandable) {
            const expandBtn = document.createElement("dotbox-button");
            expandBtn.setAttribute("variant", "primary");
            expandBtn.setAttribute("size", "small");
            expandBtn.setAttribute("width", "120px");
            expandBtn.setAttribute("animation", "false");
            expandBtn.setAttribute("icon", this.expanded ? "arrow-up" : "arrow-down");
            expandBtn.setAttribute("text", this.expanded ? "Collapse" : "Expand");
            expandBtn.addEventListener("click", () => this._toggleExpand());
            toolbar.appendChild(expandBtn);
            this.expandButton = expandBtn;
          }
          if (this.fiddle) {
            const fiddleBtn = document.createElement("dotbox-button");
            fiddleBtn.setAttribute("variant", "primary");
            fiddleBtn.setAttribute("size", "small");
            fiddleBtn.setAttribute("width", "120px");
            fiddleBtn.setAttribute("animation", "false");
            fiddleBtn.setAttribute("icon", "code");
            fiddleBtn.setAttribute("text", "JSFiddle");
            fiddleBtn.addEventListener("click", () => {
              this.jsfiddle.openInJSFiddle(this.code, {
                language: this.language,
                title: this.title || "Code Demo"
              });
            });
            toolbar.appendChild(fiddleBtn);
          }
          return toolbar;
        }
        _createPreviewPane() {
          const container = document.createElement("div");
          container.className = "dotbox-codeblock-preview";
          const header = document.createElement("div");
          header.className = "dotbox-codeblock-preview-header";
          header.innerHTML = `
            <span class="dotbox-codeblock-preview-title">Preview</span>
        `;
          const content = document.createElement("div");
          content.className = "dotbox-codeblock-preview-content";
          content.id = `${this.id}-preview`;
          content.innerHTML = '<div style="padding: 1rem; color: #666; text-align: center;">Loading preview...</div>';
          container.appendChild(header);
          container.appendChild(content);
          return container;
        }
        _createCodeBlock() {
          const container = document.createElement("div");
          container.className = "dotbox-codeblock-wrapper";
          const pre = document.createElement("pre");
          pre.className = "dotbox-codeblock";
          pre.style.height = this.originalHeight;
          const code = document.createElement("code");
          code.className = `language-${this.language}`;
          code.contentEditable = this.preview;
          code.textContent = this.code;
          if (this.preview) {
            code.addEventListener("input", () => {
              this.code = code.textContent;
              setTimeout(() => {
                this._updatePreview();
              }, 100);
            });
            pre.addEventListener("refresh", () => {
              this._updatePreview();
            });
          }
          pre.appendChild(code);
          container.appendChild(pre);
          if (window.Prism) window.Prism.highlightElement(code);
          return container;
        }
        _getPreviewType() {
          if (this.previewType !== "auto") {
            return this.previewType;
          }
          if (this.language === "html" || this.code.includes("<") || this.code.includes("dotbox-")) {
            return "html";
          } else if (this.language === "javascript" || this.code.includes("new ") || this.code.includes("Dotbox.")) {
            return "javascript";
          }
          return "html";
        }
        _updatePreview() {
          if (!this.previewContainer) return;
          const content = this.previewContainer.querySelector(".dotbox-codeblock-preview-content");
          const type = this._getPreviewType();
          try {
            if (type === "html") {
              content.innerHTML = this.code;
              setTimeout(() => {
                const customElements2 = content.querySelectorAll("*[is], [data-dotbox], dotbox-button, dotbox-checkbox, dotbox-textbox, dotbox-dropdown, dotbox-loader, dotbox-notification, dotbox-modal, dotbox-section, dotbox-tabs, dotbox-toggle, dotbox-menu, dotbox-form, dotbox-messagebox, dotbox-metric, dotbox-codeblock, dotbox-toolbutton, dotbox-icon");
                customElements2.forEach((el) => {
                  if (el.connectedCallback && typeof el.connectedCallback === "function") {
                    try {
                      el.connectedCallback();
                    } catch (e) {
                      console.debug("Element already initialized:", el.tagName);
                    }
                  }
                });
              }, 150);
            } else if (type === "javascript") {
              content.innerHTML = '<div id="js-demo"></div>';
              setTimeout(() => {
                try {
                  const func = new Function("container", `
                            const Dotbox = window.Dotbox;
                            ${this.code}
                        `);
                  func(content.querySelector("#js-demo"));
                } catch (error) {
                  console.error("Preview execution error:", error);
                  content.innerHTML = `<div style="color: red; padding: 1rem;">Error: ${error.message}</div>`;
                }
              }, 100);
            }
          } catch (error) {
            console.error("Preview error:", error);
            content.innerHTML = `<div style="color: red; padding: 1rem;">Preview Error: ${error.message}</div>`;
          }
        }
        _toggleExpand() {
          this.expanded = !this.expanded;
          const codeBlock = this.codeContainer.querySelector(".dotbox-codeblock");
          if (this.expanded) {
            codeBlock.style.height = this.expandedHeight;
            this.expandButton.setAttribute("icon", "arrow-up");
            this.expandButton.setAttribute("text", "Collapse");
          } else {
            codeBlock.style.height = this.originalHeight;
            this.expandButton.setAttribute("icon", "arrow-down");
            this.expandButton.setAttribute("text", "Expand");
          }
        }
        // Public methods
        setCode(code) {
          this.code = code;
          const codeElement = this.element.querySelector("code");
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
          const codeElement = this.element.querySelector("code");
          if (codeElement) {
            codeElement.className = `language-${language}`;
            if (window.Prism) window.Prism.highlightElement(codeElement);
          }
          return this;
        }
        togglePreview() {
          if (this.previewContainer) {
            this.previewContainer.style.display = this.previewContainer.style.display === "none" ? "block" : "none";
          }
          return this;
        }
        getElement() {
          if (!this.element) this.element = this._render();
          return this.element;
        }
      };
      var DotboxCodeBlockElement = class extends HTMLElement {
        constructor() {
          super();
          this.codeBlockInstance = null;
        }
        connectedCallback() {
          if (!this.hasAttribute("code") && !this._originalCode) {
            this._originalCode = this.textContent.trim();
          }
          this.render();
        }
        static get observedAttributes() {
          return ["language", "code", "preview", "expandable", "fiddle", "preview-type", "title"];
        }
        attributeChangedCallback() {
          if (this.codeBlockInstance) {
            this.render();
          }
        }
        render() {
          const language = this.getAttribute("language") || "javascript";
          const code = this.getAttribute("code") || this._originalCode || this.textContent.trim() || "";
          const preview = this.getAttribute("preview") !== "false";
          const expandable = this.getAttribute("expandable") !== "false";
          const fiddle = this.getAttribute("fiddle") !== "false";
          const previewType = this.getAttribute("preview-type") || "auto";
          const title = this.getAttribute("title") || "";
          if (this.codeBlockInstance) {
            this.innerHTML = "";
          }
          this.codeBlockInstance = new CodeBlock({
            language,
            code,
            preview,
            expandable,
            fiddle,
            previewType,
            title
          });
          this.innerHTML = "";
          this.appendChild(this.codeBlockInstance.getElement());
        }
        // Expose codeblock methods
        setCode(code) {
          this.setAttribute("code", code);
          return this;
        }
        setLanguage(language) {
          this.setAttribute("language", language);
          return this;
        }
        togglePreview() {
          if (this.codeBlockInstance) {
            this.codeBlockInstance.togglePreview();
          }
          return this;
        }
      };
      if (typeof customElements !== "undefined") {
        customElements.define("dotbox-code-block", DotboxCodeBlockElement);
      }
      if (typeof window !== "undefined") {
        window.Dotbox = window.Dotbox || {};
        window.Dotbox.CodeBlock = CodeBlock;
      }
      module.exports = CodeBlock;
    }
  });

  // src/components/Dropdown/Dropdown.js
  var require_Dropdown = __commonJS({
    "src/components/Dropdown/Dropdown.js"(exports, module) {
      var Dropdown = class {
        constructor(options = {}) {
          this.options = {
            label: "",
            placeholder: "Select an option...",
            allowNull: true,
            // Allow placeholder/null selection
            options: [],
            // Array of {value, label, disabled} objects
            value: "",
            disabled: false,
            required: false,
            helpText: "",
            error: false,
            success: false,
            size: "medium",
            // small, medium, large
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
          this.container = document.createElement("div");
          this.container.className = this.getContainerClasses();
          if (this.options.label) {
            this.labelElement = document.createElement("label");
            this.labelElement.className = "dropdown-label";
            this.labelElement.textContent = this.options.label;
            if (this.options.required) {
              this.labelElement.textContent += " *";
            }
            this.container.appendChild(this.labelElement);
          }
          const wrapper = document.createElement("div");
          wrapper.className = "dropdown-wrapper";
          this.selectElement = document.createElement("select");
          this.selectElement.className = "dropdown-select";
          this.selectElement.disabled = this.options.disabled;
          if (this.options.required) {
            this.selectElement.required = true;
          }
          if (this.options.allowNull && this.options.placeholder) {
            const placeholderOption = document.createElement("option");
            placeholderOption.value = "";
            placeholderOption.textContent = this.options.placeholder;
            placeholderOption.disabled = true;
            placeholderOption.selected = !this.options.value;
            this.selectElement.appendChild(placeholderOption);
          }
          this.updateOptions();
          const arrow = document.createElement("span");
          arrow.className = "dropdown-arrow";
          arrow.innerHTML = "\u25BC";
          wrapper.appendChild(this.selectElement);
          wrapper.appendChild(arrow);
          this.container.appendChild(wrapper);
          if (this.options.helpText) {
            this.helpTextElement = document.createElement("div");
            this.helpTextElement.className = "dropdown-help-text";
            this.helpTextElement.textContent = this.options.helpText;
            this.container.appendChild(this.helpTextElement);
          }
          return this.container;
        }
        getContainerClasses() {
          let classes = ["dropdown-container"];
          if (this.options.size !== "medium") {
            classes.push(`dropdown-${this.options.size}`);
          }
          if (this.options.error) {
            classes.push("dropdown-error");
          } else if (this.options.success) {
            classes.push("dropdown-success");
          }
          return classes.join(" ");
        }
        updateOptions() {
          const placeholder = this.selectElement.querySelector('option[value=""]');
          this.selectElement.innerHTML = "";
          if (placeholder) {
            this.selectElement.appendChild(placeholder);
          }
          this.options.options.forEach((optionData) => {
            const option = document.createElement("option");
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
            this.selectElement.addEventListener("change", (e) => {
              this.options.value = e.target.value;
              if (this.options.onChange) {
                this.options.onChange(e);
              }
            });
            this.selectElement.addEventListener("focus", (e) => {
              if (this.options.onFocus) {
                this.options.onFocus(e);
              }
            });
            this.selectElement.addEventListener("blur", (e) => {
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
          this.options.options = this.options.options.filter(
            (opt) => (opt.value || opt.label) !== value
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
            this.helpTextElement = document.createElement("div");
            this.helpTextElement.className = "dropdown-help-text";
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
      };
      var DotboxDropdownElement = class extends HTMLElement {
        constructor() {
          super();
          this.dropdownInstance = null;
        }
        connectedCallback() {
          this.render();
        }
        static get observedAttributes() {
          return ["label", "placeholder", "value", "disabled", "required", "help-text", "error", "success", "size", "options", "allow-null"];
        }
        attributeChangedCallback() {
          if (this.dropdownInstance) {
            this.render();
          }
        }
        render() {
          const label = this.getAttribute("label") || "";
          const placeholder = this.getAttribute("placeholder") || "Select an option...";
          const allowNull = this.hasAttribute("allow-null") || !this.hasAttribute("allow-null");
          const value = this.getAttribute("value") || "";
          const disabled = this.hasAttribute("disabled");
          const required = this.hasAttribute("required");
          const helpText = this.getAttribute("help-text") || "";
          const error = this.hasAttribute("error");
          const success = this.hasAttribute("success");
          const size = this.getAttribute("size") || "medium";
          let options = [];
          const optionsAttr = this.getAttribute("options");
          if (optionsAttr) {
            try {
              options = JSON.parse(optionsAttr);
            } catch (e) {
              console.warn("Invalid JSON in options attribute:", e);
            }
          }
          if (options.length === 0) {
            const optionElements = this.querySelectorAll("option");
            options = Array.from(optionElements).map((opt) => ({
              value: opt.value,
              label: opt.textContent,
              disabled: opt.disabled
            }));
          }
          if (this.dropdownInstance) {
            this.innerHTML = "";
          }
          this.dropdownInstance = new Dropdown({
            label,
            placeholder,
            allowNull,
            options,
            value,
            disabled,
            required,
            helpText,
            error,
            success,
            size,
            onChange: (e) => {
              this.setAttribute("value", e.target.value);
              this.dispatchEvent(new CustomEvent("dotbox-change", {
                detail: {
                  value: e.target.value,
                  selectedOption: options.find((opt) => (opt.value || opt.label) === e.target.value)
                },
                bubbles: true
              }));
            },
            onFocus: (e) => {
              this.dispatchEvent(new CustomEvent("dotbox-focus", {
                detail: { value: e.target.value },
                bubbles: true
              }));
            },
            onBlur: (e) => {
              this.dispatchEvent(new CustomEvent("dotbox-blur", {
                detail: { value: e.target.value },
                bubbles: true
              }));
            }
          });
          this.innerHTML = "";
          this.appendChild(this.dropdownInstance.getContainer());
        }
        // Expose dropdown methods
        getValue() {
          return this.dropdownInstance ? this.dropdownInstance.getValue() : this.getAttribute("value") || "";
        }
        setValue(value) {
          this.setAttribute("value", value);
          return this;
        }
        setOptions(options) {
          this.setAttribute("options", JSON.stringify(options));
          return this;
        }
        addOption(option) {
          if (this.dropdownInstance) {
            this.dropdownInstance.addOption(option);
            const currentOptions = this.dropdownInstance.options.options;
            this.setAttribute("options", JSON.stringify(currentOptions));
          }
          return this;
        }
        removeOption(value) {
          if (this.dropdownInstance) {
            this.dropdownInstance.removeOption(value);
            const currentOptions = this.dropdownInstance.options.options;
            this.setAttribute("options", JSON.stringify(currentOptions));
          }
          return this;
        }
        setDisabled(disabled) {
          if (disabled) {
            this.setAttribute("disabled", "");
          } else {
            this.removeAttribute("disabled");
          }
          return this;
        }
        setError(error, helpText = null) {
          if (error) {
            this.setAttribute("error", "");
            this.removeAttribute("success");
          } else {
            this.removeAttribute("error");
          }
          if (helpText !== null) {
            this.setAttribute("help-text", helpText);
          }
          return this;
        }
        setSuccess(success, helpText = null) {
          if (success) {
            this.setAttribute("success", "");
            this.removeAttribute("error");
          } else {
            this.removeAttribute("success");
          }
          if (helpText !== null) {
            this.setAttribute("help-text", helpText);
          }
          return this;
        }
        focus() {
          if (this.dropdownInstance) {
            this.dropdownInstance.focus();
          }
          return this;
        }
      };
      if (typeof customElements !== "undefined") {
        customElements.define("dotbox-dropdown", DotboxDropdownElement);
      }
      if (typeof window !== "undefined") {
        window.Dotbox = window.Dotbox || {};
        window.Dotbox.Dropdown = Dropdown;
      }
      if (typeof module !== "undefined" && module.exports) {
        module.exports = Dropdown;
      }
    }
  });

  // src/components/Form/Form.js
  var require_Form = __commonJS({
    "src/components/Form/Form.js"(exports, module) {
      var Form = class {
        constructor(options = {}) {
          this.options = {
            layout: "vertical",
            // vertical, horizontal, grid
            gap: "medium",
            // small, medium, large
            columns: 2,
            // for grid layout
            submitButton: null,
            cancelButton: null,
            className: "",
            onSubmit: null,
            onReset: null,
            ...options
          };
          this.element = null;
          this.formElement = null;
          this.fieldsContainer = null;
          this.buttonsContainer = null;
          this.uniqueId = this.options.id || `form-${Math.random().toString(36).substr(2, 9)}`;
          this.createElement();
          this.bindEvents();
        }
        createElement() {
          this.element = document.createElement("div");
          this.element.className = this.getClasses();
          this.element.id = this.uniqueId;
          this.formElement = document.createElement("form");
          this.formElement.className = "dotbox-form-element";
          this.fieldsContainer = document.createElement("div");
          this.fieldsContainer.className = "dotbox-form-fields";
          this.formElement.appendChild(this.fieldsContainer);
          this.buttonsContainer = document.createElement("div");
          this.buttonsContainer.className = "dotbox-form-buttons";
          this.formElement.appendChild(this.buttonsContainer);
          this.element.appendChild(this.formElement);
          if (this.options.submitButton) {
            this.addSubmitButton(this.options.submitButton);
          }
          if (this.options.cancelButton) {
            this.addCancelButton(this.options.cancelButton);
          }
          return this.element;
        }
        getClasses() {
          let classes = ["dotbox-form"];
          classes.push(`dotbox-form-${this.options.layout}`);
          classes.push(`dotbox-form-gap-${this.options.gap}`);
          if (this.options.layout === "grid") {
            classes.push(`dotbox-form-columns-${this.options.columns}`);
          }
          if (this.options.className) {
            classes.push(this.options.className);
          }
          return classes.join(" ");
        }
        bindEvents() {
          this.formElement.addEventListener("submit", (e) => {
            if (this.options.onSubmit) {
              e.preventDefault();
              const formData = this.getFormData();
              this.options.onSubmit(formData, e);
            }
          });
          this.formElement.addEventListener("reset", (e) => {
            if (this.options.onReset) {
              this.options.onReset(e);
            }
          });
        }
        // Public methods
        addField(element) {
          if (element instanceof HTMLElement) {
            this.fieldsContainer.appendChild(element);
          } else if (element && element.getElement) {
            this.fieldsContainer.appendChild(element.getElement());
          } else if (element && element.getContainer) {
            this.fieldsContainer.appendChild(element.getContainer());
          }
          return this;
        }
        addFields(elements) {
          elements.forEach((element) => this.addField(element));
          return this;
        }
        addSubmitButton(options = {}) {
          const buttonOptions = {
            text: "Submit",
            type: "submit",
            variant: "primary",
            ...options
          };
          const button = document.createElement("button");
          button.type = buttonOptions.type;
          button.className = `btn btn-${buttonOptions.variant}`;
          button.textContent = buttonOptions.text;
          if (buttonOptions.onClick) {
            button.addEventListener("click", buttonOptions.onClick);
          }
          this.buttonsContainer.appendChild(button);
          return button;
        }
        addCancelButton(options = {}) {
          const buttonOptions = {
            text: "Cancel",
            type: "button",
            variant: "secondary",
            ...options
          };
          const button = document.createElement("button");
          button.type = buttonOptions.type;
          button.className = `btn btn-${buttonOptions.variant}`;
          button.textContent = buttonOptions.text;
          if (buttonOptions.onClick) {
            button.addEventListener("click", buttonOptions.onClick);
          }
          this.buttonsContainer.appendChild(button);
          return button;
        }
        addButton(options = {}) {
          const buttonOptions = {
            text: "Button",
            type: "button",
            variant: "secondary",
            ...options
          };
          const button = document.createElement("button");
          button.type = buttonOptions.type;
          button.className = `btn btn-${buttonOptions.variant}`;
          button.textContent = buttonOptions.text;
          if (buttonOptions.onClick) {
            button.addEventListener("click", buttonOptions.onClick);
          }
          this.buttonsContainer.appendChild(button);
          return button;
        }
        setLayout(layout) {
          this.options.layout = layout;
          this.element.className = this.getClasses();
          return this;
        }
        setGap(gap) {
          this.options.gap = gap;
          this.element.className = this.getClasses();
          return this;
        }
        setColumns(columns) {
          this.options.columns = columns;
          this.element.className = this.getClasses();
          return this;
        }
        getFormData() {
          const formData = new FormData(this.formElement);
          const data = {};
          for (let [key, value] of formData.entries()) {
            if (data[key]) {
              if (Array.isArray(data[key])) {
                data[key].push(value);
              } else {
                data[key] = [data[key], value];
              }
            } else {
              data[key] = value;
            }
          }
          return data;
        }
        reset() {
          this.formElement.reset();
          return this;
        }
        // Get the DOM elements
        getElement() {
          return this.element;
        }
        getFormElement() {
          return this.formElement;
        }
        getFieldsContainer() {
          return this.fieldsContainer;
        }
        // Destroy form
        destroy() {
          if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
          }
          this.element = null;
          this.formElement = null;
          this.fieldsContainer = null;
          this.buttonsContainer = null;
        }
      };
      var DotboxFormElement = class extends HTMLElement {
        constructor() {
          super();
          this.formInstance = null;
        }
        connectedCallback() {
          this.render();
        }
        static get observedAttributes() {
          return ["layout", "gap", "columns"];
        }
        attributeChangedCallback() {
          if (this.formInstance) {
            this.render();
          }
        }
        render() {
          const layout = this.getAttribute("layout") || "vertical";
          const gap = this.getAttribute("gap") || "medium";
          const columns = parseInt(this.getAttribute("columns")) || 2;
          const content = this.innerHTML.trim();
          if (this.formInstance) {
            this.innerHTML = "";
          }
          this.formInstance = new Form({
            layout,
            gap,
            columns,
            onSubmit: (data, e) => {
              this.dispatchEvent(new CustomEvent("dotbox-submit", {
                detail: { data, originalEvent: e },
                bubbles: true
              }));
            },
            onReset: (e) => {
              this.dispatchEvent(new CustomEvent("dotbox-reset", {
                detail: { originalEvent: e },
                bubbles: true
              }));
            }
          });
          if (content) {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = content;
            Array.from(tempDiv.children).forEach((child) => {
              this.formInstance.addField(child);
            });
          }
          this.innerHTML = "";
          this.appendChild(this.formInstance.getElement());
        }
        // Expose form methods
        addField(element) {
          if (this.formInstance) {
            this.formInstance.addField(element);
          }
          return this;
        }
        setLayout(layout) {
          this.setAttribute("layout", layout);
          return this;
        }
        getFormData() {
          return this.formInstance ? this.formInstance.getFormData() : {};
        }
        reset() {
          if (this.formInstance) {
            this.formInstance.reset();
          }
          return this;
        }
      };
      if (typeof customElements !== "undefined") {
        customElements.define("dotbox-form", DotboxFormElement);
      }
      if (typeof module !== "undefined" && module.exports) {
        module.exports = Form;
      }
    }
  });

  // src/components/Icon/Icon.js
  var require_Icon = __commonJS({
    "src/components/Icon/Icon.js"(exports, module) {
      var Icon2 = class {
        constructor(options = {}) {
          this.options = {
            name: options.name || "info",
            size: options.size || "24px",
            color: options.color || "currentColor",
            className: options.className || "",
            title: options.title || "",
            type: this.detectType(options),
            svg: options.svg || "",
            image: options.image || ""
          };
          this.element = null;
          this.spriteLoaded = false;
          this.render();
        }
        detectType(options) {
          if (options.type) return options.type;
          if (options.svg) return "svg";
          if (options.image) return "image";
          if (options.name && this.isEmoji(options.name)) return "emoji";
          return "sprite";
        }
        isEmoji(str) {
          const emojiRegex = /^(\p{Emoji}|\u200D|\uFE0F)+$/u;
          return emojiRegex.test(str);
        }
        render() {
          this.element = document.createElement("span");
          this.element.className = this.getClasses();
          if (this.options.title) {
            this.element.setAttribute("title", this.options.title);
          }
          this.applyStyles();
          this.updateContent();
          return this.element;
        }
        getClasses() {
          const classes = ["dotbox-icon"];
          classes.push(`dotbox-icon-${this.options.type}`);
          classes.push(`dotbox-icon-${this.getSizeClass()}`);
          if (this.options.className) {
            classes.push(this.options.className);
          }
          return classes.join(" ");
        }
        getSizeClass() {
          const size = parseInt(this.options.size);
          if (size <= 16) return "small";
          if (size <= 24) return "medium";
          if (size <= 32) return "large";
          return "xlarge";
        }
        updateContent() {
          if (!this.element) return;
          let content = "";
          switch (this.options.type) {
            case "sprite":
              content = this.getSpriteIcon();
              break;
            case "svg":
              content = this.options.svg || "";
              break;
            case "emoji":
              content = `<span class="dotbox-icon-emoji">${this.options.name}</span>`;
              break;
            case "image":
              content = `<img src="${this.options.image}" alt="${this.options.title || this.options.name}" />`;
              break;
          }
          this.element.innerHTML = content;
        }
        getSpriteIcon() {
          this.ensureSpriteLoaded();
          return `<svg class="dotbox-icon-svg" width="${this.options.size}" height="${this.options.size}">
            <use xlink:href="/dist/icons.svg#icon-${this.options.name}"></use>
        </svg>`;
        }
        ensureSpriteLoaded() {
          if (this.spriteLoaded || typeof window === "undefined") return;
          if (document.querySelector("#dotbox-icon-sprite")) {
            this.spriteLoaded = true;
            return;
          }
          if (!window._dotboxSpriteLoading) {
            window._dotboxSpriteLoading = true;
            fetch("/dist/icons.svg").then((response) => response.text()).then((sprite) => {
              const div = document.createElement("div");
              div.id = "dotbox-icon-sprite";
              div.style.display = "none";
              div.innerHTML = sprite;
              document.body.insertBefore(div, document.body.firstChild);
              this.spriteLoaded = true;
              window._dotboxSpriteLoaded = true;
            }).catch((error) => {
              console.error("Failed to load icon sprite:", error);
              this.fallbackToInline();
            });
          } else if (window._dotboxSpriteLoaded) {
            this.spriteLoaded = true;
          }
        }
        fallbackToInline() {
          const fallbackIcons = {
            "delete": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>',
            "close": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>',
            "check": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>',
            "plus": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>',
            "minus": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M0 10h24v4h-24z"/></svg>',
            "arrow-left": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',
            "arrow-right": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M4 11h12.17l-5.59-5.59L12 4l8 8-8 8-1.41-1.41L16.17 13H4v-2z"/></svg>',
            "arrow-up": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M11 20H13V7.83L18.59 13.41L20 12L12 4L4 12L5.41 13.41L11 7.83V20Z"/></svg>',
            "arrow-down": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M11 4H13V16.17L18.59 10.59L20 12L12 20L4 12L5.41 10.59L11 16.17V4Z"/></svg>',
            "info": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,17H11V11H13M13,9H11V7H13"/></svg>',
            "code": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z"/></svg>'
          };
          if (fallbackIcons[this.options.name]) {
            this.options.type = "svg";
            this.options.svg = fallbackIcons[this.options.name];
            this.updateContent();
          }
        }
        applyStyles() {
          if (!this.element) return;
          this.element.style.width = this.options.size;
          this.element.style.height = this.options.size;
          this.element.style.display = "inline-flex";
          this.element.style.alignItems = "center";
          this.element.style.justifyContent = "center";
          if (this.options.type === "svg" || this.options.type === "sprite") {
            this.element.style.color = this.options.color;
            setTimeout(() => {
              const svg = this.element.querySelector("svg");
              if (svg) {
                svg.style.fill = this.options.color;
                if (this.options.color !== "currentColor") {
                  const paths = svg.querySelectorAll("path, circle, rect, polygon, polyline");
                  paths.forEach((path) => {
                    if (path.hasAttribute("fill") && path.getAttribute("fill") !== "none") {
                      path.setAttribute("fill", this.options.color);
                    }
                    if (path.hasAttribute("stroke") && path.getAttribute("stroke") !== "none") {
                      path.setAttribute("stroke", this.options.color);
                    }
                  });
                }
              }
            }, 10);
          }
        }
        // Public methods
        setIcon(name) {
          this.options.name = name;
          this.options.type = this.detectType({ name });
          this.updateContent();
          return this;
        }
        setSize(size) {
          this.options.size = size;
          this.applyStyles();
          this.updateContent();
          return this;
        }
        setColor(color) {
          this.options.color = color;
          this.applyStyles();
          return this;
        }
        getElement() {
          return this.element;
        }
      };
      var DotboxIconElement = class extends HTMLElement {
        constructor() {
          super();
          this.iconInstance = null;
        }
        connectedCallback() {
          this.render();
        }
        static get observedAttributes() {
          return ["name", "size", "color", "type", "svg", "image", "title"];
        }
        attributeChangedCallback() {
          if (this.iconInstance) {
            this.render();
          }
        }
        render() {
          const options = {
            name: this.getAttribute("name") || "info",
            size: this.getAttribute("size") || "24px",
            color: this.getAttribute("color") || "currentColor",
            type: this.getAttribute("type"),
            svg: this.innerHTML.trim() || this.getAttribute("svg"),
            image: this.getAttribute("image"),
            title: this.getAttribute("title") || ""
          };
          this.innerHTML = "";
          this.iconInstance = new Icon2(options);
          this.appendChild(this.iconInstance.getElement());
        }
      };
      if (typeof customElements !== "undefined") {
        customElements.define("dotbox-icon", DotboxIconElement);
      }
      if (typeof window !== "undefined") {
        window.Dotbox = window.Dotbox || {};
        window.Dotbox.Icon = Icon2;
      }
      module.exports = Icon2;
    }
  });

  // src/components/Loader/Loader.js
  var require_Loader = __commonJS({
    "src/components/Loader/Loader.js"(exports, module) {
      var Loader = class {
        constructor(options = {}) {
          this.options = {
            size: "medium",
            // small, medium, large
            variant: "primary",
            // primary, secondary, success, danger
            className: "",
            ...options
          };
          this.element = null;
          this.createElement();
        }
        createElement() {
          this.element = document.createElement("div");
          this.element.className = this.getClasses();
          this.element.innerHTML = `
            <svg width="64px" height="48px" viewBox="0 0 64 48">
                <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back"></polyline>
                <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front"></polyline>
            </svg>
        `;
          return this.element;
        }
        getClasses() {
          let classes = ["dotbox-loader"];
          classes.push(this.options.size);
          classes.push(this.options.variant);
          if (this.options.className) {
            classes.push(this.options.className);
          }
          return classes.join(" ");
        }
        // Public methods
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
        show() {
          if (this.element) {
            this.element.style.display = "inline-flex";
          }
          return this;
        }
        hide() {
          if (this.element) {
            this.element.style.display = "none";
          }
          return this;
        }
        // Get the DOM element
        getElement() {
          return this.element;
        }
        // Destroy loader
        destroy() {
          if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
          }
          this.element = null;
        }
      };
      var DotboxLoaderElement = class extends HTMLElement {
        constructor() {
          super();
          this.loaderInstance = null;
        }
        connectedCallback() {
          this.render();
        }
        static get observedAttributes() {
          return ["size", "variant"];
        }
        attributeChangedCallback() {
          if (this.loaderInstance) {
            this.render();
          }
        }
        render() {
          const size = this.getAttribute("size") || "medium";
          const variant = this.getAttribute("variant") || "primary";
          if (this.loaderInstance) {
            this.innerHTML = "";
          }
          this.loaderInstance = new Loader({
            size,
            variant
          });
          this.innerHTML = "";
          this.appendChild(this.loaderInstance.getElement());
        }
        // Expose loader methods
        setSize(size) {
          this.setAttribute("size", size);
          return this;
        }
        setVariant(variant) {
          this.setAttribute("variant", variant);
          return this;
        }
        show() {
          if (this.loaderInstance) {
            this.loaderInstance.show();
          }
          return this;
        }
        hide() {
          if (this.loaderInstance) {
            this.loaderInstance.hide();
          }
          return this;
        }
      };
      if (typeof customElements !== "undefined") {
        customElements.define("dotbox-loader", DotboxLoaderElement);
      }
      if (typeof module !== "undefined" && module.exports) {
        module.exports = Loader;
      }
    }
  });

  // src/components/Menu/Menu.js
  var require_Menu = __commonJS({
    "src/components/Menu/Menu.js"(exports, module) {
      var Menu = class {
        constructor(options = {}) {
          this.id = options.id || `menu-${Math.random().toString(36).substr(2, 9)}`;
          this.items = options.items || [];
          this.selected = options.selected || null;
          this.onSelect = options.onSelect || (() => {
          });
          this.bordered = options.bordered !== false;
          this.compact = options.compact || false;
          this.routingMode = options.routingMode || false;
          this.collapsibleHeaders = options.collapsibleHeaders || false;
          this.headerArrowPosition = options.headerArrowPosition || "right";
          this.collapsedGroups = /* @__PURE__ */ new Set();
          this.element = this._render();
          if (this.routingMode) {
            this._setupRouting();
          }
        }
        _render() {
          const menu = document.createElement("nav");
          let classes = ["dotbox-menu"];
          classes.push(this.bordered ? "dotbox-menu-bordered" : "dotbox-menu-borderless");
          if (this.compact) {
            classes.push("dotbox-menu-compact");
          }
          if (this.collapsibleHeaders) {
            classes.push("dotbox-menu-collapsible");
          }
          menu.className = classes.join(" ");
          menu.id = this.id;
          if (this.collapsibleHeaders) {
            this._renderWithHeaders(menu);
          } else {
            this._renderFlat(menu);
          }
          return menu;
        }
        _renderFlat(menu) {
          this.items.forEach((item) => {
            const el = document.createElement("div");
            el.className = "dotbox-menu-item" + (item.id === this.selected ? " selected" : "");
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
          const groups = {};
          this.items.forEach((item) => {
            const group = item.group || "default";
            if (!groups[group]) {
              groups[group] = {
                header: item.groupHeader || group,
                items: []
              };
            }
            groups[group].items.push(item);
          });
          Object.keys(groups).forEach((groupKey) => {
            const group = groups[groupKey];
            const isCollapsed = this.collapsedGroups.has(groupKey);
            const headerEl = document.createElement("div");
            headerEl.className = "dotbox-menu-header" + (isCollapsed ? " collapsed" : "");
            let arrowIcon;
            if (typeof window !== "undefined" && window.Dotbox && window.Dotbox.Icon) {
              const iconComponent = new window.Dotbox.Icon({
                name: isCollapsed ? "arrow-right" : "arrow-down",
                size: "12px"
              });
              arrowIcon = `<span class="dotbox-menu-header-icon">${iconComponent.getElement().outerHTML}</span>`;
            } else {
              const chevronRight = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>';
              const chevronDown = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>';
              arrowIcon = `<span class="dotbox-menu-header-icon">${isCollapsed ? chevronRight : chevronDown}</span>`;
            }
            const headerText = `<span class="dotbox-menu-header-text">${group.header}</span>`;
            if (this.headerArrowPosition === "left") {
              headerEl.innerHTML = `${arrowIcon}${headerText}`;
            } else {
              headerEl.innerHTML = `${headerText}${arrowIcon}`;
            }
            headerEl.classList.add(`dotbox-menu-header-arrow-${this.headerArrowPosition}`);
            headerEl.onclick = () => this._toggleGroup(groupKey);
            menu.appendChild(headerEl);
            const groupEl = document.createElement("div");
            groupEl.className = "dotbox-menu-group" + (isCollapsed ? " collapsed" : "");
            groupEl.setAttribute("data-group", groupKey);
            group.items.forEach((item) => {
              const el = document.createElement("div");
              el.className = "dotbox-menu-item" + (item.id === this.selected ? " selected" : "");
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
          const newElement = this._render();
          this.element.parentNode.replaceChild(newElement, this.element);
          this.element = newElement;
        }
        select(id) {
          this.selected = id;
          if (this.collapsibleHeaders) {
            const allItems = this.element.querySelectorAll(".dotbox-menu-item");
            allItems.forEach((item) => {
              const itemText = item.textContent;
              const dataItem = this.items.find((dataItem2) => dataItem2.label === itemText && dataItem2.id === id);
              item.classList.toggle("selected", !!dataItem);
            });
          } else {
            Array.from(this.element.children).forEach((el, i) => {
              if (el.classList.contains("dotbox-menu-item")) {
                el.classList.toggle("selected", this.items[i].id === id);
              }
            });
          }
        }
        getElement() {
          return this.element;
        }
        _setupRouting() {
          window.addEventListener("hashchange", () => {
            this._handleHashChange();
          });
          this._handleHashChange();
        }
        _handleHashChange() {
          const hash = window.location.hash.substring(1);
          if (hash && this.items.find((item) => item.id === hash)) {
            this.select(hash);
            this.onSelect(hash);
          }
        }
      };
      var DotboxMenuElement = class extends HTMLElement {
        constructor() {
          super();
          this.menuInstance = null;
          this.items = [];
          this._isInternalUpdate = false;
        }
        connectedCallback() {
          this.parseItems();
          this.render();
        }
        static get observedAttributes() {
          return ["selected", "bordered", "compact", "items", "data-items", "routing-mode", "collapsible-headers", "header-arrow-position"];
        }
        attributeChangedCallback(name) {
          if (this.menuInstance && !this._isInternalUpdate) {
            if (name === "items" || name === "data-items") {
              this.parseItems();
              this.render();
            } else if (name === "selected") {
              const selected = this.getAttribute("selected");
              if (this.menuInstance && selected !== this.menuInstance.selected) {
                this.menuInstance.select(selected);
              }
            } else {
              this.render();
            }
          }
        }
        parseItems() {
          const children = Array.from(this.children);
          this.items = children.map((child) => {
            if (child.tagName.toLowerCase() === "dotbox-menu-item") {
              return {
                id: child.getAttribute("id") || child.textContent.trim().toLowerCase().replace(/\s+/g, "-"),
                label: child.getAttribute("label") || child.textContent.trim()
              };
            }
            return null;
          }).filter(Boolean);
          if (this.items.length === 0 && (this.hasAttribute("items") || this.hasAttribute("data-items"))) {
            try {
              const itemsAttr = this.getAttribute("items") || this.getAttribute("data-items");
              this.items = JSON.parse(itemsAttr);
            } catch (e) {
              console.warn("Invalid items JSON in dotbox-menu:", e);
            }
          }
        }
        render() {
          const selected = this.getAttribute("selected") || null;
          const bordered = this.getAttribute("bordered") !== "false";
          const compact = this.hasAttribute("compact");
          const routingMode = this.hasAttribute("routing-mode");
          const collapsibleHeaders = this.hasAttribute("collapsible-headers");
          const headerArrowPosition = this.getAttribute("header-arrow-position") || "right";
          if (this.menuInstance) {
            this.innerHTML = "";
          }
          this.menuInstance = new Menu({
            items: this.items,
            selected,
            bordered,
            compact,
            routingMode,
            collapsibleHeaders,
            headerArrowPosition,
            onSelect: (id) => {
              this._isInternalUpdate = true;
              this.setAttribute("selected", id);
              this._isInternalUpdate = false;
              this.dispatchEvent(new CustomEvent("dotbox-select", {
                detail: { selectedId: id, items: this.items },
                bubbles: true
              }));
            }
          });
          this.innerHTML = "";
          this.appendChild(this.menuInstance.getElement());
        }
        // Expose menu methods
        select(id) {
          this.setAttribute("selected", id);
          return this;
        }
        addItem(item) {
          this.items.push(item);
          this.render();
          return this;
        }
        removeItem(id) {
          this.items = this.items.filter((item) => item.id !== id);
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
            const groups = /* @__PURE__ */ new Set();
            this.items.forEach((item) => {
              const group = item.group || "default";
              groups.add(group);
            });
            this.menuInstance.collapsedGroups = groups;
            this.render();
          }
          return this;
        }
      };
      if (typeof customElements !== "undefined") {
        customElements.define("dotbox-menu", DotboxMenuElement);
      }
      if (typeof window !== "undefined") {
        window.DotBox = window.DotBox || {};
        window.DotBox.Menu = Menu;
      }
      module.exports = Menu;
    }
  });

  // src/components/MessageBox/MessageBox.js
  var require_MessageBox = __commonJS({
    "src/components/MessageBox/MessageBox.js"(exports, module) {
      var MessageBox = class _MessageBox {
        constructor(options = {}) {
          this.options = {
            title: options.title || "Message",
            message: options.message || "This is a message",
            variant: options.variant || "primary",
            // success, danger, warning, info, primary
            closable: options.closable !== false,
            // true by default
            buttons: options.buttons || [],
            // Array of button configs
            onClose: options.onClose || null,
            maxWidth: options.maxWidth || "380px",
            ...options
          };
          this.element = null;
          this.isVisible = false;
          this.init();
        }
        init() {
          this.createElement();
          this.bindEvents();
        }
        createElement() {
          this.element = document.createElement("div");
          this.element.className = this.getClasses();
          this.element.style.maxWidth = this.options.maxWidth;
          const icon = this.getIcon();
          this.element.innerHTML = `
            ${this.options.closable ? `
                <button type="button" class="dotbox-messagebox-dismiss" aria-label="Close message">\xD7</button>
            ` : ""}
            <div class="dotbox-messagebox-header">
                <div class="dotbox-messagebox-icon">
                    ${icon}
                </div>
                <div class="dotbox-messagebox-content">
                    <span class="dotbox-messagebox-title">${this.options.title}</span>
                    <p class="dotbox-messagebox-message">${this.options.message}</p>
                </div>
            </div>
            ${this.options.buttons.length > 0 ? `
                <div class="dotbox-messagebox-actions">
                    ${this.renderButtons()}
                </div>
            ` : ""}
        `;
        }
        getClasses() {
          let classes = ["dotbox-messagebox"];
          classes.push(`dotbox-messagebox-${this.options.variant}`);
          return classes.join(" ");
        }
        getIcon() {
          const icons = {
            success: `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" d="M20 7L9.00004 18L3.99994 13"></path>
                </svg>
            `,
            danger: `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2.5" d="M18 6L6 18M6 6l12 12"></path>
                </svg>
            `,
            warning: `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            `,
            info: `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            `,
            primary: `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            `
          };
          return icons[this.options.variant] || icons.primary;
        }
        renderButtons() {
          return this.options.buttons.map((button, index) => {
            const variant = button.variant || "secondary";
            const text = button.text || "Button";
            const id = button.id || `btn-${index}`;
            return `<dotbox-button 
                variant="${variant}" 
                data-button-id="${id}"
                ${button.disabled ? "disabled" : ""}
                ${button.size ? `size="${button.size}"` : ""}
            >${text}</dotbox-button>`;
          }).join("");
        }
        bindEvents() {
          const closeBtn = this.element.querySelector(".dotbox-messagebox-dismiss");
          if (closeBtn) {
            closeBtn.addEventListener("click", () => this.close());
          }
          const actionButtons = this.element.querySelectorAll("[data-button-id]");
          actionButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
              const buttonId = e.target.getAttribute("data-button-id");
              const buttonConfig = this.options.buttons.find((b) => (b.id || `btn-${this.options.buttons.indexOf(b)}`) === buttonId);
              if (buttonConfig && buttonConfig.onClick) {
                buttonConfig.onClick(this, buttonConfig);
              }
              this.element.dispatchEvent(new CustomEvent("dotbox-messagebox-button", {
                detail: {
                  buttonId,
                  buttonConfig,
                  messageBox: this
                }
              }));
            });
          });
        }
        close() {
          if (this.options.onClose) {
            this.options.onClose(this);
          }
          this.element.dispatchEvent(new CustomEvent("dotbox-messagebox-close", {
            detail: { messageBox: this }
          }));
          if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
          }
          this.isVisible = false;
        }
        show() {
          this.isVisible = true;
          this.element.dispatchEvent(new CustomEvent("dotbox-messagebox-show", {
            detail: { messageBox: this }
          }));
        }
        hide() {
          this.element.style.display = "none";
          this.isVisible = false;
        }
        setTitle(title) {
          this.options.title = title;
          const titleElement = this.element.querySelector(".dotbox-messagebox-title");
          if (titleElement) {
            titleElement.textContent = title;
          }
          return this;
        }
        setMessage(message) {
          this.options.message = message;
          const messageElement = this.element.querySelector(".dotbox-messagebox-message");
          if (messageElement) {
            messageElement.textContent = message;
          }
          return this;
        }
        setVariant(variant) {
          this.element.classList.remove(`dotbox-messagebox-${this.options.variant}`);
          this.options.variant = variant;
          this.element.classList.add(`dotbox-messagebox-${variant}`);
          const iconElement = this.element.querySelector(".dotbox-messagebox-icon");
          if (iconElement) {
            iconElement.innerHTML = this.getIcon();
          }
          return this;
        }
        getElement() {
          return this.element;
        }
        // Static methods for common use cases
        static success(title, message, buttons = []) {
          return new _MessageBox({
            title,
            message,
            variant: "success",
            buttons
          });
        }
        static danger(title, message, buttons = []) {
          return new _MessageBox({
            title,
            message,
            variant: "danger",
            buttons
          });
        }
        static warning(title, message, buttons = []) {
          return new _MessageBox({
            title,
            message,
            variant: "warning",
            buttons
          });
        }
        static info(title, message, buttons = []) {
          return new _MessageBox({
            title,
            message,
            variant: "info",
            buttons
          });
        }
        static confirm(title, message, onConfirm, onCancel) {
          return new Promise((resolve, reject) => {
            const messageBox = new _MessageBox({
              title,
              message,
              variant: "primary",
              buttons: [
                {
                  id: "cancel",
                  text: "Cancel",
                  variant: "secondary",
                  onClick: (messageBox2) => {
                    if (onCancel) onCancel();
                    messageBox2.close();
                    resolve(false);
                  }
                },
                {
                  id: "confirm",
                  text: "Confirm",
                  variant: "primary",
                  onClick: (messageBox2) => {
                    if (onConfirm) onConfirm();
                    messageBox2.close();
                    resolve(true);
                  }
                }
              ]
            });
            document.body.appendChild(messageBox.getElement());
            messageBox.show();
          });
        }
        static error(title, message, buttons = []) {
          const defaultButtons = buttons.length > 0 ? buttons : [
            {
              id: "ok",
              text: "OK",
              variant: "danger",
              onClick: (messageBox2) => messageBox2.close()
            }
          ];
          const messageBox = new _MessageBox({
            title,
            message,
            variant: "danger",
            buttons: defaultButtons
          });
          document.body.appendChild(messageBox.getElement());
          messageBox.show();
          return messageBox;
        }
        static show(options = {}) {
          return new Promise((resolve, reject) => {
            if (!options.buttons || options.buttons.length === 0) {
              options.buttons = [
                {
                  id: "ok",
                  text: "OK",
                  variant: options.variant || "primary",
                  onClick: (messageBox2) => {
                    messageBox2.close();
                    resolve(true);
                  }
                }
              ];
            } else {
              options.buttons = options.buttons.map((button) => ({
                ...button,
                onClick: (messageBox2, buttonConfig) => {
                  if (button.onClick) {
                    button.onClick(messageBox2, buttonConfig);
                  }
                  messageBox2.close();
                  resolve(button.id || button.text);
                }
              }));
            }
            const messageBox = new _MessageBox(options);
            document.body.appendChild(messageBox.getElement());
            messageBox.show();
          });
        }
      };
      var DotboxMessageBox = class extends HTMLElement {
        constructor() {
          super();
          this.messageBox = null;
        }
        connectedCallback() {
          const buttonsData = this.getAttribute("buttons");
          let buttons = [];
          if (buttonsData) {
            try {
              buttons = JSON.parse(buttonsData);
            } catch (e) {
              console.warn("Invalid buttons JSON in dotbox-messagebox:", e);
            }
          }
          const options = {
            title: this.getAttribute("title") || "Message",
            message: this.getAttribute("message") || this.textContent || "This is a message",
            variant: this.getAttribute("variant") || "primary",
            closable: this.getAttribute("closable") !== "false",
            maxWidth: this.getAttribute("max-width") || "380px",
            buttons
          };
          this.messageBox = new MessageBox(options);
          this.appendChild(this.messageBox.getElement());
        }
        disconnectedCallback() {
          if (this.messageBox) {
          }
        }
        // Methods for programmatic control
        setTitle(title) {
          if (this.messageBox) {
            this.messageBox.setTitle(title);
          }
          return this;
        }
        setMessage(message) {
          if (this.messageBox) {
            this.messageBox.setMessage(message);
          }
          return this;
        }
        setVariant(variant) {
          if (this.messageBox) {
            this.messageBox.setVariant(variant);
          }
          return this;
        }
        close() {
          if (this.messageBox) {
            this.messageBox.close();
          }
        }
      };
      customElements.define("dotbox-messagebox", DotboxMessageBox);
      if (typeof module !== "undefined" && module.exports) {
        module.exports = MessageBox;
      }
    }
  });

  // src/components/MetricItem/MetricItem.js
  var require_MetricItem = __commonJS({
    "src/components/MetricItem/MetricItem.js"(exports, module) {
      var MetricItem = class {
        constructor(id, options = {}) {
          this.id = id;
          this.options = {
            label: "Metric",
            value: 0,
            unit: "",
            threshold: null,
            warningThreshold: null,
            container: null,
            trend: null,
            icon: null,
            ...options
          };
          this.element = null;
          this.initialize();
        }
        initialize() {
          this.createElement();
          this.render();
        }
        createElement() {
          this.element = document.createElement("div");
          this.element.className = "metric-item";
          this.element.id = this.id;
          if (this.options.container) {
            this.options.container.appendChild(this.element);
          }
        }
        render() {
          const iconHtml = this.options.icon ? `<div class="metric-item-icon">${this.options.icon}</div>` : "";
          const trendHtml = this.options.trend ? `<div class="metric-item-trend trend-${this.options.trend}"></div>` : "";
          this.element.innerHTML = `
            ${iconHtml}
            <div class="metric-item-content">
                <div class="metric-item-label">${this.options.label}</div>
                <div class="metric-item-value value">
                    ${this.options.value}
                    <span class="metric-item-unit">${this.options.unit}</span>
                    ${trendHtml}
                </div>
            </div>
        `;
          this.updateStatus();
        }
        updateValue(value) {
          this.options.value = value;
          const valueElement = this.element.querySelector(".metric-item-value");
          if (valueElement) {
            const trendHtml = this.options.trend ? `<div class="metric-item-trend trend-${this.options.trend}"></div>` : "";
            valueElement.innerHTML = `
                ${value}
                <span class="metric-item-unit">${this.options.unit}</span>
                ${trendHtml}
            `;
            valueElement.classList.add("value");
          }
          this.updateStatus();
        }
        updateStatus() {
          this.element.classList.remove("warning", "error", "success");
          const value = parseFloat(this.options.value);
          if (this.options.threshold && value >= this.options.threshold) {
            this.element.classList.add("error");
          } else if (this.options.warningThreshold && value >= this.options.warningThreshold) {
            this.element.classList.add("warning");
          } else {
            this.element.classList.add("success");
          }
        }
        show() {
          if (this.element) {
            this.element.style.display = "flex";
          }
        }
        hide() {
          if (this.element) {
            this.element.style.display = "none";
          }
        }
        destroy() {
          if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
          }
          this.element = null;
        }
        // Get the DOM element
        getElement() {
          return this.element;
        }
      };
      var DotboxMetricElement = class extends HTMLElement {
        constructor() {
          super();
          this.metricInstance = null;
        }
        connectedCallback() {
          this.render();
        }
        static get observedAttributes() {
          return ["label", "value", "unit", "trend", "icon", "threshold", "warning-threshold"];
        }
        attributeChangedCallback() {
          if (this.metricInstance) {
            this.render();
          }
        }
        render() {
          const id = this.getAttribute("id") || `metric-${Math.random().toString(36).substr(2, 9)}`;
          const label = this.getAttribute("label") || "Metric";
          const value = this.getAttribute("value") || "0";
          const unit = this.getAttribute("unit") || "";
          const trend = this.getAttribute("trend") || null;
          const icon = this.getAttribute("icon") || null;
          const threshold = this.getAttribute("threshold") ? parseFloat(this.getAttribute("threshold")) : null;
          const warningThreshold = this.getAttribute("warning-threshold") ? parseFloat(this.getAttribute("warning-threshold")) : null;
          if (this.metricInstance) {
            this.innerHTML = "";
          }
          this.metricInstance = new MetricItem(id, {
            label,
            value,
            unit,
            trend,
            icon,
            threshold,
            warningThreshold
          });
          this.innerHTML = "";
          this.appendChild(this.metricInstance.getElement());
        }
        // Expose metric methods
        updateValue(value) {
          this.setAttribute("value", value);
          return this;
        }
        setThreshold(threshold) {
          this.setAttribute("threshold", threshold);
          return this;
        }
        setTrend(trend) {
          this.setAttribute("trend", trend);
          return this;
        }
      };
      if (typeof customElements !== "undefined") {
        customElements.define("dotbox-metric", DotboxMetricElement);
      }
      if (typeof module !== "undefined" && module.exports) {
        module.exports = MetricItem;
      }
    }
  });

  // src/components/ModalDialog/ModalDialog.js
  var require_ModalDialog = __commonJS({
    "src/components/ModalDialog/ModalDialog.js"(exports, module) {
      var ModalDialog = class {
        constructor(id, options = {}) {
          this.id = id;
          this.options = {
            destroyOnClose: false,
            closeOnOverlayClick: true,
            closeOnEsc: true,
            ...options
          };
          this.isOpen = false;
          this.element = null;
          this.overlay = null;
          this.content = null;
          this.header = null;
          this.body = null;
          this.footer = null;
          this.onOpen = null;
          this.onClose = null;
          this.onDestroy = null;
          this.createModal();
          this.bindEvents();
        }
        createModal() {
          this.element = document.createElement("div");
          this.element.id = this.id;
          this.element.className = "modal";
          this.element.style.display = "none";
          this.overlay = document.createElement("div");
          this.overlay.className = "modal-overlay";
          this.element.appendChild(this.overlay);
          this.content = document.createElement("div");
          this.content.className = "modal-content";
          this.element.appendChild(this.content);
          this.header = document.createElement("div");
          this.header.className = "modal-header";
          this.content.appendChild(this.header);
          this.body = document.createElement("div");
          this.body.className = "modal-body";
          this.content.appendChild(this.body);
          this.footer = document.createElement("div");
          this.footer.className = "modal-footer";
          this.content.appendChild(this.footer);
          document.body.appendChild(this.element);
        }
        bindEvents() {
          if (this.options.closeOnOverlayClick) {
            this.overlay.addEventListener("click", () => this.close());
          }
          if (this.options.closeOnEsc) {
            document.addEventListener("keydown", (e) => {
              if (e.key === "Escape" && this.isOpen) {
                this.close();
              }
            });
          }
        }
        setTitle(title) {
          this.header.innerHTML = `
            <h3>${title}</h3>
            <button class="modal-close" onclick="this.closest('.modal').modalInstance.close()">\u2715</button>
        `;
          return this;
        }
        setBody(content) {
          if (typeof content === "string") {
            this.body.innerHTML = content;
          } else {
            this.body.innerHTML = "";
            this.body.appendChild(content);
          }
          return this;
        }
        setFooter(content) {
          if (typeof content === "string") {
            this.footer.innerHTML = content;
          } else {
            this.footer.innerHTML = "";
            this.footer.appendChild(content);
          }
          return this;
        }
        addFooterButton(text, className = "action-btn", onclick = null) {
          const button = document.createElement("button");
          button.textContent = text;
          button.className = className;
          if (onclick) {
            button.addEventListener("click", onclick);
          }
          this.footer.appendChild(button);
          return button;
        }
        show() {
          if (this.isOpen) return this;
          this.closeOtherModals();
          this.element.style.display = "flex";
          this.element.classList.add("show");
          this.isOpen = true;
          document.body.style.overflow = "hidden";
          this.element.modalInstance = this;
          if (this.onOpen) {
            this.onOpen();
          }
          const event = new CustomEvent("dialogShown", { bubbles: false });
          this.element.dispatchEvent(event);
          return this;
        }
        close() {
          if (!this.isOpen) return this;
          this.element.style.display = "none";
          this.element.classList.remove("show");
          this.isOpen = false;
          document.body.style.overflow = "auto";
          if (this.onClose) {
            this.onClose();
          }
          if (this.options.destroyOnClose) {
            this.destroy();
          }
          return this;
        }
        closeOtherModals() {
          document.querySelectorAll(".modal.show").forEach((modal) => {
            if (modal !== this.element && modal.modalInstance) {
              modal.modalInstance.close();
            }
          });
        }
        destroy() {
          if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
          }
          if (this.onDestroy) {
            this.onDestroy();
          }
          this.element = null;
          this.overlay = null;
          this.content = null;
          this.header = null;
          this.body = null;
          this.footer = null;
        }
        // Event handlers
        onOpenCallback(callback) {
          this.onOpen = callback;
          return this;
        }
        onCloseCallback(callback) {
          this.onClose = callback;
          return this;
        }
        onDestroyCallback(callback) {
          this.onDestroy = callback;
          return this;
        }
        setPadding(padding) {
          if (this.body) {
            this.body.style.padding = typeof padding === "number" ? `${padding}px` : padding;
          }
          return this;
        }
        /**
         * setBodyContainerMode(true) disables modal body padding and scrolling, for full-size child components (e.g. TabView)
         * setBodyContainerMode(false) restores default modal body padding and scrolling
         */
        setBodyContainerMode(isContainer = true) {
          if (!this.body) return this;
          if (isContainer) {
            this.body.style.padding = "0";
            this.body.style.maxHeight = "none";
          } else {
            this.body.style.padding = "";
            this.body.style.maxHeight = "";
          }
          return this;
        }
      };
      var DotboxModalDialogElement = class extends HTMLElement {
        constructor() {
          super();
          this.modalInstance = null;
          this.uniqueId = `modal-${Math.random().toString(36).substr(2, 9)}`;
        }
        connectedCallback() {
          this.style.display = "none";
          this.render();
        }
        static get observedAttributes() {
          return ["title", "destroy-on-close", "close-on-overlay-click", "close-on-esc", "show"];
        }
        attributeChangedCallback(name, oldValue, newValue) {
          if (this.modalInstance) {
            if (name === "show") {
              if (this.hasAttribute("show")) {
                this.modalInstance.show();
              } else {
                this.modalInstance.close();
              }
            } else {
              this.render();
            }
          }
        }
        render() {
          const title = this.getAttribute("title") || "";
          const destroyOnClose = this.hasAttribute("destroy-on-close");
          const closeOnOverlayClick = this.hasAttribute("close-on-overlay-click") || !this.hasAttribute("close-on-overlay-click");
          const closeOnEsc = this.hasAttribute("close-on-esc") || !this.hasAttribute("close-on-esc");
          if (this.modalInstance) {
            this.modalInstance.destroy();
          }
          this.modalInstance = new ModalDialog(this.uniqueId, {
            destroyOnClose,
            closeOnOverlayClick,
            closeOnEsc
          });
          this.modalInstance.onOpenCallback(() => {
            this.dispatchEvent(new CustomEvent("dotbox-open", {
              detail: { id: this.uniqueId },
              bubbles: true
            }));
          });
          this.modalInstance.onCloseCallback(() => {
            this.removeAttribute("show");
            this.dispatchEvent(new CustomEvent("dotbox-close", {
              detail: { id: this.uniqueId },
              bubbles: true
            }));
          });
          this.modalInstance.onDestroyCallback(() => {
            this.dispatchEvent(new CustomEvent("dotbox-destroy", {
              detail: { id: this.uniqueId },
              bubbles: true
            }));
          });
          if (title) {
            this.modalInstance.setTitle(title);
          }
          const bodyContent = this.innerHTML.trim();
          if (bodyContent) {
            this.modalInstance.setBody(bodyContent);
          }
          if (this.hasAttribute("show")) {
            this.modalInstance.show();
          }
        }
        // Expose modal methods
        show() {
          this.setAttribute("show", "");
          return this;
        }
        close() {
          this.removeAttribute("show");
          return this;
        }
        setTitle(title) {
          this.setAttribute("title", title);
          return this;
        }
        setBody(content) {
          if (this.modalInstance) {
            this.modalInstance.setBody(content);
          }
          return this;
        }
        setFooter(content) {
          if (this.modalInstance) {
            this.modalInstance.setFooter(content);
          }
          return this;
        }
        addFooterButton(text, className = "action-btn", onclick = null) {
          if (this.modalInstance) {
            return this.modalInstance.addFooterButton(text, className, onclick);
          }
          return null;
        }
        destroy() {
          if (this.modalInstance) {
            this.modalInstance.destroy();
            this.modalInstance = null;
          }
          return this;
        }
        setPadding(padding) {
          if (this.modalInstance) {
            this.modalInstance.setPadding(padding);
          }
          return this;
        }
        setBodyContainerMode(isContainer = true) {
          if (this.modalInstance) {
            this.modalInstance.setBodyContainerMode(isContainer);
          }
          return this;
        }
        disconnectedCallback() {
          if (this.modalInstance) {
            this.modalInstance.destroy();
            this.modalInstance = null;
          }
        }
      };
      if (typeof customElements !== "undefined") {
        customElements.define("dotbox-modal-dialog", DotboxModalDialogElement);
      }
      if (typeof module !== "undefined" && module.exports) {
        module.exports = ModalDialog;
      }
    }
  });

  // src/components/Notification/Notification.js
  var require_Notification = __commonJS({
    "src/components/Notification/Notification.js"(exports, module) {
      var Notification = class _Notification {
        constructor(options = {}) {
          this.options = {
            message: options.message || "Notification message",
            variant: options.variant || "success",
            // success, danger, warning, info
            mode: options.mode || "static",
            // static, popup
            position: options.position || "bottom-right",
            // bottom-right, bottom-left, top-right, top-left
            autoClose: options.autoClose !== false,
            // true by default
            timeout: options.timeout || 3e3,
            // 3 seconds default
            showCloseButton: options.showCloseButton !== void 0 ? options.showCloseButton : options.mode === "popup",
            // only true by default for popups
            icon: options.icon || null,
            // custom icon, will use default if null
            onClose: options.onClose || null,
            ...options
          };
          this.element = null;
          this.timeoutId = null;
          this.isVisible = false;
          this.init();
        }
        init() {
          this.createElement();
          this.bindEvents();
          if (this.options.mode === "popup") {
            this.showPopup();
          }
        }
        createElement() {
          this.element = document.createElement("div");
          this.element.className = this.getClasses();
          const icon = this.getIcon();
          this.element.innerHTML = `
            <div class="dotbox-notification-icon">
                ${icon}
            </div>
            <div class="dotbox-notification-content">
                <div class="dotbox-notification-message">${this.options.message}</div>
            </div>
            ${this.options.showCloseButton ? `
                <button class="dotbox-notification-close" type="button" aria-label="Close notification">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
            ` : ""}
        `;
          if (this.options.mode === "popup") {
            this.ensurePopupContainer();
            this.getPopupContainer().appendChild(this.element);
          }
        }
        getClasses() {
          let classes = ["dotbox-notification"];
          classes.push(`dotbox-notification-${this.options.variant}`);
          classes.push(`dotbox-notification-${this.options.mode}`);
          if (this.options.mode === "popup") {
            classes.push(`dotbox-notification-popup-${this.options.position}`);
          }
          return classes.join(" ");
        }
        getIcon() {
          if (this.options.icon) {
            return this.options.icon;
          }
          const icons = {
            success: `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `,
            danger: `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                </svg>
            `,
            warning: `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                </svg>
            `,
            info: `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                </svg>
            `
          };
          return icons[this.options.variant] || icons.info;
        }
        bindEvents() {
          const closeBtn = this.element.querySelector(".dotbox-notification-close");
          if (closeBtn) {
            closeBtn.addEventListener("click", () => this.close());
          }
          if (this.options.mode === "popup" && this.options.autoClose) {
            this.timeoutId = setTimeout(() => {
              this.close();
            }, this.options.timeout);
          }
          if (this.options.mode === "popup" && this.options.autoClose) {
            this.element.addEventListener("mouseenter", () => {
              if (this.timeoutId) {
                clearTimeout(this.timeoutId);
              }
            });
            this.element.addEventListener("mouseleave", () => {
              this.timeoutId = setTimeout(() => {
                this.close();
              }, this.options.timeout);
            });
          }
        }
        ensurePopupContainer() {
          const containerId = `dotbox-notifications-${this.options.position}`;
          let container = document.getElementById(containerId);
          if (!container) {
            container = document.createElement("div");
            container.id = containerId;
            container.className = `dotbox-notifications-container dotbox-notifications-${this.options.position}`;
            document.body.appendChild(container);
          }
          return container;
        }
        getPopupContainer() {
          return document.getElementById(`dotbox-notifications-${this.options.position}`);
        }
        showPopup() {
          this.isVisible = true;
          setTimeout(() => {
            this.element.classList.add("dotbox-notification-show");
          }, 10);
        }
        close() {
          if (this.timeoutId) {
            clearTimeout(this.timeoutId);
          }
          if (this.options.mode === "popup") {
            this.element.classList.add("dotbox-notification-hide");
            setTimeout(() => {
              this.destroy();
            }, 300);
          } else {
            this.destroy();
          }
          if (this.options.onClose) {
            this.options.onClose(this);
          }
          this.element.dispatchEvent(new CustomEvent("dotbox-notification-close", {
            detail: { notification: this }
          }));
        }
        destroy() {
          if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
          }
          this.isVisible = false;
          if (this.options.mode === "popup") {
            const container = this.getPopupContainer();
            if (container && container.children.length === 0) {
              container.parentNode.removeChild(container);
            }
          }
        }
        getElement() {
          return this.element;
        }
        // Static method to create popup notifications easily
        static show(message, variant = "success", options = {}) {
          return new _Notification({
            message,
            variant,
            mode: "popup",
            ...options
          });
        }
        // Static method to create success notifications
        static success(message, options = {}) {
          return _Notification.show(message, "success", options);
        }
        // Static method to create danger notifications
        static danger(message, options = {}) {
          return _Notification.show(message, "danger", options);
        }
        // Static method to create warning notifications
        static warning(message, options = {}) {
          return _Notification.show(message, "warning", options);
        }
        // Static method to create info notifications
        static info(message, options = {}) {
          return _Notification.show(message, "info", options);
        }
      };
      var DotboxNotification = class extends HTMLElement {
        constructor() {
          super();
          this.notification = null;
        }
        connectedCallback() {
          const mode = this.getAttribute("mode") || "static";
          const options = {
            message: this.getAttribute("message") || this.textContent || "Notification",
            variant: this.getAttribute("variant") || "success",
            mode,
            position: this.getAttribute("position") || "bottom-right",
            autoClose: this.getAttribute("auto-close") !== "false",
            timeout: parseInt(this.getAttribute("timeout")) || 3e3,
            showCloseButton: this.getAttribute("show-close-button") !== null ? this.getAttribute("show-close-button") !== "false" : mode === "popup",
            icon: this.getAttribute("icon") || null
          };
          this.notification = new Notification(options);
          if (options.mode === "static") {
            this.appendChild(this.notification.getElement());
          }
        }
        disconnectedCallback() {
          if (this.notification) {
            this.notification.destroy();
          }
        }
      };
      customElements.define("dotbox-notification", DotboxNotification);
      if (typeof module !== "undefined" && module.exports) {
        module.exports = Notification;
      }
    }
  });

  // src/components/Section/Section.js
  var require_Section = __commonJS({
    "src/components/Section/Section.js"(exports, module) {
      var Section = class {
        constructor(options = {}) {
          this.options = {
            title: "",
            className: "",
            id: "",
            ...options
          };
          this.element = null;
          this.titleElement = null;
          this.contentElement = null;
          this.uniqueId = this.options.id || `section-${Math.random().toString(36).substr(2, 9)}`;
          this.createElement();
        }
        createElement() {
          this.element = document.createElement("section");
          this.element.className = this.getClasses();
          this.element.id = this.uniqueId;
          if (this.options.title) {
            this.titleElement = document.createElement("h2");
            this.titleElement.className = "dotbox-section-title";
            this.titleElement.textContent = this.options.title;
            this.element.appendChild(this.titleElement);
          }
          this.contentElement = document.createElement("div");
          this.contentElement.className = "dotbox-section-content";
          this.element.appendChild(this.contentElement);
          return this.element;
        }
        getClasses() {
          let classes = ["dotbox-section"];
          if (this.options.className) {
            classes.push(this.options.className);
          }
          return classes.join(" ");
        }
        // Public methods
        setTitle(title) {
          this.options.title = title;
          if (title && !this.titleElement) {
            this.titleElement = document.createElement("h2");
            this.titleElement.className = "dotbox-section-title";
            this.titleElement.textContent = title;
            this.element.insertBefore(this.titleElement, this.contentElement);
          } else if (title && this.titleElement) {
            this.titleElement.textContent = title;
          } else if (!title && this.titleElement) {
            this.element.removeChild(this.titleElement);
            this.titleElement = null;
          }
          return this;
        }
        setContent(content) {
          if (typeof content === "string") {
            this.contentElement.innerHTML = content;
          } else if (content instanceof HTMLElement) {
            this.contentElement.innerHTML = "";
            this.contentElement.appendChild(content);
          }
          return this;
        }
        appendChild(element) {
          this.contentElement.appendChild(element);
          return this;
        }
        // Get the DOM elements
        getElement() {
          return this.element;
        }
        getContentElement() {
          return this.contentElement;
        }
        // Destroy section
        destroy() {
          if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
          }
          this.element = null;
          this.titleElement = null;
          this.contentElement = null;
        }
      };
      var DotboxSectionElement = class extends HTMLElement {
        constructor() {
          super();
          this.sectionInstance = null;
        }
        connectedCallback() {
          this.render();
        }
        static get observedAttributes() {
          return ["title"];
        }
        attributeChangedCallback() {
          if (this.sectionInstance) {
            this.render();
          }
        }
        render() {
          const title = this.getAttribute("title") || "";
          const content = this.innerHTML.trim();
          if (this.sectionInstance) {
            const currentContent = this.sectionInstance.getContentElement().innerHTML;
            this.innerHTML = "";
          }
          this.sectionInstance = new Section({
            title
          });
          if (content) {
            this.sectionInstance.setContent(content);
          }
          this.innerHTML = "";
          this.appendChild(this.sectionInstance.getElement());
        }
        // Expose section methods
        setTitle(title) {
          this.setAttribute("title", title);
          return this;
        }
        setContent(content) {
          if (this.sectionInstance) {
            this.sectionInstance.setContent(content);
          }
          return this;
        }
        appendContent(element) {
          if (this.sectionInstance) {
            this.sectionInstance.appendChild(element);
          }
          return this;
        }
      };
      if (typeof customElements !== "undefined") {
        customElements.define("dotbox-section", DotboxSectionElement);
      }
      if (typeof module !== "undefined" && module.exports) {
        module.exports = Section;
      }
    }
  });

  // src/components/TabView/TabView.js
  var require_TabView = __commonJS({
    "src/components/TabView/TabView.js"(exports, module) {
      var TabView = class {
        constructor(options = {}) {
          this.tabs = options.tabs || [];
          this.options = { ...options };
          this.activeTab = this.tabs[0]?.id || null;
          this.container = null;
          this.tabNav = null;
          this.tabContent = null;
          this.tabChangeCallbacks = [];
          this.createElement();
        }
        createElement() {
          this.container = document.createElement("div");
          this.container.className = "tabview-container";
          this.tabNav = document.createElement("div");
          this.tabNav.className = "tabview-nav";
          this.tabs.forEach((tab) => {
            const btn = document.createElement("button");
            btn.className = "tabview-btn" + (tab.id === this.activeTab ? " active" : "");
            btn.dataset.tab = tab.id;
            btn.innerHTML = `${tab.icon ? `<span class="tabview-icon">${tab.icon}</span>` : ""}${tab.label}`;
            btn.addEventListener("click", () => this.switchTab(tab.id));
            this.tabNav.appendChild(btn);
          });
          this.container.appendChild(this.tabNav);
          this.tabContent = document.createElement("div");
          this.tabContent.className = "tabview-content";
          this.tabs.forEach((tab) => {
            const pane = document.createElement("div");
            pane.className = "tabview-pane" + (tab.id === this.activeTab ? " active" : "");
            pane.id = `tabview-pane-${tab.id}`;
            if (typeof tab.content === "string") {
              pane.innerHTML = tab.content;
            } else if (tab.content instanceof HTMLElement) {
              pane.appendChild(tab.content);
            }
            this.tabContent.appendChild(pane);
          });
          this.container.appendChild(this.tabContent);
        }
        switchTab(tabId) {
          if (tabId === this.activeTab) return;
          this.activeTab = tabId;
          this.tabNav.querySelectorAll(".tabview-btn").forEach((btn) => {
            btn.classList.toggle("active", btn.dataset.tab === tabId);
          });
          this.tabContent.querySelectorAll(".tabview-pane").forEach((pane) => {
            pane.classList.toggle("active", pane.id === `tabview-pane-${tabId}`);
          });
          this.tabChangeCallbacks.forEach((cb) => cb(tabId));
        }
        onTabChange(cb) {
          this.tabChangeCallbacks.push(cb);
        }
        getElement() {
          return this.container;
        }
      };
      var DotboxTabViewElement = class extends HTMLElement {
        constructor() {
          super();
          this.tabViewInstance = null;
          this.tabsData = [];
        }
        connectedCallback() {
          this.parseTabsFromHTML();
          this.render();
        }
        static get observedAttributes() {
          return ["active-tab"];
        }
        attributeChangedCallback(name, oldValue, newValue) {
          if (this.tabViewInstance && name === "active-tab" && newValue !== oldValue) {
            this.tabViewInstance.switchTab(newValue);
          }
        }
        parseTabsFromHTML() {
          const tabPanels = this.querySelectorAll("dotbox-tab-panel");
          this.tabsData = Array.from(tabPanels).map((panel) => {
            const id = panel.getAttribute("id") || panel.getAttribute("tab-id") || `tab-${Math.random().toString(36).substr(2, 6)}`;
            const label = panel.getAttribute("label") || panel.getAttribute("title") || "Tab";
            const icon = panel.getAttribute("icon") || null;
            const content = panel.innerHTML;
            return {
              id,
              label,
              icon,
              content
            };
          });
          if (this.tabsData.length === 0) {
            const tabsAttr = this.getAttribute("data-tabs");
            if (tabsAttr) {
              try {
                this.tabsData = JSON.parse(tabsAttr);
              } catch (e) {
                console.warn("Invalid JSON in data-tabs attribute:", e);
                this.tabsData = [];
              }
            }
          }
          if (this.tabsData.length === 0 && this.innerHTML.trim()) {
            this.tabsData = [{
              id: "default",
              label: "Tab",
              icon: null,
              content: this.innerHTML
            }];
          }
        }
        render() {
          if (this.tabsData.length === 0) {
            this.innerHTML = "<p>No tabs defined</p>";
            return;
          }
          const activeTab = this.getAttribute("active-tab") || this.tabsData[0]?.id;
          if (this.tabViewInstance) {
            this.innerHTML = "";
          }
          this.tabViewInstance = new TabView({
            tabs: this.tabsData
          });
          if (activeTab && activeTab !== this.tabViewInstance.activeTab) {
            this.tabViewInstance.switchTab(activeTab);
          }
          this.tabViewInstance.onTabChange((tabId) => {
            this.setAttribute("active-tab", tabId);
            this.dispatchEvent(new CustomEvent("dotbox-tab-change", {
              detail: {
                activeTab: tabId,
                tabs: this.tabsData
              },
              bubbles: true
            }));
          });
          this.innerHTML = "";
          this.appendChild(this.tabViewInstance.getElement());
        }
        // Expose tab view methods
        switchTab(tabId) {
          this.setAttribute("active-tab", tabId);
          return this;
        }
        addTab(tab) {
          this.tabsData.push(tab);
          this.render();
          return this;
        }
        removeTab(tabId) {
          this.tabsData = this.tabsData.filter((tab) => tab.id !== tabId);
          this.render();
          return this;
        }
        getActiveTab() {
          return this.getAttribute("active-tab") || this.tabsData[0]?.id;
        }
        getTabs() {
          return [...this.tabsData];
        }
        onTabChange(callback) {
          this.addEventListener("dotbox-tab-change", (e) => {
            callback(e.detail.activeTab);
          });
          return this;
        }
      };
      var DotboxTabPanelElement = class extends HTMLElement {
        constructor() {
          super();
        }
        connectedCallback() {
          this.style.display = "none";
        }
      };
      if (typeof customElements !== "undefined") {
        customElements.define("dotbox-tab-view", DotboxTabViewElement);
        customElements.define("dotbox-tab-panel", DotboxTabPanelElement);
      }
      if (typeof module !== "undefined" && module.exports) {
        module.exports = TabView;
      }
    }
  });

  // src/components/TextBox/TextBox.js
  var require_TextBox = __commonJS({
    "src/components/TextBox/TextBox.js"(exports, module) {
      var TextBox = class {
        constructor(options = {}) {
          this.options = {
            type: "text",
            placeholder: "",
            value: "",
            label: "",
            required: false,
            disabled: false,
            readonly: false,
            min: null,
            max: null,
            step: null,
            pattern: null,
            helpText: "",
            errorText: "",
            className: "",
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
          this.container = document.createElement("div");
          this.container.className = `textbox-group ${this.options.className}`;
          if (this.options.label) {
            this.label = document.createElement("label");
            this.label.textContent = this.options.label;
            this.label.className = "textbox-label";
            this.container.appendChild(this.label);
          }
          this.inputWrapper = document.createElement("div");
          this.inputWrapper.className = "textbox-input-wrapper";
          this.input = document.createElement("input");
          this.input.type = this.options.type;
          this.input.placeholder = this.options.placeholder;
          this.input.value = this.options.value;
          this.input.required = this.options.required;
          this.input.disabled = this.options.disabled;
          this.input.readOnly = this.options.readonly;
          this.input.className = "textbox-input";
          if (this.options.min !== null) this.input.min = this.options.min;
          if (this.options.max !== null) this.input.max = this.options.max;
          if (this.options.step !== null) this.input.step = this.options.step;
          if (this.options.pattern) this.input.pattern = this.options.pattern;
          this.inputBorder = document.createElement("span");
          this.inputBorder.className = "textbox-input-border";
          this.inputWrapper.appendChild(this.input);
          this.inputWrapper.appendChild(this.inputBorder);
          this.container.appendChild(this.inputWrapper);
          if (this.options.helpText) {
            this.helpElement = document.createElement("small");
            this.helpElement.textContent = this.options.helpText;
            this.helpElement.className = "textbox-help";
            this.container.appendChild(this.helpElement);
          }
          this.errorElement = document.createElement("small");
          this.errorElement.className = "textbox-error hidden";
          this.container.appendChild(this.errorElement);
          if (this.label && !this.input.id) {
            const id = "textbox_" + Math.random().toString(36).substr(2, 9);
            this.input.id = id;
            this.label.setAttribute("for", id);
          }
          return this.container;
        }
        bindEvents() {
          if (this.onChange) {
            this.input.addEventListener("change", (e) => this.onChange(e));
          }
          if (this.onInput) {
            this.input.addEventListener("input", (e) => this.onInput(e));
          }
          if (this.onFocus) {
            this.input.addEventListener("focus", (e) => this.onFocus(e));
          }
          if (this.onBlur) {
            this.input.addEventListener("blur", (e) => this.onBlur(e));
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
            this.label = document.createElement("label");
            this.label.textContent = label;
            this.label.className = "textbox-label";
            this.container.insertBefore(this.label, this.input);
          }
          return this;
        }
        setHelpText(text) {
          if (this.helpElement) {
            this.helpElement.textContent = text;
          } else if (text) {
            this.helpElement = document.createElement("small");
            this.helpElement.textContent = text;
            this.helpElement.className = "textbox-help";
            this.container.appendChild(this.helpElement);
          }
          return this;
        }
        setDisabled(disabled) {
          this.input.disabled = disabled;
          this.container.classList.toggle("textbox-disabled", disabled);
          return this;
        }
        setRequired(required) {
          this.input.required = required;
          this.container.classList.toggle("textbox-required", required);
          return this;
        }
        showError(message) {
          this.errorElement.textContent = message;
          this.errorElement.classList.remove("hidden");
          this.container.classList.add("textbox-error-state");
          return this;
        }
        hideError() {
          this.errorElement.classList.add("hidden");
          this.container.classList.remove("textbox-error-state");
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
      };
      var DotboxTextboxElement = class extends HTMLElement {
        constructor() {
          super();
          this.textboxInstance = null;
        }
        connectedCallback() {
          this.render();
        }
        static get observedAttributes() {
          return ["label", "placeholder", "type", "value", "required", "disabled", "readonly", "help-text", "error-text"];
        }
        attributeChangedCallback() {
          if (this.textboxInstance) {
            this.render();
          }
        }
        render() {
          const label = this.getAttribute("label") || "";
          const placeholder = this.getAttribute("placeholder") || "";
          const type = this.getAttribute("type") || "text";
          const value = this.getAttribute("value") || "";
          const required = this.hasAttribute("required");
          const disabled = this.hasAttribute("disabled");
          const readonly = this.hasAttribute("readonly");
          const helpText = this.getAttribute("help-text") || "";
          const errorText = this.getAttribute("error-text") || "";
          if (this.textboxInstance) {
            this.innerHTML = "";
          }
          this.textboxInstance = new TextBox({
            label,
            placeholder,
            type,
            value,
            required,
            disabled,
            readonly,
            helpText,
            errorText,
            onChange: (e) => {
              this.setAttribute("value", e.target.value);
              this.dispatchEvent(new CustomEvent("dotbox-change", {
                detail: { value: e.target.value },
                bubbles: true
              }));
            },
            onInput: (e) => {
              this.dispatchEvent(new CustomEvent("dotbox-input", {
                detail: { value: e.target.value },
                bubbles: true
              }));
            },
            onFocus: (e) => {
              this.dispatchEvent(new CustomEvent("dotbox-focus", {
                detail: { value: e.target.value },
                bubbles: true
              }));
            },
            onBlur: (e) => {
              this.dispatchEvent(new CustomEvent("dotbox-blur", {
                detail: { value: e.target.value },
                bubbles: true
              }));
            }
          });
          this.innerHTML = "";
          this.appendChild(this.textboxInstance.getContainer());
        }
        // Expose textbox methods
        getValue() {
          return this.textboxInstance ? this.textboxInstance.getValue() : "";
        }
        setValue(value) {
          this.setAttribute("value", value);
          return this;
        }
        setDisabled(disabled) {
          if (disabled) {
            this.setAttribute("disabled", "");
          } else {
            this.removeAttribute("disabled");
          }
          return this;
        }
        showError(message) {
          this.setAttribute("error-text", message);
          return this;
        }
        hideError() {
          this.removeAttribute("error-text");
          return this;
        }
        focus() {
          if (this.textboxInstance) {
            this.textboxInstance.focus();
          }
          return this;
        }
      };
      if (typeof customElements !== "undefined") {
        customElements.define("dotbox-textbox", DotboxTextboxElement);
      }
      if (typeof module !== "undefined" && module.exports) {
        module.exports = TextBox;
      }
    }
  });

  // src/components/Toggle/Toggle.js
  var require_Toggle = __commonJS({
    "src/components/Toggle/Toggle.js"(exports, module) {
      var Toggle = class {
        constructor(options = {}) {
          this.id = options.id || `toggle-${Math.random().toString(36).substr(2, 9)}`;
          this.label = options.label || "";
          this.checked = options.checked || false;
          this.disabled = options.disabled || false;
          this.size = options.size || "medium";
          this.variant = options.variant || "primary";
          this.onChange = options.onChange || (() => {
          });
          this.name = options.name || "";
          this.value = options.value || "";
          this.element = this._render();
          this._bindEvents();
        }
        _render() {
          const container = document.createElement("div");
          container.className = `dotbox-toggle-container ${this.size ? `dotbox-toggle-${this.size}` : ""}`;
          const toggleElement = document.createElement("label");
          toggleElement.className = `dotbox-toggle ${this.variant ? `dotbox-toggle-${this.variant}` : ""}`;
          const input = document.createElement("input");
          input.type = "checkbox";
          input.id = this.id;
          input.checked = this.checked;
          input.disabled = this.disabled;
          if (this.name) input.name = this.name;
          if (this.value) input.value = this.value;
          const slider = document.createElement("div");
          slider.className = "dotbox-toggle-slider";
          const circle = document.createElement("div");
          circle.className = "dotbox-toggle-circle";
          const crossIcon = document.createElement("div");
          crossIcon.className = "dotbox-toggle-icon dotbox-toggle-cross";
          crossIcon.innerHTML = `
      <svg xml:space="preserve" viewBox="0 0 365.696 365.696" xmlns="http://www.w3.org/2000/svg">
        <path d="M243.188 182.86 356.32 69.726c12.5-12.5 12.5-32.766 0-45.247L341.238 9.398c-12.504-12.503-32.77-12.503-45.25 0L182.86 122.528 69.727 9.374c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.457c-12.5 12.504-12.5 32.77 0 45.25l113.152 113.152L9.398 295.99c-12.503 12.503-12.503 32.769 0 45.25L24.48 356.32c12.5 12.5 32.766 12.5 45.247 0l113.132-113.132L295.99 356.32c12.503 12.5 32.769 12.5 45.25 0l15.081-15.082c12.5-12.504 12.5-32.77 0-45.25zm0 0" fill="currentColor"/>
      </svg>
    `;
          const checkIcon = document.createElement("div");
          checkIcon.className = "dotbox-toggle-icon dotbox-toggle-checkmark";
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
            const labelText = document.createElement("span");
            labelText.className = "dotbox-toggle-label-text";
            labelText.textContent = this.label;
            container.appendChild(labelText);
          }
          container.appendChild(toggleElement);
          return container;
        }
        _bindEvents() {
          const input = this.element.querySelector('input[type="checkbox"]');
          input.addEventListener("change", (e) => {
            this.checked = e.target.checked;
            this.onChange(e);
            this.element.dispatchEvent(new CustomEvent("dotbox-change", {
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
          this.element.classList.toggle("dotbox-toggle-disabled", disabled);
          return this;
        }
        setVariant(variant) {
          this.element.querySelector(".dotbox-toggle").className = this.element.querySelector(".dotbox-toggle").className.replace(/dotbox-toggle-(primary|success|danger)/g, "");
          this.variant = variant;
          this.element.querySelector(".dotbox-toggle").classList.add(`dotbox-toggle-${variant}`);
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
      };
      var DotboxToggleElement = class extends HTMLElement {
        constructor() {
          super();
          this.toggleInstance = null;
          this._isInternalUpdate = false;
        }
        connectedCallback() {
          this.render();
        }
        static get observedAttributes() {
          return ["checked", "disabled", "label", "size", "variant", "name", "value"];
        }
        attributeChangedCallback(name, oldValue, newValue) {
          if (this.toggleInstance && !this._isInternalUpdate) {
            if (name === "checked") {
              this.toggleInstance.setChecked(this.hasAttribute("checked"));
            } else if (name === "disabled") {
              this.toggleInstance.setDisabled(this.hasAttribute("disabled"));
            } else if (name === "variant") {
              this.toggleInstance.setVariant(newValue || "primary");
            } else {
              this.render();
            }
          }
        }
        render() {
          const label = this.getAttribute("label") || "";
          const checked = this.hasAttribute("checked");
          const disabled = this.hasAttribute("disabled");
          const size = this.getAttribute("size") || "medium";
          const variant = this.getAttribute("variant") || "primary";
          const name = this.getAttribute("name") || "";
          const value = this.getAttribute("value") || "";
          if (this.toggleInstance) {
            this.innerHTML = "";
          }
          this.toggleInstance = new Toggle({
            label,
            checked,
            disabled,
            size,
            variant,
            name,
            value,
            onChange: (e) => {
              this._isInternalUpdate = true;
              if (e.target.checked) {
                this.setAttribute("checked", "");
              } else {
                this.removeAttribute("checked");
              }
              this._isInternalUpdate = false;
              this.dispatchEvent(new CustomEvent("dotbox-change", {
                detail: {
                  checked: e.target.checked,
                  value,
                  name
                },
                bubbles: true
              }));
            }
          });
          this.innerHTML = "";
          this.appendChild(this.toggleInstance.getElement());
        }
        // Expose toggle methods
        setChecked(checked) {
          if (checked) {
            this.setAttribute("checked", "");
          } else {
            this.removeAttribute("checked");
          }
          return this;
        }
        setDisabled(disabled) {
          if (disabled) {
            this.setAttribute("disabled", "");
          } else {
            this.removeAttribute("disabled");
          }
          return this;
        }
        setVariant(variant) {
          this.setAttribute("variant", variant);
          return this;
        }
      };
      if (typeof customElements !== "undefined") {
        customElements.define("dotbox-toggle", DotboxToggleElement);
      }
      if (typeof window !== "undefined") {
        window.DotBox = window.DotBox || {};
        window.DotBox.Toggle = Toggle;
      }
      module.exports = Toggle;
    }
  });

  // src/index.css
  var require_index = __commonJS({
    "src/index.css"(exports, module) {
      module.exports = "./index-VXU7ZXCU.css";
    }
  });

  // src/index.js
  var require_index2 = __commonJS({
    "src/index.js"(exports, module) {
      var Button = require_Button();
      var Checkbox = require_Checkbox();
      var CodeBlock = require_CodeBlock();
      var Dropdown = require_Dropdown();
      var Form = require_Form();
      var Icon2 = require_Icon();
      var Loader = require_Loader();
      var Menu = require_Menu();
      var MessageBox = require_MessageBox();
      var MetricItem = require_MetricItem();
      var ModalDialog = require_ModalDialog();
      var Notification = require_Notification();
      var Section = require_Section();
      var TabView = require_TabView();
      var TextBox = require_TextBox();
      var Toggle = require_Toggle();
      require_index();
      var Dotbox = {
        Button,
        Checkbox,
        CodeBlock,
        Dropdown,
        Form,
        Icon: Icon2,
        Loader,
        Menu,
        MessageBox,
        MetricItem,
        ModalDialog,
        Notification,
        Section,
        TabView,
        TextBox,
        Toggle
      };
      if (typeof window !== "undefined") {
        window.Dotbox = Dotbox;
      }
      module.exports = Dotbox;
    }
  });
  require_index2();
})();
