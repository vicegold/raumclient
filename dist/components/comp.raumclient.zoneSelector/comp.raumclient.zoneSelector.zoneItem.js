/**
 * ChriD 26.01.2018 
 * https://www.materialui.co/icons?
 */

import {ComponentBase} from '../comp.base/comp.base.polymer.js';


export class Component_Raumclient_ZoneSelector_ZoneItem extends ComponentBase {
 
  constructor() {     
    super()       
    this.isReady        = false
    this.zoneData       = null
    this.availableRooms = []
    this.editMode       = false
  }

  static get properties() {
    return { 
        zoneData:       { Type: Object },
        availableRooms: { Type: Array }
    }
  }  

  static get template() {    
    return `
      <style>
      :host {            
        outline: none;        
        width: 100%;
        display: block;        
        margin-bottom: 2em;
        @apply --comp-raumclient-zoneselector-zoneitem-container;
      }    

      .container {
        width: 100%;                     
      }

      .container:focus {
        outline: none;
      }

      .hoverItem {
        transition: all .2s ease-in-out; 
      }

      .hoverItem:hover { 
        cursor: pointer;
        transform: scale(0.95); 
      }
      
      .containerZone {
        width: 100%;    
        clear: both;                           
        display: flex;
        flex-direction: row;
        background-color: #1E1E1E;         
        @apply --comp-raumclient-zoneselector-zoneitem-containerZone; 
      }     

      .container .imageFrame{
        height: 120px;
        /*border: 1px solid lightgray;*/
        border-left: 0px;   
        /*flex-basis: 0;*/
        flex-shrink: 0;
        flex-grow: 0;                         
      }

      .container .imageFrame .colorPlaceholder{
        height: 100%;
        width: 20px;               
        float: left;        
        @apply --comp-raumclient-zoneselector-zoneitem-placeholder;             
      }

      .container .zoneInfos{           
        /*flex-basis: 0;*/
        flex-shrink: 1;
        flex-grow: 1;  
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;                       
        min-width: 0px;
        padding-left: 1.0em;
        padding-right: 1.0em;
        padding-top: 0.75em;
        padding-bottom: 0.75em;
        color: white;
        @apply --comp-raumclient-zoneselector-zoneitem-zoneInfos;
      }

      .title, .artist {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 0.4em;
      }

      .title {
        font-weight: bold;
      }

      
      .artist {
        color: darkgray;
      }
      

      comp-image {
        width:  120px;
        height: 120px;
        float: left;      
      }

      .containerRooms {
        width: 100%;    
        clear: both;                                   
        @apply --comp-raumclient-zoneselector-zoneitem-containerRooms; 
      }

      .containerEditRooms {
        width: 100%;    
        clear: both;                                   
        display: none;
        @apply --comp-raumclient-zoneselector-zoneitem-containerEditRooms; 
      }

      .containerGroupEdit {
        width: 100%;    
        clear: both;                                   
        text-align: center;
        font-weight: bold;
        line-height: 2.0em;
        border-top: 1px solid lightgray;
        border-bottom: 1px solid lightgray;
        display: none;
        @apply --comp-raumclient-zoneselector-zoneitem-containerGroupEdit;         
      }

      .containerGroupEdit:hover {        
        background: #1E1E1E;
        fill: white;
        color: white;
        cursor: pointer;
        @apply --comp-raumclient-zoneselector-zoneitem-containerGroupEdit-hover;         
      }

      </style>

      <div class="container" id="container" tabindex="0">

        <div class="hoverItem">

          <div class="containerZone">
            <div class="imageFrame">                                  
              <div class="colorPlaceholder" id="colorPlaceholder"></div>
              <comp-image id="albumArtUri" srcDefault="assets/images/sorry-no-image-available_120.png" src="{{ zoneData.mediaItem.albumArtURI }}"></comp-image>        
            </div>
            <div class="zoneInfos">  
              <div class="title">{{ zoneData.mediaItem.title }}</div>                    
              <div class="artist">{{ zoneData.mediaItem.artist }}</div>         
            </div>
          </div>          
          <div class="containerRooms" id="containerRooms">          
          </div> 

        </div>

        <div class="containerEditRooms" id="containerEditRooms">          
        </div> 
        
        <div class="containerGroupEdit" id="containerGroupEdit">                    
        </div>

      </div>                   
    `
  }  

  ready() {     
    var self = this
    this.isReady = true 
    super.ready()

    this.$.containerGroupEdit.innerHTML = this.label(6)

    // when clicking on the "edit group" button we have to show all available rooms for selection
    // those one which are in the zone will be marked as 'selected'
    this.$.containerGroupEdit.addEventListener("click", function(){
      if(!self.editMode)
        self.enterEditMode()
      else
        self.leaveEditMode()
    })
    //when clicking anywhere else we have to exit the edit mode (if we are in)
    this.$.container.addEventListener("blur", function(){
      if(self.editMode)
        self.leaveEditMode()
    })
    //this.$.container.addEventListener("focusout", function(){
    //  if(self.editMode)
    //    self.leaveEditMode()
    //})

    this.update()
  }  


  setData(_zoneData, _availableRoomsData) {
    this.zoneData = _zoneData
    this.availableRoomsData = _availableRoomsData 
    this.update()
  }


  setZoneData(_zoneData){  
    this.zoneData = _zoneData    
    this.update()
  }

  setAvailableRoomsData(_availableRoomsData){  
    this.availableRoomsData = _availableRoomsData    
    this.update()
  }


  update()
  {
    if(!this.isReady || !this.zoneData)
      return       
    if(this.zoneData.isZone)
      this.showElement(this.$.containerGroupEdit)
    else
      this.hideElement(this.$.containerGroupEdit)
    
    this.updateMediaData()
    this.updateRooms()
    this.updateEditRooms()
    this.updateColorPlaceholder()
  }

  updateColorPlaceholder()
  {
    // set placeholder color to first room color, we do get the color from the control itself
    // and not from the data because we always want to have the first room shown. This may not
    // be equal to the one in the data!
    if(this.zoneData.rooms && this.zoneData.rooms.length)
    {
      //this.$.colorPlaceholder.style.backgroundColor =  this.zoneData.rooms[0].color
      var roomElements = this.$.containerRooms.getElementsByTagName("comp-raumclient-zoneselector-zoneitem-room")
      if(roomElements && roomElements.length)
        this.$.colorPlaceholder.style.backgroundColor =  roomElements[0].roomData.color
    }
  }

  updateMediaData()
  {
    if(this.zoneData.mediaItem)
    {
      // directly set the album art uri on the image
      this.$.albumArtUri.setAttribute("src", this.zoneData.mediaItem.albumArtURI)      
      // TODO: @@@ maybe i have to notify the subitems instead?      
      this.notifyPath('zoneData.mediaItem')      
    }
  }


  cleanUDN(_udn)
  {
    // only keep numbers and standard chars 
    return _udn.replace(/[^a-zA-Z0-9]/g, '' )
  }


  updateRooms()
  {    
    if(!this.zoneData || !this.zoneData.rooms)
      this.$.containerRooms.innerHTML = ""
    else
      this.updateRoomElements(this.$.containerRooms, this.zoneData.rooms, "", "comp-raumclient-zoneselector-zoneitem-room")
  }


  updateEditRooms()
  {
    var self = this

    if(!this.zoneData || !this.availableRoomsData)
      this.$.containerEditRooms.innerHTML = ""
    else
      this.updateRoomElements(this.$.containerEditRooms, this.availableRoomsData, "edit", "comp-raumclient-zoneselector-zoneitem-room", function(_roomData, _roomElement){
        _roomElement.showSelector = true
        _roomElement.selected = self.isRoomInZone(_roomData.udn)
        // TODO: check if selected or not
      })
  }


  isRoomInZone(_udn)
  {
    for(var i=0; i<this.zoneData.rooms.length; i++)
    {
      if(this.zoneData.rooms[i].udn == _udn)
        return true
    }   
    return false
  }


  updateRoomElements(_containerElement, _rooms, _idPrefix, _elementName, roomObjectFunction)
  {
    // clear the display if there ois no data
    if(!_rooms || !_rooms.length)
    {
      _containerElement.innerHTML = ""
      return
    }

    try
    {    
      var updatedRoomUDNs = new Array()      	
        
      for(var i=0; i<_rooms.length; i++)
      {
        var room = _rooms[i]
        var cleandedUdn = this.cleanUDN(room.udn)               
        var roomItemElement = this.shadowRoot.getElementById(_idPrefix + cleandedUdn)          
        if(!roomItemElement)
        {
          var newRoomItemElement = document.createElement(_elementName)
          newRoomItemElement.id = _idPrefix + cleandedUdn      
          _containerElement.append(newRoomItemElement)
          if(roomObjectFunction)
            roomObjectFunction(room, newRoomItemElement)
          newRoomItemElement.setRoomData(room)          
          updatedRoomUDNs.push(newRoomItemElement.id.toString())
        }
        // setRoomData element is already there, wo only have to update the data of the element
        else
        {
          if(roomObjectFunction)
            roomObjectFunction(room, roomItemElement)
          roomItemElement.setRoomData(room)          
          updatedRoomUDNs.push(roomItemElement.id.toString())
        }
      }

      // now clear elements where there is no setRoomData anymore, to do this we select all '_elementName'
      // elements and check if we had an entry in the zone configuration    
      var elements = _containerElement.getElementsByTagName(_elementName)
      if(elements && elements.length)
      {
        for(var i=0; i<elements.length; i++)
        {
          var roomItemElement = elements[i]              
          if(updatedRoomUDNs.indexOf(roomItemElement.id) < 0)
          roomItemElement.remove()
        }
      }
    }
    catch(_e)
    {
      this.error(_e)  
    }
  }


  enterEditMode()
  {
    this.editMode = true
    // hide the current selected rooms for the zone list and show the edit room section        
    this.hideElement(this.$.containerRooms)
    this.showElement(this.$.containerEditRooms)   
    this.$.containerGroupEdit.innerHTML = "^"   
  }


  leaveEditMode()
  {
    // show the current selected rooms for the zone list and hide the edit room section
    this.hideElement(this.$.containerEditRooms)
    this.showElement(this.$.containerRooms)    
    this.$.containerGroupEdit.innerHTML = this.label(6)
    this.editMode = false    
  }

}

window.customElements.define('comp-raumclient-zoneselector-zoneitem', Component_Raumclient_ZoneSelector_ZoneItem);

