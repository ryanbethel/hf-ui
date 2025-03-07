
    export default function hfContainer({html}){
      return html`
<style scope="global">
  
  /* Base container styles */
  hf-container {
      display: block;
      max-width: var(--hf-max-content-width);
      margin: auto;
      padding: var(--hf-space-md) var(--hf-space-lg);
  
      /* Sizes */
      &[maxwidth="md"] {
          max-width: calc(38.5 * var(--hf-space-lg));
      } /* Plus its margin = 960 which is a very comfortable and common size */
      &[maxwidth="sm"] {
          max-width: calc(16 * var(--hf-space-lg));
      }
      &[maxwidth="none"] {
          max-width: none;
      }
  }
  
  @media only screen and (max-width: 600px) {
      hf-container {
          padding: var(--hf-space-sm);
      }
  }
  
</style>
<slot></slot>
<script type=module>
class HfContainer extends HTMLElement {
    constructor() {
        super()
    }
}
if (!customElements.get('hf-container')) {
    customElements.define('hf-container', HfContainer)
}
</script>

`
    }
  