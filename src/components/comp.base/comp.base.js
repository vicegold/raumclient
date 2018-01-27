//https://developers.google.com/web/fundamentals/web-components/shadowdom

// Data binding
// https://gist.github.com/austinhyde/4321f22a476e1cbee65f
// https://gist.github.com/WickyNilliams/9227916
// https://namitamalik.github.io/2-way-data-binding-in-Plain-Vanilla-JavaScript/


// https://blog.risingstack.com/writing-a-javascript-framework-data-binding-es6-proxy/


/**
 * ChriD 20171207 
 * Base class for creating custom HTML elements 
 *   
 */
export class ComponentBase extends HTMLElement {

  /**
   * @param {Boolean} _useShadowDOM Enable or disable the use of the shadow DOM  
   */
  constructor(_useShadowDOM = true){              
    super()        
    if(_useShadowDOM)
      this.attachShadow({mode: 'open'})        
    //this.getRoot().innerHTML = this.template()
    this.vue = null
  }

  /**
   * returns the root object for the component which may be the HTMLElement itself or 
   * the shadow DOM if activated  
   */
  getRoot(){
    if (this.shadowRoot)
      return this.shadowRoot
    return this    
  }

  /**
   *   
   */
  template(){
    return ""
  }


  connectedCallback() { 
    //this.getRoot().innerHTML = this.template()
    // create the bindings and templating   
  }

  disconnectedCallback() {  
  }

  attributeChangedCallback(_attrName, _oldVal, _newVal) {    
  }    

  adoptedCallback(_oldDocument, _newDocument) {    
  }

}
