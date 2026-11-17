import { pickPool, drawCards, pickCard } from './cards.js'

export function createGame(all, bestScore = 0) {
  const pool = pickPool(all)
  const state = {
    phase: 'ready',
    pool: pool,
    clickedIds: [],
    visibleCards: [],
    bestScore: bestScore,
  }

  return state
}

export function startGame(state) {
  if (state.phase !== 'ready') return state

  const hand = drawCards(state.pool, state.clickedIds)

  return { ...state, phase: 'playing', visibleCards: hand }
}

export function playTurn(state, id) {
  if (state.phase !== 'playing') return state

  const playResult = pickCard(state, id)

  if (playResult.phase === 'lost') return playResult

  const newBestScore = Math.max(state.bestScore, playResult.clickedIds.length)

  if (playResult.phase === 'won')
    return { ...playResult, bestScore: newBestScore }

  const hand = drawCards(playResult.pool, playResult.clickedIds)

  return { ...playResult, visibleCards: hand, bestScore: newBestScore }
}

export function replaySame(state) {
  return { ...state, phase: 'ready', clickedIds: [], visibleCards: [] }
}

export function replayNew(state, all) {
  return createGame(all, state.bestScore)
}
