package engine

import (
	"fmt"
	"math"

	"github.com/notnil/chess"
)

func BestMove(game *chess.Game, depth int) *chess.Move {
	value, bestGame := AlphaBetaPruning(game, depth, math.MinInt, math.MaxInt)

	//fmt.Println(bestGame.String())
	//fmt.Println(bestGame.MoveHistory())

	history := bestGame.Moves()

	bestMove := history[len(game.Moves())]

	fmt.Println(history)
	fmt.Printf("Best Move: %s, Evaluation: %d\n", bestMove, value)

	return bestMove
}
