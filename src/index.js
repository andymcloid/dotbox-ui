// Import components
const Button = require('./components/Button/Button');
const ModalDialog = require('./components/ModalDialog/ModalDialog');
const TabView = require('./components/TabView/TabView');
const TextBox = require('./components/TextBox/TextBox');
const MetricItem = require('./components/MetricItem/MetricItem');
const ToolButton = require('./components/ToolButton/ToolButton');
const Menu = require('./components/Menu/Menu');
const CodeBlock = require('./components/CodeBlock/CodeBlock');

// Import styles
require('./styles/main.css');

// Export components
const DotBox = {
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
    window.DotBox = DotBox;
}
module.exports = DotBox; 