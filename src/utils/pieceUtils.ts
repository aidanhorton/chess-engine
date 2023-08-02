import { Piece } from "../types/chess";

export function isWhite(piece: Piece): boolean {
    return piece === Piece.WhitePawn ||
        piece === Piece.WhiteRook ||
        piece === Piece.WhiteKnight ||
        piece === Piece.WhiteBishop ||
        piece === Piece.WhiteQueen ||
        piece === Piece.WhiteKing;
}
  
export function isWhiteNonKing(piece: Piece): boolean {
    return isWhite(piece) && piece !== Piece.WhiteKing;
}

export function isBlack(piece: Piece): boolean {
    return !isWhite(piece) && piece !== Piece.None;
}

export function isBlackNonKing(piece: Piece): boolean {
    return isBlack(piece) && piece !== Piece.BlackKing;
}

export function isPieceColour(piece: Piece, isPieceWhite: boolean): boolean {
    return (isPieceWhite && isWhite(piece)) || (!isPieceWhite && isBlack(piece));
}