// hf-h-rule No Slot Pattern - with no progressive enhancement needed - Style CSR ready
import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
hf-h-rule { 
  display: block; 

  hr {
    background-color: var(--hf-color-gray-3);
    border: none;
    margin: 0;
    height: 1px;
  }

}
`

const markupString = /*html*/`<hr/>`


const elementHTML = `
<style scope=global>
${indentChunk(cssString)}
</style>

${markupString}

<script type=module>
class HfHRule extends HTMLElement {
    constructor() { super() }
    connectedCallback() {
      const isEnhanced = this.hasAttribute('enhanced')
      // client-side rendering
      if (!isEnhanced) {
        this.innerHTML = '<hr/>'
        this.setAttribute('enhanced', 'client')
      }
    }
}
if (!customElements.get('hf-h-rule')) { customElements.define('hf-h-rule', HfHRule) }
</script>
`

const elementFunctionString = funWrapHTMLElement({ tag: 'hf-h-rule', htmlString: elementHTML })

const componentFunctionString = /*javascript*/`
export default class HfHRule extends HTMLElement {
    constructor() { super() }
    connectedCallback() {
      const isEnhanced = this.hasAttribute('enhanced')
      // client-side rendering
      if (!isEnhanced) {
        this.innerHTML = '<hr/>'
        this.setAttribute('enhanced', 'client')
      }
    }
}
if (!customElements.get('hf-h-rule')) { 
    customElements.define('hf-h-rule', HfHRule)
    const style = document.createElement('style')
    style.textContent = \`${cssString}\`
    document.head.appendChild(style)
}`

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
}

