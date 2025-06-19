const tabView = new Dotbox.TabView({
    tabs: [
        { id: 'tab1', label: 'Tab 1', content: 'Content 1' },
        { id: 'tab2', label: 'Tab 2', content: 'Content 2' }
    ]
});

document.body.appendChild(tabView.getElement());