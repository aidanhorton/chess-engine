export enum Piece {
  WhitePawn = 'P',
  WhiteRook = 'R',
  WhiteKnight = 'N',
  WhiteBishop = 'B',
  WhiteQueen = 'Q',
  WhiteKing = 'K',
  BlackPawn = 'p',
  BlackRook = 'r',
  BlackKnight = 'n',
  BlackBishop = 'b',
  BlackQueen = 'q',
  BlackKing = 'k',
  None = ''
}

export function isWhite(piece: Piece): boolean {
  return piece === Piece.WhitePawn ||
    piece === Piece.WhiteRook ||
    piece === Piece.WhiteKnight ||
    piece === Piece.WhiteBishop ||
    piece === Piece.WhiteQueen ||
    piece === Piece.WhiteKing;
}

export function isBlack(piece: Piece): boolean {
  return !isWhite(piece) && piece !== Piece.None;
}

export function isPieceColour(piece: Piece, isPieceWhite: boolean): boolean {
  return (isPieceWhite && isWhite(piece)) || (!isPieceWhite && isBlack(piece));
}