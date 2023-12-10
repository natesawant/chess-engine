package main

import (
	"fmt"
	"main/engine"

	"github.com/notnil/chess"
)

func main() {
	game := chess.NewGame()
	depth := 4

	for game.Outcome() == chess.NoOutcome {
		fmt.Printf("OUTCOME:%s", game.Outcome())
		fmt.Println(game.Position().Board().Draw())
		fmt.Println(game.String())

		if game.Position().Turn() == chess.White {
			bestMove := engine.BestMove(game, depth+1)
			game.Move(bestMove)
		} else {
			bestMove := engine.BestMove(game, depth-1)
			game.Move(bestMove)
		}
	}
	// print outcome and game PGN
	fmt.Printf("Game completed. %s by %s.\n", game.Outcome(), game.Method())
	fmt.Println(game.String())
}
