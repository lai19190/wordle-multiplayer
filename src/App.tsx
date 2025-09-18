import { useEffect, useState } from 'react'
import Grid from './components/grid'
import Header from './components/header'
import type { Guess } from './typings/type'
import GameEndFooter from './components/gameEndFooter'
import { MAX_GUESSES } from './constants/config'
import { VALID_WORD_LIST } from './constants/valid_word'
import { EvaluateGuess, GetRandomWord } from './game-logic'

const App = () => {
  const [answer, setAnswer] = useState<string>(GetRandomWord())
  const [attemptedGuesses, setAttemptedGuesses] = useState<Guess[]>([])
  const [currentGuess, setCurrentGuess] = useState<string>('')
  // Listen to keyboard events
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (currentGuess.length !== 5) {
        alert('Not enough letters')
        return
      }
      if (!VALID_WORD_LIST.includes(currentGuess)) {
        alert('Not in word list')
        return
      }
      // Submit guess
      const newGuess: Guess = {
        guess: currentGuess,
        state: EvaluateGuess(currentGuess, answer),
      }
      setAttemptedGuesses([...attemptedGuesses, newGuess])
      setCurrentGuess('')
    } else if (event.key === 'Backspace') {
      // Remove last character
      setCurrentGuess(currentGuess.slice(0, -1))
    } else if (/^[a-zA-Z]$/.test(event.key) && currentGuess.length < 5) {
      // Add character to current guess
      setCurrentGuess(currentGuess + event.key.toLowerCase())
    }
  }
  // Attach event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [currentGuess, attemptedGuesses])

  const guessesLeft = MAX_GUESSES - attemptedGuesses.length
  const isGameWon =
    attemptedGuesses.length > 0 && attemptedGuesses[attemptedGuesses.length - 1].guess === answer
  const isGameLost = attemptedGuesses.length === MAX_GUESSES
  const isGameEnded = isGameWon || isGameLost

  const restartGame = () => {
    setCurrentGuess('')
    setAttemptedGuesses([])
    setAnswer(GetRandomWord())
  }

  return (
    <>
      <Header maxGuesses={MAX_GUESSES} currentTurn={attemptedGuesses.length} />
      {!isGameEnded && (
        <Grid
          attemptedGuesses={attemptedGuesses}
          guessesLeft={guessesLeft}
          currentGuess={currentGuess}
        />
      )}
      {isGameEnded && (
        <GameEndFooter isGameWon={isGameWon} answer={answer} restartGame={restartGame} />
      )}
    </>
  )
}
export default App
