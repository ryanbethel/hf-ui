
export default class HfLink extends HTMLElement {
    constructor() {
        super()
    }
}
if (!customElements.get('hf-link')) {
    customElements.define('hf-link', HfLink)
    const style = document.createElement('style')
    style.textContent = `
hf-link {
  /* Base link styles */
  a, *[role=link] {
    text-decoration: none;
    color: var(--hf-color-primary);
    cursor: pointer;

    /*:is(a, span[role=link]):visited { color: var(--hf-color-primary-action) }*/
    &:hover,
    &:focus-visible {
      text-decoration: underline;
      outline: 0;
    }

    /* Disabled state */
    &[disabled] {
      color: var(--hf-color-disabled-fg);
      pointer-events: none;
    }
  }
}
`
    document.head.appendChild(style)
}