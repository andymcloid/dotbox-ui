/**
 * Dynamic Page Generator for Component Documentation
 * Generates HTML pages from component.json metadata
 */

class PageGenerator {
    constructor(componentDiscovery) {
        this.discovery = componentDiscovery;
    }

    /**
     * Generate a complete component documentation page
     */
    generateComponentPage(componentId) {
        const component = this.discovery.getComponent(componentId);
        if (!component) {
            return this.generateNotFoundPage(componentId);
        }

        const html = `
            <div class="component-page">
                ${this.generateHeader(component)}
                ${this.generateOverview(component)}
                ${this.generateExamples(component)}
                ${this.generateAPI(component)}
                ${this.generateWebComponent(component)}
                ${this.generateCSS(component)}
                ${this.generateFooter(component)}
            </div>
        `;

        return html;
    }

    /**
     * Generate component header with title and description
     */
    generateHeader(component) {
        const badges = this.generateBadges(component);
        
        return `
            <header class="component-header">
                <div class="component-title-section">
                    <h1 class="component-title">${component.name}</h1>
                    <div class="component-badges">${badges}</div>
                </div>
                <p class="component-description">${component.description}</p>
                <div class="component-meta">
                    <span class="meta-item">
                        <strong>Category:</strong> ${component.category}
                    </span>
                    <span class="meta-item">
                        <strong>Version:</strong> ${component.version}
                    </span>
                    <span class="meta-item">
                        <strong>Web Component:</strong> 
                        <code>&lt;${component.webComponent?.tag || 'dotbox-' + component.id}&gt;</code>
                    </span>
                </div>
            </header>
        `;
    }

    /**
     * Generate badges for component features
     */
    generateBadges(component) {
        const badges = [];
        
        if (component.webComponent) badges.push('<span class="badge badge-web">Web Component</span>');
        if (component.properties?.length) badges.push('<span class="badge badge-props">Properties</span>');
        if (component.methods?.length) badges.push('<span class="badge badge-methods">Methods</span>');
        if (component.events?.length) badges.push('<span class="badge badge-events">Events</span>');
        if (component.examples?.length) badges.push('<span class="badge badge-examples">Examples</span>');
        
        return badges.join(' ');
    }

    /**
     * Generate overview section with quick stats
     */
    generateOverview(component) {
        const stats = [
            { label: 'Properties', count: component.properties?.length || 0 },
            { label: 'Methods', count: component.methods?.length || 0 },
            { label: 'Events', count: component.events?.length || 0 },
            { label: 'Examples', count: component.examples?.length || 0 }
        ];

        const statsHtml = stats.map(stat => `
            <div class="stat-item">
                <div class="stat-number">${stat.count}</div>
                <div class="stat-label">${stat.label}</div>
            </div>
        `).join('');

        return `
            <section class="component-overview">
                <h2>Overview</h2>
                <div class="component-stats">
                    ${statsHtml}
                </div>
                ${component.dependencies?.length ? this.generateDependencies(component.dependencies) : ''}
            </section>
        `;
    }

    /**
     * Generate dependencies section
     */
    generateDependencies(dependencies) {
        const depList = dependencies.map(dep => `<code>${dep}</code>`).join(', ');
        return `
            <div class="component-dependencies">
                <strong>Dependencies:</strong> ${depList}
            </div>
        `;
    }

    /**
     * Generate examples section with live CodeBlock components
     */
    generateExamples(component) {
        if (!component.examples?.length) {
            return '<section class="component-examples"><h2>Examples</h2><p>No examples available.</p></section>';
        }

        const examplesHtml = component.examples.map((example, index) => {
            const codeBlockId = `example-${component.id}-${index}`;
            const language = this.detectLanguage(example.code);
            
            // Properly escape HTML for display in code block
            const escapedCode = this.escapeHtml(example.code);
            
            return `
                <dotbox-code-block 
                    id="${codeBlockId}"
                    language="${language}"
                    title="${example.title}"
                    expandable="true"
                    fiddle="true">${escapedCode}</dotbox-code-block>
            `;
        }).join('');

        return `
            <section class="component-examples">
                <h2>Examples</h2>
                ${examplesHtml}
            </section>
        `;
    }

    /**
     * Detect code language from content
     */
    detectLanguage(code) {
        if (code.trim().startsWith('<') || code.includes('dotbox-')) {
            return 'html';
        }
        if (code.includes('new Dotbox.') || code.includes('const ') || code.includes('function')) {
            return 'javascript';
        }
        if (code.includes('{') && code.includes(':')) {
            return 'css';
        }
        return 'html'; // Default
    }

    /**
     * Generate API reference section
     */
    generateAPI(component) {
        return `
            <section class="component-api">
                <h2>API Reference</h2>
                ${this.generateProperties(component)}
                ${this.generateMethods(component)}
                ${this.generateEvents(component)}
            </section>
        `;
    }

    /**
     * Generate properties table
     */
    generateProperties(component) {
        if (!component.properties?.length) {
            return '';
        }

        const rows = component.properties.map(prop => `
            <tr>
                <td><code>${prop.name}</code></td>
                <td><code>${prop.type}</code></td>
                <td><code>${prop.default !== undefined ? prop.default : 'undefined'}</code></td>
                <td>${prop.description}</td>
                <td>${prop.options ? prop.options.map(opt => `<code>${opt}</code>`).join(', ') : '-'}</td>
            </tr>
        `).join('');

        return `
            <div class="api-section">
                <h3>Properties</h3>
                <div class="table-wrapper">
                    <table class="api-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Default</th>
                                <th>Description</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rows}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    /**
     * Generate methods table
     */
    generateMethods(component) {
        if (!component.methods?.length) {
            return '';
        }

        const rows = component.methods.map(method => {
            const params = method.parameters?.map(p => `${p.name}: ${p.type}`).join(', ') || '';
            const signature = `${method.name}(${params})`;
            
            return `
                <tr>
                    <td><code>${signature}</code></td>
                    <td><code>${method.returns || 'void'}</code></td>
                    <td>${method.description}</td>
                </tr>
            `;
        }).join('');

        return `
            <div class="api-section">
                <h3>Methods</h3>
                <div class="table-wrapper">
                    <table class="api-table">
                        <thead>
                            <tr>
                                <th>Method</th>
                                <th>Returns</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rows}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    /**
     * Generate events table
     */
    generateEvents(component) {
        if (!component.events?.length) {
            return '';
        }

        const rows = component.events.map(event => {
            const detail = event.detail ? 
                Object.entries(event.detail).map(([key, type]) => `${key}: ${type}`).join(', ') : 
                '';
            
            return `
                <tr>
                    <td><code>${event.name}</code></td>
                    <td>${event.description}</td>
                    <td><code>${detail}</code></td>
                </tr>
            `;
        }).join('');

        return `
            <div class="api-section">
                <h3>Events</h3>
                <div class="table-wrapper">
                    <table class="api-table">
                        <thead>
                            <tr>
                                <th>Event</th>
                                <th>Description</th>
                                <th>Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rows}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    /**
     * Generate Web Component usage section
     */
    generateWebComponent(component) {
        if (!component.webComponent) {
            return '';
        }

        const attributes = component.webComponent.attributes?.map(attr => `<code>${attr}</code>`).join(', ') || 'None';
        
        const usage = `&lt;${component.webComponent.tag}&gt;Content&lt;/${component.webComponent.tag}&gt;`;

        return `
            <section class="component-webcomponent">
                <h2>Web Component Usage</h2>
                <div class="webcomponent-info">
                    <div class="info-item">
                        <strong>Tag:</strong> <code>&lt;${component.webComponent.tag}&gt;</code>
                    </div>
                    <div class="info-item">
                        <strong>Attributes:</strong> ${attributes}
                    </div>
                    <div class="info-item">
                        <strong>Basic Usage:</strong>
                        <dotbox-code-block language="html" title="Web Component Usage">
${usage}
                        </dotbox-code-block>
                    </div>
                </div>
            </section>
        `;
    }

    /**
     * Generate CSS classes section
     */
    generateCSS(component) {
        if (!component.cssClasses?.length) {
            return '';
        }

        const classes = component.cssClasses.map(cls => `
            <div class="css-class">
                <h4><code>${cls.name}</code></h4>
                <p>${cls.description}</p>
            </div>
        `).join('');

        return `
            <section class="component-css">
                <h2>CSS Classes</h2>
                <div class="css-classes">
                    ${classes}
                </div>
            </section>
        `;
    }

    /**
     * Generate footer with source links
     */
    generateFooter(component) {
        return `
            <footer class="component-footer">
                <div class="footer-links">
                    <a href="${component.sourceUrl}/${component.name}.js" target="_blank">
                        📄 View Source (JS)
                    </a>
                    <a href="${component.sourceUrl}/${component.name}.css" target="_blank">
                        🎨 View Styles (CSS)
                    </a>
                    <a href="${component.sourceUrl}/component.json" target="_blank">
                        📋 View Metadata (JSON)
                    </a>
                </div>
            </footer>
        `;
    }

    /**
     * Generate 404 page for missing components
     */
    generateNotFoundPage(componentId) {
        const availableComponents = this.discovery.getAllComponents()
            .map(comp => `<a href="/component/${comp.id}">${comp.name}</a>`)
            .join(', ');

        return `
            <div class="not-found-page">
                <h1>Component Not Found</h1>
                <p>The component "${componentId}" could not be found.</p>
                <h3>Available Components:</h3>
                <p>${availableComponents}</p>
            </div>
        `;
    }

    /**
     * Generate homepage with component overview
     */
    generateHomePage() {
        const navigation = this.discovery.getNavigationStructure();
        const stats = this.discovery.getStats();

        const categoriesHtml = navigation.map(nav => `
            <div class="category-section">
                <h3>${nav.category}</h3>
                <div class="component-grid">
                    ${nav.components.map(comp => `
                        <div class="component-card">
                            <h4><a href="/component/${comp.id}">${comp.name}</a></h4>
                            <p>${comp.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');

        const statsHtml = Object.entries(stats.componentsByCategory).map(([cat, count]) => `
            <div class="stat-item">
                <div class="stat-number">${count}</div>
                <div class="stat-label">${cat}</div>
            </div>
        `).join('');

        return `
            <div class="home-page">
                <header class="home-header">
                    <h1>Dotbox UI Components</h1>
                    <p>A modern, reusable UI component library with ${stats.totalComponents} components.</p>
                    <div class="home-stats">
                        ${statsHtml}
                    </div>
                </header>
                <section class="components-overview">
                    ${categoriesHtml}
                </section>
            </div>
        `;
    }

    /**
     * Escape HTML for safe display in code blocks
     */
    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

// Export for global usage
window.PageGenerator = PageGenerator;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PageGenerator;
}