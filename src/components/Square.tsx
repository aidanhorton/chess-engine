import styles from './Square.module.css';
import { Piece } from '../types/piece';

interface SquareProps {
    index: number;
    piece: Piece;
    selected: boolean;
    highlighted: boolean;
    onClick: () => void;
}

export default function Square({ index, piece, selected, highlighted, onClick }: SquareProps) {
    const squareStyle = `${styles.square} ${getSquareStyle(index, selected, highlighted)}`;
    const pieceString: string = piece;

    return (
        <span className={squareStyle} onClick={onClick}>{pieceString}</span>
    )
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