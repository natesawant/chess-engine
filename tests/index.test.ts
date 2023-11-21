import { evaluatePosition } from '../src/engine';
import { Chess } from 'chess.js';

describe('testing index file', () => {
    test('empty string should result in zero', () => {
        expect(evaluatePosition(new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"))).toBe(0);
    });
});