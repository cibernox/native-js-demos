import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const increment = () => {
    console.log('### Incrementing count')
    setCount(count => count + 1)
  }

  const decrement = () => {
    console.log('### Decrementing count')
    setCount(count => count - 1)
  }

  return (
    <hstack>
      <button onClick={decrement}>Decrement</button>
      <text>{count}!!!</text>
      <button onClick={increment}>Increment</button>
    </hstack>
  )
}

export default App