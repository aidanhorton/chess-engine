import styles from './Square.module.css';
import { Piece } from '../types/chess';

interface SquareProps {
    index: number;
    piece: Piece;
    selected: boolean;
    highlighted: boolean;
    legalMove: boolean;
    onClick: () => void;
}

export default function Square({ index, piece, selected, highlighted, legalMove, onClick }: SquareProps) {
    const squareStyle = `${styles.square} ${getSquareStyle(index, selected, highlighted)}`;
    const legalMoveStyle = getLegalMoveStyle(piece, legalMove);
    const pieceString: string = piece;
    
    return (
        <div className={squareStyle} onClick={onClick}>
            <div className={legalMoveStyle}>
                {pieceString}
            </div>
        </div>
    )
}

function getLegalMoveStyle(piece: Piece, legalMove: boolean) {
    if (legalMove) {
        return piece === Piece.None ? styles.legalMoveHighlight : styles.legalMoveHighlightPiece;
    }

    return "";
}

function getSquareStyle(index: number, selected: boolean, highlighted: boolean) {
    const darkSquare = isDarkSquare(index);
    
    if (selected) {
        return darkSquare ? styles.darkSelectedSquare : styles.selectedSquare;
    }
    if (highlighted) {
        return darkSquare ? styles.darkHighlightedSquare : styles.highlightedSquare;
    }

    return darkSquare ? styles.secondarySquare : "";
}

function isDarkSquare(index: number) {
    const row = Math.floor(index / 8);
    const col = index % 8;

    return (row % 2 === col % 2);
}