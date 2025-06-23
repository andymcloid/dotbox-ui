const textBox = new Dotbox.TextBox({
    label: 'Username',
    placeholder: 'Enter your username',
    helpText: 'This will be your display name',
    onChange: (e) => console.log('Text changed:', e.target.value)
});

const searchBox = new Dotbox.TextBox({
    placeholder: 'Search products...',
    type: 'search',
    onChange: (e) => console.log('Search:', e.target.value)
});

document.body.appendChild(textBox.getContainer());
document.body.appendChild(searchBox.getContainer());