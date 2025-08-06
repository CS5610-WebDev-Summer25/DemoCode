const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Store active game rooms
const gameRooms = new Map();

class ChessGame {
  constructor(roomId) {
    this.roomId = roomId;
    this.players = {};
    this.currentTurn = 'white';
    this.gameState = 'waiting'; // waiting, playing, finished
    this.board = this.initializeBoard();
    this.moveHistory = [];
  }

  initializeBoard() {
    return [
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ];
  }

  addPlayer(socketId, playerName) {
    if (Object.keys(this.players).length >= 2) {
      return false;
    }

    const color = Object.keys(this.players).length === 0 ? 'white' : 'black';
    this.players[socketId] = {
      name: playerName,
      color: color
    };

    if (Object.keys(this.players).length === 2) {
      this.gameState = 'playing';
    }

    return color;
  }

  removePlayer(socketId) {
    delete this.players[socketId];
    if (Object.keys(this.players).length === 0) {
      this.gameState = 'finished';
    }
  }

  makeMove(socketId, from, to) {
    const player = this.players[socketId];
    if (!player || player.color !== this.currentTurn || this.gameState !== 'playing') {
      return false;
    }

    const piece = this.board[from.row][from.col];
    if (!piece) return false;

    // Basic validation - check if piece belongs to current player
    const isWhitePiece = piece === piece.toUpperCase();
    if ((isWhitePiece && this.currentTurn !== 'white') ||
        (!isWhitePiece && this.currentTurn !== 'black')) {
      return false;
    }

    // Move the piece
    this.board[to.row][to.col] = piece;
    this.board[from.row][from.col] = null;

    // Add to move history
    this.moveHistory.push({
      from,
      to,
      piece,
      player: this.currentTurn,
      timestamp: new Date()
    });

    // Switch turns
    this.currentTurn = this.currentTurn === 'white' ? 'black' : 'white';

    return true;
  }

  getGameState() {
    return {
      board: this.board,
      currentTurn: this.currentTurn,
      players: this.players,
      gameState: this.gameState,
      moveHistory: this.moveHistory
    };
  }
}

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('joinGame', (data) => {
    const { roomId, playerName } = data;

    if (!gameRooms.has(roomId)) {
      gameRooms.set(roomId, new ChessGame(roomId));
    }

    const game = gameRooms.get(roomId);
    const playerColor = game.addPlayer(socket.id, playerName);

    if (playerColor) {
      socket.join(roomId);
      socket.roomId = roomId;
      socket.playerColor = playerColor;

      // Send game state to the player
      socket.emit('gameJoined', {
        color: playerColor,
        gameState: game.getGameState()
      });

      // Notify all players in the room
      io.to(roomId).emit('gameUpdate', game.getGameState());

      console.log(`Player ${playerName} joined room ${roomId} as ${playerColor}`);
    } else {
      socket.emit('joinError', 'Room is full');
    }
  });

  socket.on('makeMove', (data) => {
    const { from, to } = data;
    const roomId = socket.roomId;

    if (!roomId || !gameRooms.has(roomId)) {
      socket.emit('moveError', 'Invalid room');
      return;
    }

    const game = gameRooms.get(roomId);
    const moveSuccessful = game.makeMove(socket.id, from, to);

    if (moveSuccessful) {
      // Broadcast the updated game state to all players in the room
      io.to(roomId).emit('gameUpdate', game.getGameState());
      console.log(`Move made in room ${roomId}: ${JSON.stringify(from)} -> ${JSON.stringify(to)}`);
    } else {
      socket.emit('moveError', 'Invalid move');
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);

    const roomId = socket.roomId;
    if (roomId && gameRooms.has(roomId)) {
      const game = gameRooms.get(roomId);
      game.removePlayer(socket.id);

      // Notify remaining players
      io.to(roomId).emit('playerDisconnected', socket.id);
      io.to(roomId).emit('gameUpdate', game.getGameState());

      // Clean up empty rooms
      if (Object.keys(game.players).length === 0) {
        gameRooms.delete(roomId);
        console.log(`Room ${roomId} deleted`);
      }
    }
  });
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/game/:roomId', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Chess server running on port ${PORT}`);
});
