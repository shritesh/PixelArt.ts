import express from 'express'
import { createServer } from 'http'
import socketio from 'socket.io'
import path from 'path'

const app = express()
const server = createServer(app)
const io = socketio(server)

app.use(express.static('dist'))
app.get('*', (_, res) => res.sendFile(path.join(__dirname, '../dist/index.html')))

io.on('connect', socket =>
  socket.on('join', (room: string, fn) => {
    socket.join(room)
    fn('You joined ' + room)
  })
)

server.listen(3000, () => console.log('Listening on port 3000'))
