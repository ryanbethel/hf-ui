---
permalink: /
layout: default
title: HTML First UI Components (HF-UI)
---
# HTML First UI Components (HF-UI)
A set of HTML First web components for use in any Framework or Language.

They are:
- **Universal** for use with any framework is friendly to HTML and any language that works with WASM. 
- **Dependency free** to copy and paste anywhere
- **Server-side Rendered** (SSR) by default
- **Client-side Rendered** for when you need it
- **Light DOM Web Components** that just work

HF-UI components work especially well with [Enhance](enhance.dev). The design was inspired by [MDash](https://m-docs.org). See [Acknowledgements](#acknowledgements) for other related projects and resources.

## Getting Started
For an Enhance project:
1. Install the components:
   `npm i @htmlfirst/ui`
2. Copy the static asset files to your `/public` folder and document head. 
   `cp node_modules/@htmlfirst/ui/assets/hf-config.css public/`
   `cp node_modules/@htmlfirst/ui/assets/initialize-dark-light.js public/`
3. Add a component to your project ([usage](#usage))

## Server-side and Client-side Rendered
HF-UI components can be rendered on the server or on the client. If a component is server rendered in a page it inserts the needed styles and behavior(JavaScript) to define that component if that same component is later client-side rendered on that page. If the component has not been first server-side rendered it needs to be sent with the page so that it is defined when it needs to be rendered. 

## Install 
Individual components can be used without installing by copying them from the `/dist/components` or `/dist/elements` folders. 

To use multiple components you can install from npm:
```sh
npm i @htmlfirst/ui
```

## Usage

### Add all ssr-elements to an Enhance project
The ssr-elements can be added to an Enhance project with the `element.mjs` file.
Add the following `/app/element.mjs` file to your app directory:

```javascript
// /app/elements.mjs
import { elements } from '@html/ui' 
export default elements
```
### Use individual ssr-elements in Enhance
Individual ssr-elements can be used as follows:
```javascript
// /app/elements/hf-button.mjs
import { hfButton } from '@html/ui/dist/elements' 
export default hfButton
```

### Client side render components with Enhance
To use a csr-component in the browser with an Enhance project it can be copied directly to the public folder. They are dependency free so no build step is required. Just import them from the page as `<script type=module src="/_public/hf-button.mjs"></script>`. 

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
The components can be customized by setting values on a set of custom properties. This gives a little flexibility without being too overwhelming. For an Enhance project copy the `public/hf-custom-properties.css` file into your projects public folder. Or if using another framework put the file wherever static assets are served from. Most of the properties are colors with a few sizes for fonts and spacing. 

## Use with other style libraries
The HF-UI components can be used with other style systems. They work especially well alongside utility style systems like Paramour (formerly called Enhance styles). They can be used with Tailwind as well. 

## Style reset
There is a very minimal style reset used for the example site. There are intentionally few additional styles so that the components can be seen as they are. The reset `public/hf-reset.css` can be copied to your projects static asset folder. 
 

## Docs/Examples
An example app showing all components is included in the project directory.
You can fork the repo and run `npm start` to see it. 
http://localhost:3333 is a page that includes most of the components used together.
http://localhost:3333/docs has a repl/playground of the components with usage examples.


## Enhance Custom-Element (@enhance/custom-element)

## Use with other frameworks or languages
- enhance-ssr
- enhance-ssr for PHP 
- enhance ssr WASM

## Light DOM (no shadow DOM)

## Component styles and scoping

## Rendering
HF-UI components are designed to be rendered anywhere with minimal overhead. For server side rendering using [Enhance](enhance.dev) or in many languages and frameworks using [WASM](enhance.dev/#wasm) drop them into the elements folder and they just work. 

For client side rendering the script for a component is added to the page anywhere and the when the element is added it will render itself. Rendering on the web is a contentious topic. For more background the approach used with HF-UI see ([Rendering Patterns](#rendering-patterns)).


## More background

## Component Types
There are two types of components discussed here. There are application components and UI components. Application components are usually larger and unique to one website. They are a convenient way to break up pieces of an application. They may be reused within a project and even occasionally in multiple projects, but that is not the intent. These components often have application state rendered with them.

In contrast there are UI components (like HF-UI) that are usually smaller primitives that are intended for reuse. In the case of HF-UI they do not use or know anything about application state. They only know about attributes and children (slots). They receive application state when rendered in a page or when they are wrapped into a larger application component.

Layout components are another category. These are often application components, but they may also be UI components (i.e. a generic header or sidebar component). What is true is that in a multi page app these layout components are almost never client side rendered. These are specifically the foundational parts of a page that would come from the server.





## Rendering Patterns

### Server-side Rendering
On the web platform servers communicate to browsers by sending HTML documents. 
Even modern JavaScript frameworks send an HTML document `<div id=app></div><script>/*app code*/</script>`. 

## Client-side Rendering
Client side rendering happens when the HTML and or DOM tree it produces is updated in the browser after the HTML document has already arrived in the browser.
Modern JavaScript frameworks do this for the entire document.
That `<div id=app></div>` needs to be turned into the full app with many other HTML elements.
Some of these frameworks now offer their own SSR options but they often end up sending some initial elements that are then "hydrated" which means clientside rendering them again. 
These JavaScript frameworks also handle routing between pages client rendering every new page (Single Page Apps).

The HF-UI components were designed to work for multi-page apps where each page is a new request to the server returning just that page.
They can of course be used in single page apps for full CSR but the reverse is not true. React component can not easily be used outside a React application.
Even with a traditional multi-page app there are some instances where a component might need to be rendered on the client. 
The biggest reasons to use CSR components in a multi-page app are for lists and special highly interactive pages. For a todo list or any other similar application you often need to add new items to a list and each of those items need to be CSR to save a full page reload. There are also some special pages even in a multi-page app where it is nice to be able to CSR some parts to avoid frequent page reloads.

- Server-side Rendered 
- Client-side Rendered (after SSR)
- Client-side Rendered (w/o SSR)
- Client-side Re-rendering on state change
  - Attribute change
  - Re-slotting children

## DOM Diffing 


## Opinions
- Use attributes to handle state. Enhance includes application state in the form of `state.store`, but this should be reserved for applications. These components do not expect or use the store. This makes them more flexible in other environments where only Enhance SSR is used (including Enhance SSR WASM).
- Customization and configuration of these components is done primarily with custom properties. 



## Acknowledgements
- M-Dash: Used for initial inspiration
- Phosphor Icons


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