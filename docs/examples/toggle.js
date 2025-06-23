// Basic toggle
const toggle = new Dotbox.Toggle({
    checked: false,
    onChange: (checked) => console.log('Toggle changed:', checked)
});

// Pre-checked toggle
const checkedToggle = new Dotbox.Toggle({
    checked: true,
    label: 'Enabled by default'
});

// Different variants
const successToggle = new Dotbox.Toggle({
    variant: 'success',
    label: 'Success variant'
});

const dangerToggle = new Dotbox.Toggle({
    variant: 'danger',
    label: 'Danger variant'
});

// Different sizes
const smallToggle = new Dotbox.Toggle({ size: 'small', label: 'Small' });
const mediumToggle = new Dotbox.Toggle({ size: 'medium', label: 'Medium' });
const largeToggle = new Dotbox.Toggle({ size: 'large', label: 'Large' });

// Disabled toggle
const disabledToggle = new Dotbox.Toggle({
    disabled: true,
    label: 'Disabled'
});