// hf-dialog Slot Only Pattern - with no progressive enhancement needed - Style CSR ready
import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
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

const markupString = /*html*/`<slot></slot>`


const elementHTML = `
<style scope="global">
${indentChunk(cssString)}
</style>
${markupString}
<script type=module>
class HfDialog extends HTMLElement {
    constructor() {
        super()
    }
}
if (!customElements.get('hf-dialog')) {
    customElements.define('hf-dialog', HfDialog)
}
</script>
`

const elementFunctionString = funWrapHTMLElement({ tag: 'hf-dialog', htmlString: elementHTML })

const componentFunctionString = /*javascript*/`
export default class HfDialog extends HTMLElement {
    constructor() {
        super()
    }
}
if (!customElements.get('hf-dialog')) {
    customElements.define('hf-dialog', HfDialog)
    const style = document.createElement('style')
    style.textContent = \`${cssString}\`
    document.head.appendChild(style)
}`

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
