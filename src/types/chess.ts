export enum PieceType {
    Pawn = 'p',
    Rook = 'r',
    Knight = 'n',
    Bishop = 'b',
    Queen = 'q',
    King = 'k',
    None = ''
}

export enum PieceColor {
    White,
    Black,
    None
}

export class Piece {
    type: PieceType;
    color: PieceColor;
    text: string;

    constructor(type: PieceType, color: PieceColor) {
        this.type = type;
        this.color = color;

        this.text = color === PieceColor.White ? type : type.toUpperCase();
    }

    isBlackNonKing(): boolean {
        return this.color === PieceColor.Black && this.type !== PieceType.King;
    }

    isWhiteNonKing(): boolean {
        return this.color === PieceColor.White && this.type !== PieceType.King;
    }

    isSameColor(other: Piece): boolean {
        return this.color === other.color;
    }
}

export interface Move {
    from: number;
    to: number;
    piece: Piece;
}