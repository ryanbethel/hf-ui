
    export default function hfKeyboard({html}){
      return html`
<style scope=global>
  
  hf-keyboard {
      kbd {
          font-family: system-ui;
  
          &:not(:has(kbd)),
          & kbd {
              border-radius: 3px;
              box-shadow: 0 1px 2px 0 var(--hf-color-gray-5);
              padding: 0 4px;
              background: white;
          }
      }
  }
  
</style>

<kbd><slot></slot></kbd>

<script type=module>
  
  class HfKeyboard extends HTMLElement {
      constructor() { super() }
      connectedCallback() {
        const isEnhanced = this.hasAttribute('enhanced')
        // client-side rendering
        if (!isEnhanced) {
          const kbd = this.querySelector('kbd')
          if (!kbd) {
              const kbd = document.createElement('kbd')
              const children = this.children
              for (let i = 0; i < children.length; i++) {
                  kbd.appendChild(children[i])
              }
              this.appendChild(kbd)
          }
          this.setAttribute('enhanced', 'client')
        }
      }
  }
  if (!customElements.get('hf-keyboard')) { customElements.define('hf-keyboard',HfKeyboard)}
  
</script>
`
    }
  