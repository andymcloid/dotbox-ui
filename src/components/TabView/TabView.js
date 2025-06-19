/**
 * TabView base component - generic, reusable tabbed interface
 */
class TabView {
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
        this.container = document.createElement('div');
        this.container.className = 'tabview-container';

        // Tab navigation
        this.tabNav = document.createElement('div');
        this.tabNav.className = 'tabview-nav';
        this.tabs.forEach(tab => {
            const btn = document.createElement('button');
            btn.className = 'tabview-btn' + (tab.id === this.activeTab ? ' active' : '');
            btn.dataset.tab = tab.id;
            btn.innerHTML = `${tab.icon ? `<span class="tabview-icon">${tab.icon}</span>` : ''}${tab.label}`;
            btn.addEventListener('click', () => this.switchTab(tab.id));
            this.tabNav.appendChild(btn);
        });
        this.container.appendChild(this.tabNav);

        // Tab content
        this.tabContent = document.createElement('div');
        this.tabContent.className = 'tabview-content';
        this.tabs.forEach(tab => {
            const pane = document.createElement('div');
            pane.className = 'tabview-pane' + (tab.id === this.activeTab ? ' active' : '');
            pane.id = `tabview-pane-${tab.id}`;
            if (typeof tab.content === 'string') {
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
        // Update nav
        this.tabNav.querySelectorAll('.tabview-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });
        // Update panes
        this.tabContent.querySelectorAll('.tabview-pane').forEach(pane => {
            pane.classList.toggle('active', pane.id === `tabview-pane-${tabId}`);
        });
        // Callbacks
        this.tabChangeCallbacks.forEach(cb => cb(tabId));
    }

    onTabChange(cb) {
        this.tabChangeCallbacks.push(cb);
    }

    getElement() {
        return this.container;
    }
}

// Web Component for HTML usage
class DotboxTabViewElement extends HTMLElement {
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
        return ['active-tab'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this.tabViewInstance && name === 'active-tab' && newValue !== oldValue) {
            this.tabViewInstance.switchTab(newValue);
        }
    }

    parseTabsFromHTML() {
        // Parse tabs from child elements with dotbox-tab-panel elements
        const tabPanels = this.querySelectorAll('dotbox-tab-panel');
        this.tabsData = Array.from(tabPanels).map(panel => {
            const id = panel.getAttribute('id') || panel.getAttribute('tab-id') || `tab-${Math.random().toString(36).substr(2, 6)}`;
            const label = panel.getAttribute('label') || panel.getAttribute('title') || 'Tab';
            const icon = panel.getAttribute('icon') || null;
            const content = panel.innerHTML;
            
            return {
                id: id,
                label: label,
                icon: icon,
                content: content
            };
        });

        // If no tab panels found, try to parse from data-tabs attribute
        if (this.tabsData.length === 0) {
            const tabsAttr = this.getAttribute('data-tabs');
            if (tabsAttr) {
                try {
                    this.tabsData = JSON.parse(tabsAttr);
                } catch (e) {
                    console.warn('Invalid JSON in data-tabs attribute:', e);
                    this.tabsData = [];
                }
            }
        }

        // If still no tabs, create a default tab with the innerHTML
        if (this.tabsData.length === 0 && this.innerHTML.trim()) {
            this.tabsData = [{
                id: 'default',
                label: 'Tab',
                icon: null,
                content: this.innerHTML
            }];
        }
    }

    render() {
        if (this.tabsData.length === 0) {
            this.innerHTML = '<p>No tabs defined</p>';
            return;
        }

        const activeTab = this.getAttribute('active-tab') || this.tabsData[0]?.id;

        // Clean up previous instance
        if (this.tabViewInstance) {
            this.innerHTML = '';
        }

        // Create new tab view instance
        this.tabViewInstance = new TabView({
            tabs: this.tabsData
        });

        // Set active tab if specified
        if (activeTab && activeTab !== this.tabViewInstance.activeTab) {
            this.tabViewInstance.switchTab(activeTab);
        }

        // Set up tab change callback
        this.tabViewInstance.onTabChange((tabId) => {
            this.setAttribute('active-tab', tabId);
            this.dispatchEvent(new CustomEvent('dotbox-tab-change', {
                detail: { 
                    activeTab: tabId,
                    tabs: this.tabsData
                },
                bubbles: true
            }));
        });

        // Clear content and append tab view
        this.innerHTML = '';
        this.appendChild(this.tabViewInstance.getElement());
    }

    // Expose tab view methods
    switchTab(tabId) {
        this.setAttribute('active-tab', tabId);
        return this;
    }

    addTab(tab) {
        this.tabsData.push(tab);
        this.render();
        return this;
    }

    removeTab(tabId) {
        this.tabsData = this.tabsData.filter(tab => tab.id !== tabId);
        this.render();
        return this;
    }

    getActiveTab() {
        return this.getAttribute('active-tab') || this.tabsData[0]?.id;
    }

    getTabs() {
        return [...this.tabsData];
    }

    onTabChange(callback) {
        this.addEventListener('dotbox-tab-change', (e) => {
            callback(e.detail.activeTab);
        });
        return this;
    }
}

// Helper Web Component for defining tab panels
class DotboxTabPanelElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // This element is used only for declarative parsing
        // The actual rendering is handled by DotboxTabViewElement
        this.style.display = 'none';
    }
}

// Register custom elements
if (typeof customElements !== 'undefined') {
    customElements.define('dotbox-tab-view', DotboxTabViewElement);
    customElements.define('dotbox-tab-panel', DotboxTabPanelElement);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TabView;
} 