export type GameStatus = {
  gameState: GameState
  guesses: Guess[]
  maxGuesses: number

  answer?: string
}

type GameState = 'playing' | 'won' | 'lost'

export type Guess = {
  guess: string
  state: GuessState[]
}

export type GuessState = 'hit' | 'present' | 'miss' | 'filled' | 'empty'