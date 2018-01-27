/**
 * ChriD 27.01.2018 
 */

import {ComponentBase} from '../comp.base/comp.base.polymer.js';


export class Component_Logviewer extends ComponentBase {
 
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
        font: 12px monospace;
        overflow-y: scroll;
      }

      .logLine {
        width: 100%;        
        display: flex;                
      }

      .logLine .time {
        flex: 0; 
        min-width: 8em;
        padding-left: 0.5em;
      }

      .logLine .log {
        flex: 1;    
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .logError {
        color: red;
      }

      .logWarning {
        color: orange;
      }

      .logInfo {
        color: green;
      }

      .logDebug {
        color: darkgrey;
      }

      .logSilly {
        color: lightgrey;
      }

      </style>

      <div class="container" id="logContainer">         
      </div>    
    `
  }

  connectedCallback() { 
    super.connectedCallback()
  }


  ready() {
    this.isReady = true    
    super.ready()
  }


  getReadableTime()
  {
    var now = new Date()
    var hour = "0" + now.getHours()
    hour = hour.substring(hour.length-2)
    var minute = "0" + now.getMinutes()
    minute = minute.substring(minute.length-2)
    var second = "0" + now.getSeconds()
    second = second.substring(second.length-2)
    var millisecond = "00" + now.getMilliseconds()
    millisecond = millisecond.substring(millisecond.length-3)
    return hour + ":" + minute + ":" + second + "." + millisecond
  }


  addLog(_logData)
  {
    if(!this.isReady)
      return

    var newlogElement = document.createElement("div")
    newlogElement.classList.add("logLine")
    newlogElement.innerHTML = "<div class='time'>" + this.getReadableTime() + "</div>" + "<div class='log'>" + _logData.log + "</div>"
    // error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5
    switch(_logData.logType)
    {
      case 0:
        newlogElement.classList.add("logError")
        break  
      case 1:
        newlogElement.classList.add("logWarning")
        break
      case 2:
        newlogElement.classList.add("logInfo")
        break    
      case 3:
      case 4:
        newlogElement.classList.add("logDebug")
        break      
      case 5:
        newlogElement.classList.add("logSilly")
        break      
    }
    this.$.logContainer.append(newlogElement)

    // scroll down to last log entry
    this.$.logContainer.scrollTop = this.$.logContainer.scrollHeight;
  }

}

window.customElements.define('comp-logviewer', Component_Logviewer);

