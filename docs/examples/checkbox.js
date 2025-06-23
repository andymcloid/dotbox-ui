const checkbox = new Dotbox.Checkbox({
    label: 'Accept terms and conditions',
    checked: false,
    onChange: (e) => console.log('Checked:', e.target.checked)
});

const successCheckbox = new Dotbox.Checkbox({
    label: 'Success variant',
    variant: 'success',
    size: 'large',
    checked: true
});

const labellessCheckbox = new Dotbox.Checkbox({
    name: 'compact-option',
    value: 'enabled',
    size: 'small',
    checked: true,
    onChange: (e) => console.log('Compact checkbox:', e.target.checked)
});

const labellessCheckbox2 = new Dotbox.Checkbox({
    name: 'feature-toggle',
    value: 'active',
    variant: 'success',
    onChange: (e) => console.log('Feature toggle:', e.target.checked)
});

const smallCheckbox = new Dotbox.Checkbox({
    label: 'Small size',
    size: 'small',
    name: 'preferences',
    value: 'notifications'
});

document.body.appendChild(checkbox.getElement());
document.body.appendChild(successCheckbox.getElement());
document.body.appendChild(labellessCheckbox.getElement());
document.body.appendChild(labellessCheckbox2.getElement());
document.body.appendChild(smallCheckbox.getElement());

setTimeout(() => {
    checkbox.setChecked(true);
    successCheckbox.setVariant('danger');
    smallCheckbox.setDisabled(true);
}, 3000);