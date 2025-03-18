
export default class HfRow extends HTMLElement {
    constructor() {
        super()
    }
}
if (!customElements.get('hf-row')) {
    customElements.define('hf-row', HfRow)
    const style = document.createElement('style')
    style.textContent = `
/* Inspired by Flexbox Grid https://github.com/kristoferjoseph/flexboxgrid */
hf-row {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--hf-space-md);

    & + & {
        margin-top: var(--hf-space-md);
    }

    /* Centers columns inside the row */
    &[center] {
        justify-content: center;

        & hf-col:not([span]) {
            flex-grow: inherit;
            flex-basis: inherit;
        }
    }
}
`
    document.head.appendChild(style)
}