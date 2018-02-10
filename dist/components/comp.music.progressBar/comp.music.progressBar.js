/**
 * ChriD 17.01.2018 
 * RaumController "Now playing" component
 */

import {ComponentBase} from '../comp.base/comp.base.polymer.js';


export class ComponentRcNowPlaying extends ComponentBase {
 
  constructor() {    
    super()        
    this.mediaItem = null   
  }

  static get properties() {
    return { 
      mediaItem: { Type: Object } 
    }
  }    

  static get template() {    
    return `
      <style>        
        :host {
          /*all: initial;*/
          display: block;
          border: 1px solid red;
        }      
        
        .infoline {
          height: 1.2em;
        }

        div.title{          
          font-weight: var(--comp-rc-nowPlaying-title-font-weight, bold);
        }

        div.positionSliderContainer {
          width: 100%;
        }

        div.positionSliderContainer .positionSlider {
          -webkit-appearance: none; 
          appearance: none;
          width: 100%; 
          height: 0.8em; 
          border-radius: 5px;
          background: #d3d3d3; 
          outline: none; 
          opacity: 0.7; 
          -webkit-transition: .2s;
          transition: opacity .2s;
      }
            
      div.positionSliderContainer .positionSlider:hover {
          opacity: 1;
      }
      
      /* The slider handle (use webkit (Chrome, Opera, Safari, Edge) and moz (Firefox) to override default look) */ 
      div.positionSliderContainer .positionSlider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 1.2em; 
          height: 1.2em;
          border-radius: 50%; 
          background: #4CAF50;
          cursor: pointer;
      }

      div.positionSliderContainer .positionSlider::-moz-range-thumb {
        width: 1.2em; 
        height: 1.2em;
        border-radius: 50%;
        background: #4CAF50;          
        cursor: pointer;
      }

      comp-image {
        width:  300px;
        height: 300px;
      }

      </style>


      <div>
        <comp-image id="albumArtUri" srcDefault="noAlbumArt.png"></comp-image>
        <div class="infoline album">{{mediaItem.album}}</div>
        <div class="infoline title">{{mediaItem.title}}</div>
        <div class="infoline artist">{{mediaItem.artist}}</div>
        <div class="positionSliderContainer">
          <input type="range" min="1" max="100" value="50" class="positionSlider" id="myRange">
        </div>        
      </div>    
    `
  }  


  attributeChangedCallback(_attrName, _oldVal, _newVal) 
  {    
    super.attributeChangedCallback(_attrName, _oldVal, _newVal)
  
  }


  ready() {      
    super.ready()
  }


  setMediaItem(_mediaItem)
  {
    this.mediaItem = _mediaItem
    // we have to explicitely set the src on the albumartUri image to trigger the reload of the image 
    // this has always to be done if a new media item is set on the now playing component   
    this.$.albumArtUri.setAttribute("src", this.mediaItem.albumArtURI)
  }


}

window.customElements.define('comp-rc-nowplaying', ComponentRcNowPlaying);

