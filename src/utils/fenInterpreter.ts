import { Piece, PieceType, PieceColor } from '../types/chess';

export function interpretFEN(fen: string): Piece[] {
    const board: Piece[] = [];
    const fenRows = fen.split(' ')[0].split('/');

    for (const fenRow of fenRows) {
        for (const char of fenRow) {
            if (char >= '1' && char <= '8') {
                // It's a number indicating empty squares
                const count = parseInt(char, 10);
                for (let j = 0; j < count; j++) {
                    board.push(new Piece(PieceType.None, PieceColor.None));
                }
            } else {
                // It's a letter indicating a piece
                const type = char.toLowerCase() as PieceType;
                const color = char === char.toLowerCase() ? PieceColor.Black : PieceColor.White;
                board.push(new Piece(type, color));
            }
        }
    }

    return board;
}