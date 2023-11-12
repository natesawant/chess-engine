import { Chess } from 'chess.js'

export function returnGame() {
    const chess = new Chess()

    while (!chess.isGameOver()) {
        const moves = chess.moves()
        const move = moves[Math.floor(Math.random() * moves.length)]
        chess.move(move)
    }
    return chess.pgn()
}