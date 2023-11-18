import { Piece, Move, PieceType, PieceColor } from "../types/chess";

// TODO - Pawn on the last column cant take diagonally. It had its own colour piece directly in front.

export function getAllMovesForPawn(board: Piece[], position: number): Move[] {
    const moves: Move[] = [];
    const row = Math.floor(position / 8);
    const col = position % 8;

    const piece = board[position];

    // Check if the pawn is on the last row (it should be promoted, not moved, but this logic is omitted here)
    if ((piece.color === PieceColor.White && row === 0) || (piece.color === PieceColor.Black && row === 7)) return [];

    const diagonallyLeft = piece.color === PieceColor.White ? position - 9 : position + 7;
    const diagonallyRight = piece.color === PieceColor.White ? position - 7 : position + 9;
    const twoSquaresAhead = piece.color === PieceColor.White ? position - 16 : position + 16;
    const oneSquareAhead = piece.color === PieceColor.White ? position - 8 : position + 8;

    // Move forward one square if it's free
    const pieceAhead = board[oneSquareAhead];
    if (pieceAhead.type === PieceType.None) {
        moves.push(new Move(position, oneSquareAhead, piece));
    }

    // Move forward two squares if it's on its starting row and both squares ahead are free
    const isOnSecondRow = (row === 6 && piece.color === PieceColor.White) || (row === 1 && piece.color === PieceColor.Black);
    if (isOnSecondRow && pieceAhead.type === PieceType.None && board[twoSquaresAhead].type === PieceType.None) {
        moves.push(new Move(position, twoSquaresAhead, piece));
    }

    // Capture diagonally left, if there's an enemy piece there
    if (col > 0 && col < 7 && board[diagonallyLeft].type !== PieceType.None && !board[diagonallyLeft].isSameColor(piece)) {
        moves.push(new Move(position, diagonallyLeft, piece, board[diagonallyLeft].type === PieceType.King));
    }

    // Capture diagonally right, if there's an enemy piece there
    if (col > 0 && col < 7 && board[diagonallyRight].type !== PieceType.None && !board[diagonallyRight].isSameColor(piece)) {
        moves.push(new Move(position, diagonallyRight, piece, board[diagonallyRight].type === PieceType.King));
    }

    return moves;
}

export function getAllMovesForKnight(board: Piece[], piece: Piece, position: number): Move[] {
    const moves: Move[] = [];

    // Define the offsets for a knight's moves
    const offsets = [-17, -15, -10, -6, 6, 10, 15, 17];

    // Iterate over the offsets to check each potential move
    for (const offset of offsets) {
        const targetPosition = position + offset;

        // Check if the target position is within bounds of the board
        if (targetPosition < 0 || targetPosition >= 64) continue;

        // Check for wrapping around the board
        const columnDifference = Math.abs((position % 8) - (targetPosition % 8));
        if (columnDifference > 2) continue;

        const targetPiece = board[targetPosition];

        // Check if the target square is empty or contains an opponent's piece
        if (targetPiece.type === PieceType.None || (!piece.isSameColor(targetPiece))) {
            moves.push(new Move(position, targetPosition, piece, targetPiece.type === PieceType.King));
        }
    }
    
    return moves;
}

export function getAllMovesForBishop(board: Piece[], piece: Piece, position: number): Move[] {
    const moves: Move[] = [];

    // Define the offsets for a bishop's moves in all four diagonal directions
    const offsets = [-9, -7, 7, 9];

    // Iterate over the offsets to check each potential move
    for (const offset of offsets) {
        for (let i = 1; i < 8; i++) { // Maximum 7 steps in any direction
            const targetPosition = position + i * offset;

            // Check if the target position is within bounds of the board
            if (targetPosition < 0 || targetPosition >= 64) break;

            // Check for wrapping around the board
            const rowDifference = Math.floor(position / 8) - Math.floor(targetPosition / 8);
            const columnDifference = Math.abs((position % 8) - (targetPosition % 8));
            if (Math.abs(rowDifference) !== columnDifference) break;

            const targetPiece = board[targetPosition];

            // Check if the target square contains an ally piece
            if (piece.isSameColor(targetPiece)) break;

            // If the target square is empty or contains an opponent's piece, the move is legal
            moves.push(new Move(position, targetPosition, piece, targetPiece.type === PieceType.King));

            // If there's a piece on the target square, the bishop can't move past it
            if (targetPiece.type !== PieceType.None) break;
        }
    }

    return moves;
}

export function getAllMovesForRook(board: Piece[], piece: Piece, position: number): Move[] {
    const moves: Move[] = [];

    // Define the offsets for a rook's moves in all four cardinal directions (up, down, left, right)
    const offsets = [-8, 8, -1, 1];

    // Iterate over the offsets to check each potential move
    for (const offset of offsets) {
        for (let i = 1; i < 8; i++) { // Maximum 7 steps in any direction
            const targetPosition = position + i * offset;
            
            // Check if the target position is within bounds of the board
            if (targetPosition < 0 || targetPosition >= 64) break;
            
            // Check for wrapping around the board
            if (offset === 1 && targetPosition % 8 === 0) break;
            if (offset === -1 && targetPosition % 8 === 7) break;
            
            const targetPiece = board[targetPosition];
            
            // Check if the target square contains an ally piece
            if (piece.isSameColor(targetPiece)) break;
            
            // If the target square is empty or contains an opponent's piece, the move is legal
            moves.push(new Move(position, targetPosition, piece, targetPiece.type === PieceType.King));
            
            // If there's a piece on the target square, the rook can't move past it
            if (targetPiece.type !== PieceType.None) break;
        }
    }

    return moves;
}

export function getAllMovesForQueen(board: Piece[], piece: Piece, position: number): Move[] {
    const moves: Move[] = [];

    // Define the offsets for a queen's moves in all eight directions (up, down, left, right, and diagonals)
    const offsets = [-8, 8, -1, 1, -9, 9, -7, 7];
    // Iterate over the offsets to check each potential move
    for (const offset of offsets) {
        for (let i = 1; i < 8; i++) { // Maximum 7 steps in any direction
            const targetPosition = position + i * offset;

            // Check if the target position is within bounds of the board
            if (targetPosition < 0 || targetPosition >= 64) break;

            // Check for wrapping around the board when moving horizontally
            if (Math.abs(offset) === 1 && (position % 8 === 0 && offset === -1 || (position + 1) % 8 === 0 && offset === 1)) break;

            // Check for wrapping around the board when moving diagonally
            if ((offset === -9 && (position % 8 === 0 || targetPosition % 8 === 7)) ||
                (offset === 9 && (position % 8 === 7 || targetPosition % 8 === 0)) ||
                (offset === -7 && (position % 8 === 7 || targetPosition % 8 === 0)) ||
                (offset === 7 && (position % 8 === 0 || targetPosition % 8 === 7))) break;

            const targetPiece = board[targetPosition];

            // Check if the target square contains an ally piece
            if (piece.isSameColor(targetPiece)) break;

            // If the target square is empty or contains an opponent's piece, the move is legal
            moves.push(new Move(position, targetPosition, piece, targetPiece.type === PieceType.King));

            // If there's a piece on the target square, the queen can't move past it
            if (targetPiece.type !== PieceType.None) break;
        }
    }

    return moves;
}

export function getAllMovesForKing(board: Piece[], piece: Piece, position: number): Move[] {
    const moves: Move[] = [];

    // Define the offsets for a king's moves in all eight directions
    const offsets = [-8, 8, -1, 1, -9, 9, -7, 7];

    // Iterate over the offsets to check each potential move
    for (const offset of offsets) {
        const targetPosition = position + offset;
        
        // Check if the target position is within bounds of the board
        if (targetPosition < 0 || targetPosition >= 64) continue;
        
        // Check for wrapping around the board when moving horizontally or diagonally
        if ((offset === 1 && targetPosition % 8 === 0) || (offset === -1 && targetPosition % 8 === 7)) continue;
        if ((offset === -7 && targetPosition % 8 === 7) || (offset === 7 && targetPosition % 8 === 0)) continue;
        if ((offset === -9 && targetPosition % 8 === 7) || (offset === 9 && targetPosition % 8 === 0)) continue;
        
        const targetPiece = board[targetPosition];
        
        // Check if the target square contains an ally piece
        if (piece.isSameColor(targetPiece)) continue;
        
        // If the target square is empty or contains an opponent's piece, the move is legal
        moves.push(new Move(position, targetPosition, piece, targetPiece.type === PieceType.King));
    }

    return moves;
}