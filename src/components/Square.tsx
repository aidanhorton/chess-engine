import styles from './Square.module.css';
import { Piece, PieceType } from '../types/chess';

interface SquareProps {
    index: number;
    piece: Piece;
    selected: boolean;
    highlighted: boolean;
    legalMove: boolean;
    useImage: boolean;
    isInCheck: boolean;
    onClick: () => void;
}

export default function Square({ index, piece, selected, highlighted, legalMove, useImage, isInCheck, onClick }: SquareProps) {
    const squareStyle = `${styles.square} ${getSquareStyle(index, selected, highlighted)}`;
    const legalMoveStyle = `${styles.piece} ${getLegalMoveStyle(piece, legalMove, isInCheck)}`;

    const pieceRender = useImage && piece.type !== PieceType.None ? <img src={piece.getImage()} className={styles.pieceImage} /> : piece.text;
    
    return (
        <div className={squareStyle} onClick={onClick}>
            <div className={legalMoveStyle}>
                {pieceRender}
            </div>
        </div>
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

    return darkSquare ? styles.darkSquare : "";
}

function getLegalMoveStyle(piece: Piece, legalMove: boolean, isInCheck: boolean) {
    if (isInCheck) {
        return styles.inCheckHighlight;
    }

    if (legalMove) {
        return piece.type === PieceType.None ? styles.legalMoveHighlight : styles.legalMoveHighlightPiece;
    }

    return "";
}

function isDarkSquare(index: number) {
    const row = Math.floor(index / 8);
    const col = index % 8;

    return (row % 2 === col % 2);
}