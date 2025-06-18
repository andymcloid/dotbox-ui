# Dotbox UI

A modern, lightweight, and themeable UI component library for building beautiful web applications.

## 🌟 Features

- **Modern Design**: Clean, professional components with smooth animations
- **Theme System**: Built-in light/dark themes with full customization support  
- **Self-Contained**: Each component manages its own styling and dependencies
- **TypeScript Ready**: Full type definitions included
- **Framework Agnostic**: Works with vanilla JS, React, Vue, or any framework
- **No Dependencies**: Lightweight with no external runtime dependencies

## 📦 Installation

### From npm
```bash
npm install dotbox-ui
```

### From GitHub Releases (Recommended)
You can use Dotbox UI directly from our GitHub releases without installing:

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/andymcloid/dotbox-ui@latest/dist/index.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/andymcloid/dotbox-ui@latest/dist/theme.css">

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/gh/andymcloid/dotbox-ui@latest/dist/bundle.js"></script>
```

Or download specific releases from: [GitHub Releases](https://github.com/andymcloid/dotbox-ui/releases)

## 🚀 Quick Start

### Basic Setup

```html
<!DOCTYPE html>
<html class="theme-light">
<head>
    <link rel="stylesheet" href="/dist/index.css">
    <link rel="stylesheet" href="/dist/theme.css">
</head>
<body>
    <div id="app"></div>
    
    <script src="/dist/bundle.js"></script>
    <script>
        // Create a button
        const button = new Dotbox.Button({
            text: 'Click me!',
            variant: 'primary',
            onClick: () => alert('Hello Dotbox UI!')
        });
        
        document.getElementById('app').appendChild(button.getElement());
    </script>
</body>
</html>
```

### Available Components

- **Button**: Flexible buttons with multiple variants and sizes
- **ModalDialog**: Modal overlays for displaying content
- **TabView**: Tabbed interfaces for organizing content
- **TextBox**: Input fields with validation and styling
- **MetricItem**: Display metrics with trends and icons
- **ToolButton**: Specialized buttons for tools and actions
- **CodeBlock**: Syntax-highlighted code display
- **Menu**: Navigation menus with selection states

### Component Usage Examples

#### Button
```javascript
const button = new Dotbox.Button({
    text: 'Click Me',
    variant: 'primary', // primary, secondary, danger, success
    size: 'medium',     // small, medium, large
    onClick: () => console.log('Clicked!')
});
```

#### Modal Dialog
```javascript
const modal = new Dotbox.ModalDialog('my-modal', {
    closeOnOverlayClick: true,
    closeOnEsc: true
});

modal.setTitle('Demo Modal')
    .setBody('<p>Modal content here</p>')
    .addFooterButton('Close', 'action-btn', () => modal.close());
```

#### TextBox with Animation
```javascript
const textBox = new Dotbox.TextBox({
    label: 'Username',
    placeholder: 'Enter your username',
    helpText: 'This will be your display name',
    onChange: (e) => console.log('Value:', e.target.value)
});
```

#### Menu
```javascript
const menu = new Dotbox.Menu({
    items: [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'contact', label: 'Contact' }
    ],
    selected: 'home',
    bordered: true, // Set to false for borderless style (perfect for sidebars)
    onSelect: (id) => console.log('Selected:', id)
});

// Borderless menu for navigation sidebars
const sidebarMenu = new Dotbox.Menu({
    items: [...],
    bordered: false // Clean, minimal style without borders/background
});
```

## 🎨 Theme System

### Switching Themes
```javascript
// Switch to dark theme
document.documentElement.className = 'theme-dark';

// Switch to light theme  
document.documentElement.className = 'theme-light';

// Toggle theme
function toggleTheme() {
    const isLight = document.documentElement.classList.contains('theme-light');
    document.documentElement.className = isLight ? 'theme-dark' : 'theme-light';
}
```

### Custom Themes
All styling is controlled through CSS variables. Customize by overriding variables:

```css
:root.theme-custom {
    --color-primary: #your-color;
    --color-bg: #your-background;
    --radius: 8px;
    --font-family: 'Your Font', sans-serif;
    /* ... other variables */
}
```

## 🛠 Development

### Building the Library
```bash
npm run build
```
This generates:
- `dist/bundle.js` - All components bundled
- `dist/index.css` - All component styles
- `dist/theme.css` - Theme variables and base styles

### Running Documentation
```bash
npm run docs
```
Serves the documentation at [http://localhost:3000](http://localhost:3000)

### Project Structure
```
src/
├── components/          # Individual components
│   ├── Button/
│   │   ├── Button.js
│   │   └── Button.css
│   └── ...
├── styles/
│   ├── main.css        # Base styles
│   └── theme.css       # Theme variables
└── index.js            # Main entry point
```

## 📖 Documentation

Visit our [live documentation](https://andymcloid.github.io/dotbox-ui) to see all components in action with interactive examples.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Contribution Guide
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes following our [architecture guidelines](CONTRIBUTING.md)
4. Test your changes: `npm run build && npm run docs`
5. Submit a pull request

## 📋 Component Architecture

- **Self-contained**: Each component manages its own CSS and dependencies
- **Theme-aware**: All styling uses CSS variables from the theme system
- **No global pollution**: Component-scoped CSS classes
- **Framework agnostic**: Pure JavaScript with no framework dependencies

## 🚀 GitHub Actions & Releases

This project uses GitHub Actions for automated builds, testing, and releases:

### Continuous Integration
- **Every push/PR**: Builds and tests across Node.js 16, 18, and 20
- **Build verification**: Ensures all distribution files are generated correctly
- **Documentation testing**: Verifies the docs server starts successfully

### Automated Releases
- **On release creation**: Automatically builds and publishes to npm
- **GitHub Pages**: Documentation is automatically deployed
- **Release assets**: Distribution files are attached to each GitHub release

### Using Stable Releases

#### Option 1: CDN (Recommended)
```html
<!-- Latest stable release -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/andymcloid/dotbox-ui@latest/dist/index.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/andymcloid/dotbox-ui@latest/dist/theme.css">
<script src="https://cdn.jsdelivr.net/gh/andymcloid/dotbox-ui@latest/dist/bundle.js"></script>

<!-- Specific version -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/andymcloid/dotbox-ui@v1.0.0/dist/index.css">
<script src="https://cdn.jsdelivr.net/gh/andymcloid/dotbox-ui@v1.0.0/dist/bundle.js"></script>
```

#### Option 2: Download from Releases
1. Go to [GitHub Releases](https://github.com/andymcloid/dotbox-ui/releases)
2. Download the `dotbox-ui-[version].tar.gz` file
3. Extract and use the `dist/` files in your project

#### Option 3: Git Submodule
```bash
git submodule add https://github.com/andymcloid/dotbox-ui.git vendor/dotbox-ui
git submodule update --init --recursive
```

### Creating Releases
To create a new release:
1. Create and push a git tag: `git tag v1.0.0 && git push origin v1.0.0`
2. Create a GitHub release from the tag
3. GitHub Actions will automatically build and publish the release

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙋‍♂️ Support

- 📚 [Documentation](https://andymcloid.github.io/dotbox-ui)
- 🐛 [Issue Tracker](https://github.com/andymcloid/dotbox-ui/issues)
- 💬 [Discussions](https://github.com/andymcloid/dotbox-ui/discussions)

---

Built with ❤️ by the Dotbox UI team