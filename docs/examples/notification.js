// Static notification examples
const successNotification = new Dotbox.Notification({
    message: 'Operation completed successfully!',
    variant: 'success'
});

const dangerNotification = new Dotbox.Notification({
    message: 'Please fix the errors below',
    variant: 'danger'
});

const infoNotification = new Dotbox.Notification({
    message: 'Your changes have been saved',
    variant: 'info'
});

const warningNotification = new Dotbox.Notification({
    message: 'Network connection is slow',
    variant: 'warning'
});

// Popup notification examples
function showSuccess() {
    Dotbox.Notification.success('Profile updated successfully!');
}

function showDanger() {
    Dotbox.Notification.danger('Failed to save changes');
}

function showWarning() {
    Dotbox.Notification.warning('Session will expire in 5 minutes');
}

function showInfo() {
    Dotbox.Notification.info('New features are available');
}

function showCustom() {
    Dotbox.Notification.show('Custom notification', 'success', {
        position: 'top-left',
        timeout: 5000
    });
}