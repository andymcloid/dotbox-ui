/**
 * DotboxUIPrerender.js - Dotbox UI specific prerender function for JSFiddle
 * This adds all the Dotbox UI boilerplate, CDN links, and theme support
 */

function createDotboxUIPrerender(options = {}) {
    const {
        cdnBase = 'https://cdn.jsdelivr.net/gh/andymcloid/dotbox-ui@release/',
        includeThemeToggle = true
    } = options;

    return function dotboxUIPrerender(code, jsfiddleOptions = {}) {
        const { 
            title = 'Dotbox UI Demo',
            type = 'auto' // 'auto', 'wc', 'js'
        } = jsfiddleOptions;

        // Auto-detect type based on code content
        let detectedType = type;
        if (type === 'auto') {
            if (code.includes('<dotbox-') || code.includes('dotbox-')) {
                detectedType = 'wc';
            } else if (code.includes('new Dotbox.') || code.includes('Dotbox.')) {
                detectedType = 'js';
            } else {
                detectedType = 'wc'; // Default to web components
            }
        }

        // Generate HTML content (just body content for JSFiddle)
        const html = `${includeThemeToggle ? `
<div style="margin-bottom: 1rem;">
    <button onclick="toggleTheme()" style="padding: 0.5rem 1rem; cursor: pointer; border: 1px solid var(--color-border); background: var(--color-bg-panel); color: var(--color-text); border-radius: var(--radius); font-family: var(--font-family);">
        🌓 Toggle Theme
    </button>
</div>
` : ''}
<div id="demo-container" style="padding: 1rem;">
    ${detectedType === 'wc' ? code : `<div id="js-demo"></div>`}
</div>`;

        // Generate CSS content with Dotbox UI imports
        const css = `/* Dotbox UI Styles */
@import url('${cdnBase}index.css');
@import url('${cdnBase}theme.css');

/* Demo Styling */
body {
    font-family: var(--font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    background: var(--color-bg, #f8f9fa);
    color: var(--color-text, #333);
    margin: 0;
    padding: 1.5rem;
    transition: background-color 0.2s ease, color 0.2s ease;
    line-height: 1.6;
    min-height: 100vh;
    box-sizing: border-box;
}

#demo-container {
    background: var(--color-bg-panel, #ffffff);
    border-radius: var(--radius, 8px);
    border: 1px solid var(--color-border, #e5e7eb);
    box-shadow: var(--color-shadow, 0 4px 16px rgba(0,0,0,0.08));
    transition: box-shadow 0.2s ease;
}

/* Ensure proper theme switching */
html.theme-light {
    background: #f8f9fa;
}

html.theme-dark {
    background: #1a1a1a;
}`;

        // Generate JavaScript content with Dotbox UI loading
        let js = `// Load Dotbox UI
const script = document.createElement('script');
script.src = '${cdnBase}bundle.js';
script.onload = function() {
    console.log('Dotbox UI loaded!');
    
    // Initialize theme
    document.documentElement.className = 'theme-light';
    
    ${detectedType === 'js' ? `
    // JavaScript API Demo
    setTimeout(() => {
        try {
            const container = document.getElementById('js-demo');
            ${code}
        } catch (error) {
            console.error('Demo error:', error);
            document.getElementById('js-demo').innerHTML = '<div style="color: red; padding: 1rem;">Error: ' + error.message + '</div>';
        }
    }, 100);
    ` : '// Web Components are already in HTML'}
};
document.head.appendChild(script);`;

        if (includeThemeToggle) {
            js += `

// Theme toggle functionality
function toggleTheme() {
    const html = document.documentElement;
    const isLight = html.className.includes('theme-light');
    html.className = isLight ? 'theme-dark' : 'theme-light';
    console.log('Theme switched to:', isLight ? 'dark' : 'light');
}`;
        }

        return {
            html: html,
            css: css,
            js: js
        };
    };
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = createDotboxUIPrerender;
}

// Global export for browser usage
if (typeof window !== 'undefined') {
    window.createDotboxUIPrerender = createDotboxUIPrerender;
}