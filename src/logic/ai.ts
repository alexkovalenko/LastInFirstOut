import { applyMove, findWinningPlayer, getEmptyCellIndices } from './gameRules';
import type { GameMode, Difficulty, AIMove, Cell, PlayerId } from '../state/types';
import type { Move } from '../state/types';

const DEFAULT_SEED = 1337;

export function createSeededRandom(seed = DEFAULT_SEED) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;

  return {
    next: () => {
      value = (value * 16807) % 2147483647;
      return (value - 1) / 2147483646;
    }
  };
}

export function selectAIMove(
  board: Cell[],
  playerQueues: Record<PlayerId, Move[]>,
  difficulty: Difficulty,
  pendingRemoval: { cellIndex: number; player: PlayerId } | null,
  seed = DEFAULT_SEED
): AIMove {
  const allEmpty = getEmptyCellIndices(board);
  const emptyCells = pendingRemoval ? allEmpty.filter(index => index !== pendingRemoval.cellIndex) : allEmpty;
  const aiPlayer: PlayerId = 'O';
  const humanPlayer: PlayerId = 'X';

  if (emptyCells.length === 0) {
    // Fallback to first empty cell if somehow no valid moves
    return { cellIndex: allEmpty[0] || 0, priority: 0, type: 'fallback' };
  }

  if (difficulty === 'medium') {
    const winningMove = findWinningAIMove(board, playerQueues[aiPlayer], aiPlayer, emptyCells);
    if (winningMove !== null) {
      return { cellIndex: winningMove, priority: 3, type: 'win' };
    }

    const blockingMove = findBlockingAIMove(board, playerQueues[humanPlayer], humanPlayer, emptyCells);
    if (blockingMove !== null) {
      return { cellIndex: blockingMove, priority: 2, type: 'block' };
    }
  }

  const randomIndex = chooseRandomIndex(emptyCells, seed);
  return { cellIndex: emptyCells[randomIndex], priority: 1, type: 'random' };
}

function findWinningAIMove(board: Cell[], queue: Move[], player: PlayerId, emptyCells: number[]): number | null {
  for (const cellIndex of emptyCells) {
    const candidate = applyMove(board, queue, player, cellIndex);
    if (findWinningPlayer(candidate.board) === player) {
      return cellIndex;
    }
  }
  return null;
}

function findBlockingAIMove(board: Cell[], queue: Move[], player: PlayerId, emptyCells: number[]): number | null {
  for (const cellIndex of emptyCells) {
    const candidate = applyMove(board, queue, player, cellIndex);
    if (findWinningPlayer(candidate.board) === player) {
      return cellIndex;
    }
  }
  return null;
}

function chooseRandomIndex(emptyCells: number[], seed: number): number {
  if (emptyCells.length === 0) {
    return 0;
  }
  const rng = createSeededRandom(seed);
  return Math.floor(rng.next() * emptyCells.length);
}

export function isGameModeComputer(mode: GameMode): boolean {
  return mode === 'vs-computer';
}
