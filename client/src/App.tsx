import { useEffect, useState } from 'react'
import Grid from './components/grid'
import Header from './components/header'
import type { GameStatus } from './types'
import GameEndFooter from './components/gameEndFooter'
import { socket } from './socket'

const App = () => {
  // WebSocket connection to server
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    // default state before fetching from server
    {
      gameState: 'playing',
      guesses: [],
      maxGuesses: 6,
    }
  )
  // Listen to socket events
  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    function onGameStatusChange(status: GameStatus) {
      setGameStatus(status)
    }

    function onErrorMessage(message: string) {
      alert(message)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('gameStatus', onGameStatusChange)
    socket.on('errorMessage', onErrorMessage)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('gameStatus', onGameStatusChange)
      socket.off('errorMessage', onErrorMessage)
    }
  }, [])

  // handle user guess input
  const [currentGuess, setCurrentGuess] = useState<string>('')
  // Listen to keyboard events
  const handleKeyPress = async (event: KeyboardEvent) => {
    if (gameStatus.gameState !== 'playing') {
      return
    }
    if (event.key === 'Enter') {
      // Submit guess to server
      socket.emit('submitGuess', currentGuess)
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
  }, [currentGuess, gameStatus])

  const guessesLeft = gameStatus.maxGuesses - gameStatus.guesses.length
  const isGameWon = gameStatus.gameState === 'won'
  const isGameLost = gameStatus.gameState === 'lost'
  const isGameEnded = isGameWon || isGameLost

  const restartGame = async () => {
    socket.emit('restartGame')
    setCurrentGuess('')
  }

  return (
    <>
      <Header maxGuesses={gameStatus.maxGuesses} currentTurn={gameStatus.guesses.length} />
      {!isGameEnded && (
        <Grid
          attemptedGuesses={gameStatus.guesses}
          guessesLeft={guessesLeft}
          currentGuess={currentGuess}
        />
      )}
      {isGameEnded && gameStatus.answer && (
        <GameEndFooter isGameWon={isGameWon} answer={gameStatus.answer} restartGame={restartGame} />
      )}
    </>
  )
}
export default App
