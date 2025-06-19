const section = new Dotbox.Section({
    title: 'Getting Started'
});
section.setContent('<p>This is a basic section created with JavaScript.</p>');

const plainSection = new Dotbox.Section();
plainSection.setContent(`
    <h3>Custom Content</h3>
    <p>This section has no title, just content.</p>
    <ul>
        <li>Perfect for flexible layouts</li>
        <li>Easy to customize</li>
    </ul>
`);

const formSection = new Dotbox.Section({
    title: 'Contact Form Example'
});

const form = new Dotbox.Form({
    layout: 'vertical',
    gap: 'medium',
    onSubmit: (data) => console.log('Form submitted:', data)
});

const nameField = new Dotbox.TextBox({ label: 'Full Name', placeholder: 'Enter your full name', required: true });
const emailField = new Dotbox.TextBox({ label: 'Email', type: 'email', placeholder: 'your@email.com', required: true });
const subjectField = new Dotbox.Dropdown({ 
    label: 'Subject', 
    placeholder: 'Select a topic',
    options: [
        { value: 'general', label: 'General Inquiry' },
        { value: 'support', label: 'Technical Support' },
        { value: 'billing', label: 'Billing Question' }
    ]
});
const newsletter = new Dotbox.Checkbox({ label: 'Subscribe to newsletter' });

form.addFields([nameField, emailField, subjectField, newsletter]);
form.addSubmitButton({ text: 'Send Message', variant: 'primary' });

formSection.appendChild(form.getElement());

document.body.appendChild(section.getElement());
document.body.appendChild(plainSection.getElement());
document.body.appendChild(formSection.getElement());

setTimeout(() => {
    section.setTitle('Updated Title!');
}, 3000);