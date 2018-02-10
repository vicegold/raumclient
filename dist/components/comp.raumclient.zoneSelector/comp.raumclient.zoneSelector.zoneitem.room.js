/**
 * ChriD 26.01.2018 
 * https://www.materialui.co/icons?
 */

import {ComponentBase} from '../comp.base/comp.base.polymer.js';


export class Component_Raumclient_ZoneSelector_ZoneItem_Room extends ComponentBase {
 
  constructor() {     
    super()       
    this.isReady      = false
    this.roomData     = null
    this.showSelector = false
    this.selected     = false
  }

  static get properties() {
    return { 
        roomData:       { Type: Object },
        showSelector:   { Type: Boolean },
        selected:       { Type: Boolean }
    }
  }  

  static get template() {    
    return `
      <style>
      :host {            
        outline: none;        
        width: 100%;
        display: block;    
      }    
      
      .container {      
        width: 100%;               
        display: flex;
      }

      .container .placeholder{        
        flex-shrink: 0;
        flex-grow: 0;
        flex: 1;
        flex-basis: 0;
        max-width: 20px;
        mix-width: 20px;
        background-color: #1E1E1E;                
        @apply --comp-raumclient-zoneselector-zoneitem-room-placeholder;        
      }

      .container .roomInfo {
        flex: 1;
        flex-shrink: 1;
        flex-grow: 1;
        line-height: 2.0em;
        text-align: center;             
      }

      .container .selector {
        flex: 1;
        flex-shrink: 0;
        flex-grow: 0;   
        line-height: 2.0em;   
        max-width: 50px;
        min-width: 50px;  
        text-align: center;
        display: none;                        
      }


      </style>

      <div class="container">        
        <div class="placeholder" id="placeholder"></div>          
        <div class="roomInfo">{{ roomData.name }}</div>        
        <div class="selector" id="selector">
          <input id="selectedCheckbox" type="checkbox">
        </div>
      </div>                    
    `
  }  

  ready() {     
    self = this
    this.isReady = true 
    super.ready()

    this.$.selectedCheckbox.onmousedown = function (event) {        
      // following will stop mousedown from continuing and will not focus
      event.preventDefault() 
    }
    this.$.selectedCheckbox.ontouchstart = function (event) {        
      // following will stop touchstart from continuing and will not focus
      event.preventDefault() 
    }

    this.$.selectedCheckbox.onchange = function() {
      self.selected = this.checked
      // TODO: emit event
    }   
    
    this.update()
  }  


  setRoomData(_roomData){  
    this.roomData = _roomData    
    this.update()
  }


  update()
  {
    if(!this.isReady || !this.roomData)
      return  
    
    if(this.roomData.color)
      this.$.placeholder.style.backgroundColor = this.roomData.color

    if(this.showSelector)
      this.$.selector.style.display = "initial"
    else
      this.$.selector.style.display = "none"
    
     this.$.selectedCheckbox.checked = this.selected
  } 

}

window.customElements.define('comp-raumclient-zoneselector-zoneitem-room', Component_Raumclient_ZoneSelector_ZoneItem_Room);

