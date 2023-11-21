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
    const moves = game.moves();
    var bestMove;
    var value;
    for (let move of moves) {
      const gameCopy = new Chess(game.fen());
      gameCopy.move(move);
      const moveValue = minimax(gameCopy, depth, -99999, 99999, game.turn());

      console.log(move + ": " + moveValue);

      if (game.turn() == WHITE) {
        if (value == undefined || moveValue >= value) {
          value = moveValue;
          bestMove = move;
        }
      } else {
        if (value == undefined || moveValue <= value) {
          value = moveValue;
          bestMove = move;
        }
      }
    }

    console.log(bestMove);
    game.move(bestMove);

    return {
      bestMove: bestMove,
      fen: game.fen(),
    };
  } else {
    throw new Error("Game is over!");
  }
}

// WHITE MAXIMIZES, BLACK MINIMIZES
export function minimax(
  game: Chess,
  depth = 5,
  alpha = -99999,
  beta = 99999,
  maximizingPlayer: Color
) {
  if (depth == 0 || game.isGameOver()) {
    return evaluatePosition(game.fen());
  }
  if (maximizingPlayer == WHITE) {
    var value = -99999;
    const moves = game.moves();
    for (let move of moves) {
      const nodeCopy = new Chess(game.fen());
      nodeCopy.move(move);
      value = Math.max(value, minimax(nodeCopy, depth - 1, alpha, beta, BLACK));
      alpha = Math.max(alpha, value);
      if (value >= beta) {
        break;
      }
    }
    return value;
  } else {
    var value = 99999;
    const moves = game.moves();
    for (let move of moves) {
      const nodeCopy = new Chess(game.fen());
      nodeCopy.move(move);
      value = Math.min(value, minimax(nodeCopy, depth - 1, alpha, beta, WHITE));
      beta = Math.min(beta, value);
      if (value <= alpha) {
        break;
      }
    }
    return value;
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
