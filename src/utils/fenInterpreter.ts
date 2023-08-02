import { Piece } from '../types/chess';

export function interpretFEN(fen: string): Piece[] {
  const boardFen = fen.split(' ')[0];
  let pieces: Piece[] = [];
  
  for (const char of boardFen) {
    if (char === '/') continue;
  
    if (isNaN(Number(char))) {
      pieces.push(mapFenCharToPiece(char));
    } else {
      pieces = pieces.concat(new Array(Number(char)).fill(Piece.None));
    }
  }
  
  return pieces;
}

function mapFenCharToPiece(fenChar: string): Piece {
  switch (fenChar) {
    case 'P': return Piece.WhitePawn;
    case 'R': return Piece.WhiteRook;
    case 'N': return Piece.WhiteKnight;
    case 'B': return Piece.WhiteBishop;
    case 'Q': return Piece.WhiteQueen;
    case 'K': return Piece.WhiteKing;
    case 'p': return Piece.BlackPawn;
    case 'r': return Piece.BlackRook;
    case 'n': return Piece.BlackKnight;
    case 'b': return Piece.BlackBishop;
    case 'q': return Piece.BlackQueen;
    case 'k': return Piece.BlackKing;
    default: return Piece.None;
  }
}