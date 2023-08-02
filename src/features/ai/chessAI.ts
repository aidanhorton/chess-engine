import { Piece, Move, PieceType, PieceColor } from "../../types/chess";

export function calculateMove(board: Piece[], aiColor: PieceColor): Move {
    return new Move(0, 0, new Piece(PieceType.None, PieceColor.None));
}