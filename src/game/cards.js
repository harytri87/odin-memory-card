export const HAND_SIZE = 5

export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function pickPool(all, n = 20) {
  return shuffle(all).slice(0, n)
}

export function drawCards(pool, clickedIds, count = HAND_SIZE) {
  if (pool.every((card) => clickedIds.includes(card.id))) {
    throw new Error('all cards has been clicked!')
  }

  let hand
  do {
    hand = shuffle(pool).slice(0, count)
  } while (hand.every((card) => clickedIds.includes(card.id)))

  return hand
}

export function pickCard(state, id) {
  if (state.clickedIds.includes(id)) {
    return { ...state, phase: 'lost' }
  }

  const newClickedIds = [...state.clickedIds, id]

  const phase = newClickedIds.length === state.pool.length ? 'won' : 'playing'

  return { ...state, phase: phase, clickedIds: newClickedIds }
}
