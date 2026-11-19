function CardFace({ card }) {
  return (
    <>
      <img src={card.image} alt="" width={80} height={80} />
      <span>{card.name}</span>
    </>
  )
}

export default function CardList({ cards, onPick }) {
  return (
    <ul>
      {cards.map((card) => (
        <li key={card.id}>
          {onPick ? (
            <button type="button" onClick={() => onPick(card.id)}>
              <CardFace card={card} />
            </button>
          ) : (
            <CardFace card={card} />
          )}
        </li>
      ))}
    </ul>
  )
}
