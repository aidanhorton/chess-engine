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
    White = 'w',
    Black = 'b',
    None = ''
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

    getImage() {
        return `/pieces/${this.type}${this.color.toString()}.png`;
    }
}

export class Move {
    from: number;
    to: number;
    piece: Piece;
    isKingCapture: boolean;

    constructor(from: number, to: number, piece: Piece, isKingCapture = false) {
        this.from = from;
        this.to = to;
        this.piece = piece;
        this.isKingCapture = isKingCapture;
    }
}