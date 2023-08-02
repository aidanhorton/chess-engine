import { Piece, Move } from "../types/chess";
import * as PieceUtils from "../utils/pieceUtils";

export function getLegalMovesForPawn(board: Piece[], position: number): Move[] {
    const moves: Move[] = [];
    const row = Math.floor(position / 8);
    const col = position % 8;

    const piece = board[position];

    // Check if the pawn is on the last row (it should be promoted, not moved, but this logic is omitted here)
    if (row === 0) return [];

    // Move forward one square if it's free
    const oneSquareAhead = position - 8;
    if (board[oneSquareAhead] === Piece.None) {
        moves.push({ from: position, to: oneSquareAhead, piece: piece });
    }

    // Move forward two squares if it's on its starting row and both squares ahead are free
    if (row === 6 && board[oneSquareAhead] === Piece.None && board[position - 16] === Piece.None) {
        moves.push({ from: position, to: position - 16, piece: piece });
    }

    // Capture diagonally left, if there's an enemy piece there
    if (col > 0 && PieceUtils.isBlackNonKing(board[position - 9])) {
        moves.push({ from: position, to: position - 9, piece: piece });
    }

    // Capture diagonally right, if there's an enemy piece there
    if (col < 7 && PieceUtils.isBlackNonKing(board[position - 7])) {
        moves.push({ from: position, to: position - 7, piece: piece });
    }

    return moves;
}