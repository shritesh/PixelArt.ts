import { h, FunctionComponent } from 'preact'
import { useState } from 'preact/hooks'
import * as Canvas from '../canvas'

interface RoomProps {
  name: string
}

const Room: FunctionComponent<RoomProps> = ({ name }) => {
  const [currentColor, setCurrentColor] = useState('black')
  const [canvas, setCanvas] = useState(Canvas.create())

  const onClick = (x: number, y: number): void => setCanvas(Canvas.setColor(canvas, x, y, currentColor))

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
        {
          image.map((row, y) =>
            <g key={y}>
              {row.map((color, x) => <rect class='pixel' width={10} height={10} x={x * 10} y={y * 10} key={x} style={'--pixel-color:' + color} onClick={() => onClick(x, y)} />)}
            </g>)
        }
      </svg>
    </main>
  )
}
export default Room
