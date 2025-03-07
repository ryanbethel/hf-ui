// hf-tag Slot Only Pattern - with no progressive enhancement needed - Style CSR ready
import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
hf-tag {
    display: inline-flex;
    align-items: center;
    color: var(--hf-color-tag-text, currentColor);
    /* border: 1px solid var(--color, currentColor); */
    border: 1px solid currentColor;
    background-color: var(--hf-color-tag, var(--hf-color-gray-3));
    padding: 3px var(--hf-space-xs);
    font-size: var(--hf-font-size-min);

    & + & {
        margin-left: 3px;
    }

    /* Removable tag */
  & :is(hf-button:has(button[type="remove"]), button[type=remove]) {
        padding-left: var(--hf-space-xs);
        font-size: var(--hf-font-size-sm);
        width: auto;
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
class HfTag extends HTMLElement {
    constructor() {
        super()
    }
}
if (!customElements.get('hf-tag')) {
    customElements.define('hf-tag', HfTag)
}
</script>
`

const elementFunctionString = funWrapHTMLElement({ tag: 'hf-tag', htmlString: elementHTML })

const componentFunctionString = /*javascript*/`
export default class HfTag extends HTMLElement {
    constructor() {
        super()
    }
}
if (!customElements.get('hf-tag')) {
    customElements.define('hf-tag', HfTag)
    const style = document.createElement('style')
    style.textContent = \`${cssString}\`
    document.head.appendChild(style)
}`

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
