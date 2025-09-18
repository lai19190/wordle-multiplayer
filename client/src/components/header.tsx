const Header = ({ maxGuesses, currentTurn }: { maxGuesses: number; currentTurn: number }) => {
  return (
    <h1 className="flex justify-center text-4xl font-bold text-green-700 my-5">
      Wordle - {currentTurn} / {maxGuesses}
    </h1>
  )
}

export default Header
