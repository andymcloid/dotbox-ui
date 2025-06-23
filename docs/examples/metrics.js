const metric = new Dotbox.MetricItem('cpu-metric', {
    label: 'CPU Usage',
    value: '75%',
    trend: 'up',
    icon: '📈'
});

document.body.appendChild(metric.getElement());