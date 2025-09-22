import express from 'express';
import http from 'http';
import { WordleMatchMakingController } from './wordle-match-making-controller';
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
const controller = new WordleMatchMakingController();


io.on('connection', (socket) => {
  console.log(`a user ${socket.id} connected`);

  let roomId = controller.JoinGame(socket.id);
  socket.join(roomId);
  io.to(roomId).emit('gameStatus', controller.GetGameStatus(roomId, socket.id));

  socket.on('submitGuess', (guess: string) => {
    try {
      controller.SubmitGuess(roomId, socket.id, guess);
      io.to(roomId).emit('gameStatus', controller.GetGameStatus(roomId, socket.id));
    } catch (error: any) {
      socket.emit('errorMessage', error.message);
    }
  });

  socket.on('restartGame', () => {
    controller.LeaveGame(roomId, socket.id);
    socket.leave(roomId);

    roomId = controller.JoinGame(socket.id);
    socket.join(roomId);

    io.to(roomId).emit('gameStatus', controller.GetGameStatus(roomId, socket.id));
  });

  socket.on('disconnect', () => {
    console.log(`user ${socket.id} disconnected`);
    const isRoomEmpty = controller.LeaveGame(roomId, socket.id);
    socket.leave(roomId);

    if (!isRoomEmpty) {
      io.to(roomId).emit('gameStatus', controller.GetGameStatus(roomId, socket.id));
    }
  });

});

server.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});