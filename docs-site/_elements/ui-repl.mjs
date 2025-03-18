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
          <slot name="markup">
            <textarea placeholder="Enter HTML here..."></textarea>
          </slot>
          <div hidden class=editor></div>
    </hf-box>
  </hf-col>
  <hf-col span="6">
    <hf-box class="preview">
      <slot name="preview"></slot>
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
      this.editor = this.querySelector('.editor')
      this.preview = this.querySelector('div[slot=preview]')
      this.textarea = this.querySelector('textarea[slot=markup]')

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

        let editor = new EditorView({ });

        const update = () => {
            const newCode = codeMirror.state.doc.toString();
            this.codeInput.value = newCode
            this.preview.innerHTML = newCode
        }

        const debouncedUpdate = debounce(update, 500);

        codeMirror.dispatch = ((originalDispatch) => {
            return (transaction) => {
                originalDispatch(transaction);
                if (transaction.docChanged) {
                    debouncedUpdate();
                }
            };
        })(codeMirror.dispatch);

      this.textarea.style.display = "none"
      

      } catch(error){
        console.error("Editor failed to load")
      }



    }
    disconnectedCallback(){
      this.codeInput.removeEventListener('input')
    }
  }
  if (!customElements.get('ui-repl')) { customElements.define('ui-repl', UiRepl ) }
</script>

`}
