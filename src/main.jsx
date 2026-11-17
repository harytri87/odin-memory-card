import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { shuffle, pickPool, drawCards, pickCard } from './game/game.js'
import { pokemons as initialPokemons } from './data/dummy.js'

// just for testing on devtool console
const pool = pickPool(initialPokemons, 20)
console.log(pool)
Object.assign(window, { shuffle, pickPool, drawCards, pickCard, pool })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
