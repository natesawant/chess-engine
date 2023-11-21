import { Chess, Color, WHITE, BLACK } from "chess.js";

const pieceValues = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
  k: 999,
};

export function returnGame() {
  const chess = new Chess();

  while (!chess.isGameOver()) {
    const moves = chess.moves();
    const move = moves[Math.floor(Math.random() * moves.length)];
    chess.move(move);
  }
  return chess.pgn();
}

export function nextBestMove(fen: string, depth = 1) {
  const game = new Chess(fen);

  if (!game.isGameOver()) {
    const [_, sequence] = minimax(game, [], depth, -9999, 9999);

    console.log("BEST SEQUENCE = " + sequence);

    game.move(sequence[0]);

    return {
      bestMove: sequence[0],
      fen: game.fen(),
    };
  } else {
    throw new Error("Game is over!");
  }
}

// WHITE MAXIMIZES, BLACK MINIMIZES
export function minimax(
  game: Chess,
  sequence: string[],
  depth = 5,
  alpha = Number.NEGATIVE_INFINITY,
  beta = Number.POSITIVE_INFINITY
): [number, string[]] {
  if (depth == 0 || game.isGameOver()) {
    return [evaluatePosition(game.fen()), sequence];
  }
  if (game.turn() == WHITE) {
    var value = Number.NEGATIVE_INFINITY;
    var bestSequence: string[];
    const moves = game.moves();
    for (let move of moves) {
      const nodeCopy = new Chess(game.fen());
      const sequenceCopy = [...sequence];

      nodeCopy.move(move);
      sequenceCopy.push(move);

      const [moveEval, moveSequence] = minimax(
        nodeCopy,
        sequenceCopy,
        depth - 1,
        alpha,
        beta
      );
      if (moveEval > value) {
        value = moveEval;
        bestSequence = moveSequence;
      }
      alpha = Math.max(alpha, value);
      if (value >= beta) {
        break;
      }
    }
    return [value, bestSequence];
  } else {
    var value = Number.POSITIVE_INFINITY;
    var bestSequence: string[];
    const moves = game.moves();
    for (let move of moves) {
      const nodeCopy = new Chess(game.fen());
      const sequenceCopy = [...sequence];

      nodeCopy.move(move);
      sequenceCopy.push(move);

      const [moveEval, moveSequence] = minimax(
        nodeCopy,
        sequenceCopy,
        depth - 1,
        alpha,
        beta
      );
      if (moveEval < value) {
        value = moveEval;
        bestSequence = moveSequence;
      }
      beta = Math.min(beta, value);
      if (value <= alpha) {
        break;
      }
    }
    return [value, bestSequence];
  }
}

export function evaluatePosition(fen: string) {
  const board = new Chess(fen).board();

  var evaluation = 0;

  board.forEach(function (row) {
    row.forEach(function (piece) {
      if (piece) {
        const pieceValue = pieceValues[piece.type];
        evaluation += piece.color == WHITE ? pieceValue : -pieceValue;
      }
    });
  });

  return evaluation;
}
