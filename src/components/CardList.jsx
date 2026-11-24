import { useState, useEffect, useRef } from 'react'

function Card({ card, onPick, faceUp }) {
  const [loaded, setLoaded] = useState(false)

  const face = (
    <>
      <img
        src={card.image}
        alt=""
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
      <span className="name">{card.name}</span>
    </>
  )

  return (
    <li>
      <div className="card" inert={!faceUp || !loaded}>
        {onPick ? (
          <button
            type="button"
            className="front"
            onClick={() => onPick(card.id)}
          >
            {face}
          </button>
        ) : (
          <div className="front">{face}</div>
        )}
        <div className="back" />
      </div>
    </li>
  )
}

export default function CardList({ cards, onPick }) {
  const variant = onPick ? 'hand' : 'pool'
  const listRef = useRef(null)

  const [shown, setShown] = useState(cards)
  const isSwapping = cards !== shown

  useEffect(() => {
    if (!isSwapping) return

    let ignore = false
    const animations = listRef.current.getAnimations({ subtree: true })
    Promise.allSettled(animations.map((animation) => animation.finished)).then(
      () => {
        if (!ignore) setShown(cards)
      },
    )

    return () => {
      ignore = true
    }
  }, [isSwapping, cards])

  return (
    <div className="card-list">
      <ul ref={listRef} className={variant}>
        {shown.map((card) => (
          <Card
            key={card.id}
            card={card}
            onPick={onPick}
            faceUp={!isSwapping}
          />
        ))}
      </ul>
    </div>
  )
}
