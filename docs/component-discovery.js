/**
 * Component Discovery Utility for Dynamic Documentation
 * Reads component.json files and provides unified component metadata
 */

class ComponentDiscovery {
    constructor() {
        this.components = new Map();
        this.categories = new Map();
        this.loadingPromise = null;
    }

    /**
     * Load all component metadata from component.json files
     */
    async loadComponents() {
        if (this.loadingPromise) {
            return this.loadingPromise;
        }

        this.loadingPromise = this._discoverComponents();
        return this.loadingPromise;
    }

    /**
     * Discover and load all components
     */
    async _discoverComponents() {
        try {
            // Get component list from API
            const response = await fetch('/api/components');
            if (!response.ok) {
                throw new Error('Failed to fetch component list');
            }
            
            const componentNames = await response.json();
            const loadPromises = componentNames.map(name => this._loadComponent(name));
            await Promise.all(loadPromises);
        } catch (error) {
            console.error('Failed to discover components:', error);
            // Fallback to static list if API fails
            const fallbackComponents = [
                'Button', 'Checkbox', 'CodeBlock', 'Dropdown', 'Form', 
                'Loader', 'Menu', 'MessageBox', 'MetricItem', 'ModalDialog',
                'Notification', 'Section', 'TabView', 'TextBox', 'Toggle', 'ToolButton'
            ];
            const loadPromises = fallbackComponents.map(name => this._loadComponent(name));
            await Promise.all(loadPromises);
        }

        // Sort components by category and name
        this._organizeComponents();
        
        console.log(`📦 Loaded ${this.components.size} components in ${this.categories.size} categories`);
    }

    /**
     * Load a single component's metadata and examples
     */
    async _loadComponent(componentName) {
        try {
            // Load component metadata from API
            const metadataResponse = await fetch(`/api/component/${componentName}/metadata`);
            if (!metadataResponse.ok) {
                console.warn(`⚠️ Could not load ${componentName} metadata`);
                return;
            }

            const componentData = await metadataResponse.json();
            
            // Load examples from API
            try {
                const examplesResponse = await fetch(`/api/component/${componentName}/examples`);
                if (examplesResponse.ok) {
                    const exampleNames = await examplesResponse.json();
                    
                    // Load each example content
                    const examplePromises = exampleNames.map(async (exampleName) => {
                        try {
                            const exampleResponse = await fetch(`/api/component/${componentName}/example/${exampleName}`);
                            if (exampleResponse.ok) {
                                const code = await exampleResponse.text();
                                return {
                                    title: this._formatExampleTitle(exampleName),
                                    description: `Web Component example: ${exampleName}`,
                                    code: code.trim()
                                };
                            }
                        } catch (error) {
                            console.warn(`Failed to load example ${exampleName} for ${componentName}:`, error);
                        }
                        return null;
                    });
                    
                    const examples = (await Promise.all(examplePromises)).filter(Boolean);
                    componentData.examples = examples;
                } else {
                    componentData.examples = [];
                }
            } catch (error) {
                console.warn(`Failed to load examples for ${componentName}:`, error);
                componentData.examples = [];
            }
            
            // Add computed properties
            componentData.id = componentName.toLowerCase();
            componentData.path = `/component/${componentData.id}`;
            componentData.sourceUrl = `/api/component/${componentName}`;
            
            // Ensure all required properties exist
            if (!componentData.version) componentData.version = '1.0.0';
            if (!componentData.properties) componentData.properties = [];
            if (!componentData.methods) componentData.methods = [];
            if (!componentData.events) componentData.events = [];
            if (!componentData.cssClasses) componentData.cssClasses = [];
            if (!componentData.dependencies) componentData.dependencies = [];
            
            this.components.set(componentData.id, componentData);
            
            // Add to category
            const category = componentData.category || 'Miscellaneous';
            if (!this.categories.has(category)) {
                this.categories.set(category, []);
            }
            this.categories.get(category).push(componentData);

        } catch (error) {
            console.error(`❌ Error loading ${componentName}:`, error);
        }
    }

    /**
     * Format example name for display
     */
    _formatExampleTitle(exampleName) {
        return exampleName
            .replace(/_/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    }

    /**
     * Organize components by category and sort
     */
    _organizeComponents() {
        // Sort components within each category
        for (const [category, components] of this.categories) {
            components.sort((a, b) => a.name.localeCompare(b.name));
        }

        // Sort categories
        const sortedCategories = new Map();
        const categoryOrder = ['Input', 'Display', 'Layout', 'Navigation', 'Miscellaneous'];
        
        categoryOrder.forEach(category => {
            if (this.categories.has(category)) {
                sortedCategories.set(category, this.categories.get(category));
            }
        });

        // Add any remaining categories
        for (const [category, components] of this.categories) {
            if (!sortedCategories.has(category)) {
                sortedCategories.set(category, components);
            }
        }

        this.categories = sortedCategories;
    }

    /**
     * Get a component by ID
     */
    getComponent(id) {
        return this.components.get(id);
    }

    /**
     * Get all components
     */
    getAllComponents() {
        return Array.from(this.components.values());
    }

    /**
     * Get components by category
     */
    getComponentsByCategory(category) {
        return this.categories.get(category) || [];
    }

    /**
     * Get all categories
     */
    getCategories() {
        return Array.from(this.categories.keys());
    }

    /**
     * Get navigation structure for rendering menus
     */
    getNavigationStructure() {
        const navigation = [];
        
        for (const [category, components] of this.categories) {
            navigation.push({
                category,
                components: components.map(comp => ({
                    id: comp.id,
                    name: comp.name,
                    path: comp.path,
                    description: comp.description
                }))
            });
        }

        return navigation;
    }

    /**
     * Search components by name or description
     */
    searchComponents(query) {
        const searchTerm = query.toLowerCase();
        return this.getAllComponents().filter(component => 
            component.name.toLowerCase().includes(searchTerm) ||
            component.description.toLowerCase().includes(searchTerm) ||
            component.category.toLowerCase().includes(searchTerm)
        );
    }

    /**
     * Get component statistics
     */
    getStats() {
        const components = this.getAllComponents();
        const totalExamples = components.reduce((sum, comp) => sum + (comp.examples?.length || 0), 0);
        const totalProperties = components.reduce((sum, comp) => sum + (comp.properties?.length || 0), 0);
        const totalMethods = components.reduce((sum, comp) => sum + (comp.methods?.length || 0), 0);
        const totalEvents = components.reduce((sum, comp) => sum + (comp.events?.length || 0), 0);

        return {
            totalComponents: components.length,
            totalCategories: this.categories.size,
            totalExamples,
            totalProperties,
            totalMethods,
            totalEvents,
            componentsByCategory: Object.fromEntries(
                Array.from(this.categories.entries()).map(([cat, comps]) => [cat, comps.length])
            )
        };
    }
}

// Create global instance
window.ComponentDiscovery = ComponentDiscovery;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComponentDiscovery;
}