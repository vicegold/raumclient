/**
 * ChriD 27.01.2018 
 * ATTENTION: Header/parent container has to have position: relative!!!
 * 
 */

import {ComponentBase} from '../comp.base/comp.base.polymer.js';


export class Component_LoadingOverlay extends ComponentBase {
 
  constructor() {    
    super()    
    this.isReady = false
  } 


  static get properties() {
    return {     
      text:        { Type: String },
      textdetail:  { Type: String },
      image:       { Type: String }
    }
  }  

  static get template() {    
    return `
      <style>
        :host {        
          outline: none;
          position: absolute;
          left: 0; top: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.85);   
          color: white; 
          z-index: 10;          
        }

        .container {
          height: 100%;
          width: 100%;  
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;       
        }    

        .container .item { 
          width: auto; 
          text-align: center;   
          @apply --comp-loadingoverlay-item;     
        } 

        .container .item .image{ 
          @apply --comp-loadingoverlay-image;                   
        } 

        .container .item.text{ 
          padding-top: 1.8em;
          font-weight: bold;
          @apply --comp-loadingoverlay-text;                   
        } 

        .container .item.textDetail{ 
          font-size: 0.8em;   
          padding-top: 0.6em;             
          color: #C0C0C0;
          @apply --comp-loadingoverlay-textDetail;                
        } 


        .animation-1 {
          animation: animation1 3.0s infinite;
        }
                
        @keyframes animation1 {
          0%    { transform: scale(1.0); }
          5%    { transform: scale(1.2); }
          10%   { transform: scale(1.1); }
          15%   { transform: scale(1.2); }
          30%   { transform: scale(1.0); }
          40%   { transform: rotate(0deg); }
          90%   { transform: rotate(360deg); }
          100%  { transform: scale(1.0); }
        }

      </style>

      <div class="container" id="container">
        <div class="item"><img src="{{image}}" width="120px" class="image animation-1"></img></div>
        <div class="item text">{{text}}</div>                
        <div class="item textDetail">{{textdetail}}</div>
      </div>    
    `
  }

  // TODO: @@@ image src als prop und text als prop!

  connectedCallback() { 
    super.connectedCallback()
  }


  ready() {
    this.isReady = true    
    super.ready()
  }

}

window.customElements.define('comp-loadingoverlay', Component_LoadingOverlay);

