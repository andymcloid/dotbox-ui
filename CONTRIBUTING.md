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

### 2. Styling & Themes

- **All core variables** (colors, spacing, radius, etc.) defined in theme file (`src/styles/theme.css`)
- **theme.css contains both light and dark themes**, scoped to `:root.theme-light` and `:root.theme-dark`
- **main.css and component CSS use ONLY CSS variables** (e.g., `var(--color-bg)`, `var(--spacing-md)`)
- **Want rounded components?** Set `--radius: 8px;` in theme.css
- **Want spacing?** Define `--spacing-xs`, `--spacing-sm`, `--spacing-md`, `--spacing-lg` in theme.css
- **No hardcoded padding, margin, border-radius, colors, etc. in component CSS**

### 3. Build & Distribution

- **All source code and CSS in `src/`**
- **`npm run build` builds and copies EVERYTHING to `dist/`**:
  - JS bundle to `dist/bundle.js`
  - All component CSS merged to `dist/index.css`
  - `theme.css` copied to `dist/theme.css`
- **No CSS or JS in `docs/`** - docs is just a consumer

### 4. Consumption & Documentation

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

### Component Template
```javascript
// NewComponent.js
class NewComponent {
  constructor(options = {}) {
    this.options = {
      // Default options
      ...options
    };
    this.element = this._render();
  }

  _render() {
    const element = document.createElement('div');
    element.className = 'dotbox-newcomponent';
    // Component implementation
    return element;
  }

  getElement() {
    return this.element;
  }
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
1. Adding it to the navigation menu
2. Creating a demo section
3. Including usage examples

## 📋 Best Practices

### Component Design
- **Self-contained**: Each component should work independently
- **Configurable**: Use options objects for customization
- **Theme-aware**: Always use CSS variables
- **Accessible**: Consider keyboard navigation and screen readers
- **Responsive**: Components should work on all screen sizes

### Code Quality
- **No global pollution**: All selectors component-scoped
- **No hardcoded styling in JS**: Always use CSS variables
- **Pipeline-safe**: Everything reproducible via `npm run build`
- **Documentation-ready**: Docs should be a "real" consumer

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
3. Test thoroughly:
   ```bash
   npm run build
   npm run docs
   ```
4. Commit with clear, descriptive messages
5. Push to your fork
6. Create a Pull Request with:
   - Clear description of changes
   - Screenshots/GIFs if visual changes
   - Testing instructions

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
- [Theme System](README.md#-theme-system)
- [Live Documentation](https://andymcloid.github.io/dotbox-ui)

## 📞 Getting Help

- 💬 [GitHub Discussions](https://github.com/andymcloid/dotbox-ui/discussions)
- 🐛 [Issue Tracker](https://github.com/andymcloid/dotbox-ui/issues)
- 📖 [Documentation](https://andymcloid.github.io/dotbox-ui)

---

Thank you for contributing to Dotbox UI! 🎉