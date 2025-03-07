
    export default function hfBreadcrumb({html}){
      return html`
<style scope="global">
  
  hf-breadcrumb {
      display: block;
  }
  hf-breadcrumb,
  hf-breadcrumb > nav {
      display: flex;
  }
  
  hf-breadcrumb
      > nav
      > :is(hf-link, a, hf-crumb, span):not(:first-child)::before {
      content: "/";
      display: inline-block; /* Needed to prevent this element from getting underlined */
      margin: 0 var(--hf-space-sm);
      color: var(--hf-color-gray-4);
  }
  
</style>
<slot></slot>
<script type=module>
class HfBreadcrumb extends HTMLElement {
    constructor() {
        super()
    }
}
if (!customElements.get('hf-breadcrumb')) {
    customElements.define('hf-breadcrumb', HfBreadcrumb)
}
</script>
`
    }
  