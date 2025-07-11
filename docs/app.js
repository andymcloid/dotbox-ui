/**
 * Dynamic Documentation App
 * Single Page Application for component documentation
 */

class DocsApp {
    constructor() {
        this.discovery = new ComponentDiscovery();
        this.pageGenerator = new PageGenerator(this.discovery);
        this.currentRoute = null;
        this.isLoading = false;
        
        // DOM elements
        this.navigationElement = null;
        this.contentElement = null;
        this.loadingElement = null;
        
        // Initialize app
        this.init();
    }

    /**
     * Initialize the documentation app
     */
    async init() {
        console.log('🚀 Initializing Dotbox UI Documentation');
        
        // Wait for DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }
    }

    /**
     * Called when DOM is ready
     */
    async onDOMReady() {
        // Get DOM elements
        this.navigationElement = document.getElementById('navigation');
        this.contentElement = document.getElementById('content');
        this.loadingElement = document.getElementById('loading');

        // Show loading
        this.showLoading('Loading components...');

        try {
            // Load all components
            await this.discovery.loadComponents();
            
            // Setup navigation
            this.setupNavigation();
            
            // Setup routing
            this.setupRouting();
            
            // Hide loading
            this.hideLoading();
            
            // Navigate to current route
            this.handleRoute();
            
        } catch (error) {
            console.error('❌ Failed to initialize app:', error);
            this.showError('Failed to load component documentation');
        }
    }

    /**
     * Setup dynamic navigation from component metadata
     */
    setupNavigation() {
        if (!this.navigationElement) return;

        const navigation = this.discovery.getNavigationStructure();
        const stats = this.discovery.getStats();

        const navHtml = `
            <div class="nav-header">
                <div class="nav-logo">
                    <img src="/assets/dotbox_logo_only.svg" alt="Dotbox UI">
                    <span>Dotbox UI</span>
                </div>
                <div class="nav-stats">
                    ${stats.totalComponents} components
                </div>
            </div>
            
            <div class="nav-search">
                <input type="text" id="component-search" placeholder="Search components...">
                <div class="nav-theme-toggle">
                    <dotbox-button id="theme-toggle" variant="primary" size="small" icon="☀️" width="100%">Light</dotbox-button>
                </div>
            </div>

            <div class="nav-menu-container">
                <dotbox-menu id="main-navigation" collapsible-headers compact></dotbox-menu>
            </div>
        `;

        this.navigationElement.innerHTML = navHtml;

        // Setup Menu component
        this.setupMenuComponent(navigation);
        
        // Setup search
        this.setupSearch();
        
        // Setup theme toggle
        this.setupThemeToggle();
    }

    /**
     * Setup the Menu component with navigation data
     */
    setupMenuComponent(navigation) {
        const menuElement = document.getElementById('main-navigation');
        if (!menuElement) return;

        // Build menu items from navigation structure
        const menuItems = [
            {
                id: 'overview',
                label: '🏠 Overview',
                group: 'main',
                groupHeader: 'Main'
            }
        ];

        // Add component items grouped by category
        navigation.forEach(nav => {
            nav.components.forEach(comp => {
                menuItems.push({
                    id: comp.id,
                    label: comp.name,
                    group: nav.category.toLowerCase().replace(/\s+/g, '-'),
                    groupHeader: nav.category
                });
            });
        });

        // Set the items as JSON attribute
        menuElement.setAttribute('data-items', JSON.stringify(menuItems));
        
        // Setup menu selection handler
        menuElement.addEventListener('dotbox-select', (e) => {
            const selectedId = e.detail.selectedId;
            if (selectedId === 'overview') {
                this.navigateTo('/');
            } else {
                this.navigateTo(`/component/${selectedId}`);
            }
            // Prevent default hash routing
            e.preventDefault();
        });

        // Force re-render to pick up the new items
        if (menuElement.render) {
            menuElement.render();
        }

        // Override menu item click handlers to prevent hash routing
        setTimeout(() => {
            const menuItems = menuElement.querySelectorAll('.dotbox-menu-item');
            menuItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    // Let the dotbox-select event handle navigation
                });
            });
        }, 100);
    }

    /**
     * Setup component search functionality
     */
    setupSearch() {
        const searchInput = document.getElementById('component-search');
        if (!searchInput) return;

        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 300);
        });
    }

    /**
     * Perform component search
     */
    performSearch(query) {
        const menuElement = document.getElementById('main-navigation');
        if (!menuElement || !menuElement.menuInstance) return;

        if (!query.trim()) {
            // Show all menu groups and items
            const menuGroups = menuElement.querySelectorAll('.dotbox-menu-group');
            const menuHeaders = menuElement.querySelectorAll('.dotbox-menu-header');
            const menuItems = menuElement.querySelectorAll('.dotbox-menu-item');
            
            menuGroups.forEach(group => group.style.display = '');
            menuHeaders.forEach(header => header.style.display = '');
            menuItems.forEach(item => item.style.display = '');
            return;
        }

        const results = this.discovery.searchComponents(query);
        const resultIds = results.map(comp => comp.id);
        resultIds.push('overview'); // Always show overview

        // Hide/show menu items based on search results
        const menuItems = menuElement.querySelectorAll('.dotbox-menu-item');
        menuItems.forEach(item => {
            const itemText = item.textContent.trim();
            const menuData = menuElement.menuInstance.items.find(data => data.label === itemText);
            if (menuData) {
                const shouldShow = resultIds.includes(menuData.id) || 
                    menuData.label.toLowerCase().includes(query.toLowerCase());
                item.style.display = shouldShow ? '' : 'none';
            }
        });

        // Show/hide menu groups based on visible items
        const menuGroups = menuElement.querySelectorAll('.dotbox-menu-group');
        menuGroups.forEach(group => {
            const visibleItems = group.querySelectorAll('.dotbox-menu-item:not([style*="none"])');
            const header = menuElement.querySelector(`[onclick*="${group.getAttribute('data-group')}"]`);
            if (header) {
                header.style.display = visibleItems.length > 0 ? '' : 'none';
            }
            group.style.display = visibleItems.length > 0 ? '' : 'none';
        });
    }

    /**
     * Setup theme toggle functionality
     */
    setupThemeToggle() {
        // Add a small delay to ensure components are loaded
        setTimeout(() => {
            const themeToggle = document.getElementById('theme-toggle');
            if (!themeToggle) return;

            // Force Web Component initialization if not already done
            if (themeToggle.connectedCallback && typeof themeToggle.connectedCallback === 'function') {
                try {
                    themeToggle.connectedCallback();
                } catch (e) {
                    console.debug('Theme toggle already initialized');
                }
            }

            // Get current theme and update button accordingly
            const currentTheme = document.documentElement.classList.contains('theme-dark') ? 'dark' : 'light';
            this.updateThemeButton(currentTheme);
            
            themeToggle.addEventListener('click', () => {
                const isDark = document.documentElement.classList.contains('theme-dark');
                
                if (isDark) {
                    document.documentElement.classList.remove('theme-dark');
                    document.documentElement.classList.add('theme-light');
                    localStorage.setItem('theme', 'light');
                    this.updateThemeButton('light');
                } else {
                    document.documentElement.classList.remove('theme-light');
                    document.documentElement.classList.add('theme-dark');
                    localStorage.setItem('theme', 'dark');
                    this.updateThemeButton('dark');
                }
            });
        }, 100);
    }

    /**
     * Update theme button appearance based on current theme
     */
    updateThemeButton(theme) {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        if (theme === 'dark') {
            themeToggle.setAttribute('icon', '🌙');
            themeToggle.setAttribute('text', 'Toggle Light Theme');
        } else {
            themeToggle.setAttribute('icon', '☀️');
            themeToggle.setAttribute('text', 'Toggle Dark Theme');
        }
    }

    /**
     * Setup client-side routing
     */
    setupRouting() {
        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[data-route]');
            if (link) {
                e.preventDefault();
                const route = link.getAttribute('data-route');
                this.navigateTo(route);
            }
        });

        // Handle browser navigation
        window.addEventListener('popstate', () => this.handleRoute());
    }

    /**
     * Navigate to a specific route
     */
    navigateTo(route) {
        window.history.pushState(null, '', route);
        this.handleRoute();
    }

    /**
     * Handle current route
     */
    async handleRoute() {
        const path = window.location.pathname;
        this.currentRoute = path;

        // Update active navigation
        this.updateActiveNavigation(path);

        if (path === '/' || path === '') {
            this.renderHomePage();
        } else if (path.startsWith('/component/')) {
            const componentId = path.replace('/component/', '');
            this.renderComponentPage(componentId);
        } else {
            this.renderNotFoundPage();
        }
    }

    /**
     * Update active navigation item
     */
    updateActiveNavigation(path) {
        const menuElement = document.getElementById('main-navigation');
        if (!menuElement || !menuElement.menuInstance) return;

        let selectedId = null;
        if (path === '/') {
            selectedId = 'overview';
        } else if (path.startsWith('/component/')) {
            selectedId = path.replace('/component/', '');
        }

        if (selectedId) {
            menuElement.menuInstance.select(selectedId);
        }
    }

    /**
     * Render homepage
     */
    renderHomePage() {
        if (!this.contentElement) return;
        
        const html = this.pageGenerator.generateHomePage();
        this.contentElement.innerHTML = html;
        
        // Update page title
        document.title = 'Dotbox UI - Component Library';
        
        // Initialize Web Components
        this.initializeWebComponents();
        
        // Scroll to top
        this.contentElement.scrollTop = 0;
    }

    /**
     * Render component page
     */
    renderComponentPage(componentId) {
        if (!this.contentElement) return;
        
        const html = this.pageGenerator.generateComponentPage(componentId);
        this.contentElement.innerHTML = html;
        
        // Update page title
        const component = this.discovery.getComponent(componentId);
        document.title = component ? `${component.name} - Dotbox UI` : 'Component Not Found - Dotbox UI';
        
        // Initialize Web Components
        this.initializeWebComponents();
        
        // Scroll to top
        this.contentElement.scrollTop = 0;
    }

    /**
     * Render 404 page
     */
    renderNotFoundPage() {
        if (!this.contentElement) return;
        
        this.contentElement.innerHTML = `
            <div class="not-found-page">
                <h1>Page Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
                <a href="/" class="btn btn-primary">Go Home</a>
            </div>
        `;
        
        document.title = 'Page Not Found - Dotbox UI';
    }

    /**
     * Initialize Web Components after content injection
     */
    initializeWebComponents() {
        if (!this.contentElement) return;
        
        // Wait a bit to ensure DOM is ready
        setTimeout(() => {
            // Find all dotbox Web Components in the current content
            const webComponents = this.contentElement.querySelectorAll('*[is], [data-dotbox], dotbox-button, dotbox-checkbox, dotbox-textbox, dotbox-dropdown, dotbox-loader, dotbox-notification, dotbox-modal, dotbox-section, dotbox-tabs, dotbox-toggle, dotbox-menu, dotbox-form, dotbox-messagebox, dotbox-metric, dotbox-codeblock, dotbox-code-block, dotbox-toolbutton, dotbox-icon');
            
            webComponents.forEach(element => {
                // Force Web Component initialization if not already done
                if (element.connectedCallback && typeof element.connectedCallback === 'function') {
                    try {
                        element.connectedCallback();
                    } catch (e) {
                        console.debug('Component already initialized or failed:', element.tagName, e);
                    }
                }
                
                // Special handling for CodeBlock components to ensure preview updates
                if (element.tagName.toLowerCase() === 'dotbox-code-block' && element.codeBlockInstance) {
                    try {
                        // Force preview update
                        element.codeBlockInstance._schedulePreviewUpdate();
                    } catch (e) {
                        console.debug('CodeBlock preview update failed:', e);
                    }
                }
            });
        }, 100);
    }

    /**
     * Show loading indicator
     */
    showLoading(message = 'Loading...') {
        this.isLoading = true;
        
        if (this.loadingElement) {
            this.loadingElement.textContent = message;
            this.loadingElement.style.display = 'flex';
        }
        
        if (this.contentElement) {
            this.contentElement.style.display = 'none';
        }
    }

    /**
     * Hide loading indicator
     */
    hideLoading() {
        this.isLoading = false;
        
        if (this.loadingElement) {
            this.loadingElement.style.display = 'none';
        }
        
        if (this.contentElement) {
            this.contentElement.style.display = 'block';
        }
    }

    /**
     * Show error message
     */
    showError(message) {
        if (this.contentElement) {
            this.contentElement.innerHTML = `
                <div class="error-page">
                    <h1>Error</h1>
                    <p>${message}</p>
                    <button onclick="location.reload()" class="btn btn-primary">
                        Reload Page
                    </button>
                </div>
            `;
        }
        
        this.hideLoading();
    }
}

// Initialize app when script loads
window.DocsApp = DocsApp;

// Auto-start app
if (typeof window !== 'undefined') {
    window.app = new DocsApp();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DocsApp;
}