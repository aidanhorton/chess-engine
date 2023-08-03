import { useState } from 'react';
import Square from './Square';
import styles from './Board.module.css';
import { interpretFEN } from '../utils/fenInterpreter';
import * as ChessRules from '../utils/chessRules';
import { Piece, Move, PieceType, PieceColor } from '../types/chess';
import { calculateMove } from '../features/ai/chessAI';
import { Theme } from '../types/themes';

export default function Board({ imagesEnabled, playAI, theme }: { imagesEnabled: boolean, playAI: boolean, theme: Theme }) {
    const [board, setBoard] = useState<Piece[]>(interpretFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"));
    const [selectedPiece, setSelectedPiece] = useState<{ index: number, piece: Piece } | null>(null);
    const [lastMove, setLastMove] = useState<Move | null>(null);
    const [playerColor, setPlayerColor] = useState<PieceColor>(PieceColor.White);
    const [turnColor, setTurnColor] = useState<PieceColor>(PieceColor.White);

    const isCurrentColorInCheck = ChessRules.isInCheck(board, turnColor);

    let legalMoves: Move[] = selectedPiece
            ? ChessRules.getLegalMoves(board, selectedPiece.piece, selectedPiece.index)
            : [];
    
    // AI's turn.
    if (playAI && turnColor !== playerColor) {
        const aiMove = calculateMove(board, turnColor);

        if (aiMove) {
            performMove(aiMove);
        } else {
            console.log("Checkmate");
        }
    }

    const handleSquareClick = (index: number) => {
        if (playAI && turnColor !== playerColor) return;

        if (board[index].color === turnColor) {
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
                performMove(new Move(selectedPiece.index, index, selectedPiece.piece));
            }
        }
    }

    function performMove(move: Move) {
        const newBoard = [...board];
        newBoard[move.to] = move.piece;
        newBoard[move.from] = new Piece(PieceType.None, PieceColor.None);

        setBoard(newBoard);
        setLastMove(move)
        setSelectedPiece(null);
        setTurnColor(turnColor == PieceColor.White ? PieceColor.Black : PieceColor.White);
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
                    useImage={imagesEnabled}
                    isInCheck={isCurrentColorInCheck && piece.color === turnColor && piece.type === PieceType.King}
                    theme={theme}
                    key={index}
                />)}
        </div>
    )
}