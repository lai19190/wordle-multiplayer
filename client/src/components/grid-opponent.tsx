import type { PlayerStatus } from '../../../shared/types'
import Row from './row'

const OpponentGrid = ({
  playerStatus,
  maxGuesses,
}: {
  playerStatus: PlayerStatus
  maxGuesses: number
}) => {
  const guessesLeft = maxGuesses - playerStatus.guesses.length
  const attemptedGuesses = playerStatus.guesses
  const attemptedGuessRow = attemptedGuesses.map((g, i) => (
    <Row key={i} guess={g.guess} states={g.state} />
  ))
  const emptyRow = Array.from({ length: guessesLeft }).map((_, i) => (
    <Row key={i} guess="" states={Array.from({ length: 5 }, () => 'empty')} />
  ))

  return (
    <div className="flex flex-col justify-center items-center mx-5">
      <h1 className="flex justify-center text-4xl font-bold text-red-700 my-1">
        Opponent - {attemptedGuesses.length} / {maxGuesses}
      </h1>
      {attemptedGuessRow}
      {emptyRow}
    </div>
  )
}

export default OpponentGrid
