# Real-Time Chess Web Application

A modern, real-time multiplayer chess web application built with Node.js, Socket.IO, and vanilla JavaScript. Play chess with friends online with instant move synchronization and a beautiful, responsive interface.

## 🌟 Features

- **Real-time Multiplayer**: Play chess with friends in real-time using Socket.IO
- **Interactive Chess Board**: Drag-and-drop interface with visual move validation
- **Chess Rules Engine**: Complete chess move validation including:
  - Piece movement rules (pawns, rooks, bishops, knights, queens, kings)
  - Turn-based gameplay
  - Move history tracking
- **Room System**: Create or join game rooms with unique room IDs
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Visual Feedback**: Highlighted legal moves, last move indicators, and turn indicators
- **Player Management**: See connected players and their colors

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser and go to:
   ```
   http://localhost:3000
   ```

5. Share the room ID with a friend to play together!

## 🎮 How to Play

1. **Join a Game**:
   - Enter your name
   - Leave room ID blank to create a new game, or enter an existing room ID to join
   - Click "Join Game"

2. **Playing Chess**:
   - Click on a piece to select it (you can only move pieces of your color)
   - Valid moves will be highlighted in green
   - Click on a highlighted square to move your piece
   - The board automatically rotates for the black player

3. **Game Features**:
   - **Current Turn**: See whose turn it is at the top of the screen
   - **Move History**: Track all moves made in the game
   - **Room ID**: Share the room ID with friends to join your game
   - **Copy Room ID**: Use the button to easily copy and share the room ID

## 🏗️ Technical Architecture

### Backend (Node.js + Socket.IO)
- **Express Server**: Serves static files and handles routes
- **Socket.IO**: Real-time bidirectional communication
- **Game State Management**: Maintains chess board state and player information
- **Move Validation**: Server-side validation of all chess moves

### Frontend (Vanilla JavaScript)
- **Modular Design**: Separated into logical modules
  - `chess-pieces.js`: Chess piece definitions and move validation
  - `chess-board.js`: Board rendering and user interaction
  - `game-client.js`: Socket.IO communication and game state
  - `app.js`: Application initialization and UI events
- **Responsive CSS**: Beautiful styling that works on all devices
- **Real-time Updates**: Instant board updates when opponent moves

### Socket.IO Events
- `joinGame`: Player joins a game room
- `makeMove`: Player attempts to make a move
- `gameUpdate`: Broadcast updated game state to all players
- `gameJoined`: Confirm successful room join
- `playerDisconnected`: Handle player leaving the game

## 📁 Project Structure

```
├── server.js                 # Main server file
├── package.json              # Project dependencies and scripts
├── README.md                 # This file
├── .github/
│   └── copilot-instructions.md
└── public/                   # Static frontend files
    ├── index.html            # Main HTML page
    ├── css/
    │   └── style.css         # Styling
    └── js/
        ├── chess-pieces.js   # Chess piece logic
        ├── chess-board.js    # Board management
        ├── game-client.js    # Socket.IO client
        └── app.js            # Main application
```

## 🔧 Development

### Running in Development Mode
```bash
npm run dev
```

### Key Components

1. **ChessGame Class** (`server.js`): Manages game state, players, and move validation
2. **ChessBoard Class** (`chess-board.js`): Handles board rendering and user interactions
3. **GameClient Class** (`game-client.js`): Manages Socket.IO communication and UI updates

### Adding Features

The modular architecture makes it easy to add new features:
- **Game Rules**: Extend the `pieceMovement` object in `chess-pieces.js`
- **UI Features**: Add new components to the HTML and connect them in `app.js`
- **Server Events**: Add new Socket.IO events in both `server.js` and `game-client.js`

## 🎯 Future Enhancements

Potential features to add:
- [ ] Check and checkmate detection
- [ ] Castling and en passant moves
- [ ] Game timer/clock
- [ ] Spectator mode
- [ ] Game replay system
- [ ] Player rankings and statistics
- [ ] Chat system
- [ ] Sound effects
- [ ] Different chess variants

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License - see the package.json file for details.

## 🎮 Play Now!

Start the server and begin playing chess with friends in real-time. The application automatically handles room creation, player matching, and game synchronization.

Enjoy your game! ♟️
