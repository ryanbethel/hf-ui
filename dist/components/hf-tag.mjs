
export default class HfTag extends HTMLElement {
    constructor() {
        super()
    }
}
if (!customElements.get('hf-tag')) {
    customElements.define('hf-tag', HfTag)
    const style = document.createElement('style')
    style.textContent = `
hf-tag {
    display: inline-flex;
    align-items: center;
    color: var(--hf-color-tag-text, currentColor);
    /* border: 1px solid var(--color, currentColor); */
    border: 1px solid currentColor;
    background-color: var(--hf-color-tag, var(--hf-color-gray-3));
    padding: 3px var(--hf-space-xs);
    font-size: var(--hf-font-size-min);

    & + & {
        margin-left: 3px;
    }

    /* Removable tag */
  & :is(hf-button:has(button[type="remove"]), button[type=remove]) {
        padding-left: var(--hf-space-xs);
        font-size: var(--hf-font-size-sm);
        width: auto;
    }
}
`
    document.head.appendChild(style)
}