# Client (Frontend)

This folder contains the React frontend for the Wordle project.

## Structure

- `src/` - Source code
  - `components/` - React components (Cell, Grid, Header, etc.)
  - `App.tsx` - Main app component
  - `main.tsx` - Entry point
  - `socket.ts` - Socket.io client setup
  - `index.css` - Global styles
- `public/` - Static assets (favicon, etc.)
- `index.html` - Main HTML file
- `vite.config.ts` - Vite configuration
- `tsconfig*.json` - TypeScript configs

## Stack

- React
- TypeScript
- Vite
- Socket.io-client

## How to Run (Development)

1. Install dependencies:
   ```
   npm install
   ```
2. Start the development server:
   ```
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.
