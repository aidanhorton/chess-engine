import { useState } from 'react';
import Square from './Square';
import styles from './Board.module.css';
import { interpretFEN } from '../utils/fenInterpreter';
import * as ChessRules from '../utils/chessRules';
import { Piece, Move, PieceType, PieceColor } from '../types/chess';

export default function Board() {
    const [board, setBoard] = useState<Piece[]>(interpretFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"));
    const [selectedPiece, setSelectedPiece] = useState<{ index: number, piece: Piece } | null>(null);
    const [lastMove, setLastMove] = useState<Move | null>(null);
    const [playerColor, setPlayerColor] = useState<PieceColor>(PieceColor.White);

    const legalMoves: Move[] = selectedPiece ? ChessRules.getLegalMoves(board, selectedPiece.piece, selectedPiece.index) : [];

    const handleSquareClick = (index: number) => {
        if (board[index].color === playerColor) {
            if (index === selectedPiece?.index) {
                setSelectedPiece(null);
            } else {
                setSelectedPiece({ index, piece: board[index] });
            }
        } else if (selectedPiece) {
            if (!legalMoves.some(move => move.to === index)) {
                setSelectedPiece(null);
            } else {
                // Player has selected a legal move.
                const newBoard = [...board];
                newBoard[index] = selectedPiece.piece;
                newBoard[selectedPiece.index] = new Piece(PieceType.None, PieceColor.None);

                setBoard(newBoard);
                setLastMove({ from: selectedPiece.index, to: index, piece: selectedPiece.piece })
                setSelectedPiece(null);
            }
        }
    }

    return (
        <div className={styles.board}>
            {board.map((piece, index) => 
                <Square
                    index={index}
                    piece={piece}
                    selected={selectedPiece?.index === index}
                    highlighted={lastMove?.from === index || lastMove?.to === index}
                    legalMove={legalMoves.some(move => move.to === index)}
                    onClick={() => handleSquareClick(index)}
                    key={index}
                />)}
        </div>
    )
}