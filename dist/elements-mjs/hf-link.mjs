
    export default function hfLink({html}){
      return html`
<style scope=global>
  
  hf-link {
    /* Base link styles */
    a, *[role=link] {
      text-decoration: none;
      color: var(--hf-color-primary);
      cursor: pointer;
  
      /*:is(a, span[role=link]):visited { color: var(--hf-color-primary-action) }*/
      &:hover,
      &:focus-visible {
        text-decoration: underline;
        outline: 0;
      }
  
      /* Disabled state */
      &[disabled] {
        color: var(--hf-color-disabled-fg);
        pointer-events: none;
      }
    }
  }
  
</style>
<slot></slot>
<script type=module>
class HfLink extends HTMLElement {
    constructor() {
        super()
    }
}
if (!customElements.get('hf-link')) {
    customElements.define('hf-link', HfLink)
}
</script>
`
    }
  