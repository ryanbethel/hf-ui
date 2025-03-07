
    export default function hfBlockquote({html}){
      return html`
<style scope=global>
  
  hf-blockquote {
      blockquote {
          color: var(--hf-color-surface-subtext);
          font-style: italic;
          margin-block: var(--hf-space-default);
          margin-inline: var(--hf-space-lg);
      }
  }
  
</style>

<blockquote><slot></slot></blockquote>

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
    }
  