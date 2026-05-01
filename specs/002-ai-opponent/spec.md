# Feature Specification: AI Opponent

**Feature Branch**: `002-ai-opponent`  
**Created**: 2026-05-01  
**Status**: Draft  
**Input**: User description: "Add computer opponent"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Play against a computer opponent (Priority: P1)

A player can select single-player mode and play against a computer that takes valid turns and obeys the same FIFO move rules as the human player.

**Why this priority**: This delivers the new game mode and allows solo play without changing the core board rules.

**Independent Test**: A tester can start a single-player game, make moves, and observe the computer making valid moves while respecting the three-active-mark limit.

**Acceptance Scenarios**:

1. **Given** the player chooses "Play vs Computer", **When** the game starts, **Then** the player is assigned X, the computer is assigned O, and the player moves first.
2. **Given** it is the computer's turn, **When** the computer selects a move, **Then** it places a mark on an empty cell and the turn returns to the player.
3. **Given** the computer already has three active marks, **When** it places a fourth mark, **Then** the oldest of its active marks is removed according to FIFO rules.

---

### User Story 2 - Computer opponent uses basic strategy (Priority: P2)

The computer should attempt to win when possible and block the player's immediate winning moves, making single-player play more engaging.

**Why this priority**: Basic strategy keeps the game challenging and avoids trivial single-player sessions.

**Independent Test**: A tester can arrange a near-win scenario and confirm the computer completes a winning line or blocks the player's win when appropriate.

**Acceptance Scenarios**:

1. **Given** the computer has two matching marks and can win on this turn, **When** it chooses its move, **Then** it places the third mark to win.
2. **Given** the player has two matching marks and can win on their next turn, **When** it is the computer's turn, **Then** it places a mark to block the player's winning line.
3. **Given** both a winning and blocking move exist, **When** the computer chooses, **Then** it prioritizes the winning move.

---

### User Story 3 - Select game mode and difficulty at start (Priority: P3)

Players can choose between two-player local mode and single-player vs. computer at the start of each game, with optional difficulty selection for computer opponents.

**Why this priority**: Mode selection enhances replayability; difficulty options allow personalized challenge levels.

**Independent Test**: A tester can select different game modes from a menu, start a game, and confirm the appropriate game flow activates (two-player alternation vs. computer responsiveness).

**Acceptance Scenarios**:

1. **Given** the app starts or a game ends, **When** a player views the game menu, **Then** they see options for "Two Players" and "Play vs Computer".
2. **Given** the player selects "Play vs Computer", **When** prompted for difficulty, **Then** they can choose "Easy" or "Medium" (or use a default).
3. **Given** a player selects a mode and difficulty, **When** they click "Start Game", **Then** the game initializes with the correct game flow and the first turn proceeds.
4. **Given** the player selects Medium difficulty, **When** the computer takes its turn, **Then** it uses strategy-based move selection rather than pure random choice.

---

### Edge Cases

- The computer must evaluate moves using current active marks; a future removal from the FIFO queue must not create an invalid predicted state.
- If the computer can win by removing its oldest mark and placing a new one, the move should still evaluate the visible board state after removal.
- The computer must never choose an occupied cell, even if the move would otherwise be strategic.
- If the player wins immediately after a computer move, the game must stop before the player’s next turn begins.
- Mode selection is set once per game; switching mid-game is not supported in this phase.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The app MUST offer a choice of "Two Players" and "Play vs Computer" before starting a new game.
- **FR-002**: In single-player mode, the player MUST be assigned the X mark and move first; the computer MUST be assigned O.
- **FR-003**: The computer MUST place marks only on currently empty board cells.
- **FR-004**: The computer MUST obey the existing FIFO rule: at most three active marks, removing the oldest mark when placing a fourth.
- **FR-005**: The computer MUST evaluate and complete winning three-in-a-row moves when available.
- **FR-006**: The computer MUST evaluate and block the player's immediate winning moves when no winning move is available.
- **FR-007**: The computer MUST prefer a winning move over a blocking move when both exist.
- **FR-008**: The computer’s move selection MUST complete within 2 seconds.
- **FR-009**: The app MUST support "Easy" difficulty (random move selection) and "Medium" difficulty (strategy-based).
- **FR-010**: The game MUST display the current game mode (Two Players or Computer Opponent) and, if applicable, the computer's difficulty level.
- **FR-011**: The win and loss conditions MUST apply identically to both single-player and local multiplayer modes.
- **FR-012**: The game MUST remain deterministic and testable; the computer's AI logic MUST not depend on non-seeded randomness.

### Key Entities *(include if feature involves data)*

- **GameMode**: Represents the selected mode, either `two-player` or `vs-computer`.
- **AIPlayer**: Represents the computer-controlled opponent, including mark assignment and move selection strategy.
- **AIMove**: Represents a candidate computer move, including its board position and strategic priority.
- **Difficulty**: Represents the AI complexity level if the feature is expanded in future phases.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A single-player game completes successfully with the computer taking every second turn.
- **SC-002**: The computer places a valid move within 2 seconds in every turn.
- **SC-003**: The computer wins or blocks a win in at least 80% of applicable Medium difficulty test scenarios.
- **SC-004**: The computer never places a mark on an occupied cell.
- **SC-005**: The UI clearly displays the active mode: local multiplayer or computer opponent.
- **SC-006**: The FIFO removal rule applies consistently to both human and computer marks.
- **SC-007**: Restarting the game resets the selected mode and board state for a fresh new game.

## Assumptions

- The AI opponent is implemented for local single-player mode only; no online or networked AI is required.
- The player is always assigned X and moves first in single-player mode.
- The computer opponent uses simple win/block logic; advanced strategy is reserved for future phases.
- Mode selection can be a simple menu or modal; persistent mode preferences are out of scope.
- A deterministic seed may be used in tests to verify the AI move ordering.
- The feature reuses the existing 3×3 board, FIFO rule, and win condition from the current game.
