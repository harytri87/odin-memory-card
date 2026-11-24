function Card({ card, onPick }) {
  const face = (
    <>
      <img src={card.image} alt="" />
      <span className="name">{card.name}</span>
    </>
  )

  return (
    <li>
      <div className="card">
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
      </div>
    </li>
  )
}

export default function CardList({ cards, onPick }) {
  const variant = onPick ? 'hand' : 'pool'

  return (
    <div className="card-list">
      <ul className={variant}>
        {cards.map((card) => (
          <Card key={card.id} card={card} onPick={onPick} />
        ))}
      </ul>
    </div>
  )
}
