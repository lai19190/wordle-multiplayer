import type { Guess } from '../types'
import Row from './row'

const Grid = ({
  attemptedGuesses,
  guessesLeft,
  currentGuess,
}: {
  attemptedGuesses: Guess[]
  guessesLeft: number
  currentGuess: string
}) => {
  const attemptedGuessRow = attemptedGuesses.map((g, i) => (
    <Row key={i} guess={g.guess} states={g.state} />
  ))
  const currentRow =
    guessesLeft > 0 ? (
      <Row
        guess={currentGuess}
        states={Array.from({ length: 5 }, (_, i) => (i < currentGuess.length ? 'filled' : 'empty'))}
      />
    ) : null
  const emptyRow = Array.from({ length: guessesLeft - 1 }).map((_, i) => (
    <Row key={i} guess="" states={Array.from({ length: 5 }, () => 'empty')} />
  ))

  return (
    <div className="flex flex-col justify-center items-center">
      {attemptedGuessRow}
      {currentRow}
      {emptyRow}
    </div>
  )
}

export default Grid
