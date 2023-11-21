package main

import (
	"fmt"
	"main/engine"
	"math/rand"

	"github.com/notnil/chess"
)

func main() {
	game := chess.NewGame()
	// generate moves until game is over

	for game.Outcome() == chess.NoOutcome {
		fmt.Printf("OUTCOME:%s", game.Outcome())
		fmt.Println(game.Position().Board().Draw())

		if game.Position().Turn() == chess.White {
			bestMove := engine.BestMove(game, 4)
			game.Move(bestMove)
		} else {
			// select a random move
			moves := game.ValidMoves()
			move := moves[rand.Intn(len(moves))]
			game.Move(move)
		}
	}
	// print outcome and game PGN
	fmt.Printf("Game completed. %s by %s.\n", game.Outcome(), game.Method())
	fmt.Println(game.String())
}
