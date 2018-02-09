'use strict'
var RaumkernelLib = require('node-raumkernel')

class AppRaumclient_ControlCenter extends RaumkernelLib.Base
{
    constructor(_app)
    {
      super()     
      this.app = _app
      this.elementZoneSelector  = null
      this.elementAlbumArtCover = null
    }

    additionalLogIdentifier()
    {
      return "Raumclient"
    }


    init()
    {
        this.initElements()
        // only for test:
        this.updateAlbumArtBackgroundView()
    }

    initElements()
    {
      this.elementZoneSelector  = document.getElementById("controlcenter_zoneselector")     
      this.elementAlbumArtCover = document.getElementById("controlcenter_albumArtCover") 
    }


    combinedZoneStateChanged(_zoneState)
    {
        this.elementZoneSelector.setZoneData(_zoneState)
    }

    updateAlbumArtBackgroundView() 
    {
      app.getMusicArtistInfoFromApi("The Pretty Reckless").then(function(_data){
        _data = _data        //_data.artist
      })
      //?albumId=19743285&album=Caravan%20Palace&artist=Caravan%20Palace&service=Tidal&width=800&height=800
      this.elementAlbumArtCover= "url('http://10.0.0.203:47366/raumfeldImage?albumId=Alb.55376000&album=Light%20Me%20Up&artist=The%20Pretty%20Reckless&service=Napster&width=2000&height=2000') no-repeat center center fixed"
      this.elementAlbumArtCover = "cover"      
    }
    

}