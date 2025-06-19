const dropdown = new Dotbox.Dropdown({
    label: 'Country',
    placeholder: 'Select your country',
    options: [
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'de', label: 'Germany' },
        { value: 'fr', label: 'France' }
    ],
    helpText: 'Choose your country of residence',
    onChange: (e) => console.log('Selected:', e.target.value)
});

const sortDropdown = new Dotbox.Dropdown({
    placeholder: 'Sort by...',
    size: 'small',
    options: [
        { value: 'name', label: 'Name' },
        { value: 'date', label: 'Date' },
        { value: 'size', label: 'Size' }
    ],
    onChange: (e) => console.log('Sort by:', e.target.value)
});

document.body.appendChild(dropdown.getContainer());
document.body.appendChild(sortDropdown.getContainer());