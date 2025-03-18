
export default class HfDetails extends HTMLElement {
    constructor() {
        super()
    }
}
if (!customElements.get('hf-details')) {
    customElements.define('hf-details', HfDetails)
    const style = document.createElement('style')
    style.textContent = `
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
    document.head.appendChild(style)
}