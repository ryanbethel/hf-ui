// hf-row Slot Only Pattern - with no progressive enhancement needed - Style CSR ready
import { funWrapHTMLElement, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
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

const markupString = /*html*/`<slot></slot>`


const elementHTML = `
<style scope="global">
${indentChunk(cssString)}
</style>
${markupString}
<script type=module>
class HfRow extends HTMLElement {
    constructor() {
        super()
    }
}
if (!customElements.get('hf-row')) {
    customElements.define('hf-row', HfRow)
}
</script>
`

const elementFunctionString = funWrapHTMLElement({ tag: 'hf-row', htmlString: elementHTML })

const componentFunctionString = /*javascript*/`
export default class HfRow extends HTMLElement {
    constructor() {
        super()
    }
}
if (!customElements.get('hf-row')) {
    customElements.define('hf-row', HfRow)
    const style = document.createElement('style')
    style.textContent = \`${cssString}\`
    document.head.appendChild(style)
}`

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
