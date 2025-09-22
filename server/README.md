# Server (Backend)

This folder contains the backend server for the Wordle project.

## Structure

- `src/` - Source code
  - `server.ts` - Main server entry point
  - `config.ts` - Server configuration
  - `wordle-game.ts` - Game logic
  - `wordle-match-making-controller.ts` - Matchmaking logic
  - `constants/` - Game constants (e.g., valid words)
  - `types/` - TypeScript types
- `package.json` - Project metadata and scripts
- `tsconfig.json` - TypeScript config
- `.env` - Environment variables

## Stack

- Node.js
- TypeScript
- Express
- Socket.io

## How to Run (Development)

1. Install dependencies:
   ```
   npm install
   ```
2. Start the development server:
   ```
   npm run dev
   ```

The server will run on the port specified in `.env` (default: 3000).
