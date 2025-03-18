
export default class HfCard extends HTMLElement {
    constructor(){
        super()
    }

    static get observedAttributes() {
      return ['href', 'title'];
    }

    connectedCallback() {
      const isEnhanced = this.hasAttribute('enhanced')
      if (!isEnhanced) {
        const content = this.render(this)
        this.innerHTML = content
        this.setAttribute('enhanced', 'client')
      }
    }

    attributeChangedCallback(name, oldValue, newValue) {
      const h2 = this.querySelector('div.text > h2')
      if (name === 'href') {
        const anchor = h2.querySelector('a')
        if (anchor && newValue) {
           anchor.setAttribute('href', newValue)
        }
        if (!anchor && newValue) {
          const title = h2.textContent
          h2.innerHTML = '<a href="'+newValue+'">'+title+'</a>'
        }
        if (!anchor && !newValue) {
        }
        if (anchor && !newValue) {
          const title = anchor.textContent
          h2.innerHTML = title
        }
      } else if (name === 'title') {
        const anchor = h2.querySelector('a')
        if (anchor) {
           anchor.textContent = newValue
        } else { 
           h2.textContent = newValue
        }
      }
    }

    render(here){
        const children = Array.from(here.children)
        const imageChild = children.find(child => child.getAttribute('slot') === 'image')
        const otherChildren = children.filter(child => child.getAttribute('slot') !== 'image')
        const href = here.getAttribute('href')
        const title = here.getAttribute('title')
        return /*html*/`
            <div class="img">
                ${imageChild.outerHTML/*<slot name="image"></slot>*/}
            </div>
            <div class="text">
                <h2>
                    ${href ? '<a href="' + href +'">' + title +'</a>' : title }
                </h2>
                ${otherChildren.map(child=>child.outerHTML).join('')/*<slot></slot>*/}
            </div>
        `
    }

}
if (!customElements.get('hf-card')) { 
  customElements.define('hf-card', HfCard)
  const style = document.createElement('style');
  style.textContent = `
    hf-card {
        display: flex;
        flex-direction: column;
        position: relative;
        border-radius: var(--hf-border-radius-md);
        border: 1px solid var(--hf-color-gray-2);
        cursor: pointer;

        & .img:has(img) {
            height: var(--hf-card-image-height, 6.5rem);
        }
        & .img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        & a {
            text-decoration: none;
            color: var(--hf-color-primary);
        }
        & a:focus {
            outline: none;
            text-decoration: underline;
        }
        &:focus-within, &:hover {
            border: 2px solid var(--hf-color-gray-3);
        }
        &:focus-within a:focus {
            text-decoration: none;
        }
        & .text {
            padding: 1rem;
            flex: 1 0 auto;
            display: flex;
            flex-direction: column;
        }
        &, & .text {
            display: flex;
            flex-direction: column;
        }

        & .text {
            flex-grow: 1;
        }

        & .text > * + * {
            margin-top: 0.75rem;
        }

        & .text :last-child {
            margin-top: auto;
        }

        & .text :nth-last-child(2) {
            margin-bottom: 0.75rem;
        }
    }
`
  document.head.appendChild(style);
}
