import { describe, expect, it } from 'vitest';
import { applyMove, findWinningPlayer } from '../../src/logic/gameRules';

const emptyBoard: Array<null> = Array(9).fill(null);

describe('gameRules', () => {
  it('removes the oldest move when a player places a fourth mark', () => {
    const player = 'X';
    const moves = [
      { player, cellIndex: 0, queuePosition: 1 },
      { player, cellIndex: 1, queuePosition: 2 },
      { player, cellIndex: 2, queuePosition: 3 }
    ];

    const board = [player, player, player, null, null, null, null, null, null] as const;
    const result = applyMove(board as any, moves as any, player, 4);

    expect(result.removal).toEqual({ cellIndex: 0, player });
    expect(result.queue).toHaveLength(3);
    expect(result.queue[0].cellIndex).toBe(1);
    expect(result.queue[1].cellIndex).toBe(2);
    expect(result.queue[2].cellIndex).toBe(4);
    expect(result.board[0]).toBeNull();
    expect(result.board[4]).toBe(player);
  });

  it('detects a horizontal winning line', () => {
    const board = ['X', 'X', 'X', null, null, null, null, null, null];
    expect(findWinningPlayer(board as any)).toBe('X');
  });

  it('detects a diagonal winning line', () => {
    const board = ['O', null, null, null, 'O', null, null, null, 'O'];
    expect(findWinningPlayer(board as any)).toBe('O');
  });

  it('returns null when there is no win', () => {
    expect(findWinningPlayer([...emptyBoard] as any)).toBeNull();
  });
});
