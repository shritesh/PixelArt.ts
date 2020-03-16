import socketio from 'socket.io-client'
import { h, render } from 'preact'
import Home from './Home'

const room = window.location.pathname

const socket = socketio('/')
socket.emit('join', room, (response: string) => {
  alert(response)
})

render(<Home />, document.body)
