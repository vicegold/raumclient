/**
 * ChriD 26.01.2018  
 */

import {ComponentBase} from '../comp.base/comp.base.polymer.js';


export class Component_Raumclient_View_Controlcenter extends ComponentBase {
 
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
        Controllcenter
        <component-raumclient-zoneselector></component-raumclient-zoneselector>
        <div id="controlcenter_albumArtCover"></div>
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

window.customElements.define('comp-raumclient-view-controlcenter', Component_Raumclient_View_Controlcenter);

