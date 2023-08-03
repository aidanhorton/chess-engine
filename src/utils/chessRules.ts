import { Piece, Move, PieceType, PieceColor } from '../types/chess';
import * as LegalMoves from './legalMoves';

// Check if a given move is legal according to chess rules.
export function isMoveLegal(boardState: Piece[], move: Move): boolean {
    // Implementation here...
    return true;
}

export function getAllLegalMoves(board: Piece[], color: PieceColor, filter = true): Move[] {
    let legalMoves: Move[] = [];
    
    for (const piece of board) {
        if (piece.color !== color) continue;

        const pieceLegalMoves = getLegalMoves(board, piece, board.indexOf(piece), filter);
        legalMoves = legalMoves.concat(pieceLegalMoves);
    }

    return legalMoves;
}

// Get all legal moves for a given piece at a particular position.
export function getLegalMoves(board: Piece[], piece: Piece, position: number, filter = true): Move[] {
    let legalMoves: Move[] = [];

    switch (piece.type) {
        case PieceType.Pawn:
            legalMoves = LegalMoves.getAllMovesForPawn(board, position);
            break;
        case PieceType.Knight:
            legalMoves = LegalMoves.getAllMovesForKnight(board, piece, position);
            break;
        case PieceType.Bishop:
            legalMoves = LegalMoves.getAllMovesForBishop(board, piece, position);
            break;
        case PieceType.Rook:
            legalMoves = LegalMoves.getAllMovesForRook(board, piece, position);
            break;
        case PieceType.Queen:
            legalMoves = LegalMoves.getAllMovesForQueen(board, piece, position);
            break;
        case PieceType.King:
            legalMoves = LegalMoves.getAllMovesForKing(board, piece, position);
            break;
        default:
            legalMoves = [];
            break;
    }

    if (filter) {
        legalMoves = legalMoves.filter(move => !move.isKingCapture);
        return filterMovesToResolveCheck(board, legalMoves, piece.color);
    } else {
        return legalMoves;
    }
}

export function filterMovesToResolveCheck(board: Piece[], moves: Move[], color: PieceColor): Move[] {
    const legalMoves: Move[] = [];

    for (const move of moves) {
        let newBoard = [...board];

        newBoard[move.to] = move.piece;
        newBoard[move.from] = new Piece(PieceType.None, PieceColor.None);

        if (!isInCheck(newBoard, color)) legalMoves.push(move);
    }

    return legalMoves;
}

// Execute a move, updating the board state.
export function executeMove(board: Piece[], move: Move): Piece[] {
    // Implementation here...
    return [];
}

// Check if the current position is in check.
export function isInCheck(board: Piece[], color: PieceColor): boolean {
    const legalMoves = getAllLegalMoves(board, color === PieceColor.White ? PieceColor.Black : PieceColor.White, false);
    return legalMoves.some(move => move.isKingCapture);
}

// Check if the current position is in checkmate.
export function isInCheckmate(board: Piece[], color: PieceColor): boolean {
    // Implementation here...
    return false;
}

// Handle special case of castling.
export function handleCastling(board: Piece[], move: Move): Piece[] {
    // Implementation here...
    return [];
}

// Handle special case of en passant.
export function handleEnPassant(board: Piece[], move: Move): Piece[] {
    // Implementation here...
    return [];
}

// Handle special case of pawn promotion.
export function handlePawnPromotion(board: Piece[], move: Move): Piece[] {
    // Implementation here...
    return [];
}