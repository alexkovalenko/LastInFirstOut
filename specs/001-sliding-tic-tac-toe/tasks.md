# Tasks: Sliding Tic Tac Toe

**Input**: Design documents from `/specs/001-sliding-tic-tac-toe/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the frontend project and establish the basic React + TypeScript + Vite structure.

- [ ] T001 Create Vite React TypeScript scaffold with `package.json`, `tsconfig.json`, `vite.config.ts`, and `index.html`
- [ ] T002 Create `src/main.tsx`, `src/App.tsx`, and `src/styles.css`
- [ ] T003 Create initial source directories: `src/components/`, `src/state/`, `src/logic/`
- [ ] T004 Add Vite, React, ReactDOM, Zustand, Vitest, and React Testing Library dependencies in `package.json`
- [ ] T005 Configure TypeScript strict mode in `tsconfig.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build the core game model, global state store, and reusable UI components needed by all user stories.

- [ ] T006 [P] Create typed game entities in `src/state/types.ts`
- [ ] T007 [P] Implement pure game rules and FIFO move queue logic in `src/logic/gameRules.ts`
- [ ] T008 [P] Implement the Zustand game store in `src/state/gameStore.ts`
- [ ] T009 Create board rendering components: `src/components/Board.tsx` and `src/components/Cell.tsx`
- [ ] T010 Create UI support components: `src/components/GameStatus.tsx` and `src/components/AnimatedMarker.tsx`
- [ ] T011 [P] Add unit tests for game rule functions in `tests/unit/gameRules.test.ts`
- [ ] T012 [P] Add unit tests for game store actions in `tests/unit/gameStore.test.ts`

---

## Phase 3: User Story 1 - Two-player sliding tic tac toe gameplay (Priority: P1)

**Goal**: Enable two local players to play the 3×3 sliding tic tac toe game with FIFO removal behavior.

**Independent Test**: Verify that two players alternate turns, valid board cells accept marks, and placing a fourth mark removes the oldest active mark for that player.

- [ ] T013 [US1] Implement cell click handling and move placement in `src/components/Board.tsx`
- [ ] T014 [US1] Wire game store actions into `src/App.tsx` and `src/components/Board.tsx`
- [ ] T015 [US1] Display current player turn and active move counts in `src/components/GameStatus.tsx`
- [ ] T016 [US1] Prevent placement on occupied cells in `src/state/gameStore.ts`
- [ ] T017 [P] [US1] Add integration tests for player move placement and FIFO removal in `tests/ui/App.test.tsx`

---

## Phase 4: User Story 2 - Standard three-in-a-row win condition (Priority: P2)

**Goal**: Detect and declare a winner when the current visible board contains three marks in a row.

**Independent Test**: Verify that the game ends immediately when a player forms a horizontal, vertical, or diagonal line of three active marks.

- [ ] T018 [US2] Implement win detection logic in `src/logic/gameRules.ts`
- [ ] T019 [US2] Update `src/state/gameStore.ts` to set `winner` and `isGameOver` when a win is detected
- [ ] T020 [US2] Show winner and game over status in `src/components/GameStatus.tsx`
- [ ] T021 [P] [US2] Add unit tests for win condition evaluation in `tests/unit/gameRules.test.ts`

---

## Phase 5: User Story 3 - Restart the game after completion (Priority: P3)

**Goal**: Allow players to reset the game board and play again from the initial state.

**Independent Test**: Verify that clicking restart clears the board, resets state, and begins a new game.

- [ ] T022 [US3] Implement `resetGame()` action in `src/state/gameStore.ts`
- [ ] T023 [US3] Add a restart button and handler in `src/components/GameStatus.tsx`
- [ ] T024 [P] [US3] Add integration test for restart behavior in `tests/ui/App.test.tsx`

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Add the removal animation, finalize deployment configuration, and clean up code.

- [ ] T025 [P] Implement animated removal for the oldest mark in `src/components/AnimatedMarker.tsx` and `src/components/Cell.tsx`
- [ ] T026 [P] Update `specs/001-sliding-tic-tac-toe/quickstart.md` with local and Vercel deployment instructions
- [ ] T027 [P] Add or update root `README.md` to describe running the game locally and deploying to Vercel
- [ ] T028 [ ] Refactor code for consistency and TypeScript strictness across `src/`
- [ ] T029 [P] Run `npm run build` and verify local preview with `npm run preview`

---

## Dependencies & Execution Order

- **Phase 1** can start immediately.
- **Phase 2** depends on Phase 1 completion and blocks all story implementation.
- **Phase 3** depends on Phase 2 but can proceed independently once foundational state and UI components exist.
- **Phase 4** depends on Phase 2 and can proceed after or alongside Phase 3 once the board and store are implemented.
- **Phase 5** depends on Phase 2 and the basic game loop from Phase 3.
- **Phase 6** depends on the completion of all user stories and finalizes polish, animation, and deployment readiness.

### Parallel opportunities

- `T006`, `T007`, `T008`, `T010`, `T011`, and `T012` can run in parallel during Phase 2.
- `T017`, `T021`, and `T024` can be developed in parallel with story implementation if team capacity allows.
- `T025`, `T026`, `T027`, and `T029` can run concurrently as final polish tasks.
