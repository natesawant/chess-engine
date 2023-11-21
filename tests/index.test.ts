import { evaluatePosition } from "../src/engine";

describe("testing index file", () => {
  test("empty string should result in zero", () => {
    expect(
      evaluatePosition(
        "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
      )
    ).toBe(0);
    expect(
      evaluatePosition(
        "rnbqkbnr/pppppppp/8/8/8/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1"
      )
    ).toBe(-1);
    expect(
      evaluatePosition(
        "rnbqkbnr/p1pppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
      )
    ).toBe(1);
    expect(evaluatePosition("rnbqkbnr/pppppppp/8/8/8/8/8/4K3 w kq - 0 1")).toBe(
      -39
    );
  });
});
