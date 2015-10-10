var google_maps = function(){
  var GoogleMapsAPI = require('googlemaps'),
    gmAPI = new GoogleMapsAPI({
      key: 'AIzaSyDCKGKHejiuUsz30uaRCFRd8QqWXiGkGIE',
      stagger_time:       1000, // for elevationPath 
      encode_polylines:   false,
      // proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests 
      secure:             false // use https 
    });

  var LookupCoords = function(latlng, callback){
     // reverse geocode API 
    var reverseGeocodeParams = {
      // "latlng":        "35.9025935,-79.0745011",
      "latlng": latlng,
      "result_type":   "postal_code",
      "language":      "en",
      "location_type": "APPROXIMATE"
    };

    gmAPI.reverseGeocode(reverseGeocodeParams, callback); //err, result
  }

  var GetMapURL = function(latlng,callback){
    var params = {
      // center: '444 W Main St Lock Haven PA',
      // zoom: 15,
      size: '500x400',
      maptype: 'roadmap',
      markers: [
         {
          location: latlng,
          color: 'red',
          weight: '5',
          label: "A",
          shadow: true
        }
      ],
      style: [
        {
          feature: 'road',
          element: 'all',
          rules: {
            hue: '0x00ff00'
          }
        }
      ]
    };
    return gmAPI.staticMap(params); // return static map URL 
  }

  this.LookupCoords = LookupCoords;
  this.GetMapURL = GetMapURL;

}
google_maps();
module.exports = google_maps;