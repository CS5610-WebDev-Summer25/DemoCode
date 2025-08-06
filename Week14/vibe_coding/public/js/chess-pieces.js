// Chess piece mappings
const chessPieces = {
    // White pieces (uppercase)
    'K': '♔', // King
    'Q': '♕', // Queen
    'R': '♖', // Rook
    'B': '♗', // Bishop
    'N': '♘', // Knight
    'P': '♙', // Pawn

    // Black pieces (lowercase)
    'k': '♚', // King
    'q': '♛', // Queen
    'r': '♜', // Rook
    'b': '♝', // Bishop
    'n': '♞', // Knight
    'p': '♟', // Pawn
};

// Get the Unicode symbol for a chess piece
function getPieceSymbol(piece) {
    return chessPieces[piece] || '';
}

// Check if a piece is white (uppercase)
function isWhitePiece(piece) {
    return piece && piece === piece.toUpperCase();
}

// Check if a piece is black (lowercase)
function isBlackPiece(piece) {
    return piece && piece === piece.toLowerCase() && piece !== piece.toUpperCase();
}

// Get the color of a piece
function getPieceColor(piece) {
    if (!piece) return null;
    return isWhitePiece(piece) ? 'white' : 'black';
}

// Get piece type (without color)
function getPieceType(piece) {
    return piece ? piece.toLowerCase() : null;
}

// Check if a square is within board bounds
function isValidSquare(row, col) {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
}

// Convert board position to chess notation (e.g., 0,0 -> a8)
function positionToNotation(row, col) {
    const file = String.fromCharCode(97 + col); // a-h
    const rank = 8 - row; // 8-1
    return file + rank;
}

// Convert chess notation to board position (e.g., a8 -> 0,0)
function notationToPosition(notation) {
    const file = notation.charCodeAt(0) - 97; // a-h to 0-7
    const rank = parseInt(notation[1]); // 1-8
    return {
        row: 8 - rank,
        col: file
    };
}

// Basic move validation for different piece types
const pieceMovement = {
    'p': { // Pawn
        isValidMove: function(from, to, board, isWhite) {
            const direction = isWhite ? -1 : 1;
            const startRow = isWhite ? 6 : 1;
            const rowDiff = to.row - from.row;
            const colDiff = Math.abs(to.col - from.col);

            // Forward move
            if (colDiff === 0) {
                if (rowDiff === direction && !board[to.row][to.col]) {
                    return true; // One square forward
                }
                if (from.row === startRow && rowDiff === 2 * direction && !board[to.row][to.col]) {
                    return true; // Two squares forward from start
                }
            }
            // Diagonal capture
            else if (colDiff === 1 && rowDiff === direction && board[to.row][to.col]) {
                return getPieceColor(board[to.row][to.col]) !== (isWhite ? 'white' : 'black');
            }

            return false;
        }
    },

    'r': { // Rook
        isValidMove: function(from, to, board) {
            // Must move in straight line (same row or column)
            if (from.row !== to.row && from.col !== to.col) return false;

            // Check if path is clear
            return this.isPathClear(from, to, board);
        },
        isPathClear: function(from, to, board) {
            const rowStep = from.row === to.row ? 0 : (to.row > from.row ? 1 : -1);
            const colStep = from.col === to.col ? 0 : (to.col > from.col ? 1 : -1);

            let currentRow = from.row + rowStep;
            let currentCol = from.col + colStep;

            while (currentRow !== to.row || currentCol !== to.col) {
                if (board[currentRow][currentCol]) return false;
                currentRow += rowStep;
                currentCol += colStep;
            }

            return true;
        }
    },

    'n': { // Knight
        isValidMove: function(from, to) {
            const rowDiff = Math.abs(to.row - from.row);
            const colDiff = Math.abs(to.col - from.col);
            return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
        }
    },

    'b': { // Bishop
        isValidMove: function(from, to, board) {
            // Must move diagonally
            const rowDiff = Math.abs(to.row - from.row);
            const colDiff = Math.abs(to.col - from.col);
            if (rowDiff !== colDiff) return false;

            // Check if path is clear
            return this.isPathClear(from, to, board);
        },
        isPathClear: function(from, to, board) {
            const rowStep = to.row > from.row ? 1 : -1;
            const colStep = to.col > from.col ? 1 : -1;

            let currentRow = from.row + rowStep;
            let currentCol = from.col + colStep;

            while (currentRow !== to.row || currentCol !== to.col) {
                if (board[currentRow][currentCol]) return false;
                currentRow += rowStep;
                currentCol += colStep;
            }

            return true;
        }
    },

    'q': { // Queen (combines rook and bishop)
        isValidMove: function(from, to, board) {
            return pieceMovement.r.isValidMove(from, to, board) ||
                   pieceMovement.b.isValidMove(from, to, board);
        }
    },

    'k': { // King
        isValidMove: function(from, to) {
            const rowDiff = Math.abs(to.row - from.row);
            const colDiff = Math.abs(to.col - from.col);
            return rowDiff <= 1 && colDiff <= 1 && (rowDiff > 0 || colDiff > 0);
        }
    }
};

// Validate if a move is legal
function isValidMove(from, to, board, piece) {
    if (!piece || !isValidSquare(to.row, to.col)) return false;

    // Can't capture own piece
    const targetPiece = board[to.row][to.col];
    if (targetPiece && getPieceColor(piece) === getPieceColor(targetPiece)) {
        return false;
    }

    const pieceType = getPieceType(piece);
    const movement = pieceMovement[pieceType];

    if (!movement) return false;

    return movement.isValidMove(from, to, board, isWhitePiece(piece));
}

// Get all valid moves for a piece at a given position
function getValidMoves(row, col, board) {
    const piece = board[row][col];
    if (!piece) return [];

    const validMoves = [];
    const from = { row, col };

    // Check all possible squares
    for (let toRow = 0; toRow < 8; toRow++) {
        for (let toCol = 0; toCol < 8; toCol++) {
            const to = { row: toRow, col: toCol };
            if (isValidMove(from, to, board, piece)) {
                validMoves.push(to);
            }
        }
    }

    return validMoves;
}
