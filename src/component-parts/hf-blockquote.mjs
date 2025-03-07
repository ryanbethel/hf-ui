import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
hf-blockquote {
    blockquote {
        color: var(--hf-color-surface-subtext);
        font-style: italic;
        margin-block: var(--hf-space-default);
        margin-inline: var(--hf-space-lg);
    }
}
`

const markupString = /*html*/`<blockquote><slot></slot></blockquote>`


const elementHTML = /*html*/`
<style scope=global>
${indentChunk(cssString)}
</style>

${markupString}

<script type=module>
class HfBlockquote extends HTMLElement {
    constructor() { 
      super()
      this.clientRender = this.clientRender.bind(this)
    }
    connectedCallback() { this.clientRender() }
    clientRender() {
      const isEnhanced = this.hasAttribute("enhanced")
      if (!isEnhanced) {
        const blockquote = this.querySelector('blockquote')
        if (!blockquote) {
            const blockquote = document.createElement('blockquote')
            const children = this.children
            for (let i = 0; i < children.length; i++) {
                blockquote.appendChild(children[i])
            }
            this.appendChild(blockquote)
        }
        this.setAttribute('enhanced', 'client')
    }
  }
}
if (!customElements.get('hf-blockquote')) {customElements.define('hf-blockquote', HfBlockquote);}
</script>
`

const elementFunctionString = funWrapHTMLElement({ tag: 'hf-blockquote', htmlString: elementHTML })

const componentFunctionString = /*javascript*/`
export default class HfBlockquote extends HTMLElement {
    constructor() { 
      super()
      this.clientRender = this.clientRender.bind(this)
    }
    connectedCallback() { this.clientRender() }
    clientRender() {
      const isEnhanced = this.hasAttribute("enhanced")
      if (!isEnhanced) {
        const blockquote = this.querySelector('blockquote')
        if (!blockquote) {
            const blockquote = document.createElement('blockquote')
            const children = this.children
            for (let i = 0; i < children.length; i++) {
                blockquote.appendChild(children[i])
            }
            this.appendChild(blockquote)
        }
        this.setAttribute('enhanced', 'client')
    }
  }
}
if (!customElements.get('hf-blockquote')) {
  customElements.define('hf-blockquote', HfBlockquote);

  const style = document.createElement('style');
  style.textContent = \`${cssString}\`
  document.head.appendChild(style);
}
`

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
