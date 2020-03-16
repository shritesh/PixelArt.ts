import { h, FunctionComponent } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import socketio from 'socket.io-client'
import * as Canvas from '../canvas'

interface RoomProps {
  name: string
}

const Room: FunctionComponent<RoomProps> = ({ name }) => {
  const [currentColor, setCurrentColor] = useState('black')
  const [canvas, setCanvas] = useState<Canvas.canvas | null>(null)
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null)

  useEffect(() => {
    const s = socketio('/')
    s.emit('join', name, (c: Canvas.canvas) => setCanvas(c))
    s.on('update', (x: number, y: number, color: string) => setCanvas(prevCanvas =>
      (prevCanvas === null) ? null : Canvas.setColor(prevCanvas, x, y, color)))

    setSocket(s)
    return () => s.disconnect()
  }, [])

  if (canvas === null || socket === null) {
    return <h1>Loading</h1>
  }

  const onClick = (x: number, y: number): void => { socket.emit('click', name, x, y, currentColor) }

  const image = []
  for (let y = 0; y < Canvas.height; y += 1) {
    const row = []
    for (let x = 0; x < Canvas.width; x += 1) {
      row.push(Canvas.getColor(canvas, x, y))
    }
    image.push(row)
  }

  return (
    <main>
      <h1>{name}</h1>
      <form>
        <input type='color' value={currentColor} onInput={e => setCurrentColor(e.currentTarget.value)} />
      </form>
      <svg width={1000} height={750} style={'--current-color:' + currentColor}>
        {image.map((row, y) =>
          <g key={y}>
            {row.map((color, x) =>
              <rect class='pixel' width={10} height={10} x={x * 10} y={y * 10} key={x} style={'--pixel-color:' + color} onMouseDown={() => onClick(x, y)} />)}
          </g>)}
      </svg>
      <p><a href='https://github.com/shritesh/PixelArt.ts'>View Source</a></p>
    </main>
  )
}
export default Room
