import { Piece, Move, PieceColor } from "../../types/chess";
import { getAllLegalMoves } from "../../utils/chessRules"
import * as Helpers from "../../utils/helpers";

export function calculateMove(board: Piece[], aiColor: PieceColor): Move | null {
    const legalMoves = getAllLegalMoves(board, aiColor);
    return Helpers.getRandomElement(legalMoves.filter(move => !move.isKingCapture));
}