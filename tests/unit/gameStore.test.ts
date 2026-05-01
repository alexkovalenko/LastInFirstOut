import { beforeEach, describe, expect, it } from 'vitest';
import { useGameStore } from '../../src/state/gameStore';

const getState = () => useGameStore.getState();

describe('gameStore', () => {
  beforeEach(() => {
    getState().resetGame();
  });

  it('starts with player X and an empty board before the game begins', () => {
    expect(getState().currentPlayer).toBe('X');
    expect(getState().gameStarted).toBe(false);
    expect(getState().gameMode).toBe('two-player');
    expect(getState().aiDifficulty).toBe('easy');
    expect(getState().board.every((cell) => cell === null)).toBe(true);
  });

  it('starts a vs-computer game and advances to computer turn after X move', () => {
    getState().startGame('vs-computer', 'easy');
    expect(getState().gameStarted).toBe(true);
    expect(getState().currentPlayer).toBe('X');

    getState().placeMove(0);
    expect(getState().board[0]).toBe('X');
    expect(getState().currentPlayer).toBe('O');
  });

  it('does not allow the human player to place an O move in vs-computer mode', () => {
    getState().startGame('vs-computer', 'easy');
    getState().placeMove(0);
    getState().placeMove(2);

    expect(getState().board[2]).toBeNull();
    expect(getState().currentPlayer).toBe('O');
  });

  it('resets game mode, difficulty, and AI thinking state when restarting', () => {
    getState().startGame('vs-computer', 'medium');
    getState().placeMove(0);
    getState().resetGame();

    expect(getState().gameStarted).toBe(false);
    expect(getState().gameMode).toBe('two-player');
    expect(getState().aiDifficulty).toBe('easy');
    expect(getState().isComputerThinking).toBe(false);
  });

  it('removes the oldest move when placing a fourth mark', () => {
    getState().startGame('two-player', 'easy');
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
