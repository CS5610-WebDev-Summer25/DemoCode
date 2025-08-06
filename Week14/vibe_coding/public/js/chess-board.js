// Chess board management and rendering
class ChessBoard {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.board = null;
        this.selectedSquare = null;
        this.validMoves = [];
        this.lastMove = null;
        this.playerColor = null;
        this.currentTurn = 'white';
        this.onMoveCallback = null;

        this.init();
    }

    init() {
        this.createBoard();
        this.attachEventListeners();
    }

    createBoard() {
        this.container.innerHTML = '';

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.className = `chess-square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
                square.dataset.row = row;
                square.dataset.col = col;

                this.container.appendChild(square);
            }
        }
    }

    attachEventListeners() {
        this.container.addEventListener('click', (e) => {
            if (e.target.classList.contains('chess-square')) {
                this.handleSquareClick(e.target);
            }
        });
    }

    handleSquareClick(squareElement) {
        const row = parseInt(squareElement.dataset.row);
        const col = parseInt(squareElement.dataset.col);

        // If no square is selected
        if (!this.selectedSquare) {
            this.selectSquare(row, col);
        }
        // If clicking the same square, deselect
        else if (this.selectedSquare.row === row && this.selectedSquare.col === col) {
            this.deselectSquare();
        }
        // If clicking a valid move square
        else if (this.isValidMoveSquare(row, col)) {
            this.makeMove(this.selectedSquare, { row, col });
        }
        // If clicking a different piece of the same color
        else if (this.canSelectSquare(row, col)) {
            this.deselectSquare();
            this.selectSquare(row, col);
        }
        // Otherwise, deselect
        else {
            this.deselectSquare();
        }
    }

    selectSquare(row, col) {
        if (!this.canSelectSquare(row, col)) return;

        this.selectedSquare = { row, col };
        this.validMoves = getValidMoves(row, col, this.board);

        this.updateBoardVisuals();
    }

    deselectSquare() {
        this.selectedSquare = null;
        this.validMoves = [];
        this.updateBoardVisuals();
    }

    canSelectSquare(row, col) {
        if (!this.board || !this.board[row] || !this.board[row][col]) return false;

        const piece = this.board[row][col];
        const pieceColor = getPieceColor(piece);

        // Can only select pieces of your color and only on your turn
        return pieceColor === this.playerColor && this.currentTurn === this.playerColor;
    }

    isValidMoveSquare(row, col) {
        return this.validMoves.some(move => move.row === row && move.col === col);
    }

    makeMove(from, to) {
        if (this.onMoveCallback) {
            this.onMoveCallback(from, to);
        }
        this.deselectSquare();
    }

    updateBoard(boardData) {
        this.board = boardData;
        this.renderPieces();
    }

    renderPieces() {
        const squares = this.container.querySelectorAll('.chess-square');

        squares.forEach(square => {
            const row = parseInt(square.dataset.row);
            const col = parseInt(square.dataset.col);
            const piece = this.board[row][col];

            if (piece) {
                const pieceElement = document.createElement('span');
                pieceElement.className = 'chess-piece';
                pieceElement.textContent = getPieceSymbol(piece);

                // Apply rotation based on player color
                if (this.playerColor === 'black') {
                    pieceElement.style.transform = 'rotate(180deg)';
                } else {
                    pieceElement.style.transform = 'none';
                }

                square.innerHTML = '';
                square.appendChild(pieceElement);
            } else {
                square.innerHTML = '';
            }
        });

        // Apply board orientation after pieces are rendered
        this.updateBoardOrientation();
    }

    updateBoardVisuals() {
        const squares = this.container.querySelectorAll('.chess-square');

        squares.forEach(square => {
            const row = parseInt(square.dataset.row);
            const col = parseInt(square.dataset.col);

            // Reset classes
            square.classList.remove('selected', 'valid-move', 'last-move');

            // Add appropriate classes
            if (this.selectedSquare && this.selectedSquare.row === row && this.selectedSquare.col === col) {
                square.classList.add('selected');
            }

            if (this.isValidMoveSquare(row, col)) {
                square.classList.add('valid-move');
            }

            if (this.lastMove &&
                ((this.lastMove.from.row === row && this.lastMove.from.col === col) ||
                 (this.lastMove.to.row === row && this.lastMove.to.col === col))) {
                square.classList.add('last-move');
            }
        });
    }

    setPlayerColor(color) {
        this.playerColor = color;
        this.updateBoardOrientation();
    }

    setCurrentTurn(turn) {
        this.currentTurn = turn;
        this.deselectSquare(); // Deselect when turn changes
    }

    setLastMove(move) {
        this.lastMove = move;
        this.updateBoardVisuals();
    }

    updateBoardOrientation() {
        // If playing as black, flip the board so black pieces are at the bottom
        if (this.playerColor === 'black') {
            this.container.style.transform = 'rotate(180deg)';
        } else {
            this.container.style.transform = 'none';
        }
    }

    setMoveCallback(callback) {
        this.onMoveCallback = callback;
    }

    highlightSquares(squares, className) {
        this.clearHighlights();

        squares.forEach(({ row, col }) => {
            const square = this.container.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (square) {
                square.classList.add(className);
            }
        });
    }

    clearHighlights() {
        const squares = this.container.querySelectorAll('.chess-square');
        squares.forEach(square => {
            square.classList.remove('highlighted', 'check', 'checkmate');
        });
    }
}
