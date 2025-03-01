// hf-details Slot Only Pattern - with no progressive enhancement needed - Style CSR ready
import { funWrapHTMLElement, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
hf-details {
    & details {
        > summary {
            cursor: pointer;
            list-style: none; /* Hides caret in Firefox */

            &:focus {
                outline: none;
            }

            /* Hides caret in Chrome, Safari, etc. */
            &::-webkit-details-marker {
                display: none;
            }
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
class HfDetails extends HTMLElement {
    constructor() {
        super()
    }
}
if (!customElements.get('hf-details')) {
    customElements.define('hf-details', HfDetails)
}
</script>
`

const elementFunctionString = funWrapHTMLElement({ tag: 'hf-details', htmlString: elementHTML })

const componentFunctionString = /*javascript*/`
export default class HfDetails extends HTMLElement {
    constructor() {
        super()
    }
}
if (!customElements.get('hf-details')) {
    customElements.define('hf-details', HfDetails)
    const style = document.createElement('style')
    style.textContent = \`${cssString}\`
    document.head.appendChild(style)
}`

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
