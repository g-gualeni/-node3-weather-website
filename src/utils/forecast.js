
const request = require('postman-request')
const chalk = require('chalk')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0a95e2e2bc43bf6f7b755efa9746ff01&query=' + latitude + ',' + longitude +'&units=m'    
    // console.log(url)

    request({url, json: true}, (error, {body}) => {
        if(error) {
            // console.log(chalk.red('Unable to connect to the weather service'))
            callback('Unable to connect to the weather service', undefined)
        } else if(body.error) {
            // console.log(chalk.red('Unable to find location'))
            callback('Unable to find location', undefined)
        } else {
            const {weather_descriptions, feelslike, temperature, precip} = body.current
            // console.log('weather_descriptions', weather_descriptions[0])

            // console.log(chalk.green('There are:', temperature, '°C, but feels like:', feelslike, '°C'))
            callback(undefined, 'Weather: '+ weather_descriptions[0] + '. There are: ' + temperature +'°C, but feels like: ' + feelslike + '°C Rain ' + 100*precip + '%')
        }
    })
}

module.exports = forecast