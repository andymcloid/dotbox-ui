const loader = new Dotbox.Loader({
    size: 'medium',
    variant: 'primary'
});

const successLoader = new Dotbox.Loader({
    size: 'large',
    variant: 'success'
});

const dangerLoader = new Dotbox.Loader({
    size: 'small',
    variant: 'danger'
});

document.body.appendChild(loader.getElement());
document.body.appendChild(successLoader.getElement());
document.body.appendChild(dangerLoader.getElement());

setTimeout(() => {
    loader.setVariant('secondary');
    successLoader.hide();
}, 3000);