package engine

import (
	"fmt"
	"testing"

	"github.com/notnil/chess"
)

func TestEvaluation(t *testing.T) {
	var tests = []struct {
		fen  string
		eval int
	}{
		{"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", 0},
		{"rnbqkbnr/pppppppp/8/8/8/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1", -1},
		{"rnbqkbnr/p1pppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", 1},
		{"rnbqkbnr/pppppppp/8/8/8/8/8/4K3 w kq - 0 1", -39},
	}

	for index, test := range tests {
		fen, err := chess.FEN(test.fen)
		if err != nil {
			t.Error("FEN has failed to load")
		}
		game := chess.NewGame(fen)

		t.Run(fmt.Sprintf("Test %d", index), func(t *testing.T) {
			actualEval := EvaluatePosition(game)
			if actualEval != test.eval {
				t.Errorf("Actual Eval: %d, Expected Eval: %d", actualEval, test.eval)
			}
		})
	}
}
