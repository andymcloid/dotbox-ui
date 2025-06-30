# Contributing to Dotbox UI

Thank you for your interest in contributing to Dotbox UI! This document outlines our architecture principles, development guidelines, and contribution process.

## 🏗️ Architecture & Build Rules

### 1. Code Structure & Components

- **Pure JavaScript (ECMAScript only)** - No TypeScript
- **One component per directory** (`src/components/ComponentName/`)
- **PascalCase** for directories and files
- **No shared utility code** - Each component is self-contained
- **Components load their own CSS and JS dependencies**
- **All CSS must be component-scoped** (class prefixes, no global selectors)
- **No hardcoded styling in components** - Always use CSS variables

### 2. Web Components & Dual API

- **Web Components First** - All components must implement both Web Components and JavaScript APIs
- **HTML Custom Elements** - Register components as `<dotbox-component-name>` custom elements
- **Attribute Observation** - Web Components must observe relevant attributes and update accordingly
- **Custom Events** - Emit `dotbox-*` events (e.g., `dotbox-click`, `dotbox-change`, `dotbox-input`)
- **Backwards Compatibility** - JavaScript API must continue to work alongside Web Components
- **Event Delegation** - Web Components should dispatch custom events that bubble up

### 3. Styling & Themes

- **All core variables** (colors, spacing, radius, etc.) defined in theme file (`src/styles/theme.css`)
- **theme.css contains both light and dark themes**, scoped to `:root.theme-light` and `:root.theme-dark`
- **main.css and component CSS use ONLY CSS variables** (e.g., `var(--color-bg)`, `var(--spacing-md)`)
- **Want rounded components?** Set `--radius: 8px;` in theme.css
- **Want spacing?** Define `--spacing-xs`, `--spacing-sm`, `--spacing-md`, `--spacing-lg` in theme.css
- **No hardcoded padding, margin, border-radius, colors, etc. in component CSS**

### 4. Build & Distribution

- **All source code and CSS in `src/`**
- **Dynamic Build System**: Components are auto-discovered and integrated
  - `npm run build` automatically scans `src/components/` folder
  - Generates `src/index.js` and `src/index.css` dynamically
  - Builds to `dist/bundle.js`, `dist/index.css`, `dist/theme.css`
- **No manual index file maintenance** - adding components is automatic
- **No CSS or JS in `docs/`** - docs is just a consumer

### 5. Consumption & Documentation

- **Docs (and all consumers) load ONLY CSS/JS from `dist/`**:
  - `<link rel="stylesheet" href="/dist/index.css">`
  - `<link rel="stylesheet" href="/dist/theme.css">`
  - `<script src="/dist/bundle.js"></script>`
- **Theme toggle sets class on `<html>`** (`theme-light` or `theme-dark`)
- **theme.css controls which variables apply based on `<html>` class**
- **Docs page MUST NOT have custom CSS** - Should show exactly how the UI package looks for consumers

## 🛠️ Development Setup

### Prerequisites
- Node.js (latest LTS version)
- npm or yarn

### Getting Started
1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/dotbox-ui.git
   cd dotbox-ui
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the project:
   ```bash
   npm run build
   ```
5. Start the documentation server:
   ```bash
   npm run docs
   ```

## 📝 Creating Components

### Component Structure
```
src/components/NewComponent/
├── NewComponent.js
├── NewComponent.css
├── component.json
└── examples/
    ├── basic_example.wc
    ├── advanced_example.wc
    └── states_example.wc
```

### Dynamic Build Integration

**🎉 NEW: Automatic Component Discovery!**
- Components are now **automatically discovered** by the build system
- **No manual index file maintenance** required
- Just create your component folder with the required files and run `npm run build`

#### Component Creation Steps

1. **Create Component Directory**: `src/components/NewComponent/`
2. **Create Component Files**:
   - `NewComponent.js` (component implementation)
   - `NewComponent.css` (component styles)
   - `component.json` (component documentation)
3. **Run Build**: `npm run build`
4. **Done!** Your component is automatically integrated

#### Build Process
```bash
npm run build
```

**What happens automatically:**
- ✅ Build system scans `src/components/` folder
- ✅ Generates `src/index.js` with all component imports/exports
- ✅ Generates `src/index.css` with all component CSS imports
- ✅ Builds JavaScript bundle to `dist/bundle.js`
- ✅ Builds CSS bundle to `dist/index.css`
- ✅ Copies theme files to `dist/theme.css`
- ✅ Component automatically available as `Dotbox.NewComponent` and `<dotbox-new-component>`

### Component Template (Web Components + JavaScript API)
```javascript
// NewComponent.js
class NewComponent {
  constructor(options = {}) {
    this.options = {
      // Default options
      ...options
    };
    this.element = this._render();
    this.bindEvents();
  }

  _render() {
    const element = document.createElement('div');
    element.className = 'dotbox-newcomponent';
    // Component implementation
    return element;
  }

  bindEvents() {
    // Event handling logic
  }

  getElement() {
    return this.element;
  }
}

// Web Component for HTML usage
class DotboxNewComponentElement extends HTMLElement {
  constructor() {
    super();
    this.componentInstance = null;
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['attribute1', 'attribute2']; // List attributes to observe
  }

  attributeChangedCallback() {
    if (this.componentInstance) {
      this.render();
    }
  }

  render() {
    // Get attributes and create component instance
    const options = {
      // Parse attributes to options
    };

    // Clean up previous instance
    if (this.componentInstance) {
      this.innerHTML = '';
    }

    // Create new component instance
    this.componentInstance = new NewComponent({
      ...options,
      onClick: () => {
        // Dispatch custom event
        this.dispatchEvent(new CustomEvent('dotbox-click', {
          detail: options,
          bubbles: true
        }));
      }
    });

    // Clear content and append component
    this.innerHTML = '';
    this.appendChild(this.componentInstance.getElement());
  }

  // Expose component methods
  methodName() {
    this.setAttribute('attribute', 'value');
    return this;
  }
}

// Register custom element
if (typeof customElements !== 'undefined') {
  customElements.define('dotbox-new-component', DotboxNewComponentElement);
}

// Export for global and module usage
if (typeof window !== 'undefined') {
  window.Dotbox = window.Dotbox || {};
  window.Dotbox.NewComponent = NewComponent;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = NewComponent;
}
```

### CSS Template
```css
/* NewComponent.css */
.dotbox-newcomponent {
  background: var(--color-bg-card);
  color: var(--color-text);
  border-radius: var(--radius);
  padding: var(--spacing-md);
  border: 1px solid var(--color-border);
  font-family: var(--font-family);
}

.dotbox-newcomponent:hover {
  background: var(--color-bg-hover);
}
```

### Component Documentation (component.json)

Each component **MUST** include a `component.json` file for automatic documentation generation:

```json
{
  "name": "NewComponent",
  "description": "Brief description of what the component does",
  "category": "Input|Display|Layout|Navigation",
  "version": "1.0.0",
  "properties": [
    {
      "name": "propertyName",
      "type": "string|boolean|number|function|object",
      "default": "defaultValue",
      "description": "What this property does",
      "options": ["option1", "option2"] // Optional for enums
    }
  ],
  "methods": [
    {
      "name": "methodName",
      "parameters": [
        {
          "name": "paramName",
          "type": "string",
          "description": "Parameter description"
        }
      ],
      "returns": "ReturnType",
      "description": "What this method does"
    }
  ],
  "events": [
    {
      "name": "dotbox-event-name",
      "description": "When this event is fired",
      "detail": {
        "property": "type"
      }
    }
  ],
  "webComponent": {
    "tag": "dotbox-new-component",
    "attributes": ["attr1", "attr2"]
  },
  "examples": [
    {
      "title": "Basic Usage",
      "description": "Simple example",
      "code": "<dotbox-new-component>Content</dotbox-new-component>"
    }
  ],
  "dependencies": [],
  "cssClasses": [
    {
      "name": ".dotbox-newcomponent",
      "description": "Main component class"
    }
  ]
}
```

**Documentation Benefits:**
- **Automatic API Documentation**: Properties, methods, events auto-generated
- **Live Examples**: CodeBlock components with working previews
- **IDE Integration**: IntelliSense and auto-completion support
- **Type Safety**: Clear parameter and return types
- **Consistency**: Standardized documentation across all components

## 🎨 Styling Guidelines

### CSS Variables Usage
Always use theme variables instead of hardcoded values:

```css
/* ✅ GOOD */
.my-component {
  color: var(--color-text);
  background: var(--color-bg-card);
  padding: var(--spacing-md);
  border-radius: var(--radius);
}

/* ❌ BAD */
.my-component {
  color: #333;
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
}
```

### Available CSS Variables
See `src/styles/theme.css` for the complete list. Common variables include:

**Colors:**
- `--color-bg`, `--color-bg-panel`, `--color-bg-card`
- `--color-text`, `--color-text-muted`, `--color-text-inverse`
- `--color-primary`, `--color-border`, `--color-border-light`

**Spacing:**
- `--spacing-xs`, `--spacing-sm`, `--spacing-md`, `--spacing-lg`

**Layout:**
- `--radius`, `--radius-lg`
- `--font-family`

## 🧪 Testing

### Manual Testing
1. Build the project: `npm run build`
2. Start docs server: `npm run docs`
3. Test your component in the browser at `http://localhost:3000`
4. Test both light and dark themes
5. Test responsive behavior

### Documentation Integration

**🎉 NEW: Dynamic Documentation System!**

The documentation system is now a **Single Page Application (SPA)** that automatically discovers and generates component documentation:

1. **Component Discovery**: Automatically scans and loads all `component.json` files from `src/components/`
2. **Dynamic Page Generation**: Creates complete documentation pages with examples, API reference, and usage guides
3. **Client-Side Routing**: Navigate between components with `/component/component-name` URLs
4. **Search & Navigation**: Real-time component search with organized categories
5. **Responsive Design**: Mobile-friendly documentation with collapsible navigation
6. **Theme Support**: Automatic theme switching with localStorage persistence

### Documentation System Architecture

**🔒 Secure API-Based System:**
The documentation uses a secure Express server with dedicated API endpoints instead of direct file access.

**API Endpoints:**
- `GET /api/components` - Lists all available components
- `GET /api/component/{name}/metadata` - Returns component.json data
- `GET /api/component/{name}/css` - Returns component CSS
- `GET /api/component/{name}/js` - Returns component JavaScript
- `GET /api/component/{name}/examples` - Lists available examples
- `GET /api/component/{name}/example/{example}` - Returns specific example code

**Core Files:**
- `docs/index.html` - Main SPA entry point
- `docs/app.js` - Main application controller with routing
- `docs/component-discovery.js` - Component metadata loading via API
- `docs/page-generator.js` - HTML page generation from API data
- `docs/dynamic-docs.css` - Complete styling system for documentation
- `docs/DotboxUIPrerender.js` - JSFiddle integration with prerender functions
- `docs-server.js` - Express server with secure API endpoints

**Component Examples Structure:**

✅ **All components now include an `examples/` directory with `.wc` files:**
```
src/components/Button/examples/
├── basic_button.wc               # Simple usage
├── button_variants.wc            # Different variants
├── button_sizes.wc               # Size variations
├── button_states.wc              # States (loading, disabled, etc.)
└── comprehensive_examples.wc     # Complete showcase

src/components/Form/examples/
├── form_layouts.wc               # Vertical, horizontal, grid layouts

src/components/Menu/examples/
├── menu_variations.wc            # Different menu configurations

+ Examples for all 16 components automatically loaded via API
```

**Example File Naming:**
- Use `snake_case` for file names
- End with `.wc` extension
- Name should describe the example purpose
- Examples are automatically loaded and displayed as CodeBlocks

**Running Documentation:**
```bash
# Recommended: Use the Express development server with secure API
npm run docs
# Visit http://localhost:3000 for dynamic documentation

# AI Assistant/Alternative Port: Run on a different port
npm run docs -- --port 8000
# Visit http://localhost:8000, useful for AI tools or avoiding port conflicts

# Alternative: Simple HTTP server (limited functionality)
cd docs
python3 -m http.server 8080
# Visit http://localhost:8080 for basic documentation
```

### Documentation Features

**Enhanced CodeBlock System:**
- **Live Preview**: Examples render with working components above the code
- **Expandable Editor**: Users can expand code blocks for better editing
- **JSFiddle Integration**: One-click export to JSFiddle for experimentation
- **Syntax Highlighting**: Prism.js integration with theme-aware colors
- **Standard Language Types**: Uses standard language identifiers (html, javascript, css)

**Example from component.json:**
```json
{
  "examples": [
    {
      "title": "Button Variants",
      "description": "Different button styles",
      "code": "<dotbox-button variant=\"primary\">Primary</dotbox-button>\n<dotbox-button variant=\"secondary\">Secondary</dotbox-button>"
    }
  ]
}
```

**Results in:**
- ✅ Live preview showing actual buttons
- ✅ Expandable code editor
- ✅ JSFiddle export button
- ✅ Syntax highlighted code
- ✅ Responsive design

## 📋 Best Practices

### Component Design
- **Self-contained**: Each component should work independently
- **Dual API**: Implement both Web Components and JavaScript API
- **Web Components First**: Primary usage should be HTML syntax like `<dotbox-component>`
- **Custom Events**: Emit `dotbox-*` events for consistency
- **Attribute Driven**: Web Components should be configurable via HTML attributes
- **Theme-aware**: Always use CSS variables
- **Accessible**: Consider keyboard navigation and screen readers
- **Responsive**: Components should work on all screen sizes

### Code Quality
- **No global pollution**: All selectors component-scoped
- **No hardcoded styling in JS**: Always use CSS variables
- **Pipeline-safe**: Everything reproducible via `npm run build`
- **Documentation-ready**: Docs should be a "real" consumer
- **Event Consistency**: All custom events follow `dotbox-*` naming pattern

### Configuration Options
For components that need multiple display modes (like Menu with/without borders):
```javascript
// ✅ GOOD - Configuration option
const menu = new Dotbox.Menu({
  bordered: false // Clear configuration
});

// ❌ BAD - CSS overrides
// Requiring users to write custom CSS
```

## 🚀 Submitting Changes

### Pull Request Process
1. Create a feature branch: `git checkout -b feature-amazing-component`
2. Make your changes following these guidelines
3. **REQUIRED: Create component.json documentation file**
4. Test thoroughly:
   ```bash
   npm run build
   npm run docs
   ```
5. Verify your component:
   - ✅ Appears automatically in documentation
   - ✅ Works correctly in both light/dark themes
   - ✅ Has proper `component.json` with examples
   - ✅ Follows CSS variable patterns
   - ✅ Includes both Web Component and JavaScript APIs
6. Commit with clear, descriptive messages
7. Push to your fork
8. Create a Pull Request with:
   - Clear description of changes
   - Screenshots/GIFs if visual changes
   - Testing instructions
   - Link to component's documentation page

### Commit Message Format
```
feat: add NewComponent with theme support

- Implements self-contained NewComponent
- Follows theme variable patterns
- Includes comprehensive documentation
- Tests pass in both light/dark themes
```

## 🔍 Code Review

Pull requests will be reviewed for:
- **Architecture compliance**: Follows our component structure
- **Theme integration**: Proper use of CSS variables
- **Self-containment**: No external dependencies or global pollution
- **Documentation**: Component examples and usage
- **Testing**: Works in both themes and responsive

## 🐛 Reporting Issues

When reporting bugs or requesting features:
1. Check existing issues first
2. Provide clear reproduction steps
3. Include browser/environment information
4. For visual bugs, include screenshots
5. For feature requests, explain the use case

## 📚 Additional Resources

- [Component Architecture](README.md#-component-architecture)
- [Web Components Usage](README.md#-web-component-examples-primary-usage)
- [Theme System](README.md#-theme-system)
- [JSON Documentation System](README.md#-documentation)
- [Live Documentation](https://andymcloid.github.io/dotbox-ui)

## 📞 Getting Help

- 💬 [GitHub Discussions](https://github.com/andymcloid/dotbox-ui/discussions)
- 🐛 [Issue Tracker](https://github.com/andymcloid/dotbox-ui/issues)
- 📖 [Documentation](https://andymcloid.github.io/dotbox-ui)

## 🎨 Recent Component Innovations (2024)

### Smart Button Animations & Icon Component

**Advanced Button System** - Recent work has enhanced the Button component with smart conditional animations:

```css
/* Smart animations only apply to buttons with BOTH text AND icon */
.btn:not(.btn-no-icon):not(.btn-icon-only):hover .btn-text {
    flex-basis: 0;
    opacity: 0;
    transform: translateX(-10px);
}
```

**Button Types & Classes:**
- `btn-no-icon` - Text-only buttons (no animation)
- `btn-icon-only` - Icon-only buttons (no animation)
- `btn` with text + icon - Smart animation on hover

**Icon Component** - New reusable Icon component (`src/components/Icon/`) supports:
- Predefined SVG icons (code, delete, check, arrow-*, etc.)
- Emoji icons with automatic detection
- Custom SVG content
- Image URLs with fallback handling
- `currentColor` inheritance for proper theming

**Width Attribute Support** - Button component now supports custom widths:
```html
<dotbox-button width="100%">Full Width</dotbox-button>
<dotbox-button width="120px">Fixed Width</dotbox-button>
```

**Documentation Integration** - All documentation system buttons now use dotbox-button:
- Theme toggle button with sun/moon icon switching
- CodeBlock toolbar buttons with fixed widths
- Consistent styling across documentation

**Key Implementation Details:**
- Web Components use `setAttribute('text')` instead of `textContent` for consistent behavior
- Icon component auto-detects icon type (emoji, SVG, predefined, image)
- Button animations use CSS flexbox transitions for smooth effects
- Component initialization handles SPA routing properly

**Icon Integration Troubleshooting:**
- If predefined icons show as text instead of SVG, check Button component fallback in `Button.js`
- Button fallback `predefinedIcons` must include all icons used in the system
- When adding new predefined icons to Icon component, also add them to Button fallback
- Common icons needing fallback: 'code', 'arrow-up', 'arrow-down', 'delete', 'check', 'plus'
- Button fallback ensures icons work even if Icon component loads after Button component

## 🔄 For AI Assistants: Project Knowledge Persistence

When working with this project after a restart, always:

1. **Read CONTRIBUTING.md first** - Contains all architecture rules and examples
2. **Understand the new build system** - Components are auto-discovered, no manual index maintenance
3. **Study component.json files** - Primary source of component documentation
4. **Key files to understand project structure:**
   - `CONTRIBUTING.md` (this file) - Complete project rules and new systems
   - `build/generate-index.js` - Dynamic build system that auto-discovers components
   - `build/build.js` - Main build orchestration script
   - `src/components/*/component.json` - Component documentation and API definitions
   - `docs/DotboxUIPrerender.js` - Docs-specific JSFiddle prerender function

**New Architecture (2024):**
- **Auto-Discovery**: Components automatically found by scanning `src/components/`
- **Dynamic Index Files**: `src/index.js` and `src/index.css` generated automatically
- **Component Documentation**: Uses `component.json` for automatic API docs generation
- **Enhanced CodeBlock**: Live preview, JSFiddle integration, standard language types
- **Smart Button System**: Conditional animations, Icon component integration, width attribute support
- **No Manual Integration**: Just create component folder and run `npm run build`

**Critical Rules to Remember:**
- All components need dual API (Web Components + JavaScript)
- Use CSS variables only, never hardcoded values
- **MANDATORY:** Create `component.json` with examples, properties, methods, events
- **ALWAYS run `npm run build`** to auto-integrate and verify components work
- **Test both Web Component and JavaScript API** in documentation
- **Use setAttribute('text')** instead of textContent for dotbox-button components
- **Icon component should be used** for reusable icon display across components

**Integration Checklist (Use This Every Time):**
- [ ] Component files created in `src/components/ComponentName/`
  - [ ] `ComponentName.js` (implementation)
  - [ ] `ComponentName.css` (styles)
  - [ ] `component.json` (documentation)
- [ ] `npm run build` runs successfully and auto-discovers component
- [ ] Component appears and functions in documentation
- [ ] Both `<dotbox-component>` and `new Dotbox.Component()` work
- [ ] Examples in `component.json` render correctly with live preview
- [ ] If using icons, consider integrating with Icon component for consistency

---

Thank you for contributing to Dotbox UI! 🎉