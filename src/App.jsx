import { useEffect, useState } from 'react'
import { fetchAllPokemon } from './game/api.js'
import Game from './components/Game.jsx'

// for testing, prevent too much API request
// import { pokemon as initialPokemon } from './data/dummy.js'

export default function App() {
  const [result, setResult] = useState({ status: 'loading' })
  // for testing, prevent too much API request
  // const result = { status: 'success', data: initialPokemon }

  // if testing, comment this useEffect block
  useEffect(() => {
    let ignore = false

    fetchAllPokemon()
      .then((data) => {
        if (!ignore) setResult({ status: 'success', data })
      })
      .catch((err) => {
        if (!ignore) setResult({ status: 'error', message: err.message })
      })

    return () => {
      ignore = true
    }
  }, [])

  if (result.status === 'loading') {
    return <p>Loading...</p>
  }

  if (result.status === 'error') {
    return <p>Failed loading Pokemon data: {result.message}</p>
  }

  return <Game allPokemon={result.data} />
}
