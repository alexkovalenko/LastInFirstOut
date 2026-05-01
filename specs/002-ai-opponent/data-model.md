# Data Model: AI Opponent

## Key Entities

- **GameMode**
  - Values: `"two-player"` or `"vs-computer"`
  - Determines whether the second turn is taken by a human or the computer.

- **AIPlayer**
  - `player`: `"X" | "O"`
  - `mode`: `"easy" | "medium"`
  - `evaluateMove`: selects a valid board cell according to difficulty rules.

- **AIMove**
  - `cellIndex`: `0..8`
  - `priority`: numeric score for move desirability
  - `type`: `"win" | "block" | "random"`

- **GameState**
  - `currentPlayer`: `"X" | "O"`
  - `gameMode`: `GameMode`
  - `aiDifficulty`: `"easy" | "medium"`
  - `board`: `Cell[]`
  - `playerQueues`: `Record<PlayerId, Move[]>`
  - `winner`: `PlayerId | null`
  - `isGameOver`: boolean
  - `pendingRemoval`: `{ cellIndex: number; player: PlayerId } | null`
  - `isComputerThinking`: boolean

## State Slices

### Game settings

- `gameMode`: controls whether the game is single-player or two-player.
- `aiDifficulty`: controls how the computer opponent selects moves.
- `isComputerThinking`: indicates the computer is about to place a move.

### Gameplay state

- `currentPlayer`: whose turn is active.
- `board`: visible board state as a flat 9-cell array.
- `playerQueues`: FIFO queues for each player.
- `winner`: the game winner when detected.
- `isGameOver`: whether the game has ended.
- `pendingRemoval`: the oldest mark being removed for animation.

## Type Definitions Example

```ts
export type GameMode = 'two-player' | 'vs-computer';
export type Difficulty = 'easy' | 'medium';

export interface AIMove {
  cellIndex: number;
  priority: number;
  type: 'win' | 'block' | 'random';
}

export interface GameState {
  currentPlayer: PlayerId;
  gameMode: GameMode;
  aiDifficulty: Difficulty;
  board: Cell[];
  playerQueues: Record<PlayerId, Move[]>;
  winner: PlayerId | null;
  isGameOver: boolean;
  pendingRemoval: PendingRemoval | null;
  isComputerThinking: boolean;
}
```

## Relationships

- `GameMode` determines whether the `AIPlayer` takes the second turn.
- The AI evaluates the visible `Board` after FIFO queue updates to compute winning or blocking moves.
- `AIMove` is an internal decision object used by the AI engine to select the best valid move.
- `GameState` remains the single source of truth for both UI rendering and AI evaluation.
