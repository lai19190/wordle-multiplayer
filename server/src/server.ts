import express from 'express';
import http from 'http';
import { WordleController } from './wordle-controller';
import { Server } from 'socket.io';
import config from './config';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV !== 'production' ? '*' : undefined,
    methods: ["GET", "POST"]
  }
});
const wordleController = new WordleController();


io.on('connection', (socket) => {
  console.log(`a user ${socket.id} connected`);

  socket.on('submitGuess', (guess: string) => {
    try {
      wordleController.SubmitGuess(socket.id, guess);
      socket.emit('gameStatus', wordleController.GetGameStatus(socket.id));
    } catch (error: any) {
      socket.emit('errorMessage', error.message);
    }
  });

  socket.on('restartGame', () => {
    wordleController.StartNewGame(socket.id);
    socket.emit('gameStatus', wordleController.GetGameStatus(socket.id));
  });

  socket.on('disconnect', () => {
    console.log(`user ${socket.id} disconnected`);
    wordleController.CleanUp(socket.id);
  });

});

server.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});