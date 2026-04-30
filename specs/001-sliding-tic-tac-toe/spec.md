# Feature Specification: Sliding Tic Tac Toe

**Feature Branch**: `001-sliding-tic-tac-toe`  
**Created**: 2026-04-30  
**Status**: Draft  
**Input**: User description: "I want to create sliding tic tac toe game, we will name it Last-In, First-Out. Game rules: - Board: 3×3 - Each player has max 3 active moves - Moves are ordered (FIFO queue) - On 4th move → oldest removed - Win condition: standard 3-in-a-row For the first phase we will creae simple version, two players no PC. I want to have nice animation on remove."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Play a two-player sliding tic tac toe game (Priority: P1)

Two local players alternate turns placing their mark on a 3×3 board, and the game automatically removes the oldest active move for a player when they place a fourth marker.

**Why this priority**: This delivers the core game behavior and defines the unique Last-In, First-Out rules. It is the primary value of the feature and must be testable on its own.

**Independent Test**: A tester can play a full game between two people, verify that the board follows the FIFO removal rule, and confirm the win condition triggers correctly.

**Acceptance Scenarios**:

1. **Given** an empty 3×3 board, **When** Player 1 places a mark, **Then** the board shows that mark and it becomes Player 2’s turn.
2. **Given** Player 1 already has three active marks, **When** Player 1 places a fourth mark, **Then** the oldest of Player 1’s three marks is removed and the new mark appears in the chosen cell.
3. **Given** a player has three visible marks and places a fourth, **Then** the removal animation plays while the oldest mark disappears.

---

### User Story 2 - Win using standard three-in-a-row rules (Priority: P2)

Players can win by forming a horizontal, vertical, or diagonal line of three active marks after applying the sliding rules.

**Why this priority**: The win condition ensures the game remains recognizable and playable as tic tac toe under the new move queue rules.

**Independent Test**: A tester can reproduce a winning line and verify that the game ends immediately when three active marks line up.

**Acceptance Scenarios**:

1. **Given** the board has a possible winning alignment, **When** a player places a mark that completes three in a row, **Then** the game declares that player the winner and stops further moves.
2. **Given** a player’s oldest move is removed as part of a fourth placement, **When** the resulting board still contains three in a row for either player, **Then** the game evaluates win conditions using the current visible board state.

---

### User Story 3 - Restart the game after completion (Priority: P3)

Players can reset the board and start a new game, clearing all moves and replaying the sliding move behavior from scratch.

**Why this priority**: Restart is required for repeated play sessions and to keep the simple version user-friendly.

**Independent Test**: A tester can finish a game, press restart, and confirm the board resets to an empty 3×3 board with turn order reset.

**Acceptance Scenarios**:

1. **Given** a game has ended with a winner, **When** a player selects restart, **Then** the board clears and the next game starts from the initial state.
2. **Given** a game is in progress, **When** a player selects restart, **Then** all active moves are cleared and the turn returns to the initial starting player.

---

### Edge Cases

- When a player tries to place a mark on an occupied cell, the move is rejected and the current player retains their turn.
- When the oldest move is removed, the UI must animate the removal clearly so players understand the board change.
- When the board contains exactly three marks for a player, the fourth move must remove the correct oldest mark even if that mark is part of a potential win alignment.
- When a winning alignment is created simultaneously with removal, the game must evaluate the board after the removal has completed.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The game MUST use a 3×3 board.
- **FR-002**: The game MUST support two local players alternating turns.
- **FR-003**: Each player MUST be limited to at most three active marks on the board at any time.
- **FR-004**: Player moves MUST be ordered as a FIFO queue for that player.
- **FR-005**: When a player places a fourth mark, the oldest active mark for that player MUST be removed automatically before the new mark appears.
- **FR-006**: The game MUST declare a winner when a player achieves a standard three-in-a-row horizontally, vertically, or diagonally using current active marks.
- **FR-007**: The removal of an oldest mark MUST include a visible animation to show the tile being removed.
- **FR-008**: The first phase implementation MUST exclude AI or computer-controlled opponents.
- **FR-009**: The game MUST provide a restart option that clears the board and resets move order.
- **FR-010**: The UI MUST display whose turn it is and indicate the player’s active move queue status.

### Key Entities *(include if feature involves data)*

- **Player**: A local game participant with a mark type, current turn status, and ordered list of active moves.
- **Move**: A placement of a mark on a board cell, with a timestamp or queue position that determines removal order.
- **Board**: A 3×3 grid of cells representing the current visible game state.
- **Tile**: A board cell that may contain a player’s active mark or be empty.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A two-player game can be completed with the FIFO move rule and a standard three-in-a-row win condition.
- **SC-002**: No player has more than three active marks visible on the board after any valid move.
- **SC-003**: The oldest mark is removed and an animation begins within one second of placing a fourth mark.
- **SC-004**: The game clearly displays the current player and active move queue ordering during play.
- **SC-005**: Restart resets the board, clears move history, and returns the game to the initial state.
- **SC-006**: The game rejects an attempt to place a mark on an occupied cell and does not advance the turn.

## Assumptions

- This feature is scoped to a local two-player mode only; there is no AI opponent in phase one.
- Players alternate turns strictly; simultaneous or overlapping moves are not supported.
- Game state is not persisted across browser refreshes or sessions in this initial phase.
- The board and animation behavior must remain simple and smooth for the initial implementation.
- The UI should emphasize clarity of move order and removal behavior so the Last-In, First-Out rule is easy to understand.
