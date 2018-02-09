/**
 * ChriD 26.01.2018  
 */

import {ComponentBaseView} from '../comp.base.view/comp.base.view.js';


export class Component_Raumclient_View_Controlcenter extends ComponentBaseView {
 
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

      .left {
        flex: 1;
        min-width: 20em;
        max-width: 20em;
        margin: auto;       
      }

      </style>

      <div class="container">
        <div class="left">
          <comp-raumclient-zoneselector id="controlcenter_zoneselector"></comp-raumclient-zoneselector>
        </div>        
        <!--<div id="controlcenter_albumArtCover"></div>-->
      </div>                    
    `
  }  

  template(){
    return Component_Raumclient_View_Controlcenter.template
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

