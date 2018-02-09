'use strict'
var RaumkernelLib = require('node-raumkernel')
var PackageNode = require('../package.json')
var osLocale = require('os-locale')
var i18next = require('i18next')
var i18nextBackend = require('i18next-node-fs-backend')

  
// TODO: toggle fullscreen
// https://github.com/nwjs/nw.js/wiki/window

/*
https://github.com/nwjs/nw.js/wiki/Preserve-window-state-between-sessions
  for app
-*/  


class AppRaumclient extends RaumkernelLib.Base
{
    constructor()
    {
      super()
      this.gui                        = require('nw.gui')
      this.mainWindow                 = this.gui.Window.get()
      this.loggerWindow               = null
      this.raumkernel                 = null
      this.logger                     = null

      // apis
      this.apiMusicArtist             = new AppApiMusicArtist_LastFM()

      // create app handlers for the different views
      this.appControlCenter           = new AppRaumclient_ControlCenter()

      // HTML elements
      this.elementToolbar             = null
      this.elementToolbarContainer    = null
      this.elementInspector           = null
      this.elementInspectorContainer  = null
      this.elementViewOverlay         = null

      
    }

    additionalLogIdentifier()
    {
        return "Raumclient"
    }

    
    init() 
    {   
      var self = this; 
      // only do init of the app if the localizations were loaded and found
      // if there is a problem the client will not start
      return new Promise(function(_resolve, _reject){  
        self.initLocales().then(function(){
          self.initElements()
          self.initToolbar()
          self.initViewOverlay()
          self.initLogger()
          self.initRaumkernel()
          self.initAppControlCenter()
          _resolve()
        }).catch(function(_err){
          _reject(_err)
        })    
      })  
    }
    
    
    // a method for converting a key to a label
    label(_key){
      return i18next.t(_key)
    }


    initLocales()
    {      
      return new Promise(function(_resolve, _reject){
        // get the local language from th system settings
        // if this will lead to a problem for compiling on mac or linux i may have to remove it (os-local)
        var localLng = osLocale.sync().substring(0,2)
        // set the localization library to use a local backend
        i18next.use(i18nextBackend)
        // init the localization library with appropiate stetings
        i18next.init({
        debug: false,
        lng: localLng,
        fallbackLng: 'en',
        backend: {
          loadPath: 'locales/{{lng}}/{{ns}}.json',
          addPath: 'locales/{{lng}}/{{ns}}.missing.json',
          jsonIndent: 2 
          }
        }, function(_err, _t) {
          if(_err)
            _reject(_err)
          else
            _resolve()
        })
      })
    }
    

    initAppControlCenter()
    {
      this.appControlCenter.init()       
    }


    initElements()
    {
      this.elementToolbar = document.getElementById("toolbar")
      this.elementToolbarContainer = document.getElementById("toolbarContainer")
      this.elementInspector = document.getElementById("inspector")
      this.elementInspectorContainer = document.getElementById("inspectorContainer")
      this.elementViewOverlay = document.getElementById("viewOverlay")
      this.hideElement(this.elementInspectorContainer)
    }


    initViewOverlay()
    {
      var self = this
      this.elementViewOverlay.setAttribute("text", this.label("1"));
      this.elementViewOverlay.setAttribute("textdetail", this.label("2"));
           
      setTimeout(function(){ 
        self.elementViewOverlay.setAttribute("text", self.label("3"));
        self.elementViewOverlay.setAttribute("textdetail", self.label("4"));
      }, 5000)      
    }


    initLogger()
    {
      var self = this;
      this.parmLogger(new RaumkernelLib.Logger(4, "../logs"))
      this.parmLogger().on("log", function (_logData) {
        // log to console
        console.log(_logData.log)      
        // and log to inspector
        if(self.elementInspector.getLogViewerElement())
          self.elementInspector.getLogViewerElement().addLog(_logData)
      })      
      this.logInfo(PackageNode.name + " v" + PackageNode.version + " on " + process.platform + " " + process.arch)
      this.logDebug("NodeJs: " + process.version.toString() + " " + JSON.stringify(process.versions))
    }

    
    initRaumkernel()
    {    
      var self = this  
      this.raumkernel = new RaumkernelLib.Raumkernel()      
      this.raumkernel.parmLogger(this.logger)
      this.raumkernel.init()
      this.raumkernel.on("systemReady", function(_ready){        
          self.raumfeldSystemReadyStateChanged(_ready)          
      });
    }
  

    initToolbar()
    {      
      this.setEventsForToolbar()
      this.setHandleEventsForToolbar()             
    }


    setHandleEventsForToolbar()
    {
      var self = this
      this.elementToolbar.addEventListener('itemClicked', function (_e) {        
        if(_e.detail.itemId == "close")     { self.quit() }
        if(_e.detail.itemId == "maximize")  { self.mainWindow.maximize() }
        if(_e.detail.itemId == "unmaximize"){ self.mainWindow.unmaximize() }        
        if(_e.detail.itemId == "minimize")  { self.mainWindow.minimize() }        
        if(_e.detail.itemId == "log")       { self.toggleInspectorView() } 
      })
    }


    quit()
    {
      this.gui.App.quit()
    }

    setEventsForToolbar() 
    { 
      var self = this
      this.mainWindow.on('maximize', function () {          
        self.elementToolbar.setAttribute("windowState", "maximized")
      });
      this.mainWindow.on('unmaximize', function () {          
        self.elementToolbar.setAttribute("windowState", "normal")
      });
      this.mainWindow.on('minimize', function () {          
        self.elementToolbar.setAttribute("windowState", "minimized")
      });      
      this.mainWindow.on('restore', function () {          
        self.elementToolbar.setAttribute("windowState", "normal")
      });      
    }


    toggleInspectorView()
    { 
      if(!this.elementInspectorContainer.style.display || this.elementInspectorContainer.style.display == "none") 
      {           
        this.showElement(this.elementInspectorContainer)
      }
      else
      {
        this.hideElement(this.elementInspectorContainer)      
      }
    }


    hideElement(_element)
    {
      _element.style.display = "none"
      _element.style.opacity = "0"
     
    }


    showElement(_element, _type = "flex")
    {
      _element.style.display = _type
      _element.style.opacity = "1"    
    }


    showViewOverlay()
    {
      this.showElement(this.elementViewOverlay)
    }

    hideViewOverlay()
    {
      this.hideElement(this.elementViewOverlay)
    }


    raumfeldSystemReadyStateChanged(_ready)
    {
      if(_ready)
        this.hideViewOverlay()
      else
        this.showViewOverlay()
    }


    getMusicArtistInfoFromApi(_artist, _album)
    {
      var self = this
      return new Promise(function(_resolve, _reject){
        self.apiMusicArtist.getInfoApi({artist: _artist, album: _album}, _resolve, _reject)
      })        
    }     
    
}