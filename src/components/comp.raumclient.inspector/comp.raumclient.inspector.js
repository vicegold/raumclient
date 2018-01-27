/**
 * ChriD 26.01.2018 
 * https://www.materialui.co/icons?
 */

import {ComponentBase} from '../comp.base/comp.base.polymer.js';


export class Component_Raumclient_Inspector extends ComponentBase {
 
  constructor() {     
    super()       
    this.isReady = false
  }

  static get template() {    
    return `
      <style>
      :host {            
        outline: none;
        flex: 1;
        width: 100%;
      }    
      
      .container {
        height: 100%;
        width: 100%;
        display: flex;
      }

      </style>

      <div class="container">        
        <comp-logviewer id="logviewer"><comp-logviewer>
      </div>                    
    `
  }  

  ready() {     
    this.isReady = true 
    super.ready()
  }  


  getLogViewerElement()
  {
    return this.$.logviewer
  }

}

window.customElements.define('comp-raumclient-inspector', Component_Raumclient_Inspector);

