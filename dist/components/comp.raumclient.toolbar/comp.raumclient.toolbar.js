/**
 * ChriD 26.01.2018 
 * https://www.materialui.co/icons?
 */

import {ComponentBase} from '../comp.base/comp.base.polymer.js';


export class Component_Raumclient_Toolbar extends ComponentBase {
 
  constructor() {     
    super()       
    this.isReady = false
  }


  static get properties() {
    return { 
      windowstate: { Type: String }
    }
  }    


  static get template() {    
    return `
      <style>
      :host {            
        outline: none;
        flex: 1;   
        -webkit-app-region: drag;
      }    
      
      .itemContainer {
        height: 100%;
      }

      .itemContainer .item {        
        height: 100%;
        float: right;            
        display: flex;
        align-items: center;        
        justify-content: center;
        padding-left: 10px;
        padding-right: 10px;
        -webkit-app-region: no-drag;
        @apply --comp-raumclient-toolbar-item;
      }

      .itemContainer .item:hover{     
        background: darkgrey;
        fill: white;
        @apply --comp-raumclient-toolbar-item-hover;
      }

      .itemContainer .splitter {
        height: 100%;
        float: right; 
        padding-left: 10px;   
        border-right: 1px solid lightgrey;
        @apply --comp-raumclient-toolbar-itemsplitter;
      }

      .hidden {
        display: none;
      }


      </style>

      <div class="itemContainer">
        <div class="item" id="close" on-click="itemClicked">        
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </div>
        <div class="item" id="maximize" on-click="itemClicked">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
        </div>
        <div class="item" id="unmaximize" on-click="itemClicked">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>
        </div>
        <div class="item" id="minimize" on-click="itemClicked">        
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z"/></svg>
        </div>        
        <div class="splitter">
        </div>
        <div class="item" id="log" on-click="itemClicked" title="Show / Hide Inspector">        
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h4v-2H5V8h14v10h-4v2h4c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm-7 6l-4 4h3v6h2v-6h3l-4-4z"/></svg>
        </div>
      </div>                    
    `
  }  

  
  attributeChangedCallback(_attrName, _oldVal, _newVal) {    
    super.attributeChangedCallback(_attrName, _oldVal, _newVal)
    if(_attrName == "windowstate" && this.isReady)
      this.windowStateChanged(_newVal)
  }


  ready() {     
    this.isReady = true 
    super.ready()
    this.windowStateChanged(this.windowstate)
  }


  itemClicked(_e) {
    if(_e.currentTarget)
    {      
      this.dispatchEvent(new CustomEvent('itemClicked', {detail: { itemId : _e.currentTarget.id }, bubbles: true, composed: true}));
    }    
  }


  windowStateChanged(_windowState){
    // following states are available: maximized, minimized, fullscreen, normal    
    switch(_windowState.toLowerCase())
    {
      case "maximized":
        this.hideElement(this.$.maximize)
        this.showElement(this.$.unmaximize, "flex") 
        break;
      case "minimized": 
        break;
      case "fullscreen":                     
        break;
      default:
        this.hideElement(this.$.unmaximize)
        this.showElement(this.$.maximize, "flex")
    }
  }


  

}

window.customElements.define('comp-raumclient-toolbar', Component_Raumclient_Toolbar);

