import Config from "./config";
import { VALID_WORD_LIST } from "./constants/valid_word";
import { GameStatus, GuessState, PlayerStatus } from "../../shared/types";

export class WordleGame {
  private answer: string;
  private maxGuesses: number = Config.maxGuesses;
  private players: Record<string, PlayerStatus>;
  private isGameEnded: boolean = false;

  constructor() {
    this.answer = this.getRandomWord();
    this.players = {};
  }

  public JoinGame(playerId: string) {
    if (!this.players[playerId]) {
      this.players[playerId] = { guesses: [], status: 'playing' };
    }
  }

  public LeaveGame(playerId: string): boolean {
    if (!this.players[playerId]) {
      return false;
    }
    delete this.players[playerId];
    return true;
  }

  public GetGameStatus(playerId: string): GameStatus {
    return {
      players: this.players,
      maxGuesses: this.maxGuesses,
      answer: this.players[playerId]?.status !== 'playing' ? this.answer : undefined
    };
  }

  public GetIsGameEnded(): boolean {
    return this.isGameEnded
  }

  public SubmitGuess(playerId: string, guess: string) {
    // input validation
    if (guess.length !== 5) {
      throw new Error('Not enough letters');
    }
    if (!VALID_WORD_LIST.includes(guess)) {
      throw new Error('Not in word list');
    }

    // evaluate guess
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

    // update player status
    if (!this.players[playerId]) {
      this.players[playerId] = { guesses: [], status: 'playing' };
    }
    this.players[playerId].guesses.push({ guess: guess, state: state });
    if (guess === this.answer) {
      this.players[playerId].status = 'won';
      // set all other players to lost
      for (const id in this.players) {
        if (id !== playerId) {
          this.players[id].status = 'lost';
        }
      }
      this.isGameEnded = true
    } else if (this.players[playerId].guesses.length >= this.maxGuesses) {
      this.players[playerId].status = 'lost';
      this.isGameEnded = true
    }
  }

  private getRandomWord(): string {
    return Config.predefinedWordList[Math.floor(Math.random() * Config.predefinedWordList.length)]
  }
}