package engine

import (
	"github.com/notnil/chess"
)

var pieceValues = map[chess.PieceType]int{
	chess.Pawn:   1,
	chess.Bishop: 3,
	chess.Knight: 3,
	chess.Rook:   5,
	chess.Queen:  9,
	chess.King:   100,
}

func EvaluatePosition(game *chess.Game) int {
	if game.Outcome() == chess.Draw {
		return 0
	} else if game.Outcome() == chess.WhiteWon {
		return 1000
	} else if game.Outcome() == chess.BlackWon {
		return -1000
	}

	evaluation := 0

	squareMap := game.Position().Board().SquareMap()

	for _, piece := range squareMap {

		var colorSign int

		if piece.Color() == chess.White {
			colorSign = 1
		} else {
			colorSign = -1
		}

		pieceValue := pieceValues[piece.Type()]
		evaluation += colorSign * pieceValue
	}

	return evaluation
}
