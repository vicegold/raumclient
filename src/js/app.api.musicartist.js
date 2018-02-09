'use strict'

class AppApiMusicArtist
{
  constructor() {

  }

  getInfo(_queryData){  
    var self = this
    return new Promise(function(resolve, reject){
      self.getInfoApi(_queryData, resolve, reject)
    })
  }

  getInfoApi(_queryData, _resolve, _reject){
    // override!
  }

  convertData(_data){
    // override!
    return _data
  }
}