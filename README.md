# Wordle Project

## Overview

This is a multiplayer Wordle clone built using a modern full-stack architecture. Players can join game rooms and compete against each other to guess the same word.

## Folder Structure

- `client/` - Frontend React application
- `server/` - Backend Node.js/TypeScript server
- `shared/` - Shared types between client and server

## Configuration

- Server configured via `.env` file:
  - `MAX_GUESSES` - Maximum allowed guesses (default: 6)
  - `MAX_ROOM_CAPACITY` - Maximum players per room (default: 2)
  - `PREDEFINED_WORD_LIST` - List of possible words

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, TypeScript, Express, Socket.io
- **Shared:** Shared TypeScript types

## How to Run the Project

### Prerequisites

- Node.js (v16 or higher recommended)
- npm

### 1. Install dependencies

```
npm install --prefix client
npm install --prefix server
```

### 2. Start the server

```
cd server
npm run dev
```

### 3. Start the client

```
cd client
npm run dev
```

The client will be available at `http://localhost:5173` (default Vite port).

---

See `client/README.md` and `server/README.md` for more details on each part.
