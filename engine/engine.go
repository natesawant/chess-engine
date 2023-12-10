package engine

import (
	"fmt"
	"math"

	"github.com/notnil/chess"
)

func BestMove(game *chess.Game, depth int) *chess.Move {
	value, bestGame := AlphaBetaPruning(game, depth, math.MinInt, math.MaxInt)

	history := bestGame.Moves()

	bestMove := history[len(game.Moves())]

	fmt.Println(history)
	fmt.Printf("Best Move: %s, Evaluation: %d\n", bestMove, value)

	return bestMove
}
