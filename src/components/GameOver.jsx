export default function GameOver({ won, onNewGame, onRetrySame }) {
  return (
    <div>
      <p>{won ? 'Win!' : 'Lose'}</p>
      <button type="button" onClick={onNewGame}>
        New Game
      </button>
      {!won && (
        <button type="button" onClick={onRetrySame}>
          Retry with same cards
        </button>
      )}
    </div>
  )
}
