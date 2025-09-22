# Client-Server Communication Flow

## Flow Diagram

```mermaid
sequenceDiagram
    participant Client
    participant Socket
    participant Server
    participant MatchMaker
    participant Game

    %% Initial Connection
    Client->>Socket: Connect to server
    Socket->>Server: connection event
    Server->>MatchMaker: JoinGame(userId)
    MatchMaker->>Game: Create/Join Game Room
    Game-->>MatchMaker: Room ID
    MatchMaker-->>Server: Room ID
    Server->>Socket: Join Room
    Server->>Client: gameStatus update

    %% Game Play Loop
    Note over Client,Game: Normal Gameplay Flow
    Client->>Server: submitGuess event
    Server->>MatchMaker: SubmitGuess(roomId, userId, guess)
    MatchMaker->>Game: Process Guess
    Game-->>MatchMaker: Updated Game Status
    MatchMaker-->>Server: Game Status
    Server->>Client: gameStatus update
    opt Invalid Guess
        Server->>Client: errorMessage event
    end

    %% Game End Scenarios
    alt Word Guessed Correctly
        Note over Game: Player Wins
        Game-->>Client: gameStatus (with winner)
    else Max Guesses Reached
        Note over Game: Player Loses
        Game-->>Client: gameStatus (with game over)
    end

    %% Game Restart
    Client->>Server: restartGame event
    Server->>MatchMaker: LeaveGame(roomId, userId)
    Server->>MatchMaker: JoinGame(userId)
    MatchMaker->>Game: Create New Game
    Game-->>Client: New gameStatus

    %% Disconnect Handling
    Client->>Socket: Disconnect
    Socket->>Server: disconnect event
    Server->>MatchMaker: LeaveGame(roomId, userId)
    MatchMaker->>Game: Remove Player
    opt Room Not Empty
        Game-->>Client: gameStatus update to other players
    end
```

## Key Interactions

1. **Initial Connection**

   - Client connects via Socket.io
   - Server assigns player to a game room
   - Initial game state sent to client

2. **Gameplay**

   - Client submits guesses via socket events
   - Server validates and processes guesses
   - All players in room receive game state updates
   - Error messages sent for invalid guesses

3. **Game End Conditions**

   - Player wins by guessing word correctly
   - Player loses after reaching max guesses
   - Game status updated for all players

4. **Game Restart**

   - Player requests game restart
   - Server creates or assigns new game room
   - Fresh game state sent to players

5. **Disconnection**
   - Player disconnection handled gracefully
   - Room cleanup if empty
   - State updates to remaining players

## Event Types

### Client to Server

- `submitGuess` - Send a word guess
- `restartGame` - Request new game
- `disconnect` - Client disconnection

### Server to Client

- `gameStatus` - Game state updates
- `errorMessage` - Validation errors
- `connect`/`disconnect` - Connection status

## State Management

The game state is managed by three main classes:

- `WordleMatchMakingController` - Manages rooms and player assignment
- `WordleGame` - Handles core game logic and state
- Client React state - Manages UI and local game state
