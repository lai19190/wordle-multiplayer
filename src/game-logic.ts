import type { GuessState } from './typings/type'
import { PREDEFINED_WORD_LIST } from './constants/config'

export function GetRandomWord(): string {
  return PREDEFINED_WORD_LIST[Math.floor(Math.random() * PREDEFINED_WORD_LIST.length)]
}

export function EvaluateGuess(guess: string, answer: string): GuessState[] {
  const states: GuessState[] = []
  for (let i = 0; i < 5; i++) {
    if (guess[i] === answer[i]) {
      states[i] = 'hit'
    } else if (answer.includes(guess[i])) {
      states[i] = 'present'
    } else {
      states[i] = 'miss'
    }
  }
  return states
}
