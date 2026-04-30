# Data Model: Sliding Tic Tac Toe

## Key Entities

- **Player**
  - `id`: `"X" | "O"`
  - `name`: string (optional display label)
  - `activeMoves`: `Move[]`

- **Move**
  - `player`: `PlayerId`
  - `cellIndex`: `0..8`
  - `queuePosition`: number or timestamp used to determine the removal order

- **Board**
  - `cells`: `Cell[]` with length 9
  - `Cell`: `null | PlayerId`

- **GameState**
  - `currentPlayer`: `PlayerId`
  - `board`: `Cell[]`
  - `playerQueues`: Record<`PlayerId`, `Move[]`>
  - `winner`: `PlayerId | null`
  - `isGameOver`: boolean
  - `removalAnimationTarget`: `number | null`

## State Slices

### Game store

- `currentPlayer`: tracks whose turn is next
- `board`: the visible 3×3 board state as a flat array
- `playerQueues`: the ordered move queues for each player
- `winner`: the current winner once three-in-a-row is detected
- `isGameOver`: prevents further moves after a win
- `removalAnimationTarget`: the board index of the oldest mark being removed for animation

### Actions

- `placeMove(cellIndex: number)`: validates the move, applies player queue rules, triggers removal animation if needed, and checks for a win
- `removeOldestMove(playerId: PlayerId)`: removes the oldest queued move from the board state and queue
- `resetGame()`: clears board, queues, winner, game over flag, and animation target
- `setAnimationComplete()`: clears the animation target once removal animation finishes

## Rule Model

- `maxActiveMovesPerPlayer = 3`
- `queueBehavior`: new moves append to the player queue; if the queue length exceeds 3, remove the oldest move before completing the board update
- `winCondition`: evaluate the current visible board state for any standard tic tac toe line of three matching marks

## Type Definitions Example

```ts
export type PlayerId = "X" | "O";
export type Cell = PlayerId | null;

export interface Move {
  player: PlayerId;
  cellIndex: number;
  queuePosition: number;
}

export interface GameState {
  currentPlayer: PlayerId;
  board: Cell[];
  playerQueues: Record<PlayerId, Move[]>;
  winner: PlayerId | null;
  isGameOver: boolean;
  removalAnimationTarget: number | null;
}
```

## Relationships

- A `Player` owns up to three active `Move` entries in their personal FIFO queue.
- The `Board` is derived from the active moves of both players.
- `GameState` is the single source of truth, with `board` and `playerQueues` representing the same current visible state from different perspectives.
