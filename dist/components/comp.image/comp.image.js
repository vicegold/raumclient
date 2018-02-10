/**
 * ChriD 17.01.2018 
 * Image component for showing default image while image is loading
 */

import {ComponentBase} from '../comp.base/comp.base.polymer.js';


export class Component_Image extends ComponentBase {
 
  constructor() {    
    super() 
    this.imageObject = null    
    this.imageObjectDefault = 
    this.isImageLoaded = false
    this.isDefaultImageLoaded = false
    this.isReady = false
  }

  static get properties() {
    return { 
      src:        { Type: String }, 
      srcDefault: { Type: String }      
    }
  }    

  static get template() {    
    return `
      <style>
      :host {
        display: block;        
        outline: none;                    
      }

      #imageContainer {
        width: 100%;
        height:100%;
        background-size: cover;
        position: relative;
        display: inline-block;
        overflow: hidden;
        margin: 0;
      }
      
      img {
        height: 100%;
        width: auto;    
        -webkit-transition: opacity 0.5s ease-in-out;
        -moz-transition: opacity 0.5s ease-in-out;
        -o-transition: opacity 0.5s ease-in-out;
        transition: opacity 0.5s ease-in-out; 
      }

      .transparent {
        opacity:0;
      }

      </style>
      <div id="imageContainer">        
        <img id="image" class="transparent">        
      </div>    
    `
  }

  connectedCallback() { 
    super.connectedCallback()
    this.getDefaultImage()
    this.getImage()   
  }

  ready() {
    this.isReady = true    
    super.ready()      
    // when the control is ready we should show the image
    this.showOrHideImage()    
  }


  getDefaultImage()
  {
    var self = this
    // release the memory for the old image
    this.imageObjectDefault = null
    this.isDefaultImageLoaded = false
    // create a new image for downloading and if download is finished we ser the url of
    // the image elment to the new image. It won't download it again because it has it in cache
    this.imageObjectDefault = new Image()
    this.imageObjectDefault.onload = function() { 
      self.isDefaultImageLoaded = true
      //self.setImage()
      var imageDefaultUrl = self.getAttribute("srcDefault")
      self.$.imageContainer.style.backgroundImage = "url('" + imageDefaultUrl  + "')"  
    }
    // start downloading the default image
    this.imageObjectDefault.src = this.getAttribute("srcDefault")
  }

  
  getImage()
  {
    var self = this     
    // clear the current image when getting a new one   
    this.clearImage()   
    // create a new image for downloading and if download is finished we ser the url of
    // the image elment to the new image. It wont download it again because it has it in cache
    this.imageObject = new Image()
    this.imageObject.onload = function(){
      self.isImageLoaded = true      
      self.showOrHideImage()      
    }
    this.imageObject.src = this.getAttribute("src")
  }


  showOrHideImage()
  {
    // if control is not ready we can not show any image
    if(!this.isReady)
      return

    // if there is no image we have to hide it
    // the default image will be shown as a background image
    if(!this.isImageLoaded && this.isDefaultImageLoaded)
    {     
      if(!this.$.image.classList.contains("transparent"))
        this.$.image.classList.add("transparent") 
    }
    // show the image if it's loaded, it will be in front of the background image
    // so the background image will be still there but wil lnot be visible due overlayed
    if(this.isImageLoaded)
    {
      var imageUrl = this.getAttribute("src")
      this.$.image.src = imageUrl  
      if(this.$.image.classList.contains("transparent"))
        this.$.image.classList.remove("transparent")
    }
  }


  clearImage()
  {
    // release the memory for the old image
    this.imageObject = null   
    this.isImageLoaded = false
    // when clearing the image we have to hide it. This will be done by setImage method
    // wchich will check if there is
    this.showOrHideImage()
  }


  attributeChangedCallback(_attrName, _oldVal, _newVal) 
  {    
    super.attributeChangedCallback(_attrName, _oldVal, _newVal)
    if(_attrName == "src")
      this.getImage()
    if(_attrName == "src")
      this.getDefaultImage()
  }

}

window.customElements.define('comp-image', Component_Image);

