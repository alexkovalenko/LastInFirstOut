export type PlayerId = 'X' | 'O';
export type Cell = PlayerId | null;

export interface Move {
  player: PlayerId;
  cellIndex: number;
  queuePosition: number;
}

export interface PendingRemoval {
  cellIndex: number;
  player: PlayerId;
}

export interface GameState {
  currentPlayer: PlayerId;
  board: Cell[];
  playerQueues: Record<PlayerId, Move[]>;
  winner: PlayerId | null;
  isGameOver: boolean;
  pendingRemoval: PendingRemoval | null;
}
