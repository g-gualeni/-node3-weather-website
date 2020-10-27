console.log('client side file is loaded')

// fetch('weather?address=brescia').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)    
//         } else {
//             console.log(data)
//             console.log(data.location)
//         }
        
//     })
// })

const weatherForm = document.querySelector('form')
const searc = document.querySelector('input')
const message_1 = document.querySelector('#message-1')
const message_2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    message_1.textContent = 'waiting...'
    message_2.textContent = ''

    queryString = 'weather?address=' + searc.value
    fetch(queryString).then((response) => {
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
