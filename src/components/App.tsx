import { h, render, FunctionComponent } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import Home from './Home'
import Room from './Room'

const App: FunctionComponent = () => {
  const [room, setRoom] = useState(window.location.pathname)

  useEffect(() => {
    window.onpopstate = () => setRoom(window.location.pathname)
  }, [room])

  const onRoom = (room: string): void => {
    setRoom(room)
    history.pushState(null, room, '/' + room)
  }

  return (room === '/' ? <Home onRoom={onRoom} /> : <Room name={room} />)
}

render(<App />, document.body)
