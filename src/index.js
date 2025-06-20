// Import all components
const Button = require('./components/Button/Button.js');
const ModalDialog = require('./components/ModalDialog/ModalDialog.js');
const TabView = require('./components/TabView/TabView.js');
const TextBox = require('./components/TextBox/TextBox.js');
const Dropdown = require('./components/Dropdown/Dropdown.js');
const MetricItem = require('./components/MetricItem/MetricItem.js');
const ToolButton = require('./components/ToolButton/ToolButton.js');
const Menu = require('./components/Menu/Menu.js');
const CodeBlock = require('./components/CodeBlock/CodeBlock.js');
const Loader = require('./components/Loader/Loader.js');
const Checkbox = require('./components/Checkbox/Checkbox.js');
const Section = require('./components/Section/Section.js');
const Form = require('./components/Form/Form.js');
const Toggle = require('./components/Toggle/Toggle.js');
const Notification = require('./components/Notification/Notification.js');
const MessageBox = require('./components/MessageBox/MessageBox.js');

// Import all styles (except theming)
require('./index.css');

// Export components
const Dotbox = {
    Button,
    ModalDialog,
    TabView,
    TextBox,
    Dropdown,
    MetricItem,
    ToolButton,
    Menu,
    CodeBlock,
    Loader,
    Checkbox,
    Section,
    Form,
    Toggle,
    Notification,
    MessageBox
};
if (typeof window !== 'undefined') {
    window.Dotbox = Dotbox;
}
module.exports = Dotbox; 