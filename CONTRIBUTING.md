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
- **`npm run build` builds and copies EVERYTHING to `dist/`**:
  - JS bundle to `dist/bundle.js`
  - All component CSS merged to `dist/index.css`
  - `theme.css` copied to `dist/theme.css`
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
└── NewComponent.css
```

### CRITICAL: Build Integration Steps

After creating your component files, you **MUST** integrate it into the build system:

#### 1. Add to Main Index Files
**In `src/index.js`:**
```javascript
// Add import
const NewComponent = require('./components/NewComponent/NewComponent.js');

// Add to Dotbox export object
const Dotbox = {
    Button,
    ModalDialog,
    // ... other components ...
    NewComponent,  // <- Add here
    // ... rest of components ...
};
```

**In `src/index.css`:**
```css
@import './styles/main.css';
@import './components/Button/Button.css';
/* ... other imports ... */
@import './components/NewComponent/NewComponent.css';  /* <- Add here */
/* ... rest of imports ... */
```

#### 2. Run Build Process
```bash
npm run build
```

**⚠️ IMPORTANT:** Without these steps, your component will NOT be available in the documentation or for users. The build will fail silently and `Dotbox.NewComponent` will be undefined, causing "not a constructor" errors.

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

### Component Integration
Add your component to the documentation by:

#### 3. Add JavaScript Demo Function (if needed)
**In `docs/index.html`:**
If your component needs a JavaScript API demo, add it to the `createJSDemo` switch statement:
```javascript
case 'newcomponent':
    createNewComponentJSDemo(container);
    break;
```

And implement the demo function:
```javascript
function createNewComponentJSDemo(container) {
    const newComponent = new Dotbox.NewComponent({
        // Demo options
    });
    container.appendChild(newComponent.getContainer());
}
```

#### 4. Create Example Files
Create example files in the `docs/examples/` directory:

**Create `docs/examples/newcomponent.wc`:**
```html
<dotbox-newcomponent attribute="value">Basic usage</dotbox-newcomponent>
<dotbox-newcomponent variant="primary" size="large">With attributes</dotbox-newcomponent>

<script>
document.querySelectorAll('dotbox-newcomponent').forEach(component => {
    component.addEventListener('dotbox-event', (e) => {
        console.log('Event:', e.detail);
    });
});
</script>
```

**Create `docs/examples/newcomponent.js`:**
```javascript
const component = new Dotbox.NewComponent({
    variant: 'primary',
    size: 'large',
    onEvent: (data) => console.log('Event:', data)
});

const basicComponent = new Dotbox.NewComponent({
    text: 'Basic component'
});

// Add components to the page
document.body.appendChild(component.getElement());
document.body.appendChild(basicComponent.getElement());
```

#### 5. Add to JSON Config
Update `/docs/components.json` with your component:
```json
{
  "id": "newcomponent",
  "name": "New Component",
  "category": "Appropriate Category",
  "description": "Description of your component.",
  "codeWC": "examples/newcomponent.wc",
  "codeJS": "examples/newcomponent.js"
}
```

#### 6. Update README
Add component to Available Components list in `README.md`

#### 7. Test Everything
```bash
npm run build
npm run docs
```
Verify your component appears and works in the documentation

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
3. **CRITICAL: Complete ALL integration steps above** (index.js, index.css, JSON config, etc.)
4. Test thoroughly:
   ```bash
   npm run build
   npm run docs
   ```
5. Verify your component appears in documentation and works correctly
6. Commit with clear, descriptive messages
7. Push to your fork
8. Create a Pull Request with:
   - Clear description of changes
   - Screenshots/GIFs if visual changes
   - Testing instructions
   - Confirmation that all integration steps were completed

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

---

Thank you for contributing to Dotbox UI! 🎉