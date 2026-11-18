import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createGame,
  startGame,
  playTurn,
  replaySame,
  replayNew,
} from './game/game.js'
import { pokemons as initialPokemons } from './data/dummy.js'
import { fetchAllPokemon } from './game/api.js'

// just for testing on devtool console
Object.assign(window, {
  createGame,
  startGame,
  playTurn,
  replaySame,
  replayNew,
  initialPokemons,
  fetchAllPokemon,
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
