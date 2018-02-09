/**
 * ChriD 20171207 
 * Base class for creating custom HTML elements (views=) without polymer and without shadow
 * https://developers.google.com/web/fundamentals/web-components/customelements?hl=en
 *   
 */
export class ComponentBaseView extends HTMLElement {

  constructor(){              
    super()   
  }

  connectedCallback() { 
    this.innerHTML = this.template()
    this.ready()
  }

  disconnectedCallback() {  
  }

  attributeChangedCallback(_attrName, _oldVal, _newVal) {    
  }    

  adoptedCallback(_oldDocument, _newDocument) {    
  }

  ready() {
  }

  template() {
    return "";
  }

}
