// hf-link Slot Only Pattern - with no progressive enhancement needed - Style CSR ready
import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
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

const markupString = /*html*/`<slot></slot>`


const elementHTML = `
<style scope=global>
${indentChunk(cssString)}
</style>
${markupString}
<script type=module>
class HfLink extends HTMLElement {
    constructor() {
        super()
    }
}
if (!customElements.get('hf-link')) {
    customElements.define('hf-link', HfDetails)
}
</script>
`

const elementFunctionString = funWrapHTMLElement({ tag: 'hf-link', htmlString: elementHTML })


const componentFunctionString = /*javascript*/`
export default class HfLink extends HTMLElement {
    constructor() {
        super()
    }
}
if (!customElements.get('hf-link')) {
    customElements.define('hf-link', HfLink)
    const style = document.createElement('style')
    style.textContent = \`${cssString}\`
    document.head.appendChild(style)
}`

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
