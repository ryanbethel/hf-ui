
    export default function hfDetails({html}){
      return html`
<style scope="global">
  
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
  
</style>
<slot></slot>
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
    }
  