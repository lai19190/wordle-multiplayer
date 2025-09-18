const GameEndFooter = ({
  isGameWon,
  answer,
  restartGame,
}: {
  isGameWon: boolean
  answer: string
  restartGame: () => void
}) => {
  return (
    <div className="flex flex-col justify-center items-center mt-4">
      {isGameWon ? (
        <h2 className="text-2xl font-bold text-green-600 mb-2">
          Congratulations! You guessed the word "{answer.toUpperCase()}"!
        </h2>
      ) : (
        <h2 className="text-2xl font-bold text-red-600 mb-2">
          Game Over! The word was "{answer.toUpperCase()}"
        </h2>
      )}
      <button
        onClick={restartGame}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Restart Game
      </button>
    </div>
  )
}

export default GameEndFooter
