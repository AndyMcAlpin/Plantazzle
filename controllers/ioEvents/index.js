const { nanoid } = require('nanoid')

class Chat {
  socket
  variables = {

  }

  constructor(socket) {
    this.socket = socket
    this.variables = socket.handshake.session
    this.assignUsername()

  }

  set(variableName, variableValue) {
    this.variables[variableName] = variableValue

    return this.save()
  }

  get(variableName) {
    return this.variables[variableName]
  }

  has(variableName) {
    return typeof this.variables[variableName] !== 'undefined'
  }

  save() {
    this.socket.handshake.session.save()
    return this
  }

  on(eventName, eventHandler) {
    this.socket.on(eventName, eventHandler)
  }

  emit(eventName) {
    this.socket.emit(eventName)
  }

  to(to, eventName, ...messages) {
    this.socket.to(to).emit(eventName, ...messages)
  }

  assignUsername() {
    if(!this.has('username'))
      this.set('username', `Guest(${nanoid((7))})`)
    return this
  }

  message(message) {
    this.to('public', 'new message', this.get('username'), message)
  }

  setup() {
    this.socket.join('public')
    console.log(this.socket.rooms)
    this.on('message', this.message.bind(this))
  }
}

module.exports = io => {
  io.on('connection', socket => {
    const chat = new Chat(socket)
    chat.setup()
  })


}