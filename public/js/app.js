console.log('client side file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message_1 = document.querySelector('#message-1')
const message_2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value 
    
    message_1.textContent = 'waiting...'
    message_2.textContent = ''

    fetch('weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)    
                message_1.textContent = data.error
                message_2.textContent = ''
            } else {
                message_1.textContent = data.forecast
                message_2.textContent = data.location

                console.log(data.forecast)
                console.log(data.location)
            }            
        })
    })
})
