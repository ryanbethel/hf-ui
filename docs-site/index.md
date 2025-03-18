---
permalink: /
layout: default
title: HTML First UI Components (HF-UI)
---

# HTML First UI Components (HF-UI)
A set of HTML First web components for use in any Framework or Language.

⚠️ Work in Progress ⚠️

## Goals
- **Universal** for use with any framework friendly to HTML and any language that supports WASM
- **Dependency free** copy and paste anywhere
- **Server-side Rendered** by default
- **Client-side Rendered** for when you need it
- **Progressive Enhanced** fully functional without JavaScript and even better with it
- **Light DOM Web Components** so forms and everything else works as you expect it to

HF-UI components work especially well with [Enhance](enhance.dev). The initial work was inspired by [MDash](https://m-docs.org). Icons used are from [Phosphor](https://phosphoricons.com/). See [Acknowledgements](#acknowledgements) for other related projects and resources.


## Getting Started
For an Enhance project the quickest way to try out the components in your project is:
1. Install the components 
  - `npm i @htmlfirst/ui`
2. Copy the base css file to your public folder 
  - `cp node_modules/@htmlfirst/ui/assets/hf-config.css public/`
3. Add the css reference to your `head.mjs`
4. Add a component or all the components to your app elements folder ([usage](#usage))


## Usage

### Add all components to an Enhance project
The ssr-elements can be added to an Enhance project with the `element.mjs` file.
Add the following `/app/element.mjs` file to your app directory:

```javascript
// /app/elements.mjs
import { elements } from '@html/ui' 
export default elements
```
### Use individual components in Enhance
Individual  can be used as follows:
```javascript
// /app/elements/hf-button.mjs
import { hfButton } from '@htmlfirst/ui/dist/elements' 
export default hfButton
```


## Server-side and Client-side Rendering

HF-UI components can be rendered on the server or on the client. If a component is server side rendered in a page it inserts the needed styles and behavior(JavaScript). If that same component is later client-side rendered. If the component has not been server-side rendered first the component definition needs to be sent with the page as a script. That script will make sure the styles are inserted on the client. 

There are three formats for each component in the `/dist` folder. 

- `element-html`: Wrapped in HTML tags for use in SSR and CSR. Useful with Enhance SSR WASM in languages other than NodeJS.
- `element-mjs`: Component deinitions are wrapped as a javascript function that accepts state and returns HTML. These also handle SSR and CSR These are necessary for some components that use state (in the form of attributes) in the templating. They are especially useful in NodeJS projects so that the components can be `import`ed as modules.
- `components`: These are written as browser JavaScript and used for clientside rendering only. 

### Client side (self rendering)

When client side rendered the HF-UI components render themselves. When the components is first defined it will add its styles to the document head. This only happens once when the component is defined so that if the same component was already server side rendered the styles do not get added twice. Then when that component is added to the DOM at any point it will render its own contents inside the `connectedCallback`. 

Since these components do not use the Shadow DOM the content does not use live slots. The content that is present when the component is connected to the DOM is expanded/rendered. In practice this is usually not a problem. The components are built to repond to attribute changes as needed. The only common edge case where this needs to be considered is when setting `innerHTML` on an element. It is somewhat common to `const thing = document.createElement('my-thing')` and then set `thing.innerHTML = "<div>Something</div>`. Here `thing` will render the contents before adding the content. There are many ways around this but one options is in the second step to set `thing.outerHTML = <my-thing><div>Something</div></my-thing>`. This way the component will be added with the content already in place. 

To use a CSR component in the browser with an Enhance project it can be copied directly to the public folder. They are dependency free so no build step is required. Just import them from the page as `<script type=module src="/_public/hf-button.mjs"></script>`. 

If you want to use multiple components and combine them into one script you can use the `app/browser` folder to bundle them into the `public/browser` folder as follows:

```javascript
// app/browser/my-page.mjs
import {hfButton,hfCard} from '@htmlfirst/ui/components.js'
```

```html
<!-- My Page -->
 <body>
   <div>stuff</div>
   <script type=module src="/_public/browser/my-page.mjs"></script>
  </body>
 ```

## Customize with Custom Properties
The components can be customized by setting values on a set of custom properties. This gives some flexibility without being too overwhelming. For an Enhance project copy the `public/hf-custom-properties.css` file into your projects public folder. Or if using another framework put the file wherever static assets are served from. Most of the properties are colors with a few sizes for fonts and spacing. 

## Use with other style libraries
The HF-UI components can be used with other style systems. They work especially well alongside utility style systems like Paramour (formerly called Enhance styles). They can be used with Tailwind or plain old CSS.

## Use with other frameworks or languages
These components can be used with almost any framework that is HTML friendly. Meaning if HTML tags are respected and passed around without being turned into some JavaScript representation you should be able to use it. Some examples are included in the accompanying Github repository and others are shown in the Github Enhance-Dev repositories.

Some supported frameworks and languages

- Enhance (the framework): Full SSR and CSR support 
- Jekyll: The docs for HF-UI use Jekyll as a static site generator the components are rendered by Jekyll as HTML and then enhance-ssr is run to expand the results. This example uses Ruby for the Jekyll and Node for Enhance, but there is a Ruby WASM plugin for Enhance that could be used to avoid the need for NodeJS.
- Markdown: Markdown is HTML friendly so many things that support markdown can support these components. 
- Wordpress: These and any enhance components can be SSRed in Wordpress using the enhance wordpress plugin.
- PHP: There is a native port of Enhance SSR in PHP.
- Eleventy:
- Go, Rust, C#, .... : Any language that supports WASM should work.

## Color Themes (Light and Dark Mode)
The components are built with theming in mind. By choosing appropriate colors and adjusting custom properties a working light and dark can be applied. The following recommendations show options for choosing a theme based on OS default or user selection. This preference can be persisted through local storage. 

The primary way that components adapt to a light and dark them is by use of the scale of Gray (or other neutral) color.
The user configuration requires custom property values for the neutral color from `--hf-color-gray-0` to `--hf-color-gray-10`.
For light mode this range should be set with light on the low end and dark on the high end.
For dark mode the range is reversed. 
Other changes to the primary color and other supporting colors may need to be made depending on the theme.

```css
  /* Light Theme */
  --hf-color-gray-0:  hsl(0, 0%, 95%);
  --hf-color-gray-1:  hsl(0, 0%, 90%);
  --hf-color-gray-2:  hsl(0, 0%, 80%);
  --hf-color-gray-3:  hsl(0, 0%, 70%);
  --hf-color-gray-4:  hsl(0, 0%, 60%);
  --hf-color-gray-5: hsl(0, 0%, 50%);
  --hf-color-gray-6: hsl(0, 0%, 40%);
  --hf-color-gray-7: hsl(0, 0%, 30%);
  --hf-color-gray-8: hsl(0, 0%, 20%);
  --hf-color-gray-9: hsl(0, 0%, 10%);
  --hf-color-gray-10: hsl(0, 0%, 7%); 


  /* Dark Theme */
  --hf-color-gray-0: hsl(0, 0%, 7%); 
  --hf-color-gray-1: hsl(0, 0%, 10%);
  --hf-color-gray-2: hsl(0, 0%, 20%);
  --hf-color-gray-3: hsl(0, 0%, 30%);
  --hf-color-gray-4: hsl(0, 0%, 40%);
  --hf-color-gray-5: hsl(0, 0%, 50%);
  --hf-color-gray-6:  hsl(0, 0%, 60%);
  --hf-color-gray-7:  hsl(0, 0%, 70%);
  --hf-color-gray-8:  hsl(0, 0%, 80%);
  --hf-color-gray-9:  hsl(0, 0%, 90%);
  --hf-color-gray-10:  hsl(0, 0%, 95%);
```

These custom properties can be applied at an application level in many possible ways. 
The following is a suggested approach that allows for operating system defaults to be used and overridden by if desired.

To persist the users preference while avoiding a flash of the wrong color theme as the site is initially loaded requires some effort.
This example persists the user preference in local storage.
Because it uses JavaScript it is a progressive enhancement.
If JavaScript fails to load the fallback default theme is still a working theme.

To avoid the flash of the wrong theme the following script should be in the docuemnt head, or somewhere before any of the body begins to load. 
This checks local storage for a theme preference and applies a class to the document (`<html>`) element.
This local storage preference is set by the theme picker show further down. 
This script is intentionally minimal to make sure if a preference is stored it is used before any content is shown. 

```html
<script>
  const darkLightTheme = window.localStorage.getItem('dark-light-theme');
  if (darkLightTheme === 'dark') { document.documentElement.classList.add('dark-mode'); } 
</script>
```


```css
/* If theme class is set for Dark it has high priority by the specificity */
:root.dark-mode:not(#id-for-high-specificity) {
      /* Dark Theme */
      --hf-color-gray-0:  hsl(0, 0%, 7%);
}

/* If no theme class is set on the document the theme toggle 
   can be used to set theme or leave the theme as auto       */
:root:has(input[name=color-scheme][value=dark]:checked) {
  #color-scheme::after{ 
    content:'Dark Mode';
  }
      /* Dark Theme */
      --hf-color-gray-0: hsl(0, 0%, 7%); 
}
:root:has(input[name=color-scheme][value=light]:checked) {
  #color-scheme::after{ 
    content:'Light Mode';
  }
  /* Light Theme */
  --hf-color-gray-0:  hsl(0, 0%, 95%);
}
/* If the theme switcher auto is set it no specific theme 
   values are set allowing the default values to take over */
:root:has(input[name=color-scheme][value=auto]:checked) {
  #color-scheme::after{ 
    content:'Auto Mode';
  }
}

/* Default theme values are set for when nothing is chosen */
:root {
  /* Colors */
  color-scheme: light dark;

  /* Default Light Theme */
  --hf-color-gray-0:  hsl(0, 0%, 95%);
}

/* A media query handles the OS default theme if set */
  @media ( prefers-color-scheme: dark ) {
    :root {
      /* Dark Theme */
      --hf-color-gray-0: hsl(0, 0%, 7%); 
    }
  }

```



## How It Works

For SSR render HTML
```html
<!-- hf-blockquote in HTML form -->
<style> hf-blockquote { color: blue; } </style>
<blockquote><slot></slot></blockquote>
<script type=module>
  class HfBlockquote extends HTMLElement{
    constructor(){ super(); }
    connectedCallback(){ }
  }
  if (!customElements.get("hf-blockquote")){ customElements.define('hf-blockquote',HfBlockquote) }
</script>

```

For SSR followed by CSR
```html
<!-- hf-blockquote in HTML form -->
<style> hf-blockquote { color: blue; } </style>
<blockquote><slot></slot></blockquote>
<script type=module>
  class HfBlockquote extends HTMLElement{
    constructor(){ super(); }
    connectedCallback(){ this.clientRender(); }
    clientRender() {
      const isEnhanced = this.hasAttribute("enhanced")
      if (!isEnhanced){
        // Render on the client as needed
        this.setAttribute("enhanced","client")
      }
    }

  }
  if (!customElements.get("hf-blockquote")){ customElements.define('hf-blockquote',HfBlockquote) }
</script>

```


For CSR without SSR
```html
<script type=module>
  class HfBlockquote extends HTMLElement{
    constructor(){ super(); }
    connectedCallback(){ this.clientRender(); }
    clientRender() {
      const isEnhanced = this.hasAttribute("enhanced")
      if (!isEnhanced){
        // Render on the client as needed
        this.setAttribute("enhanced","client")
      }
    }

    

  }
  if (!customElements.get("hf-blockquote")){ 
    // Insert style into head
    const style = document.createElement('style');
    style.textContent = 'hf-blockquote { color: blue; }'
    document.head.appendChild(style);

    customElements.define('hf-blockquote',HfBlockquote) 
  }
</script>

```


Note: For serverside rendered and clientside rendered components that otherwise would not need a custom element defined we can use it as a way to make sure the styles only get added once. If it is serverside rendered it will register the custom element and if the clientside component is added it will not run again because the custom element definition has already run. 