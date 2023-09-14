import { Piece, PieceType, PieceColor } from "../../types/chess";

export function evaluateBoard(board: Piece[]): number {
    let score = 0;

    // Define piece values
    const pieceValues = {
        [PieceType.Pawn]: 1,
        [PieceType.Knight]: 3,
        [PieceType.Bishop]: 3,
        [PieceType.Rook]: 5,
        [PieceType.Queen]: 9,
        [PieceType.King]: 0, // King's value is usually not considered in evaluation as its safety is paramount
    };

    // Iterate through the board, adding or subtracting the value of each piece
    for (const piece of board) {
        if (piece.type === PieceType.None) continue;

        const value = pieceValues[piece.type];
        score += piece.color === PieceColor.White ? value : -value;
    }

    return score;
}