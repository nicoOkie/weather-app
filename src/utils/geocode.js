// NPM Imports
const request = require('request')


// Code
const geocode = (adress, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adress)}.json?access_token=pk.eyJ1Ijoibmljb29raWUiLCJhIjoiY2p2cXA2ZWgxMXFsZDQ5bGVtYjI0MDJrciJ9.Xl8lCyMgpwcLdYEidP7-pg&limit=1`
  
  request({
    url,
    json: true
  }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services!', undefined)
    } else if (body.features.length === 0) {
      callback(`Cannot find coordonates for : ${body.query[0]}.`, undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}


module.exports = geocode
