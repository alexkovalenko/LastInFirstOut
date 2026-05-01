export type PlayerId = 'X' | 'O';
export type Cell = PlayerId | null;
export type GameMode = 'two-player' | 'vs-computer';
export type Difficulty = 'easy' | 'medium';

export interface Move {
  player: PlayerId;
  cellIndex: number;
  queuePosition: number;
}

export interface PendingRemoval {
  cellIndex: number;
  player: PlayerId;
}

export interface AIMove {
  cellIndex: number;
  priority: number;
  type: 'win' | 'block' | 'random' | 'fallback';
}

export interface GameState {
  currentPlayer: PlayerId;
  board: Cell[];
  playerQueues: Record<PlayerId, Move[]>;
  winner: PlayerId | null;
  isGameOver: boolean;
  pendingRemoval: PendingRemoval | null;
  gameMode: GameMode;
  aiDifficulty: Difficulty;
  isComputerThinking: boolean;
  gameStarted: boolean;
}
