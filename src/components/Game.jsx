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
      <p>
        Score: {score} | Best: {game.bestScore}
      </p>

      {game.phase === 'ready' && (
        <>
          <CardList cards={game.pool} />
          <button type="button" onClick={handleStart}>
            Start!
          </button>
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
