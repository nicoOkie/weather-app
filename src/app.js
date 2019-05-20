// NPM Imports
const path = require('path')
const express = require('express')
const hbs = require('hbs')


// Local Imports
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static dierctory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'nicoOkie'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'nicoOkie'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'Un message d\'erreur statique',
    name: 'nicoOkie'
  })
}) 

app.get('/weather', (req, res) => {
  if (!req.query.adress) {
    return res.send({
      errorMsg: 'You must provide an adress.'
    })
  }

  geocode(req.query.adress, (error, {latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        errorMsg: error,
      })
    }
    
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          errorMsg: error,
        })
      }
  
      res.send({
        forecast: forecastData,
        location,
        adress: req.query.adress
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMsg: 'Help article not found',
    name: 'nicoOkie'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMsg: 'Page not found',
    name: 'nicoOkie'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
