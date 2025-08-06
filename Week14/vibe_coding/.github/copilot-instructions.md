# Real-Time Chess Web Application

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a real-time multiplayer chess web application built with:

## Tech Stack
- **Backend**: Node.js with Express server
- **Real-time Communication**: Socket.IO for multiplayer synchronization
- **Frontend**: HTML5, CSS3, and vanilla JavaScript
- **Chess Logic**: Custom chess engine with move validation

## Project Structure
- `server.js` - Main server file with Express and Socket.IO setup
- `public/` - Static frontend files
  - `index.html` - Main HTML page
  - `css/style.css` - Styling for the chess board and UI
  - `js/` - JavaScript modules
    - `chess-pieces.js` - Chess piece definitions and basic move validation
    - `chess-board.js` - Chess board rendering and interaction logic
    - `game-client.js` - Socket.IO client and game state management
    - `app.js` - Main application entry point and UI event handling

## Key Features
- Interactive chess board with drag-and-drop interface
- Real-time move synchronization between players
- Chess rule validation and legal move checking
- Game state management (turns, move history)
- Player matchmaking and room system
- Responsive design for mobile and desktop

## Code Guidelines
- Use ES6+ features and modern JavaScript patterns
- Maintain clear separation between client and server logic
- Follow object-oriented design for chess game components
- Use Socket.IO events for all real-time communication
- Implement proper error handling and user feedback
- Keep chess rules validation on both client and server sides

## Socket.IO Events
- `joinGame` - Player joins a game room
- `makeMove` - Player makes a chess move
- `gameUpdate` - Broadcast game state changes
- `gameJoined` - Confirm player joined successfully
- `playerDisconnected` - Handle player leaving

When working on this project, prioritize user experience, real-time responsiveness, and chess rule accuracy.
