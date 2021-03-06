import { h, FunctionComponent } from 'preact'
import { useState } from 'preact/hooks'

interface HomeProps {
  onRoom: (room: string) => void
}

const Home: FunctionComponent<HomeProps> = ({ onRoom }) => {
  const [room, setRoom] = useState('')

  const onSubmit = (e: Event): void => {
    e.preventDefault()
    if (room !== '') onRoom(room)
  }

  return (
    <main>
      <h1>PixelArt.ts Collaborative PixelArt Editor</h1>
      <form onSubmit={onSubmit}>
        <input name='room' value={room} onInput={(e) => setRoom(e.currentTarget.value)} />
        <input type='submit' value='Join' />
      </form>
      <p><a href='https://github.com/shritesh/PixelArt.ts'>View Source</a></p>
    </main>
  )
}
export default Home
