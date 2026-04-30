# Last-In, First-Out Constitution

## Core Principles

### I. Component-First Architecture
React components are the primary unit of development. Every feature must be built as a composable, reusable component with clear props contract, isolating UI logic from game state. Components MUST be self-contained, independently testable, and documented. Component composition is preferred over inheritance; props drilling must be minimized through proper context/state design.

### II. Type Safety (NON-NEGOTIABLE)
TypeScript strict mode is mandatory throughout the codebase. All functions must have explicit type annotations; no implicit `any` types allowed. Game logic, state contracts, and component props MUST be fully typed. Type safety ensures correctness of game mechanics and prevents runtime errors in state transitions.

### III. Zustand State Management
All global game state MUST be managed exclusively through Zustand stores. Stores MUST define clear slices (game board state, UI state, player state) with explicit action names. State mutations are forbidden; all updates must be immutable actions. Store initialization and selectors MUST be tested independently.

### IV. Game Logic Isolation
Core game mechanics (board moves, win detection, tile sliding, turn management) MUST be implemented as pure functions independent of React. Game logic can be tested in isolation without rendering. Board state transformations MUST be fully typed and deterministic; randomness (if any) must be seeded and testable.

### V. Test-Driven Development for Game Logic
Game mechanics MUST be covered by unit tests before UI implementation. Test coverage for win/loss detection, move validation, and board operations MUST reach 90%+. Integration tests MUST verify Zustand actions update component state correctly. Performance tests MUST confirm game remains responsive with board operations.

## Technology Stack & Build Requirements

- **Runtime**: React 18+, TypeScript (strict mode)
- **Build Tool**: Vite (dev server, production optimization)
- **State Management**: Zustand (global game state)
- **Testing**: Vitest for unit tests, React Testing Library for component integration tests
- **Code Format**: ESLint + Prettier enforced in CI/CD
- **Build Output**: ES modules, tree-shakeable, browser-compatible bundles

## Development Workflow

- Features start with game logic unit tests (red), then UI components (green), then optimization (refactor).
- All PRs MUST include updated game logic tests and component tests; coverage thresholds must not decrease.
- Component changes require visual regression testing or screenshots in PR description.
- Breaking changes to game state structure or Zustand store contracts MUST be documented in changelog and versioned accordingly.

## Governance

This constitution supersedes all other development practices. It MUST be consulted during code review and design decisions. Amendments require documented justification, team review, and explicit version increment with migration guidance. All commits affecting game logic or state management MUST reference this constitution in their commit messages (e.g., `feat(logic): implement win detection per Constitution Principle IV`).

**Version**: 1.0.0 | **Ratified**: 2026-04-30 | **Last Amended**: 2026-04-30
