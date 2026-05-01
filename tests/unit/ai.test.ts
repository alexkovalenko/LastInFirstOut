import { describe, expect, it } from 'vitest';
import { selectAIMove, createSeededRandom } from '../../src/logic/ai';
import { getInitialBoard } from '../../src/logic/gameRules';

const emptyBoard = getInitialBoard();
const emptyQueues = { X: [], O: [] };

describe('AI logic', () => {
  it('selects a valid empty cell for easy difficulty', () => {
    const move = selectAIMove(emptyBoard, emptyQueues as any, 'easy', null, 42);
    expect(move.cellIndex).toBeGreaterThanOrEqual(0);
    expect(move.cellIndex).toBeLessThan(9);
    expect(move.type).toBe('random');
  });

  it('selects a winning move when available on medium difficulty', () => {
    const board = ['O', 'O', null, null, 'X', null, null, null, 'X'] as const;
    const queues = {
      X: [
        { player: 'X', cellIndex: 4, queuePosition: 1 },
        { player: 'X', cellIndex: 8, queuePosition: 2 }
      ],
      O: [
        { player: 'O', cellIndex: 0, queuePosition: 3 },
        { player: 'O', cellIndex: 1, queuePosition: 4 }
      ]
    };

    const move = selectAIMove(board as any, queues as any, 'medium', null, 7);
    expect(move.type).toBe('win');
    expect(move.cellIndex).toBe(2);
  });

  it('selects a blocking move when the player can win next turn', () => {
    const board = ['X', 'X', null, null, 'O', null, null, null, null] as const;
    const queues = {
      X: [
        { player: 'X', cellIndex: 0, queuePosition: 1 },
        { player: 'X', cellIndex: 1, queuePosition: 2 }
      ],
      O: [
        { player: 'O', cellIndex: 4, queuePosition: 3 }
      ]
    };

    const move = selectAIMove(board as any, queues as any, 'medium', null, 11);
    expect(move.type).toBe('block');
    expect(move.cellIndex).toBe(2);
  });

  it('produces deterministic random numbers with seeded random helper', () => {
    const first = createSeededRandom(123);
    const second = createSeededRandom(123);

    expect(first.next()).toBe(second.next());
    expect(first.next()).toBe(second.next());
  });
});
