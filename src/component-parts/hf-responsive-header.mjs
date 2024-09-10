import { funWrapHTMLElement, wrapComponentCE, escString, indentChunk } from "../wrappers.mjs"


const elementRenderFunction = /*javascript*/` 
  const breakpoint = state.attr?.breakpoint
  const logoHref = state.attr?.['logo-href']
  return html\`

<style>

  :host {
    display: block;
    --default-sidebar-transition: translate 0.25s cubic-bezier(.86,0,.07,1);
    --default-header-height: 3em;
    --default-header-background-color: var(--hf-color-primary);
    --default-header-color: var(--hf-color-primary-text);
    font-size: var(--hf-header-font-size, var(--hf-font-size-md));
  }

  [slot=logo] {
    width:1.5rem;
    height:1.5rem;
    margin-inline-end:1rem;
  }

  header > hf-row {
    background-color: var(--hf-header-bg-color, var(--default-header-background-color));
    color: var(--hf-header-color, var(--default-header-color));
    padding-inline: 1rem;
    justify-items:center;
  }

  .mobile-opener {
    margin-inline-end:1rem;
    display:flex;
    position:relative;
    width:1.5em;
    height:1.5em;
    justify-content:flex-end;
    align-items:center;
  }

 .mobile-opener input[type=checkbox] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  .mobile-opener label {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      cursor: pointer;
  }

  header:has(.mobile-opener input[type='checkbox']:checked)  .nav-menu {
    translate: 0 0;
  }

  .nav-menu  {
    position: fixed;
    top: var(--hf-header-height, var(--default-header-height));
    right: 0; /* 50vw for half screen */
    bottom: 0;
    left: 0;
    translate: -100% 0;
    transition: var(--layout-sidebar-transition, var(--default-sidebar-transition));
    background-color: var(--hf-header-bg-color, var(--default-header-background-color));
    z-index: 1000;
    /* border-right: 1px solid var(--hf-color-gray-3); */
  }

  .nav-menu > * {
    display:flex;
    justify-content:flex-start;
    align-items:flex-start;
    flex-direction:column;
  }

  .nav-menu > * > * {
    padding-inline: 1rem;
    padding-block: 1rem;
  }

  .nav-menu [slot=nav-items] > hf-link > a { 
    color: var(--hf-header-color, var(--default-header-color));
  }

  @media only screen and (min-width: \${breakpoint ? breakpoint : '48rem'}) {

    .nav-menu > * > * {
      padding-inline: 1rem;
      padding-block: 0;
    }
    .mobile-opener {
      display:none;
    }

    .nav-menu  {
      translate: initial;
      transition: initial;
      position:static;
      display:flex;
      border-right: 0px ;
    }

    .nav-menu > * {
      display:flex;
      justify-content:flex-end;
      align-items:center;
      flex-direction:row;
    }
  }

  [aria-current] {
    border-bottom: 2px solid currentColor;
  }

  hf-col {
    display:flex;
    align-items:center;
  }
  hf-col + hf-col {
    justify-content:flex-end;
  }

  hf-col:has(nav.nav-menu > [slot=nav-items]:empty) > nav.mobile-opener {
    display:none;
  }

  [slot=domain] {
    white-space: nowrap;
    display: block;
    /*margin-block-start: 1em;
    margin-block-end: 1em;*/
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    min-height:1em;
    margin-block: calc((var(--hf-header-height, var(--default-header-height)) - 1em)/2);
  }
    a:has([slot=logo]) {
      display:flex; 
      align-items:center; 
      text-decoration:unset; 
      color:currentColor;
    }

</style>
<header>
  <hf-row>
    <hf-col span=2 >
    <a href="\${logoHref ? logoHref : '/'}" >
      <slot name=logo></slot>
      <slot name=domain></slot>
      </a>
    </hf-col>
    <hf-col span=10 >
        <nav class="mobile-opener">
          <input type="checkbox">
          <label for="nav-toggle">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
          </label>
        </nav>
        <nav class="nav-menu">
          <slot name=nav-items></slot>
        </nav>
    </hf-col>
  </hf-row>
</header>
<hf-h-rule></hf-h-rule>
\`

`

const elementFunctionString = /*javascript*/`
export default function eResponsiveHeader({ html, state }) {
${elementRenderFunction}
}
`

const componentFunctionString = /*javascript*/`
import CustomElement from '/_public/browser/custom-element.mjs'
export default class EResponsiveHeader extends CustomElement {

  constructor() {
    super();
  }
  render({html,state}){
    ${elementRenderFunction}
  }
}
if (!customElements.get('hf-responsive-header')) { customElements.define('hf-responsive-header', EResponsiveHeader) }
`



export default {
  elementFunctionString,
  componentFunctionString
}
