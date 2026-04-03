
export default class HfDialog extends HTMLElement {
    constructor() {
        super()
    }
}
if (!customElements.get('hf-dialog')) {
    customElements.define('hf-dialog', HfDialog)
    const style = document.createElement('style')
    style.textContent = `
hf-dialog {
    /* Base dialog styles */
    & dialog {
        border: none;
        padding: var(--hf-space-lg);
        background-color: #f5f3f7;
        box-shadow: 0 16px 18px -3px #858585;

        /* Close button */
        & button[slot="close"][type="remove"] {
            position: absolute;
            top: 0;
            right: 0;
        }
    }
}
`
    document.head.appendChild(style)
}