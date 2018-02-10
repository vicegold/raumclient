/**
 * ChriD 17.01.2018 
 * RaumController "Now playing" component
 */

import {ComponentBase} from '../comp.base/comp.base.polymer.js';


export class Component_Music_NowPlaying extends ComponentBase {
 
  constructor() {    
    super()        
    this.mediaItem = {      
      title: 'Unknown',
      artist: 'Unknown',      
      album: 'Unknown',
      duration: '0:00:00.000'      
    }    
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
          display: block;              
        }   

        .container {
          display: flex;              
        }
        
        .column.left {
          flex: 0 0 auto;          
        }

        .column.right {
          flex: 1 1 auto;
          margin-left: 0.5em;          
        }

        .row {
          width: 100%;            
          min-height: 1.43em; 
          max-height: 2.86em;          
          overflow: hidden;
          text-overflow: ellipsis;          
        }   

        .row.title {
          font-weight: bold;
        }

        comp-image {
          width:  160px;
          height: 160px;
        }
      </style>


      <div class="container">
        <div class="column left">
          <comp-image id="albumArtUri" srcDefault="noAlbumArt.png"></comp-image>
        </div>
        <div class="column right">
          <div class="row title">{{mediaItem.title}}</div>
          <div class="row artist">{{mediaItem.artist}}</div>
          <div class="row album">{{mediaItem.album}}</div>
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

window.customElements.define('comp-music-nowplaying', Component_Music_NowPlaying);

