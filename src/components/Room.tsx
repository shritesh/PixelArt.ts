import { h, Fragment, FunctionComponent } from 'preact'
import { useState, useMemo } from 'preact/hooks'
import Canvas from '../canvas'

interface RoomProps {
  name: string
}

const Room: FunctionComponent<RoomProps> = ({ name }) => {
  const [currentColor, setCurrentColor] = useState('black')
  const [canvas] = useState(new Canvas())

  const image = useMemo(() => {
    const image = []
    for (let y = 0; y < Canvas.height; y += 1) {
      const row = []
      for (let x = 0; x < Canvas.width; x += 1) {
        row.push(canvas.color(x, y))
      }
      image.push(row)
    }
    return image
  }, [canvas])

  return (
    <Fragment>
      <h1>{name}</h1>
      <form>
        <input type='color' value={currentColor} onInput={e => setCurrentColor(e.currentTarget.value)} />
      </form>
      <svg width={1000} height={750} style={'--current-color:' + currentColor}>
        {
          image.map((row, y) => row.map((color, x) => <rect class='pixel' width={10} height={10} x={x * 10} y={y * 10} key={x.toString() + ':' + y.toString()} style={'--pixel-color:' + color} />))
        }
      </svg>
    </Fragment>
  )
}
export default Room
