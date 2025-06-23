// Static MessageBox examples
const successBox = new Dotbox.MessageBox({
    title: 'Success!',
    message: 'Your profile has been updated successfully.',
    variant: 'success',
    closable: true
});

const errorBox = new Dotbox.MessageBox({
    title: 'Error',
    message: 'Failed to save your changes. Please try again.',
    variant: 'danger',
    closable: true
});

const warningBox = new Dotbox.MessageBox({
    title: 'Confirmation',
    message: 'Are you sure you want to delete this item?',
    variant: 'warning',
    closable: false
});

// Programmatic MessageBox examples
function showConfirmDialog() {
    Dotbox.MessageBox.confirm('Are you sure you want to proceed?', 'Confirmation')
        .then(() => {
            console.log('User confirmed');
        })
        .catch(() => {
            console.log('User cancelled');
        });
}

function showSuccessMessage() {
    Dotbox.MessageBox.success('Operation completed successfully!', 'Success');
}

function showErrorMessage() {
    Dotbox.MessageBox.error('Something went wrong. Please try again.', 'Error');
}

function showCustomMessage() {
    Dotbox.MessageBox.show({
        title: 'Custom Message',
        message: 'This is a custom message with multiple buttons.',
        variant: 'primary',
        buttons: [
            { text: 'Cancel', variant: 'secondary' },
            { text: 'Save Draft', variant: 'secondary' },
            { text: 'Publish', variant: 'success' }
        ]
    }).then((buttonIndex) => {
        console.log('Button clicked:', buttonIndex);
    });
}