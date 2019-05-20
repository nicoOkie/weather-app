const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')





weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  
  const location = search.value
  search.value = ''

  fetch(`http://localhost:3000/weather?adress=${location}`).then((response) => {
  response.json().then((data) => {
    if (data.errorMsg) {
      messageOne.textContent = data.errorMsg
    } else {
      messageOne.textContent = data.location
      messageTwo.textContent = data.forecast
    }
  })
})
})
