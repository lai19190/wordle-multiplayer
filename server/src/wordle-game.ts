import Config from "./config";
import { VALID_WORD_LIST } from "./constants/valid_word";
import { GameState, GameStatus, Guess, GuessState } from "./types";

export class WordleGame {
  private answer: string;
  private gameState: GameState;
  private maxGuesses: number;
  private guesses: Guess[];

  constructor() {
    this.answer = this.getRandomWord();
    this.gameState = 'playing';
    this.maxGuesses = Config.maxGuesses;
    this.guesses = [];
  }

  public StartNewGame() {
    this.answer = this.getRandomWord();
    this.gameState = 'playing';
    this.guesses = [];
  }

  public GetGameStatus(): GameStatus {
    return {
      guesses: this.guesses,
      maxGuesses: this.maxGuesses,
      gameState: this.gameState,
      answer: this.gameState !== 'playing' ? this.answer : undefined
    };
  }

  public SubmitGuess(guess: string) {
    // input validation
    if (guess.length !== 5) {
      throw new Error('Not enough letters');
    }
    if (!VALID_WORD_LIST.includes(guess)) {
      throw new Error('Not in word list');
    }

    const state: GuessState[] = []
    for (let i = 0; i < 5; i++) {
      if (guess[i] === this.answer[i]) {
        state[i] = 'hit'
      } else if (this.answer.includes(guess[i])) {
        state[i] = 'present'
      } else {
        state[i] = 'miss'
      }
    }
    this.guesses.push({ guess: guess, state: state });
    if (guess === this.answer) {
      this.gameState = 'won';
    } else if (this.guesses.length >= this.maxGuesses) {
      this.gameState = 'lost';
    }
  }

  private getRandomWord(): string {
    return Config.predefinedWordList[Math.floor(Math.random() * Config.predefinedWordList.length)]
  }
}