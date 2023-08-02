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

export interface Move {
    from: number;
    to: number;
    piece: Piece;
}