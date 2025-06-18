// Import all components
const Button = require('./components/Button/Button.js');
const ModalDialog = require('./components/ModalDialog/ModalDialog.js');
const TabView = require('./components/TabView/TabView.js');
const TextBox = require('./components/TextBox/TextBox.js');
const MetricItem = require('./components/MetricItem/MetricItem.js');
const ToolButton = require('./components/ToolButton/ToolButton.js');
const Menu = require('./components/Menu/Menu.js');
const CodeBlock = require('./components/CodeBlock/CodeBlock.js');

// Import all styles (except theming)
require('./index.css');

// Export components
const Dotbox = {
    Button,
    ModalDialog,
    TabView,
    TextBox,
    MetricItem,
    ToolButton,
    Menu,
    CodeBlock
};
if (typeof window !== 'undefined') {
    window.Dotbox = Dotbox;
}
module.exports = Dotbox; 