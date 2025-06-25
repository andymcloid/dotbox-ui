/**
 * JSFiddle.js - Generic JSFiddle integration utility
 * Default behavior: Just opens JSFiddle with the provided code
 * Advanced behavior: Optional prerender function for custom setup
 */

class JSFiddle {
    constructor(options = {}) {
        this.prerender = options.prerender || null; // Optional prerender function
        this.defaultTitle = options.defaultTitle || 'Code Demo';
        this.defaultDescription = options.defaultDescription || 'Interactive code demo';
    }

    /**
     * Generate basic HTML content (just the code by default)
     * @param {string} code - The code to include
     * @param {object} options - Generation options
     */
    generateHTML(code, options = {}) {
        const { title = this.defaultTitle } = options;
        
        // Default: Just a basic HTML structure with the code
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
        const { additionalCSS = '' } = options;
        
        // Default: Just basic body styling + any additional CSS
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
    generateJS(code = '', options = {}) {
        const { additionalJS = '' } = options;
        
        // Default: Just the provided code + any additional JS
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
            language = 'html', // 'html', 'css', 'js'
            additionalCSS = '',
            additionalJS = '',
            resources = ''
        } = options;

        let htmlContent, cssContent, jsContent;

        // If prerender function exists, use it to customize the content
        if (this.prerender) {
            const prerendered = this.prerender(code, options);
            htmlContent = prerendered.html || this.generateHTML(code, options);
            cssContent = prerendered.css || this.generateCSS({ additionalCSS });
            jsContent = prerendered.js || this.generateJS(additionalJS, options);
        } else {
            // Default behavior: distribute code based on language
            if (language === 'html') {
                htmlContent = this.generateHTML(code, options);
                cssContent = this.generateCSS({ additionalCSS });
                jsContent = this.generateJS(additionalJS, options);
            } else if (language === 'css') {
                htmlContent = this.generateHTML('<div>CSS Demo</div>', options);
                cssContent = this.generateCSS({ additionalCSS: code + '\n' + additionalCSS });
                jsContent = this.generateJS(additionalJS, options);
            } else if (language === 'js' || language === 'javascript') {
                htmlContent = this.generateHTML('<div id="demo">JavaScript Demo</div>', options);
                cssContent = this.generateCSS({ additionalCSS });
                jsContent = this.generateJS(code + '\n' + additionalJS, options);
            } else {
                // Default to HTML
                htmlContent = this.generateHTML(code, options);
                cssContent = this.generateCSS({ additionalCSS });
                jsContent = this.generateJS(additionalJS, options);
            }
        }

        // Submit to JSFiddle
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
        const { title, description, html, css, js, resources = '' } = data;

        // Create hidden form
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://jsfiddle.net/api/post/library/pure/';
        form.target = '_blank';
        form.style.display = 'none';

        // Add form fields
        const fields = {
            title: title,
            description: description,
            html: html,
            css: css,
            js: js,
            wrap: 'l' // No wrap
        };

        // Only add resources if provided
        if (resources) {
            fields.resources = resources;
        }

        Object.entries(fields).forEach(([name, value]) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = name;
            input.value = value;
            form.appendChild(input);
        });

        // Submit form
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);

        console.log('Opening JSFiddle with:', { title, description });
    }

    /**
     * Create JSFiddle button for CodeBlock toolbar
     * @param {string} code - The code to demonstrate
     * @param {object} options - Button options
     */
    createButton(code, options = {}) {
        const {
            text = '🚀 Try in JSFiddle',
            variant = 'secondary',
            size = 'small',
            buttonClass = 'jsfiddle-button',
            ...jsfiddleOptions
        } = options;

        // Create a generic button (not dependent on Dotbox UI)
        const button = document.createElement('button');
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

        // Add hover styles
        button.addEventListener('mouseenter', () => {
            button.style.background = '#e9ecef';
            button.style.borderColor = '#007bff';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.background = '#f8f9fa';
            button.style.borderColor = '#ccc';
        });

        // Add click handler
        button.addEventListener('click', () => {
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
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = JSFiddle;
}

// Global export for browser usage
if (typeof window !== 'undefined') {
    window.JSFiddle = JSFiddle;
}