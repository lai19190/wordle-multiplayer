import Config from "./config";
import { GameStatus } from "../../shared/types";
import { WordleGame } from "./wordle-game";

export class WordleMatchMakingController {
  private rooms: Record<string, WordleGame> = {};
  private roomCapacityMap: Record<string, number> = {};
  private roomCapacity: number = Config.maxRoomCapacity;

  public JoinGame(userId: string): string {
    // find a room that is not full and ended
    let roomId = Object.keys(this.rooms).find(id => this.roomCapacityMap[id] < this.roomCapacity && !this.rooms[id].GetIsGameEnded());
    if (!roomId) {
      // create a new room
      roomId = `room-${Date.now()}`;
      this.rooms[roomId] = new WordleGame();
      this.roomCapacityMap[roomId] = 0;
    }
    console.log(`User ${userId} joined ${roomId}`);
    this.rooms[roomId].JoinGame(userId);
    this.roomCapacityMap[roomId]++;
    return roomId;
  }

  public GetGameStatus(roomId: string, userId: string): GameStatus {
    if (!this.rooms[roomId]) {
      throw new Error("Room not found");
    }
    return this.rooms[roomId].GetGameStatus(userId);
  }

  public SubmitGuess(roomId: string, userId: string, guess: string) {
    if (!this.rooms[roomId]) {
      throw new Error("Room not found");
    }
    this.rooms[roomId].SubmitGuess(userId, guess);
  }

  public LeaveGame(roomId: string, userId: string): boolean {
    if (!this.rooms[roomId]) {
      throw new Error("Room not found");
    }
    if (!this.rooms[roomId].LeaveGame(userId)) {
      throw new Error("User not in game");
    }
    console.log(`User ${userId} left ${roomId}`);
    this.roomCapacityMap[roomId]--;
    if (this.roomCapacityMap[roomId] <= 0) {
      delete this.rooms[roomId];
      delete this.roomCapacityMap[roomId];
      console.log(`Room ${roomId} deleted`);
      return true;
    }
    return false;
  }
}