const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT  || 3000

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and view locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

// Setup static location to serve
app.use(express.static(publicDirectoryPath))

// Routes
app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({products:[]})
})



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Gianbattista Gualeni 2020'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Gianbattista Gualeni 2020'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'This is the help page',
        name: 'Gianbattista Gualeni 2020'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }
        // console.log('1. Location:', location)
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            // console.log('2. Forecast:', forecastData)
            return res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })
        })    
    })
})


// Http 404 - match anything must be last
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help Article Not Found',
        name: 'Gianbattista Gualeni 2020'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page Not Available',
        name: 'Gianbattista Gualeni 2020'
    })

})

// 3000 is kind of "programmer port"
app.listen(port, () => {
    console.log('Server is running on port', port)
})
