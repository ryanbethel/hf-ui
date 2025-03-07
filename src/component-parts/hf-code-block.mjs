// hf-code-block Wrapped Slot Pattern - with no progressive enhancement needed - Style CSR ready
import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
/* Base code styles */
hf-code {
  pre {
    border-radius: var(--hf-border-radius-md);
    background-color: var(--hf-color-surface-well);
    color: var(--hf-color-code-text);
    margin: 0;
    padding: var(--hf-space-xs) var(--hf-space-sm);
  }
}
`

const markupString = /*html*/`<pre><slot></slot></pre>`

const scriptString = /*javascript*/`
class HfCodeBlock extends HTMLElement {
    constructor() { super() }
    connectedCallback() {
      const isEnhanced = this.getAttribute('enhanced') === '✨'
      // client-side rendering
      if (!isEnhanced) {
        const pre = this.querySelector('pre')
        if (!pre) {
            const pre = document.createElement('pre')
            const children = this.children
            for (let i = 0; i < children.length; i++) {
                pre.appendChild(children[i])
            }
            this.appendChild(pre)
        }
        this.setAttribute('enhanced', 'client')
      }
    }
if (!customElements.get('hf-code-block')) { customElements.define('hf-code-block',HfCodeBlock)}
}
`


const elementHTML = `
<style scope=global>
${indentChunk(cssString)}
</style>

${markupString}

<script type=module>
${indentChunk(scriptString)}
</script>
`

const elementFunctionString = funWrapHTMLElement({ tag: 'hf-code-block', htmlString: elementHTML })

const componentFunctionString = /*javascript*/`
export default class HfCodeBlock extends HTMLElement {
    constructor() { super() }
    connectedCallback() {
      const isEnhanced = this.getAttribute('enhanced') === '✨'
      // client-side rendering
      if (!isEnhanced) {
        const pre = this.querySelector('pre')
        if (!pre) {
            const pre = document.createElement('pre')
            const children = this.children
            for (let i = 0; i < children.length; i++) {
                pre.appendChild(children[i])
            }
            this.appendChild(pre)
        }
        this.setAttribute('enhanced', 'client')
      }
    }
if (!customElements.get('hf-code-block')) { 
  customElements.define('hf-code-block',HfCodeBlock)}
  const style = document.createElement('style')
  style.textContent = \`${cssString}\`
  document.head.appendChild(style)
}`



export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
}


