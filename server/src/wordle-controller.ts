import { GameStatus } from "./types";
import { WordleGame } from "./wordle-game";

export class WordleController {
  private room: Record<string, WordleGame> = {};

  public StartNewGame(id: string) {
    const game = new WordleGame();
    this.room[id] = game;
  }

  public GetGameStatus(id: string): GameStatus {
    if (!this.room[id]) {
      this.StartNewGame(id);
    }
    return this.room[id].GetGameStatus();
  }

  public SubmitGuess(id: string, guess: string) {
    if (!this.room[id]) {
      this.StartNewGame(id);
    }
    this.room[id].SubmitGuess(guess);
  }

  public CleanUp(id: string) {
    delete this.room[id];
  }
}