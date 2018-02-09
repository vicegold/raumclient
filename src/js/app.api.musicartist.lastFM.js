'use strict'

class AppApiMusicArtist_LastFM extends AppApiMusicArtist
{
  constructor() {  
    super()      
    this.cache = new LastFMCache();
    this.lastfm = new LastFM({
      apiKey    : 'f21088bf9097b49ad4e7f487abab981e',
      apiSecret : '7ccaec2093e33cded282ec7bc81c6fca',
      cache     : this.cache
    });
  }

  getInfoApi(_queryData, _resolve, _reject){
    // https://www.last.fm/api/show/artist.getInfo
    var self = this
    this.lastfm.artist.getInfo({artist: _queryData.artist}, {success: function(_data){      
      _resolve(self.convertData(_data))
    }, error: function(code, message){
      // TODO: @@@
      _reject(message)
    }});        
  }

  convertData(_data){    
    var convData = new Object()
    if(_data && _data.artist)
    {
      convData.name = _data.artist.name
      // get a high resolution image for the artist
      if(_data.artist.image)
      {
        for(var i=(_data.artist.image.length-1); i>0; i--)
        {
          convData.imageUrl = _data.artist.image[i]['#text']
          break
        }
      }
    }
    return convData
  }

}
