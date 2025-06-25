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
            </div>

            <nav class="nav-menu">
                <div class="nav-item">
                    <a href="/" class="nav-link" data-route="/">
                        🏠 Overview
                    </a>
                </div>
                
                ${navigation.map(nav => `
                    <div class="nav-category">
                        <div class="nav-category-title">${nav.category}</div>
                        ${nav.components.map(comp => `
                            <div class="nav-item">
                                <a href="/component/${comp.id}" class="nav-link" data-route="/component/${comp.id}">
                                    ${comp.name}
                                </a>
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
                
                <div class="nav-footer">
                    <div class="theme-toggle">
                        <button id="theme-toggle" title="Toggle theme">
                            🌓 Toggle Theme
                        </button>
                    </div>
                </div>
            </nav>
        `;

        this.navigationElement.innerHTML = navHtml;

        // Setup search
        this.setupSearch();
        
        // Setup theme toggle
        this.setupThemeToggle();
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
        const navItems = document.querySelectorAll('.nav-item');
        const categories = document.querySelectorAll('.nav-category');

        if (!query.trim()) {
            // Show all items
            navItems.forEach(item => item.style.display = '');
            categories.forEach(cat => cat.style.display = '');
            return;
        }

        const results = this.discovery.searchComponents(query);
        const resultIds = results.map(comp => comp.id);

        // Hide all items first
        navItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            if (link) {
                const route = link.getAttribute('data-route');
                if (route && route.startsWith('/component/')) {
                    const compId = route.replace('/component/', '');
                    item.style.display = resultIds.includes(compId) ? '' : 'none';
                }
            }
        });

        // Show/hide categories based on visible items
        categories.forEach(category => {
            const visibleItems = category.querySelectorAll('.nav-item:not([style*="none"])');
            category.style.display = visibleItems.length > 0 ? '' : 'none';
        });
    }

    /**
     * Setup theme toggle functionality
     */
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        // Get current theme
        const currentTheme = document.documentElement.classList.contains('theme-dark') ? 'dark' : 'light';
        
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.contains('theme-dark');
            
            if (isDark) {
                document.documentElement.classList.remove('theme-dark');
                document.documentElement.classList.add('theme-light');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.classList.remove('theme-light');
                document.documentElement.classList.add('theme-dark');
                localStorage.setItem('theme', 'dark');
            }
        });
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
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current route
        const activeLink = document.querySelector(`[data-route="${path}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
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