import { useState } from 'react';
import Square from './Square';
import styles from './Board.module.css';
import { interpretFEN } from '../utils/fenInterpreter';
import { Piece, isWhite, isBlack, isPieceColour } from '../types/piece';
import { Move } from '../types/move';

export default function Board() {
    const [board, setBoard] = useState<Piece[]>(interpretFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"));
    const [selectedPiece, setSelectedPiece] = useState<{ index: number, piece: Piece } | null>(null);
    const [lastMove, setLastMove] = useState<Move | null>(null);
    const [isPlayerWhite, setIsPlayerWhite] = useState<boolean>(true);

    const handleSquareClick = (index: number) => {
        if (selectedPiece) {
            if (index === selectedPiece.index) {
                setSelectedPiece(null);
            } else if (isPieceColour(board[index], isPlayerWhite)) {
                setSelectedPiece({ index, piece: board[index] });
            } else {
                const newBoard = [...board];
                newBoard[index] = selectedPiece.piece;
                newBoard[selectedPiece.index] = Piece.None;
                setBoard(newBoard);
                setLastMove({ from: selectedPiece.index, to: index, piece: selectedPiece.piece })
                setSelectedPiece(null);
            }
        } else if (board[index] !== Piece.None && isPieceColour(board[index], isPlayerWhite)) {
            setSelectedPiece({ index, piece: board[index] });
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
                    onClick={() => handleSquareClick(index)}
                    key={index}
                />)}
        </div>
    )
}