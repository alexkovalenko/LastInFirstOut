import type { Cell, Move, PlayerId } from '../state/types';

const WIN_PATTERNS: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export function getInitialBoard(): Cell[] {
  return Array(9).fill(null);
}

export function getNextPlayer(current: PlayerId): PlayerId {
  return current === 'X' ? 'O' : 'X';
}

export function createMove(player: PlayerId, cellIndex: number, queuePosition = Date.now()): Move {
  return { player, cellIndex, queuePosition };
}

export function getEmptyCellIndices(board: Cell[]): number[] {
  return board
    .map((cell, index) => (cell === null ? index : -1))
    .filter((index) => index >= 0);
}

export function isCellOccupied(board: Cell[], index: number): boolean {
  return board[index] !== null;
}

export function applyMove(
  board: Cell[],
  queue: Move[],
  player: PlayerId,
  cellIndex: number
): { board: Cell[]; queue: Move[]; removal: { cellIndex: number; player: PlayerId } | null } {
  const newBoard = board.slice();
  const newQueue = queue.slice();
  let removal = null;

  if (newQueue.length >= 3) {
    const oldest = newQueue.shift();
    if (oldest) {
      newBoard[oldest.cellIndex] = null;
      removal = { cellIndex: oldest.cellIndex, player: oldest.player };
    }
  }

  newQueue.push(createMove(player, cellIndex));
  newBoard[cellIndex] = player;

  return { board: newBoard, queue: newQueue, removal };
}

export function findWinningPlayer(board: Cell[]): PlayerId | null {
  for (const pattern of WIN_PATTERNS) {
    const [a, b, c] = pattern;
    const first = board[a];
    if (first && first === board[b] && first === board[c]) {
      return first;
    }
  }

  return null;
}
