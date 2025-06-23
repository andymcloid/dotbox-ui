const modal = new Dotbox.ModalDialog('demo-modal', {
    closeOnOverlayClick: true,
    closeOnEsc: true
});

modal.setTitle('Demo Modal')
    .setBody('<p>This is a demo modal dialog.</p>')
    .addFooterButton('Close', 'action-btn', () => modal.close());

const openModalBtn = new Dotbox.Button({
    text: 'Open Modal',
    onClick: () => modal.show()
});
document.body.appendChild(openModalBtn.getElement());