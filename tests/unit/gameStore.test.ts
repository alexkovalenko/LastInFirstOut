import { beforeEach, describe, expect, it } from 'vitest';
import { useGameStore } from '../../src/state/gameStore';

const getState = () => useGameStore.getState();

describe('gameStore', () => {
  beforeEach(() => {
    getState().resetGame();
  });

  it('starts with player X and an empty board', () => {
    expect(getState().currentPlayer).toBe('X');
    expect(getState().board.every((cell) => cell === null)).toBe(true);
  });

  it('places a move and toggles the current player', () => {
    getState().placeMove(0);
    expect(getState().board[0]).toBe('X');
    expect(getState().currentPlayer).toBe('O');
  });

  it('does not place a move on an occupied cell', () => {
    getState().placeMove(0);
    getState().placeMove(0);
    expect(getState().currentPlayer).toBe('O');
    expect(getState().board[0]).toBe('X');
  });

  it('removes the oldest move when placing a fourth mark', () => {
    getState().placeMove(0);
    getState().placeMove(1); // O
    getState().placeMove(2); // X
    getState().placeMove(3); // O
    getState().placeMove(4); // X
    getState().placeMove(5); // O
    getState().placeMove(6); // X  -> oldest X removed from 0

    expect(getState().board[0]).toBeNull();
    expect(getState().board[6]).toBe('X');
    expect(getState().playerQueues.X).toHaveLength(3);
  });
});
