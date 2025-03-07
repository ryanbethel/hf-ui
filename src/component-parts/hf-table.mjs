// hf-table Slot Only Pattern - with no progressive enhancement needed - Style CSR ready
import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
hf-table {
    /* Base table styles */
    table {
        width: 100%;
        border-collapse: collapse;

        /* Table header */
        & thead {
            text-align: left;

            & > tr {
                border-top: 2px solid var(--hf-color-gray-3);
            }

            & th {
                padding: var(--hf-space-xs) var(--hf-space-md);

                /* Sortable columns */
                &[aria-sort] button {
                    all: unset;
                    display: inline-flex;
                    cursor: pointer;

                    &::after {
                        font-size: 0.8em;
                        padding-left: var(--hf-space-xs);
                    }
                }

                &[aria-sort="ascending"] button:after {
                    content: "↑";
                }
                &[aria-sort="descending"] button:after {
                    content: "↓";
                }
            }
        }

        & th,
        & td {
            padding: var(--hf-space-xs);
        }

        & td {
            vertical-align: top;
            padding: var(--hf-space-sm) var(--hf-space-md);
        }

        & tbody > tr {
            border-bottom: 1px solid var(--hf-color-gray-3);

            &:first-of-type {
                border-top: 1px solid var(--hf-color-gray-3);
            }
        }

        /* Table layout */
        &[layout="fixed"] {
            table-layout: fixed;
        }

        /* Striped rows */
        &[striped] > tbody tr:nth-of-type(odd) {
            background-color: var(--hf-color-gray-2);
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
class HfTable extends HTMLElement {
    constructor() {
        super()
    }
}
if (!customElements.get('hf-table')) {
    customElements.define('hf-table', HfTable)
}
</script>
`

const elementFunctionString = funWrapHTMLElement({ tag: 'hf-table', htmlString: elementHTML })

const componentFunctionString = /*javascript*/`
export default class HfTable extends HTMLElement {
    constructor() {
        super()
    }
}
if (!customElements.get('hf-table')) {
    customElements.define('hf-table', HfTable)
    const style = document.createElement('style')
    style.textContent = \`${cssString}\`
    document.head.appendChild(style)
}`

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
