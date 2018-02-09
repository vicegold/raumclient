/**
 * ChriD 26.01.2018 
 * https://www.materialui.co/icons?
 */

import {ComponentBase} from '../comp.base/comp.base.polymer.js';


export class Component_Raumclient_ZoneSelector extends ComponentBase {
 
  constructor() {     
    super()       
    this.isReady    = false
    this.zoneData   = null
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
      }

      .container .itemContainer {
        clear: both;        
      }

      .container .itemContainer.zones { 
      }

      .container .itemContainer.rooms {             
      }

      </style>
    
      <div class="container" id="container">
        <div id="zonesContainer" class="itemContainer zones">
          <!-- here the zone selector items will be created, when item is a zone -->
        </div>        
        <div id="unassignedRoomsContainer" class="itemContainer rooms">
          <!-- here the unassigned room items will be created -->
        </div>
      </div>                    
    `
  }  

  ready() {     
    this.isReady = true 
    super.ready()
  }  


  setZoneData(_zoneData)
  {
    this.zoneData = _zoneData
    this.update()
  }


  cleanUDN(_udn)
  {
    // only keep numbers and standard chars 
    return _udn.replace(/[^a-zA-Z0-9]/g, '' )
  }

  update()
  {
    this.updateZones()    
  }

  updateZones()
  {
    try
    {
      // if no zone config is existent, clear all stuff
      if(!this.zoneData || !this.zoneData.zones.length)
      {
        this.$.zonesContainer.innerHTML = ""
        this.$.unassignedRoomsContainer.innerHTML = ""
        return
      }

      var updatedZoneUDNs = new Array()      	
        
      // check if there are any zones available that we can draw or update
      // if this is the case we run to each availabel zone
      if(this.zoneData.zones && this.zoneData.zones.length)
      {
        for(var i=0; i<this.zoneData.zones.length; i++)
        {   
          var zone = this.zoneData.zones[i]
          var cleandedUdn = this.cleanUDN(zone.udn)          
          // check if zone item is already there (by formated udn), if this is the case that is good, we only have
          // to set the new zone data to the item, otherwise we have to create the new zone item          
          var zoneSelectorItemElement = this.shadowRoot.getElementById(cleandedUdn)          
          if(!zoneSelectorItemElement)
          {
            var newZoneSelectorItemElement = document.createElement("comp-raumclient-zoneselector-zoneitem")
            newZoneSelectorItemElement.id =  cleandedUdn 
            // if we have a real zone we should always add it before the "unassigne rooms" dummy zones!
            if(zone.isZone)     
              this.$.zonesContainer.append(newZoneSelectorItemElement)
            else
              this.$.unassignedRoomsContainer.append(newZoneSelectorItemElement)           
            newZoneSelectorItemElement.setData(zone, this.zoneData.availableRooms)
            updatedZoneUDNs.push(newZoneSelectorItemElement.id.toString())
          }
          // zone element is already there, wo only have to update the data of the element
          else
          {                     
            zoneSelectorItemElement.setData(zone, this.zoneData.availableRooms)
            updatedZoneUDNs.push(zoneSelectorItemElement.id.toString())
          }
        }
      }          

      // now clear elements where there is no zone anymore, to do this we select all 'comp-raumclient-zoneselector-zoneitem>'
      // elements and check if we had an entry in the zone configuration    
      var elements = this.$.container.getElementsByTagName("comp-raumclient-zoneselector-zoneitem")
      if(elements && elements.length)
      {
        for(var i=0; i<elements.length; i++)
        {
          var zoneSelectorItemElement = elements[i]              
          if(updatedZoneUDNs.indexOf(zoneSelectorItemElement.id) < 0)
            zoneSelectorItemElement.remove()
        }
      }

    }
    catch(_e)
    {
      this.error(_e)  
    }

  }

}

window.customElements.define('comp-raumclient-zoneselector', Component_Raumclient_ZoneSelector);

