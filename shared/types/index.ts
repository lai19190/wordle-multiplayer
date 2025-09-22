export type ServerConfig = {
  port: number;
  maxGuesses: number;
  maxRoomCapacity: number;
  predefinedWordList: string[];
}

export type GameStatus = {
  players: Record<string, PlayerStatus>
  maxGuesses: number

  answer?: string
}

export type PlayerStatus = {
  guesses: Guess[];
  status: GameState;
}

export type GameState = 'playing' | 'won' | 'lost'

export type Guess = {
  guess: string
  state: GuessState[]
}

export type GuessState = 'hit' | 'present' | 'miss' | 'filled' | 'empty'