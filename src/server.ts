import express from 'express'
import { createServer } from 'http'
import socketio from 'socket.io'
import path from 'path'
import * as Canvas from './canvas'

const app = express()
const server = createServer(app)
const io = socketio(server)

app.locals.canvases = {}

app.use(express.static('dist'))
app.get('*', (_, res) => res.sendFile(path.join(__dirname, '../dist/index.html')))

const ensureRoom = (room: string): void => {
  if (!(room in app.locals.canvases)) {
    app.locals.canvases[room] = Canvas.create()
  }
}

io.on('connect', socket => {
  socket.on('join', (room: string, callback) => {
    ensureRoom(room)
    socket.join(room)
    callback(app.locals.canvases[room])
  })

  socket.on('click', (room, x, y, color) => {
    ensureRoom(room)
    app.locals.canvases[room] = Canvas.setColor(app.locals.canvases[room], x, y, color)
    io.to(room).emit('update', x, y, color)
  })
}

)

server.listen(process.env.PORT ?? 3000)
