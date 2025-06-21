# Dotbox UI

A modern, lightweight, and themeable UI component library for building beautiful web applications.

## 🌟 Features

- **🎯 Web Components**: Use components directly in HTML with intuitive syntax like `<dotbox-button variant="primary">Click me!</dotbox-button>`
- **🔄 Dual API**: Web Components (primary) + JavaScript API (alternative) for maximum flexibility
- **🎨 Modern Design**: Clean, professional components with smooth animations
- **🌙 Theme System**: Built-in light/dark themes with full customization support  
- **📦 Self-Contained**: Each component manages its own styling and dependencies
- **🏗️ Framework Agnostic**: Works with vanilla JS, React, Vue, or any framework
- **⚡ No Dependencies**: Lightweight with no external runtime dependencies

## 📦 Installation

### From CDN (Recommended)
Use Dotbox UI directly from jsDelivr CDN. Files are automatically updated on every push to master:

```html
<!-- Latest build via jsDelivr CDN -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/andymcloid/dotbox-ui@release/index.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/andymcloid/dotbox-ui@release/theme.css">
<script src="https://cdn.jsdelivr.net/gh/andymcloid/dotbox-ui@release/bundle.js"></script>
```

### Alternative: Local Development
Clone the repository for local development:

```bash
git clone https://github.com/andymcloid/dotbox-ui.git
cd dotbox-ui
npm install
npm run build
```

## 🚀 Quick Start

### 🎯 Web Components (Primary Usage)

```html
<!DOCTYPE html>
<html class="theme-light">
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/andymcloid/dotbox-ui@release/index.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/andymcloid/dotbox-ui@release/theme.css">
</head>
<body>
    <!-- Use components directly in HTML! -->
    <dotbox-button variant="primary" onclick="alert('Hello Dotbox UI!')">Click me!</dotbox-button>
    
    <dotbox-textbox label="Username" placeholder="Enter your username" help-text="This will be your display name"></dotbox-textbox>
    
    <dotbox-metric label="CPU Usage" value="75%" icon="📈" trend="up"></dotbox-metric>
    
    <script src="https://cdn.jsdelivr.net/gh/andymcloid/dotbox-ui@release/bundle.js"></script>
    
    <script>
        // Event handling with Web Components
        document.querySelector('dotbox-button').addEventListener('dotbox-click', (e) => {
            console.log('Button clicked!', e.detail);
        });
        
        document.querySelector('dotbox-textbox').addEventListener('dotbox-input', (e) => {
            console.log('Input value:', e.detail.value);
        });
    </script>
</body>
</html>
```

### 🔄 JavaScript API (Alternative)

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
        // Create components programmatically
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
- **Dropdown**: Select dropdown with TextBox-like styling and multiple options
- **MetricItem**: Display metrics with trends and icons
- **ToolButton**: Specialized buttons for tools and actions
- **CodeBlock**: Syntax-highlighted code display
- **Menu**: Navigation menus with selection states

### 🎯 Web Component Examples (Primary Usage)

#### Button
```html
<!-- Basic buttons -->
<dotbox-button variant="primary">Primary</dotbox-button>
<dotbox-button variant="secondary">Secondary</dotbox-button>
<dotbox-button variant="danger">Danger</dotbox-button>
<dotbox-button variant="success">Success</dotbox-button>

<!-- With attributes -->
<dotbox-button variant="primary" size="large" icon="🚀">Launch</dotbox-button>
<dotbox-button variant="danger" disabled>Disabled</dotbox-button>
<dotbox-button variant="primary" loading>Loading</dotbox-button>

<!-- Event handling -->
<script>
document.querySelector('dotbox-button').addEventListener('dotbox-click', (e) => {
    console.log('Button clicked:', e.detail);
});
</script>
```

#### Modal Dialog
```html
<!-- Simple modal -->
<dotbox-modal-dialog id="my-modal" title="Example Modal">
    <p>Modal content goes here</p>
    <p>Automatically handles ESC key and overlay clicks</p>
</dotbox-modal-dialog>

<dotbox-button onclick="document.getElementById('my-modal').show()">
    Open Modal
</dotbox-button>

<!-- Event handling -->
<script>
document.getElementById('my-modal').addEventListener('dotbox-open', (e) => {
    console.log('Modal opened:', e.detail.id);
});
</script>
```

#### TextBox with Animation
```html
<!-- Various text inputs -->
<dotbox-textbox label="Username" placeholder="Enter your username" help-text="This will be your display name"></dotbox-textbox>
<dotbox-textbox label="Email" type="email" placeholder="user@example.com" help-text="We'll never share your email"></dotbox-textbox>
<dotbox-textbox label="Password" type="password" placeholder="Enter a secure password"></dotbox-textbox>

<!-- Event handling -->
<script>
document.querySelector('dotbox-textbox').addEventListener('dotbox-input', (e) => {
    console.log('Input value:', e.detail.value);
});
</script>
```

#### Dropdown
```html
<!-- Select dropdowns -->
<dotbox-dropdown 
    label="Country" 
    placeholder="Select your country"
    help-text="Choose your country of residence"
    options='[{"value":"us","label":"United States"},{"value":"ca","label":"Canada"},{"value":"uk","label":"United Kingdom"}]'>
</dotbox-dropdown>

<dotbox-dropdown 
    label="Priority" 
    size="small"
    options='[{"value":"low","label":"Low"},{"value":"medium","label":"Medium"},{"value":"high","label":"High"}]'
    value="medium">
</dotbox-dropdown>

<!-- Event handling -->
<script>
document.querySelector('dotbox-dropdown').addEventListener('dotbox-change', (e) => {
    console.log('Selection changed:', e.detail.value, e.detail.selectedOption);
});
</script>
```

#### Metrics
```html
<!-- Display various metrics -->
<dotbox-metric label="CPU Usage" value="75%" icon="📈" trend="up"></dotbox-metric>
<dotbox-metric label="Memory Usage" value="64%" icon="💾" trend="down"></dotbox-metric>
<dotbox-metric label="Active Users" value="1,234" icon="👥" trend="up"></dotbox-metric>
```

#### Tab Views
```html
<!-- Declarative tab interface -->
<dotbox-tab-view active-tab="overview">
    <dotbox-tab-panel id="overview" label="Overview" icon="📊">
        <h3>Overview Content</h3>
        <p>This is the overview tab content.</p>
    </dotbox-tab-panel>
    <dotbox-tab-panel id="details" label="Details" icon="📋">
        <h3>Details Content</h3>
        <p>This is the details tab content.</p>
    </dotbox-tab-panel>
</dotbox-tab-view>
```

#### Menu
```html
<!-- Navigation menu -->
<dotbox-menu 
    data-items='[{"id":"home","label":"Home"},{"id":"about","label":"About"},{"id":"contact","label":"Contact"}]'
    selected="home"
    bordered="true">
</dotbox-menu>

<!-- Borderless menu for sidebars -->
<dotbox-menu 
    data-items='[{"id":"dashboard","label":"Dashboard"},{"id":"analytics","label":"Analytics"}]'
    selected="dashboard">
</dotbox-menu>
```

### 🔄 JavaScript API Examples (Alternative)

<details>
<summary>Click to expand JavaScript API examples</summary>

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

</details>

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

docs/
├── examples/           # Component examples (avoiding JSON escaping)
│   ├── button.wc       # Web Components example
│   ├── button.js       # JavaScript API example
│   ├── textbox.wc      # Web Components example
│   ├── textbox.js      # JavaScript API example
│   └── ...             # All components have both .wc and .js files
├── components.json     # Component configuration (references examples/ files)
└── index.html         # Documentation page
```

## 📖 Documentation

Visit our [live documentation](https://andymcloid.github.io/dotbox-ui) to see all components in action with interactive examples.

### Documentation Structure

All component examples are stored as external files in the `docs/examples/` directory to avoid JSON escaping issues:

- **Web Components examples**: `docs/examples/componentname.wc` - Contains HTML usage examples with `<dotbox-component>` syntax
- **JavaScript API examples**: `docs/examples/componentname.js` - Contains programmatic usage with `new Dotbox.Component()` syntax
- **Component configuration**: `docs/components.json` - References external example files instead of inline code

This structure ensures clean, maintainable examples that work properly with the documentation system.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Contribution Guide
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes following our [architecture guidelines](CONTRIBUTING.md)
4. Test your changes: `npm run build && npm run docs`
5. Submit a pull request

## 📋 Component Architecture

- **🎯 Web Components First**: Primary usage through custom HTML elements with intuitive attribute-based configuration
- **🔄 Dual API Design**: Web Components for declarative HTML usage + JavaScript classes for programmatic control
- **📦 Self-contained**: Each component manages its own CSS and dependencies
- **🎨 Theme-aware**: All styling uses CSS variables from the theme system
- **🚫 No global pollution**: Component-scoped CSS classes
- **⚡ Framework agnostic**: Pure JavaScript with no framework dependencies
- **📡 Custom Events**: Web Components emit custom events (e.g., `dotbox-click`, `dotbox-input`) for easy event handling
- **🔧 Backwards Compatible**: Existing JavaScript API continues to work alongside new Web Components

## 🚀 GitHub Actions & Releases

This project uses GitHub Actions for automated builds, testing, and releases:

### Continuous Integration
- **Every push/PR**: Builds and tests across Node.js 16, 18, and 20
- **Build verification**: Ensures all distribution files are generated correctly
- **Documentation testing**: Verifies the docs server starts successfully

### Automated Distribution
- **GitHub Pages**: Documentation is automatically deployed
- **Release branch**: Built files are automatically pushed to `release` branch for CDN access

### Using the CDN

#### Option 1: CDN (Recommended)
```html
<!-- Latest build from jsDelivr CDN -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/andymcloid/dotbox-ui@release/index.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/andymcloid/dotbox-ui@release/theme.css">
<script src="https://cdn.jsdelivr.net/gh/andymcloid/dotbox-ui@release/bundle.js"></script>
```

#### Option 2: Git Submodule
```bash
git submodule add https://github.com/andymcloid/dotbox-ui.git vendor/dotbox-ui
git submodule update --init --recursive
```

### Automatic CDN Updates
The CDN is automatically updated on every push to master:
1. Push changes to master branch
2. GitHub Actions builds the project 
3. Updates the `release` branch with built files
4. jsDelivr CDN serves the latest build automatically

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙋‍♂️ Support

- 📚 [Documentation](https://andymcloid.github.io/dotbox-ui)
- 🐛 [Issue Tracker](https://github.com/andymcloid/dotbox-ui/issues)
- 💬 [Discussions](https://github.com/andymcloid/dotbox-ui/discussions)

---

Built with ❤️ by the Dotbox UI team