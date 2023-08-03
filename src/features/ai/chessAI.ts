import { Piece, Move, PieceColor } from "../../types/chess";
import { getLegalMoves } from "../../utils/chessRules"
import * as Helpers from "../../utils/helpers";

export function calculateMove(board: Piece[], aiColor: PieceColor): Move | null {
    let legalMoves: Move[] = [];
    
    for (const piece of board) {
        if (piece.color !== aiColor) continue;

        const pieceLegalMoves = getLegalMoves(board, piece, board.indexOf(piece));
        legalMoves = legalMoves.concat(pieceLegalMoves);
    }

    return Helpers.getRandomElement(legalMoves.filter(move => !move.isKingCapture));
}