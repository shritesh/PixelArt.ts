import socketio from 'socket.io-client'

const room = window.location.pathname

const socket = socketio('/')
socket.emit('join', room, (response: string) => {
  alert(response)
})
