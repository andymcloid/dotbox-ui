/**
 * Base MetricItem Component
 * Generic reusable metric display component
 */
class MetricItem {
    constructor(id, options = {}) {
        this.id = id;
        this.options = {
            label: 'Metric',
            value: 0,
            unit: '',
            threshold: null,
            warningThreshold: null,
            container: null,
            trend: null,
            icon: null,
            ...options
        };
        this.element = null;
        this.initialize();
    }

    initialize() {
        this.createElement();
        this.render();
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.className = 'metric-item';
        this.element.id = this.id;
        
        if (this.options.container) {
            this.options.container.appendChild(this.element);
        }
    }

    render() {
        const iconHtml = this.options.icon ? `<div class="metric-item-icon">${this.options.icon}</div>` : '';
        const trendHtml = this.options.trend ? `<div class="metric-item-trend trend-${this.options.trend}"></div>` : '';
        
        this.element.innerHTML = `
            ${iconHtml}
            <div class="metric-item-content">
                <div class="metric-item-label">${this.options.label}</div>
                <div class="metric-item-value value">
                    ${this.options.value}
                    <span class="metric-item-unit">${this.options.unit}</span>
                    ${trendHtml}
                </div>
            </div>
        `;
        this.updateStatus();
    }

    updateValue(value) {
        this.options.value = value;
        const valueElement = this.element.querySelector('.metric-item-value');
        if (valueElement) {
            const trendHtml = this.options.trend ? `<div class="metric-item-trend trend-${this.options.trend}"></div>` : '';
            valueElement.innerHTML = `
                ${value}
                <span class="metric-item-unit">${this.options.unit}</span>
                ${trendHtml}
            `;
            valueElement.classList.add('value');
        }
        this.updateStatus();
    }

    updateStatus() {
        // Remove existing status classes
        this.element.classList.remove('warning', 'error', 'success');
        
        const value = parseFloat(this.options.value);
        
        if (this.options.threshold && value >= this.options.threshold) {
            this.element.classList.add('error');
        } else if (this.options.warningThreshold && value >= this.options.warningThreshold) {
            this.element.classList.add('warning');
        } else {
            this.element.classList.add('success');
        }
    }

    show() {
        if (this.element) {
            this.element.style.display = 'flex';
        }
    }

    hide() {
        if (this.element) {
            this.element.style.display = 'none';
        }
    }

    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.element = null;
    }

    // Get the DOM element
    getElement() {
        return this.element;
    }
}

// Web Component for HTML usage
class DotboxMetricElement extends HTMLElement {
    constructor() {
        super();
        this.metricInstance = null;
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['label', 'value', 'unit', 'trend', 'icon', 'threshold', 'warning-threshold'];
    }

    attributeChangedCallback() {
        if (this.metricInstance) {
            this.render();
        }
    }

    render() {
        const id = this.getAttribute('id') || `metric-${Math.random().toString(36).substr(2, 9)}`;
        const label = this.getAttribute('label') || 'Metric';
        const value = this.getAttribute('value') || '0';
        const unit = this.getAttribute('unit') || '';
        const trend = this.getAttribute('trend') || null;
        const icon = this.getAttribute('icon') || null;
        const threshold = this.getAttribute('threshold') ? parseFloat(this.getAttribute('threshold')) : null;
        const warningThreshold = this.getAttribute('warning-threshold') ? parseFloat(this.getAttribute('warning-threshold')) : null;

        // Clean up previous instance
        if (this.metricInstance) {
            this.innerHTML = '';
        }

        // Create new metric instance
        this.metricInstance = new MetricItem(id, {
            label: label,
            value: value,
            unit: unit,
            trend: trend,
            icon: icon,
            threshold: threshold,
            warningThreshold: warningThreshold
        });

        // Clear content and append metric
        this.innerHTML = '';
        this.appendChild(this.metricInstance.getElement());
    }

    // Expose metric methods
    updateValue(value) {
        this.setAttribute('value', value);
        return this;
    }

    setThreshold(threshold) {
        this.setAttribute('threshold', threshold);
        return this;
    }

    setTrend(trend) {
        this.setAttribute('trend', trend);
        return this;
    }
}

// Register custom element
if (typeof customElements !== 'undefined') {
    customElements.define('dotbox-metric', DotboxMetricElement);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MetricItem;
} 