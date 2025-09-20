export type ServerConfig = {
  port: number;
  maxGuesses: number;
  predefinedWordList: string[];
}

export type GameStatus = {
  gameState: GameState
  guesses: Guess[]
  maxGuesses: number

  answer?: string
}

export type GameState = 'playing' | 'won' | 'lost'

export type Guess = {
  guess: string
  state: GuessState[]
}

export type GuessState = 'hit' | 'present' | 'miss' | 'filled' | 'empty'