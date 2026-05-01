# Tasks: AI Opponent

**Input**: Design documents from `/specs/002-ai-opponent/`
**Feature Directory**: `/workspaces/LastInFirstOut/specs/002-ai-opponent/`

## Phase 1: Setup
**Purpose**: Prepare typed AI state and move engine structure

- [ ] T001 [P] Create `src/logic/ai.ts` and define `AIMove`, difficulty scaffolding, and move selection helpers
- [ ] T002 [P] Add `GameMode`, `Difficulty`, and `AIMove` type definitions in `src/state/types.ts`
- [ ] T003 [P] Extend `src/state/gameStore.ts` with `gameMode`, `aiDifficulty`, `isComputerThinking`, and restart support

---

## Phase 2: Foundational
**Purpose**: Implement shared AI rules and deterministic move evaluation

- [ ] T004 Implement AI move validation, empty-cell detection, and FIFO-aware move application helpers in `src/logic/gameRules.ts`
- [ ] T005 Add deterministic seeded random helper and `easy` AI move selection support in `src/logic/ai.ts`
- [ ] T006 Add unit tests in `tests/unit/ai.test.ts` for easy AI move validity, empty-cell selection, and FIFO removal behavior
- [ ] T007 Update `tests/unit/gameStore.test.ts` to cover AI state fields, `vs-computer` readiness, and game reset behavior

---

## Phase 3: User Story 1 - Play against a computer opponent (Priority: P1)
**Goal**: Enable single-player mode with the computer taking valid turns as O and obeying FIFO queue rules

**Independent Test**: Start a `vs-computer` game, make X moves, and verify the computer places O on an empty cell and removes its oldest mark when needed.

- [ ] T008 [US1] Implement easy AI move execution in `src/state/gameStore.ts` for `vs-computer` mode
- [ ] T009 [US1] Add single-player turn progression and computer move trigger logic in `src/App.tsx`
- [ ] T010 [US1] Add UI feedback in `src/components/GameStatus.tsx` showing the computer opponent and current turn
- [ ] T011 [US1] Add `vs-computer` start flow in `src/App.tsx` so a game can begin in single-player mode
- [ ] T012 [US1] Add integration test in `tests/ui/App.test.tsx` verifying a `vs-computer` game starts and the computer makes a valid O move after X

---

## Phase 4: User Story 2 - Computer opponent uses basic strategy (Priority: P2)
**Goal**: Improve the AI so it prioritizes winning moves and blocks the player's immediate winning move

**Independent Test**: Arrange a near-win scenario and confirm the computer chooses a winning or blocking move correctly.

- [ ] T013 [US2] Extend `src/logic/ai.ts` with `medium` strategy that evaluates win and block move priorities
- [ ] T014 [US2] Implement deterministic winning/blocking decision logic in `src/logic/ai.ts`
- [ ] T015 [US2] Add unit tests in `tests/unit/ai.test.ts` for `medium` AI preferring winning moves and blocking player wins
- [ ] T016 [US2] Add integration tests in `tests/ui/App.test.tsx` or `tests/unit/gameStore.test.ts` verifying `medium` AI success thresholds and near-win strategy behavior
- [ ] T017 [US2] Add regression tests in `tests/unit/ai.test.ts` that verify Medium AI achieves at least 80% win/block success on representative scenarios

---

## Phase 5: User Story 3 - Choose game mode before play (Priority: P3)
**Goal**: Let the player choose between two-player and single-player mode, and select AI difficulty before a game starts

**Independent Test**: Confirm the mode selection screen appears and the selected settings initialize the correct game flow.

- [ ] T018 [US3] Add mode selection UI in `src/App.tsx` for "Two Players" and "Play vs Computer"
- [ ] T019 [US3] Add difficulty selection UI in `src/App.tsx` for "Easy" and "Medium" when `vs-computer` is selected
- [ ] T020 [US3] Update `src/components/GameStatus.tsx` to show the selected game mode and difficulty during play
- [ ] T021 [US3] Add integration tests in `tests/ui/App.test.tsx` validating mode selection, difficulty propagation, and win/loss parity between `two-player` and `vs-computer` gameplay
- [ ] T022 [US3] Ensure restarting the game in `src/state/gameStore.ts` resets `gameMode`, `aiDifficulty`, and `isComputerThinking`
- [ ] T023 [US3] Add comparison tests in `tests/unit/gameStore.test.ts` or `tests/ui/App.test.tsx` verifying identical win/loss detection behavior across `two-player` and `vs-computer` flows

---

## Phase 6: Polish & Cross-Cutting Concerns
**Purpose**: Finalize docs, test coverage, and deterministic AI behavior across the feature

- [ ] T024 [P] Update `specs/002-ai-opponent/quickstart.md` with single-player mode and AI difficulty instructions
- [ ] T025 [P] Refactor `src/logic/ai.ts` and `src/logic/gameRules.ts` for clarity, maintainability, and deterministic testability
- [ ] T026 [P] Add or update `README.md` or feature docs to describe computer opponent controls and mode selection
- [ ] T027 [P] Add a unit test in `tests/unit/ai.test.ts` ensuring AI move selection completes within 2 seconds deterministically

---

## Dependencies & Execution Order
- Phase 1 forms the foundation for AI state and type support.
- Phase 2 depends on Phase 1 and implements shared AI logic.
- Phases 3, 4, and 5 depend on Phase 2.
- User Story 1, User Story 2, and User Story 3 can proceed in parallel after Phase 2.
- Phase 6 depends on all user stories being implemented.

## Parallel Opportunities
- `T001`, `T002`, and `T003` can be worked in parallel because they modify separate foundational files.
- Test tasks in `tests/unit/` and `tests/ui/` can be developed in parallel once the feature is wired.
- Polish tasks `T024`, `T025`, `T026`, and `T027` are cross-cutting and can run in parallel after the main feature work is complete.
