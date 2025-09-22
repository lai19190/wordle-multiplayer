import { useEffect, useState } from 'react'
import Grid from './components/grid'
import Header from './components/header'
import type { GameStatus } from '../../shared/types'
import GameEndFooter from './components/gameEndFooter'
import { socket } from './socket'
import OpponentGrid from './components/grid-opponent'

const App = () => {
  // WebSocket connection to server
  const [isConnected, setIsConnected] = useState(socket.connected)
  const playerId = socket.id ?? ''
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    // default state before fetching from server
    {
      players: {
        [playerId]: { guesses: [], status: 'playing' },
      },
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
    if (!isConnected) {
      return
    }
    if (gameStatus.players[playerId]?.status !== 'playing') {
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

  const isGameWon = gameStatus.players[playerId]?.status === 'won'
  const isGameLost = gameStatus.players[playerId]?.status === 'lost'
  const isGameEnded = isGameWon || isGameLost

  const restartGame = async () => {
    socket.emit('restartGame')
    setCurrentGuess('')
  }

  if (!isConnected) {
    return <div>Connecting to server...</div>
  }

  return (
    <>
      <Header />
      {!isGameEnded && (
        <div className="flex flex-row justify-center items-center">
          <Grid
            playerStatus={gameStatus.players[playerId]}
            currentGuess={currentGuess}
            maxGuesses={gameStatus.maxGuesses}
          />
          {Object.keys(gameStatus.players).map((id) => {
            if (id === playerId) {
              return undefined
            }
            return (
              <OpponentGrid
                playerStatus={gameStatus.players[id]}
                maxGuesses={gameStatus.maxGuesses}
              />
            )
          })}
        </div>
      )}
      {isGameEnded && gameStatus.answer && (
        <GameEndFooter isGameWon={isGameWon} answer={gameStatus.answer} restartGame={restartGame} />
      )}
    </>
  )
}
export default App
