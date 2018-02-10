/**
 * ChriD 17.01.2018 
 * RaumController "Now playing" component
 * https://www.materialui.co/icons?
 */

import {ComponentBase} from '../comp.base/comp.base.polymer.js';


export class Component_Music_TransitionControl extends ComponentBase {
 
  constructor() {    
    super()   
    this.transitionState = {      
      transportState : "STOPPED",   // STOPPED, PLAYING, PAUSED_PLAYBACK
      playMode       : "NORMAL"     // NORMAL, SHUFFLE, REPEAT_ALL, RANDOM, REPEAT_ONE, DIRECT_1
    }
  }

  static get properties() {
    return {     
      transitionState:  { Type: Object }
    }
  }    

  attributeChangedCallback(_attrName, _oldVal, _newVal) {    
    super.attributeChangedCallback(_attrName, _oldVal, _newVal)    
  }

  static get template() {    
    return `
      <style>        
        :host {
          display: block;              
        }   

        .container {
          display: flex;              
        }
        
        .column {
          flex: 1 1 auto;          
        }

        .ready {
          fill: black;
          stroke: black;
          @apply --comp-music-transitioncontrol-ready
        }

        .active {
          fill: orange;
          stroke: orange;
          @apply --comp-music-transitioncontrol-active
        }

        .disabled {
          fill: lightgrey;
          stroke: lightgrey;
          @apply --comp-music-transitioncontrol-disabled
        }
      </style>


      <div class="container">
        <div class="column">
          <svg id="svgShuffle" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path d="M21.17 18.34L10.83 8 8 10.83l10.34 10.34 2.83-2.83zM29 8l4.09 4.09L8 37.17 10.83 40l25.09-25.09L40 19V8H29zm.66 18.83l-2.83 2.83 6.26 6.26L29 40h11V29l-4.09 4.09-6.25-6.26z"/></svg>
        </div>
        <div class="column">
          <svg id="svgPrev" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path d="M12 12h4v24h-4zm7 12l17 12V12z"/></svg>
        </div>
        <div class="column">        
          <svg id="svgPlay" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path d="M16 10v28l22-14z"/></svg>
          <svg id="svgPause" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path d="M12 38h8V10h-8v28zm16-28v28h8V10h-8z"/></svg>
          <svg id="svgStop" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path d="M12 12h24v24H12z"/></svg>
          <!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->
          <svg id="svgTrans" width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#000">
              <g fill="none" fill-rule="evenodd" stroke-width="2">
                  <circle cx="22" cy="22" r="1">
                      <animate attributeName="r"
                          begin="0s" dur="1.8s"
                          values="1; 20"
                          calcMode="spline"
                          keyTimes="0; 1"
                          keySplines="0.165, 0.84, 0.44, 1"
                          repeatCount="indefinite" />
                      <animate attributeName="stroke-opacity"
                          begin="0s" dur="1.8s"
                          values="1; 0"
                          calcMode="spline"
                          keyTimes="0; 1"
                          keySplines="0.3, 0.61, 0.355, 1"
                          repeatCount="indefinite" />
                  </circle>
                  <circle cx="22" cy="22" r="1">
                      <animate attributeName="r"
                          begin="-0.9s" dur="1.8s"
                          values="1; 20"
                          calcMode="spline"
                          keyTimes="0; 1"
                          keySplines="0.165, 0.84, 0.44, 1"
                          repeatCount="indefinite" />
                      <animate attributeName="stroke-opacity"
                          begin="-0.9s" dur="1.8s"
                          values="1; 0"
                          calcMode="spline"
                          keyTimes="0; 1"
                          keySplines="0.3, 0.61, 0.355, 1"
                          repeatCount="indefinite" />
                  </circle>
              </g>
          </svg>
        </div>
        <div class="column">        
          <svg id="svgNext" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path d="M12 36l17-12-17-12v24zm20-24v24h4V12h-4z"/></svg>
        </div>
        <div class="column">
          <svg id="svgRepeat" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path d="M14 14h20v6l8-8-8-8v6H10v12h4v-8zm20 20H14v-6l-8 8 8 8v-6h24V26h-4v8z"/></svg>                    
          <svg id="svgRepeat1" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path d="M14 14h20v6l8-8-8-8v6H10v12h4v-8zm20 20H14v-6l-8 8 8 8v-6h24V26h-4v8zm-8-4V18h-2l-4 2v2h3v8h3z"/></svg>
        </div>
      </div>    
    `
  }  

  ready() 
  {
    super.ready() 
    this.updateSvgFromTransitionStateObject()    
  }


  updateSvgFromTransitionStateObject() 
  {    
    switch(this.transitionState.playMode)
    {
      // when the playMode is NORMAL, we do set the "ready" class on every svg element
      // nothing is active and nothing special is happening here
      case "NORMAL":    
        this.setStandardVisibilities()
        this.clearStylesOnAllElementsAndSetReady()        
        break
      // when the playMode is SHUFFLE, we do set the "ready" class on every svg element
      // except the shuffle svg. The shuffle svg should be "active"
      case "SHUFFLE":
        this.setStandardVisibilities()
        this.clearStylesOnAllElementsAndSetReady()        
        this.setStyleOnElement(this.$.svgShuffle, "active")
        break
      // when the playMode is RANDOM, we do set the "ready" class on every svg element
      // except the shuffle svg and the repeat svc. The shuffle svg should be "active"
      case "RANDOM":       
        this.setStandardVisibilities()
        this.clearStylesOnAllElementsAndSetReady()   
        this.setStyleOnElement(this.$.svgShuffle, "active")
        this.setStyleOnElement(this.$.svgRepeat, "active")              
        break
      // when the playMode is REPEAT_ALL, we do set the "ready" class on every svg element
      // except the repeat svc. The repeat svg should be "active". We have to hide repeat1
      case "REPEAT_ALL":
        this.setStandardVisibilities()
        this.clearStylesOnAllElementsAndSetReady()
        this.setStyleOnElement(this.$.svgRepeat, "active")        
        break
      // when the playMode is REPEAT_ONE, we do set the "ready" class on every svg element
      // except the repeat svc. The repeat svg should be "active". We have to hide repeat
      case "REPEAT_ONE":
        this.setStandardVisibilities()
        this.clearStylesOnAllElementsAndSetReady()
        this.setStyleOnElement(this.$.svgRepeat1, "active")        
        break
      // all other show all contros as "ready"
      default:
        this.setStandardVisibilities()
        this.clearStylesOnAllElementsAndSetReady()
    }

    // TODO: @@@
    /*
      transportState : "STOPPED",   // STOPPED, PLAYING, PAUSED_PLAYBACK  
      playMode       : "NORMAL"     // NORMAL, SHUFFLE, REPEAT_ALL, RANDOM, REPEAT_ONE, DIRECT_1
    */
  }

  setStandardVisibilities()
  {    
    this.hideElement(this.$.svgRepeat1)
    this.hideElement(this.$.svgStop)
    this.hideElement(this.$.svgTrans)
    this.hideElement(this.$.svgPause)
    
    this.showElement(this.$.svgShuffle);
    this.showElement(this.$.svgRepeat);
    this.showElement(this.$.svgPlay);
    this.showElement(this.$.svgNext);
    this.showElement(this.$.svgPrev);
  }


  clearStylesOnAllElementsAndSetReady()
  {
    this.setStyleOnElement(this.$.svgShuffle, "ready")
    this.setStyleOnElement(this.$.svgRepeat,  "ready")
    this.setStyleOnElement(this.$.svgRepeat1, "ready")
    this.setStyleOnElement(this.$.svgPlay,    "ready")
    this.setStyleOnElement(this.$.svgPause,   "ready")
    this.setStyleOnElement(this.$.svgStop,    "ready")
    this.setStyleOnElement(this.$.svgTrans,   "ready")
  }

  setStyleOnElement(_element, _style)
  {
    _element.classList.remove("ready", "active", "disabled")
    _element.classList.add("_style")
  }


}

window.customElements.define('comp-music-transitioncontrol', Component_Music_TransitionControl);

