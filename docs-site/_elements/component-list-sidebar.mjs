export default function componentList({ html, state }) {
  const {store,attrs} = state
  const current = attrs.current || store.current
  const commonPath = '/components/'
  const components = store.components || [
    {name: "Accordion", path: "accordion"},
    {name: "Alert", path: "alert"},
    {name: "Autocomplete", path: "autocomplete"},
    {name: "Avatar", path: "avatar"},
    {name: "Badge", path: "badge"},
    {name: "Blockquote", path: "blockquote"},
    {name: "Box", path: "box"},
    {name: "Breadcrumb", path: "breadcrumb"},
    {name: "Button", path: "button"},
    {name: "Card", path: "card"},
    {name: "Code Block", path: "code-block"},
    {name: "Code", path: "code"},
    {name: "Col", path: "col"},
    {name: "Container", path: "container"},
    {name: "Details", path: "details"},
    {name: "Dialog", path: "dialog"},
    {name: "Dot", path: "dot"},
    {name: "Horizontal Rule", path: "h-rule"},
    {name: "Input Group", path: "input-group"},
    {name: "Keyboard", path: "keyboard"},
    {name: "Link", path: "link"},
    {name: "List", path: "list"},
    {name: "Loader", path: "loader"},
    {name: "Menu", path: "menu"}, 
    {name: "Responsive Header", path: "responsive-header"},
    {name: "Responsive Sidebar", path: "responsive-sidebar"},
    {name: "Row", path: "row"},
    {name: "Switch", path: "switch"},
    {name: "Table", path: "table"},
    {name: "Tabs", path: "tabs"},
    {name: "Tag", path: "tag"},
    {name: "Theme Switch", path: "theme-switch"},
    {name: "Theme Menu", path: "theme-menu"},
    {name: "Vertical Rule", path: "v-rule"},
  ]
  return html`
<style>
  :host {
    display:block;
  }
  hf-link a {
    color: currentColor;
  }
</style>
<hf-list type=none>
  <ul>
    ${components.map(item => item.path !== current ? `<li><hf-link><a href="${commonPath}${item.path || ""}" >${item.name || ""}</a></hf-link></li>` : `<li>${item.name || ""}</li>`).join('\n')}
  </ul>
</hf-list>
 `
}
