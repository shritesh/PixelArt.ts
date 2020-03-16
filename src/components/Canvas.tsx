import { h, Fragment, FunctionComponent } from 'preact'
import { useState } from 'preact/hooks'

interface CanvasProps {
  room: string
}

const Canvas: FunctionComponent<CanvasProps> = ({ room }) => {
  const image = []
  for (let i = 0; i < 75; i += 1) {
    const row = []
    for (let j = 0; j < 100; j += 1) {
      row.push('white')
    }
    image.push(row)
  }

  const [currentColor, setCurrentColor] = useState('black')

  return (
    <Fragment>
      <h1>{room}</h1>
      <form>
        <input type='color' value={currentColor} onInput={e => setCurrentColor(e.currentTarget.value)} />
      </form>
      <svg width={1000} height={750} style={'--current-color:' + currentColor}>
        {image.map((row, y) => row.map((color, x) => <rect class='pixel' width={10} height={10} x={x * 10} y={y * 10} style={'--pixel-color:' + color} key={x * 10 + y} />))}
      </svg>
    </Fragment>
  )
}
export default Canvas
