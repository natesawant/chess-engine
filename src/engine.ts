import { Chess, Color, PAWN, BISHOP, KNIGHT, ROOK, QUEEN, KING, WHITE, BLACK } from 'chess.js'

const pieceValues = {
    "p": 1,
    "n": 3,
    "b": 3,
    "r": 5,
    "q": 9,
    "k": 9999,
}

export function returnGame() {
    const chess = new Chess()

    while (!chess.isGameOver()) {
        const moves = chess.moves()
        const move = moves[Math.floor(Math.random() * moves.length)]
        chess.move(move)
    }
    return chess.pgn()
}

export function nextBestMove(fen: string) {
    const game = new Chess(fen);

    if (!game.isGameOver()) {
        const moves = game.moves()
        var bestMove;
        var value;
        moves.forEach(function (move) {
            const moveValue = minimax(game, 1, game.turn())
            if (game.turn() == WHITE) {
                if (moveValue >= value) {
                    value = moveValue
                    bestMove = move
                }
            } else {
                if (moveValue <= value) {
                    value = moveValue
                    bestMove = move
                }
            }
        })

        game.move(bestMove)

        return {
            bestMove: bestMove,
            fen: game.fen()
        };
    } else {
        throw new Error('Game is over!');
    }
}

// function minimax(node, depth, maximizingPlayer) is
export function minimax(game: Chess, depth: number, maximizingPlayer: Color) {
    //     if depth = 0 or node is a terminal node then
    if (depth == 0 || game.isGameOver()) {
        //         return the heuristic value of node
        return evaluatePosition(game);
    }
    //     if maximizingPlayer then
    if (maximizingPlayer == WHITE) {
        //         value := −∞
        var value = -9999
        //         for each child of node do
        const moves = game.moves()
        moves.forEach(function (move) {
            //             value := max(value, minimax(child, depth − 1, FALSE))
            const nodeCopy = game
            game.move(move)
            value = Math.max(value, minimax(nodeCopy, depth - 1, BLACK))
        })
        //         return value
        return value
    }
    //     else (* minimizing player *)
    else {
        //         value := +∞
        var value = 9999
        //         for each child of node do
        const moves = game.moves()
        moves.forEach(function (move) {
            //             value := min(value, minimax(child, depth − 1, TRUE))
            const nodeCopy = game
            game.move(move)
            value = Math.min(value, minimax(nodeCopy, depth - 1, WHITE))
        })
        //         return value
        return value
    }
}

export function evaluatePosition(game: Chess) {
    const board = game.board();

    var evaluation = 0;

    board.forEach(function (row) {
        row.forEach(function (piece) {
            if (piece) {
                const pieceValue = pieceValues[piece.type]
                evaluation += piece.color == WHITE ? pieceValue : -pieceValue
            }
        })
    })

    return evaluation;
}