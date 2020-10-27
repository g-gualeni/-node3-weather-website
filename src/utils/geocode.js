const request = require('postman-request')
const chalk = require('chalk')

const geocode = (address, callback) => {
    encodedAddress = encodeURIComponent(address)
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodedAddress + '.json?access_token=pk.eyJ1IjoiZ2d1YWxlbmkiLCJhIjoiY2tnZmtldDYzMGtrNjJxcGZmbG4xOXBuMCJ9.tjOcmRqdeJInXeuYFNryUw&limit=1'
    // console.log(url)
    request({url, json:true}, (error, {body} = {}) => {
        if(error) {            
            callback('Unable to connect to location service', undefined)
            console.log(chalk.red('Unable to connect to the mapbox service'))
        } else if(!body.features[0]) {            
            callback('Unable to find location. Try another search', undefined)
            // console.log(chalk.red('Unable to find location'))
        }
        else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const location = body.features[0].place_name
            // console.log(chalk.green('Brescia Coordinates: Lat:', latitude, 'Lon:',longitude))
            callback(undefined, {latitude, longitude, location})
            
        }
    })
}

module.exports = geocode