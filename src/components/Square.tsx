import styles from './Square.module.css';
import { Piece, PieceType } from '../types/chess';
import { Theme } from '../types/themes';

interface SquareProps {
    index: number;
    piece: Piece;
    selected: boolean;
    highlighted: boolean;
    legalMove: boolean;
    useImage: boolean;
    isInCheck: boolean;
    theme: Theme;
    onClick: () => void;
}

export default function Square(props: SquareProps) {
    const getLegalMoveStyle = (piece: Piece, legalMove: boolean, isInCheck: boolean) => {
        if (isInCheck) {
            return styles.inCheckHighlight;
        }
    
        if (legalMove) {
            return piece.type === PieceType.None ? styles.legalMoveHighlight : styles.legalMoveHighlightPiece;
        }
    
        return "";
    }
    
    const getBackgroundColor = (props: SquareProps): string => {
        // Deconstruct properties from props or state
        const isDark = isDarkSquare(props.index);
    
        // Determine the appropriate color based on the square's state
        let squareColor = isDark ? props.theme.darkSquareColor : props.theme.lightSquareColor;
        // if (isHovered) squareColor = isLightSquare ? colorPalette.lightSquareHover : colorPalette.darkSquareHover;
        if (props.selected) squareColor = props.theme.selectedColor;
        if (props.highlighted) squareColor = isDark ? props.theme.darkHighlightColor : props.theme.lightHighlightColor;
        //if (isPreviousMove && isHovered) squareColor = isLightSquare ? colorPalette.previousMoveLightSquareHover : colorPalette.previousMoveDarkSquareHover;
      
        return squareColor;
    
        //return <div style={{ backgroundColor: squareColor }}>...</div>;
    }
    
    const isDarkSquare = (index: number) => {
        const row = Math.floor(index / 8);
        const col = index % 8;
    
        return (row % 2 === col % 2);
    }

    const legalMoveStyle = `${styles.piece} ${getLegalMoveStyle(props.piece, props.legalMove, props.isInCheck)}`;

    const pieceRender = props.useImage && props.piece.type !== PieceType.None ? <img src={props.piece.getImage()} className={styles.pieceImage} /> : props.piece.text;
    
    return (
        <div className={styles.square} onClick={props.onClick} style={{backgroundColor: getBackgroundColor(props) }}>
            <div className={legalMoveStyle}>
                {pieceRender}
            </div>
        </div>
    )
}