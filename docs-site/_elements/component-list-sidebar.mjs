export default function componentList({ html, state }) {
  const {store,attrs} = state
  const current = attrs.current || store.current
  const commonPath = '/components/'
  const components = [
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
    {name: "Checkbox", path: "checkbox"},
    {name: "Code Block", path: "code-block"},
    {name: "Code", path: "code"},
    {name: "Container", path: "container"},
    {name: "Details", path: "details"},
    {name: "Dialog", path: "dialog"},
    {name: "Dot", path: "dot"},
    {name: "Form", path: "form"},
    {name: "Grid", path: "grid"},
    {name: "Headings", path: "headings"},
    {name: "Horizontal Rule", path: "h-rule"},
    {name: "Input", path: "input"},
    {name: "Keyboard", path: "keyboard"},
    {name: "Link", path: "link"},
    {name: "Lists", path: "lists"},
    {name: "Loader", path: "loader"},
    {name: "Menu", path: "menu"},
    {name: "Radio", path: "radio"},
    {name: "Range", path: "range"},
    {name: "Responsive Header", path: "responsive-header"},
    {name: "Responsive Sidebar", path: "responsive-sidebar"},
    {name: "Select", path: "select"},
    {name: "Switch", path: "switch"},
    {name: "Table", path: "table"},
    {name: "Tabs", path: "tabs"},
    {name: "Tag", path: "tag"},
    {name: "Text", path: "text"},
    {name: "Textarea", path: "textarea"},
    {name: "Theme Menu", path: "theme-menu"},
    {name: "Theme Switch", path: "theme-switch"},
    {name: "Vertical Rule", path: "v-rule"},
  ]
  return html`
<style scope=global>
  component-list-sidebar {
    display:block;

    hf-link a {
      color: var(--hf-color-primary-text, currentColor);
    }
    hf-list li:not(:has(a)) {
      text-decoration: underline;
      color: var(--hf-color-primary-text, currentColor);
    }
  }
</style>
<hf-list type=none>
  <ul>
    ${components.map(item => item.path !== current ? `<li><hf-link><a href="${commonPath}${item.path || ""}" >${item.name || ""}</a></hf-link></li>` : `<li>${item.name || ""}</li>`).join('\n')}
  </ul>
</hf-list>
 `
}
