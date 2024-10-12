# Chess Engine
> A simple Go implementation of a chess engine

## Usage

Currently the chess engine is only available via the CLI. 
An API and GUI are planned for the future to allow easier usage of the engine.

```bash
go run .
```

## Algorithms

The base of any a lot of engines is the combination of Minimax with a Game State Tree. 
One player seeks to minimize their score while the other seeks to maximize their score.
In chess, white is generally maximizing while black minimizes. 
Each piece is assigned a piece value with winning the game being an infinite value.

Computers are able to search through and evaluate tens of thousands of moves, but there are over
10^40 possible chess positions despite it only being an 8x8 board. Optimization is the tricky
part in chess programming.

Using techniques such as using heuristics and alpha-beta pruning allows quicker searching through the
game tree. Alpha-beta pruning allows upper and lower bounds to be set, so you can rule out (or prune) other 
branches to reduce the search space.
