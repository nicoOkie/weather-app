// NPM Imports
const request = require('request')

// Code
const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/96aac7cd5f8603ac98a8c22f7e2ce897/${latitude},${longitude}?units=si&lang=fr`
 
  request({
    url,
    json: true
  }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather services', undefined)
    } else if (body.error) {
      callback(body.error, undefined)
    } else {
      const { currently, daily } = body
      callback(undefined, `${daily.data[0].summary} Il fait actuellement ${currently.temperature}°C. La maximale aujourd'hui est: ${body.daily.data[0].temperatureHigh}°C et la minimale: ${body.daily.data[0].temperatureLow}°C. Il y a un risque de précipitations de ${currently.precipProbability}%.`)
    }
  })
}

module.exports = forecast
