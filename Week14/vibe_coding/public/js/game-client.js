// Game client for handling Socket.IO communication
class GameClient {
    constructor() {
        this.socket = io();
        this.gameState = null;
        this.playerColor = null;
        this.roomId = null;
        this.chessBoard = null;

        this.initializeSocketListeners();
    }

    initializeSocketListeners() {
        // Connection events
        this.socket.on('connect', () => {
            console.log('Connected to server');
            this.showMessage('Connected to server', 'success');
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
            this.showMessage('Disconnected from server', 'error');
        });

        // Game events
        this.socket.on('gameJoined', (data) => {
            this.playerColor = data.color;
            this.gameState = data.gameState;
            this.onGameJoined(data);
        });

        this.socket.on('gameUpdate', (gameState) => {
            this.gameState = gameState;
            this.onGameUpdate(gameState);
        });

        this.socket.on('playerDisconnected', (socketId) => {
            this.showMessage('Player disconnected', 'info');
        });

        // Error events
        this.socket.on('joinError', (message) => {
            this.showMessage(`Join error: ${message}`, 'error');
        });

        this.socket.on('moveError', (message) => {
            this.showMessage(`Move error: ${message}`, 'error');
        });
    }

    joinGame(roomId, playerName) {
        this.roomId = roomId || this.generateRoomId();
        this.socket.emit('joinGame', {
            roomId: this.roomId,
            playerName: playerName
        });
    }

    makeMove(from, to) {
        if (!this.roomId) return;

        this.socket.emit('makeMove', {
            from: from,
            to: to
        });
    }

    onGameJoined(data) {
        console.log('Joined game as', data.color);
        this.showMessage(`Joined game as ${data.color}`, 'success');

        // Update UI
        this.updatePlayerInfo();
        this.updateRoomInfo();
        this.showGameSection();

        // Initialize chess board if not already done
        if (!this.chessBoard) {
            this.chessBoard = new ChessBoard('chess-board');
            this.chessBoard.setMoveCallback((from, to) => this.makeMove(from, to));
        }

        this.chessBoard.setPlayerColor(this.playerColor);
        this.updateGameDisplay();
    }

    onGameUpdate(gameState) {
        console.log('Game updated', gameState);

        if (this.chessBoard) {
            this.chessBoard.updateBoard(gameState.board);
            this.chessBoard.setCurrentTurn(gameState.currentTurn);

            // Update last move highlight
            if (gameState.moveHistory && gameState.moveHistory.length > 0) {
                const lastMove = gameState.moveHistory[gameState.moveHistory.length - 1];
                this.chessBoard.setLastMove(lastMove);
            }
        }

        this.updateGameDisplay();
        this.updatePlayersList();
        this.updateMoveHistory();
        this.updateCurrentTurn();
    }

    updatePlayerInfo() {
        const playerColorElement = document.getElementById('player-color');
        if (playerColorElement) {
            playerColorElement.textContent = `Playing as: ${this.playerColor}`;
            playerColorElement.className = `current-turn ${this.playerColor}`;
        }
    }

    updateRoomInfo() {
        const roomIdElement = document.getElementById('room-id');
        if (roomIdElement) {
            roomIdElement.textContent = `Room: ${this.roomId}`;
        }
    }

    updateCurrentTurn() {
        const currentTurnElement = document.getElementById('current-turn');
        if (currentTurnElement && this.gameState) {
            const isMyTurn = this.gameState.currentTurn === this.playerColor;
            currentTurnElement.textContent = isMyTurn ? 'Your turn' : `${this.gameState.currentTurn}'s turn`;
            currentTurnElement.className = `current-turn ${this.gameState.currentTurn}`;
        }
    }

    updatePlayersList() {
        const playersListElement = document.getElementById('players-list');
        if (!playersListElement || !this.gameState) return;

        const players = Object.values(this.gameState.players);
        playersListElement.innerHTML = '';

        players.forEach(player => {
            const playerDiv = document.createElement('div');
            playerDiv.className = 'player-info';

            const colorDiv = document.createElement('div');
            colorDiv.className = `player-color ${player.color}`;

            const nameSpan = document.createElement('span');
            nameSpan.textContent = player.name;

            playerDiv.appendChild(colorDiv);
            playerDiv.appendChild(nameSpan);
            playersListElement.appendChild(playerDiv);
        });
    }

    updateMoveHistory() {
        const movesListElement = document.getElementById('moves-list');
        if (!movesListElement || !this.gameState) return;

        movesListElement.innerHTML = '';

        this.gameState.moveHistory.forEach((move, index) => {
            const moveDiv = document.createElement('div');
            moveDiv.className = 'move-item';

            const fromNotation = positionToNotation(move.from.row, move.from.col);
            const toNotation = positionToNotation(move.to.row, move.to.col);

            moveDiv.textContent = `${index + 1}. ${move.piece} ${fromNotation}-${toNotation}`;
            movesListElement.appendChild(moveDiv);
        });

        // Scroll to bottom
        movesListElement.scrollTop = movesListElement.scrollHeight;
    }

    updateGameDisplay() {
        if (!this.gameState) return;

        // Update game status
        const statusText = this.getGameStatusText();
        if (statusText) {
            this.showMessage(statusText, 'info');
        }
    }

    getGameStatusText() {
        if (!this.gameState) return '';

        switch (this.gameState.gameState) {
            case 'waiting':
                return 'Waiting for another player to join...';
            case 'playing':
                const playerCount = Object.keys(this.gameState.players).length;
                return playerCount === 2 ? 'Game in progress' : 'Waiting for second player...';
            case 'finished':
                return 'Game finished';
            default:
                return '';
        }
    }

    showGameSection() {
        document.getElementById('join-section').classList.add('hidden');
        document.getElementById('game-section').classList.remove('hidden');
    }

    showJoinSection() {
        document.getElementById('join-section').classList.remove('hidden');
        document.getElementById('game-section').classList.add('hidden');
    }

    generateRoomId() {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    showMessage(text, type = 'info') {
        const messagesContainer = document.getElementById('game-messages');

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = text;

        messagesContainer.appendChild(messageDiv);

        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 5000);
    }

    copyRoomId() {
        if (this.roomId) {
            navigator.clipboard.writeText(this.roomId).then(() => {
                this.showMessage('Room ID copied to clipboard!', 'success');
            }).catch(() => {
                this.showMessage('Failed to copy room ID', 'error');
            });
        }
    }

    startNewGame() {
        this.showJoinSection();
        this.gameState = null;
        this.playerColor = null;
        this.roomId = null;
        this.chessBoard = null;
    }
}
