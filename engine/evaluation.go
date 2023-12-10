package engine

import (
	"github.com/notnil/chess"
)

var pieceValues = map[chess.PieceType]int{
	chess.Pawn:   100,
	chess.Bishop: 300,
	chess.Knight: 300,
	chess.Rook:   500,
	chess.Queen:  900,
	chess.King:   10000,
}

var arrCenterManhattanDistance = []int{
	-6, -7, -8, -9, -9, -8, -7, -6,
	-4, -5, -6, -7, -7, -6, -5, -4,
	-4, -3, -2, -2, -2, -2, -3, -4,
	-3, -2, -1, -0, -0, -1, -2, -3,
	3, 2, 1, 0, 0, 1, 2, 3,
	4, 3, 2, 2, 2, 2, 3, 4,
	4, 5, 6, 7, 7, 6, 5, 4,
	6, 7, 8, 9, 9, 8, 7, 6,
}

func EvaluatePosition(game *chess.Game) int {
	if len(game.EligibleDraws()) != 1 {
		return 0
	} else if game.Outcome() == chess.Draw {
		return 0
	} else if game.Outcome() == chess.WhiteWon {
		return 10000
	} else if game.Outcome() == chess.BlackWon {
		return -10000
	}

	evaluation := 0

	squareMap := game.Position().Board().SquareMap()

	for square, piece := range squareMap {

		var colorSign int

		if piece.Color() == chess.White {
			colorSign = 1
		} else {
			colorSign = -1
		}

		pieceValue := pieceValues[piece.Type()]

		evaluation += colorSign*pieceValue + arrCenterManhattanDistance[square]
	}

	return evaluation
}
