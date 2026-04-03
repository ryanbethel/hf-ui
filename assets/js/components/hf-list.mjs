
export default class HfList extends HTMLElement {
    constructor() {
        super()
    }
}
if (!customElements.get('hf-list')) {
    customElements.define('hf-list', HfList)
    const style = document.createElement('style')
    style.textContent = `
hf-list {
  /* Ordered and unordered base styles */
  ul, ol, dl { margin: 0 }
  ul, ol { padding-left: var(--hf-space-md) }

  /* None type (no bullets) */
  &[type=none] ul{
    list-style: none;
    padding-left: 0;
  }

  /* Definition list base styles */
  dd { margin-inline-start: 0 }
  dl {
    & > dt {
      margin-top: var(--hf-space-sm);
      text-transform: uppercase;
      font-size: var(--hf-font-size-min);
      font-weight: bold;

      &:first-of-type { margin-top: 0 }
    }
  }

  /* Content list base styles */
  &[type=content] :is(ul, ol){
    list-style: none;
    padding-left: 0;

    & > li:not(:last-of-type) {
      border-bottom: 1px solid var(--hf-color-border)
    }
  }
}
`
    document.head.appendChild(style)
}