export default function componentRepl({ html, state }) {
  const {store,attrs} = state
  const current = attrs.current || store.current || "accordion"
  return html`

<style scope=global>
  ui-repl {
    display:block;

    hf-input-group, hf-box {
      height:50vh;
    }

    textarea {
      height:50vh;
    }
    
    iframe {
      display: block; 
      width: 100%; 
      height: 100%; 
      border: none;
    }

    hf-box {
    }
    .editor {
      height: 50vh;
      padding:0px;
    }
  }

  ui-repl > hf-row {
    flex-direction:column;
  }

  ui-repl > hf-row > hf-col[span] {
    max-width:100%;
  }
  @media only screen and (min-width:1096px) {
    ui-repl > hf-row {
      flex-direction:row;
    }
    ui-repl > hf-row > hf-col[span] {
      max-width:50%;
    }
  }
  
</style>
<hf-row >
  <hf-col span="6" >
    <hf-box class="editor">
      <form action="/docs/_components/${current}" target="previewIframe" method="get">
        <hf-input-group >
          <slot name="markup">
            <textarea placeholder="Enter HTML here..."></textarea>
          </slot>
          <div hidden class=editor></div>
        </hf-input-group>
        <hf-button><button type=submit>Update</button></hf-button>
      </form>
    </hf-box>
  </hf-col>
  <hf-col span="6">
    <hf-box class="preview">
      <iframe
        name="previewIframe"
        title="Preview"
        src="/docs/_components/${current}">
      </iframe>
    </hf-box>
  </hf-col>
</hf-row>

<script type=module>
  import { EditorView, basicSetup, html, EditorState } from '/assets/editor.mjs'
  class UiRepl extends HTMLElement{
    constructor(){
      super()
    }
    connectedCallback(){
      this.codeInput = this.querySelector('textarea[slot=markup]')
      this.form = this.querySelector('form')
      this.editor = this.querySelector('.editor')


      this.codeInput.addEventListener('input', () => {
          clearTimeout(this.timeoutId);
          this.timeoutId = setTimeout(() => {
            this.form.submit()
          }, 500);
      });

      try {

      let codeMirror= new EditorView({
        state: EditorState.create({
            doc: this.codeInput.value || '',
            extensions: [basicSetup, html()]
        }),
        parent: this.editor
      })
      
        const debounce = (func, wait) => {
            let timeout;
            return function(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
      let editor = new EditorView({
        });

        const updateTextarea = () => {
            this.codeInput.value = codeMirror.state.doc.toString();
            this.form.submit()
        }

        const debouncedUpdate = debounce(updateTextarea, 500);


        codeMirror.dispatch = ((originalDispatch) => {
            return (transaction) => {
                originalDispatch(transaction);
                if (transaction.docChanged) {
                    debouncedUpdate();
                }
            };
        })(codeMirror.dispatch);

      this.form.style.display = "none"

      } catch(error){
        console.error("Editor failed to load")
      }



    }
    disconnectedCallback(){
      this.codeInput.removeEventListener('input')
    }
  }
  if (!customElements.get('ui-repl')) { customElements.define('ui-repl', UiRepl )}
</script>

`}
