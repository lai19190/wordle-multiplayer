export type Guess = {
  guess: string
  state: GuessState[]
}

export type GuessState = 'hit' | 'present' | 'miss' | 'filled' | 'empty'