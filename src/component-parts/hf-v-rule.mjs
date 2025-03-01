// hf-v-rule No Slot Pattern - with no progressive enhancement needed - Style CSR ready
import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
hf-v-rule { 
    display:flex;
    height:  auto;

  hr {
    background-color: var(--hf-color-gray-3);
    border: none;
    margin: 0;
      width: 1px;
      height: auto;
  }
}
`

const markupString = /*html*/`<hr aria-orientation="vertical" />`

const elementHTML = `
<style scope=global>
${indentChunk(cssString)}
</style>

${markupString}

<script type=module>
class HfVRule extends HTMLElement {
    constructor() { super() }
    connectedCallback() {
      const isEnhanced = this.hasAttribute('enhanced')
      // client-side rendering
      if (!isEnhanced) {
        this.innerHTML = '<hr aria-orientation="vertical" />'
        this.setAttribute('enhanced', 'client')
      }
    }
}
if (!customElements.get('hf-v-rule')) { customElements.define('hf-v-rule', HfVRule) }
</script>
`

const elementFunctionString = funWrapHTMLElement({ tag: 'hf-v-rule', htmlString: elementHTML })

const componentFunctionString = /*javascript*/`
export default class HfHRule extends HTMLElement {
    constructor() { super() }
    connectedCallback() {
      const isEnhanced = this.hasAttribute('enhanced')
      // client-side rendering
      if (!isEnhanced) {
        this.innerHTML = '<hr aria-orientation="vertical" />'
        this.setAttribute('enhanced', 'client')
      }
    }
}
if (!customElements.get('hf-v-rule')) { 
    customElements.define('hf-v-rule', HfVRule)
    const style = document.createElement('style')
    style.textContent = \`${cssString}\`
    document.head.appendChild(style)
}`

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
