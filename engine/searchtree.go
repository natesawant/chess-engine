package engine

import (
	"math"

	"github.com/notnil/chess"
)

func AlphaBetaPruning(game *chess.Game, depth int, alpha int, beta int) (int, *chess.Game) {
	if depth == 0 || game.Outcome() != chess.NoOutcome {
		return EvaluatePosition(game), game
	}

	color := game.Position().Turn()

	if color == chess.White {
		value := math.MinInt
		var bestGame *chess.Game

		for _, move := range game.ValidMoves() {
			gameChild := game.Clone()

			gameChild.Move(move)
			childEval, bestChild := AlphaBetaPruning(gameChild, depth-1, alpha, beta)

			if childEval > value {
				value = childEval
				bestGame = bestChild
			}

			alpha = int(math.Max(float64(alpha), float64(value)))

			if value >= beta {
				break
			}
		}

		return value, bestGame
	} else {
		value := math.MaxInt
		var bestGame *chess.Game

		for _, move := range game.ValidMoves() {
			gameChild := game.Clone()

			gameChild.Move(move)
			childEval, bestChild := AlphaBetaPruning(gameChild, depth-1, alpha, beta)

			if childEval < value {
				value = childEval
				bestGame = bestChild
			}

			beta = int(math.Min(float64(beta), float64(value)))

			if value <= alpha {
				break
			}
		}

		return value, bestGame
	}
}
