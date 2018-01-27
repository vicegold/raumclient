/**
 * ChriD 20171207 
 * Base class for creating custom HTML elements which is also used as a wrapper for 
 * other elemnt framworks like in this case polymer. We use polymer 3 becaus it uses 
 * the web standards for custom web elements and the import wich is specified in ECMAScript 6
 * and it has binding included and so i do not have to create it myself
 */

import {Element as PolymerElement} from '../polymer-3.0-preview/polymer-element.js';
import '../polymer-3.0-preview/lib/elements/dom-repeat.js';
import '../polymer-3.0-preview/lib/elements/dom-if.js';
import '../polymer-3.0-preview/lib/elements/dom-bind.js';


export class ComponentBase extends PolymerElement {
 
  constructor() {    
    super()            
  }

  connectedCallback() { 
    super.connectedCallback()   
  }

  disconnectedCallback() {     
    super.disconnectedCallback()   
  }

  ready() {
    super.ready()      
  }

  attributeChangedCallback(_attrName, _oldVal, _newVal) {    
    super.attributeChangedCallback(_attrName, _oldVal, _newVal)
  }

  adoptedCallback(_oldDocument, _newDocument) {
    super.adoptedCallback(_oldDocument, _newDocument)
  }

  hideElement(_element){
    _element.style.display = "none"
  }

  showElement(_element, _type = "block"){
    _element.style.display = _type
  }

}

