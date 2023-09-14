import { evaluateBoard } from "./evaluation";
import { Piece, Move, PieceType, PieceColor } from "../../types/chess";
import { getAllLegalMoves } from "../../utils/chessRules"

export function calculateMove(board: Piece[], aiColor: PieceColor): Move | null {
    return minimax(board, 4, false).move;
}

function minimax(board: Piece[], depth: number, maximizingPlayer: boolean, alpha: number = -Infinity, beta: number = Infinity): { score: number, move: Move | null } {
    if (depth === 0 || gameIsOver(board)) {
        return { score: evaluateBoard(board), move: null };
    }
  
    let bestMove: Move | null = null;
  
    if (maximizingPlayer) {
        let maxEval = -Infinity;
        const moves = getAllLegalMoves(board, PieceColor.White);
  
        for (const move of moves) {
            const newBoard = applyMove(board, move);
            const { score } = minimax(newBoard, depth - 1, false, alpha, beta);
  
            if (score > maxEval) {
                maxEval = score;
                bestMove = move;
            }
  
            alpha = Math.max(alpha, score);
            if (beta <= alpha) break;
        }
  
        return { score: maxEval, move: bestMove };
    } else {
        let minEval = Infinity;
        const moves = getAllLegalMoves(board, PieceColor.Black);
  
        for (const move of moves) {
            const newBoard = applyMove(board, move);
            const { score } = minimax(newBoard, depth - 1, true, alpha, beta);
  
            if (score < minEval) {
                minEval = score;
                bestMove = move;
            }
  
            beta = Math.min(beta, score);
            if (beta <= alpha) break;
        }
  
        return { score: minEval, move: bestMove };
    }
}

function gameIsOver(board: Piece[]): boolean {
    return false;
}

function applyMove(board: Piece[], move: Move) : Piece[] {
    const newBoard = [...board];
    newBoard[move.to] = move.piece;
    newBoard[move.from] = new Piece(PieceType.None, PieceColor.None);
    return newBoard;
}