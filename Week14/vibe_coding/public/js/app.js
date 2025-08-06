// Main application entry point
let gameClient;

document.addEventListener('DOMContentLoaded', () => {
    console.log('Chess app initialized');

    // Initialize game client
    gameClient = new GameClient();

    // Initialize UI event listeners
    initializeUIEvents();

    // Check if room ID is in URL
    const roomIdFromUrl = getRoomIdFromUrl();
    if (roomIdFromUrl) {
        document.getElementById('room-id-input').value = roomIdFromUrl;
    }
});

function initializeUIEvents() {
    // Join game button
    const joinGameBtn = document.getElementById('join-game-btn');
    joinGameBtn.addEventListener('click', handleJoinGame);

    // Allow Enter key to join game
    const playerNameInput = document.getElementById('player-name');
    const roomIdInput = document.getElementById('room-id-input');

    [playerNameInput, roomIdInput].forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleJoinGame();
            }
        });
    });

    // Copy room ID button
    const copyRoomIdBtn = document.getElementById('copy-room-id');
    copyRoomIdBtn.addEventListener('click', () => {
        gameClient.copyRoomId();
    });

    // New game button
    const newGameBtn = document.getElementById('new-game-btn');
    newGameBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to start a new game?')) {
            gameClient.startNewGame();
        }
    });

    // Handle page visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            console.log('Page hidden');
        } else {
            console.log('Page visible');
        }
    });
}

function handleJoinGame() {
    const playerName = document.getElementById('player-name').value.trim();
    const roomId = document.getElementById('room-id-input').value.trim();

    // Validate input
    if (!playerName) {
        showJoinStatus('Please enter your name', 'error');
        return;
    }

    if (playerName.length < 2) {
        showJoinStatus('Name must be at least 2 characters long', 'error');
        return;
    }

    if (roomId && (roomId.length < 3 || roomId.length > 10)) {
        showJoinStatus('Room ID must be between 3 and 10 characters', 'error');
        return;
    }

    // Clear any previous status
    showJoinStatus('Joining game...', 'info');

    // Join the game
    gameClient.joinGame(roomId, playerName);

    // Update URL if room ID was generated
    if (!roomId) {
        updateUrlWithRoomId(gameClient.roomId);
    }
}

function showJoinStatus(message, type) {
    const statusElement = document.getElementById('join-status');
    statusElement.textContent = message;
    statusElement.className = `status-${type}`;

    // Clear status after 5 seconds for success/info messages
    if (type === 'success' || type === 'info') {
        setTimeout(() => {
            statusElement.textContent = '';
            statusElement.className = '';
        }, 5000);
    }
}

function getRoomIdFromUrl() {
    const path = window.location.pathname;
    const matches = path.match(/\/game\/([a-zA-Z0-9]+)/);
    return matches ? matches[1] : null;
}

function updateUrlWithRoomId(roomId) {
    const newUrl = `/game/${roomId}`;
    window.history.pushState({ roomId }, '', newUrl);
}

// Handle browser back/forward buttons
window.addEventListener('popstate', (event) => {
    const roomId = getRoomIdFromUrl();
    if (roomId) {
        document.getElementById('room-id-input').value = roomId;
    }
});

// Handle page unload
window.addEventListener('beforeunload', (event) => {
    if (gameClient && gameClient.gameState && gameClient.gameState.gameState === 'playing') {
        event.preventDefault();
        event.returnValue = 'You are in the middle of a game. Are you sure you want to leave?';
        return event.returnValue;
    }
});

// Utility functions
function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Error handling
window.addEventListener('error', (event) => {
    console.error('Application error:', event.error);
    if (gameClient) {
        gameClient.showMessage('An error occurred. Please refresh the page.', 'error');
    }
});

// Handle connection errors
window.addEventListener('offline', () => {
    if (gameClient) {
        gameClient.showMessage('Connection lost. Please check your internet.', 'error');
    }
});

window.addEventListener('online', () => {
    if (gameClient) {
        gameClient.showMessage('Connection restored.', 'success');
    }
});
