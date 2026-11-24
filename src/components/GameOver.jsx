export default function GameOver({ won, onNewGame, onRetrySame }) {
  return (
    <div className="game-over">
      <p className="result">{won ? 'Win!' : 'Lose'}</p>

      <div className="actions">
        <button type="button" onClick={onNewGame}>
          New Game
        </button>
        {!won && (
          <button type="button" onClick={onRetrySame}>
            Retry with same cards
          </button>
        )}
      </div>
    </div>
  )
}
