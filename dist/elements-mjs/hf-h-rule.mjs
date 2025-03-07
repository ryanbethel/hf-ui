
    export default function hfHRule({html}){
      return html`
<style scope=global>
  
  hf-h-rule { 
    display: block; 
  
    hr {
      background-color: var(--hf-color-gray-3);
      border: none;
      margin: 0;
      height: 1px;
    }
  
  }
  
</style>

<hr/>

<script type=module>
class HfHRule extends HTMLElement {
    constructor() { super() }
    connectedCallback() {
      const isEnhanced = this.hasAttribute('enhanced')
      // client-side rendering
      if (!isEnhanced) {
        this.innerHTML = '<hr/>'
        this.setAttribute('enhanced', 'client')
      }
    }
}
if (!customElements.get('hf-h-rule')) { customElements.define('hf-h-rule', HfHRule) }
</script>
`
    }
  