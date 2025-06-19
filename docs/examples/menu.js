const menu = new Dotbox.Menu({
    items: [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'services', label: 'Services' },
        { id: 'contact', label: 'Contact' }
    ],
    selected: 'home',
    onSelect: (id) => console.log('Selected:', id)
});

const routingMenu = new Dotbox.Menu({
    items: [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'analytics', label: 'Analytics' },
        { id: 'settings', label: 'Settings' }
    ],
    routingMode: true,
    onSelect: (id) => console.log('Navigated to:', id)
});

const collapsibleMenu = new Dotbox.Menu({
    items: [
        { id: 'new', label: 'New File', group: 'file', groupHeader: 'File Operations' },
        { id: 'open', label: 'Open', group: 'file', groupHeader: 'File Operations' },
        { id: 'save', label: 'Save', group: 'file', groupHeader: 'File Operations' },
        { id: 'copy', label: 'Copy', group: 'edit', groupHeader: 'Edit' },
        { id: 'paste', label: 'Paste', group: 'edit', groupHeader: 'Edit' },
        { id: 'find', label: 'Find', group: 'edit', groupHeader: 'Edit' },
        { id: 'zoom-in', label: 'Zoom In', group: 'view', groupHeader: 'View' },
        { id: 'zoom-out', label: 'Zoom Out', group: 'view', groupHeader: 'View' }
    ],
    collapsibleHeaders: true,
    headerArrowPosition: 'right',
    compact: true,
    bordered: false,
    onSelect: (id) => console.log('Menu action:', id)
});

const leftArrowMenu = new Dotbox.Menu({
    items: [
        { id: 'overview', label: 'Overview', group: 'docs', groupHeader: 'Documentation' },
        { id: 'getting-started', label: 'Getting Started', group: 'docs', groupHeader: 'Documentation' },
        { id: 'installation', label: 'Installation', group: 'docs', groupHeader: 'Documentation' },
        { id: 'basic-usage', label: 'Basic Usage', group: 'examples', groupHeader: 'Examples' },
        { id: 'advanced', label: 'Advanced', group: 'examples', groupHeader: 'Examples' }
    ],
    collapsibleHeaders: true,
    headerArrowPosition: 'left',
    compact: true,
    bordered: false,
    onSelect: (id) => console.log('Selected:', id)
});

const compactMenu = new Dotbox.Menu({
    items: [
        { id: 'file', label: 'File' },
        { id: 'edit', label: 'Edit' },
        { id: 'view', label: 'View' },
        { id: 'tools', label: 'Tools' }
    ],
    compact: true,
    bordered: false,
    onSelect: (id) => console.log('Menu action:', id)
});

document.body.appendChild(menu.getElement());
document.body.appendChild(routingMenu.getElement());
document.body.appendChild(collapsibleMenu.getElement());
document.body.appendChild(leftArrowMenu.getElement());
document.body.appendChild(compactMenu.getElement());