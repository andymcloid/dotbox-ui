const loginForm = new Dotbox.Form({
    layout: 'vertical',
    gap: 'medium',
    onSubmit: (data) => {
        console.log('Login attempt:', data);
        alert('Login form submitted! Check console for data.');
    }
});

const username = new Dotbox.TextBox({ label: 'Username', placeholder: 'Enter username', required: true });
const password = new Dotbox.TextBox({ label: 'Password', type: 'password', placeholder: 'Enter password', required: true });
const remember = new Dotbox.Checkbox({ label: 'Remember me', name: 'remember' });

loginForm.addFields([username, password, remember]);
loginForm.addSubmitButton({ text: 'Login', variant: 'primary' });
loginForm.addButton({ text: 'Forgot Password?', variant: 'secondary' });

const registrationForm = new Dotbox.Form({
    layout: 'grid',
    columns: 2,
    gap: 'large',
    onSubmit: (data) => console.log('Registration data:', data)
});

const firstName = new Dotbox.TextBox({ label: 'First Name', placeholder: 'John' });
const lastName = new Dotbox.TextBox({ label: 'Last Name', placeholder: 'Doe' });
const email = new Dotbox.TextBox({ label: 'Email', type: 'email', placeholder: 'john@example.com' });
const country = new Dotbox.Dropdown({
    label: 'Country',
    options: [
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' }
    ]
});

registrationForm.addFields([firstName, lastName, email, country]);
registrationForm.addSubmitButton({ text: 'Register', variant: 'success' });

document.body.appendChild(loginForm.getElement());
document.body.appendChild(registrationForm.getElement());

setTimeout(() => {
    loginForm.setLayout('horizontal');
    registrationForm.setColumns(3);
}, 5000);