// Basic button
const button = new Dotbox.Button({
    text: 'Click me',
    variant: 'primary',
    onClick: () => alert('Button clicked!')
});

// Different variants
const primaryBtn = new Dotbox.Button({ text: 'Primary', variant: 'primary' });
const secondaryBtn = new Dotbox.Button({ text: 'Secondary', variant: 'secondary' });
const successBtn = new Dotbox.Button({ text: 'Success', variant: 'success' });
const dangerBtn = new Dotbox.Button({ text: 'Danger', variant: 'danger' });

// Different sizes
const smallBtn = new Dotbox.Button({ text: 'Small', size: 'small' });
const mediumBtn = new Dotbox.Button({ text: 'Medium', size: 'medium' });
const largeBtn = new Dotbox.Button({ text: 'Large', size: 'large' });

// With icons
const iconBtn = new Dotbox.Button({ text: 'Save', icon: '💾' });
const iconOnlyBtn = new Dotbox.Button({ text: '', icon: '📁' });

// States
const loadingBtn = new Dotbox.Button({ text: 'Loading', loading: true });
const disabledBtn = new Dotbox.Button({ text: 'Disabled', disabled: true });