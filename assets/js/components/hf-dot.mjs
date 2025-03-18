
export default class HfDot extends HTMLElement {
    constructor() {
        super()
    }
}
if (!customElements.get('hf-dot')) {
    customElements.define('hf-dot', HfDot)
    const style = document.createElement('style')
    style.textContent = `
/* Base styles */
hf-dot {
    display: inline-flex;
    align-items: center;

    &::before {
        content: "";
        width: 8px;
        height: 8px;
        margin: var(--hf-space-xs);
        border-radius: var(--hf-border-radius-full);
        background-color: var(--hf-color-gray-4);
    }

    /* Alert type */
    &[type="info"]::before {
        background-color: var(--hf-color-info-contrast);
    }
    &[type="success"]::before {
        background-color: var(--hf-color-success-contrast);
    }
    &[type="warn"]::before {
        background-color: var(--hf-color-warning-contrast);
    }
    &[type="error"]::before {
        background-color: var(--hf-color-error-contrast);
    }
}
`
    document.head.appendChild(style)
}