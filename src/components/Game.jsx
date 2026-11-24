import { useState } from 'react'
import {
  createGame,
  startGame,
  playTurn,
  replaySame,
  replayNew,
} from '../game/game.js'
import CardList from './CardList.jsx'
import GameOver from './GameOver.jsx'

export default function Game({ allPokemon }) {
  const [game, setGame] = useState(() => createGame(allPokemon))

  const score = game.clickedIds.length
  const isGameOver = game.phase === 'won' || game.phase === 'lost'

  function handleStart() {
    setGame(startGame(game))
  }

  function handleTurn(id) {
    setGame(playTurn(game, id))
  }

  function handleReplaySame() {
    setGame(replaySame(game))
  }

  function handleReplayNew() {
    setGame(replayNew(game, allPokemon))
  }

  return (
    <>
      <p className="scoreboard">
        <span>Score: {score}</span>
        <span>Best: {game.bestScore}</span>
      </p>

      {game.phase === 'ready' && (
        <>
          <button type="button" className="start" onClick={handleStart}>
            Start!
          </button>
          <CardList cards={game.pool} />
        </>
      )}

      {game.phase === 'playing' && (
        <CardList cards={game.visibleCards} onPick={handleTurn} />
      )}

      {isGameOver && (
        <GameOver
          won={game.phase === 'won'}
          onNewGame={handleReplayNew}
          onRetrySame={handleReplaySame}
        />
      )}
    </>
  )
}
