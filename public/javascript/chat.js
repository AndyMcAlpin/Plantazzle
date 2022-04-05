function createChatMessage(user, msg) {
  const userMessageClass = user === 'me' ? 'is-info' : 'is-primary'
  const container = document.querySelector('.chat-window')
  container.insertAdjacentHTML('beforeend', `
  <article class="notification ${userMessageClass} p-1 m-1">
    <p>${user}: ${msg} <span class="is-pulled-right">${new Date().toLocaleTimeString()}</span></p>
  </article>
  `)

  container.scrollTop = container.scrollHeight
}


document.addEventListener('readystatechange', event => {
  if(document.readyState !== 'complete') return
  const socket = io()

  socket.on('new message', createChatMessage)

  document.querySelector('#send-chat').addEventListener('submit', event => {
    event.preventDefault()
    const input = event.target.querySelector('input')
    socket.emit('message', input.value)
    createChatMessage('me', input.value)
    input.value = ''
  })
})