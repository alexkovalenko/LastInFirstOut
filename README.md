# Last-In, First-Out: Sliding Tic Tac Toe

## Overview

**Last-In, First-Out** is a React-based sliding tic tac toe game where the standard game mechanics are enhanced with a FIFO (First-In, First-Out) queue system. Each player can keep at most three active marks on the board; placing a fourth mark automatically removes the oldest active mark, forcing strategic depth into the classic game.

## How to Play

### Game Rules

- **Board**: 3×3 grid
- **Players**: Two local players alternate turns (X and O)
- **Active Marks**: Each player can keep at most **3 active marks** on the board
- **Move Queuing**: Moves are stored in a FIFO queue per player
- **Auto-Removal**: Placing a 4th mark automatically removes the oldest active mark with a smooth animation
- **Win Condition**: First player to achieve three marks in a row (horizontal, vertical, or diagonal) wins
- **Restart**: Click the "Restart game" button to reset the board and play again

### Gameplay Example

1. X places at position 1 (queue: X=[1])
2. O places at position 2 (queue: O=[2])
3. X places at position 4 (queue: X=[1, 4])
4. O places at position 5 (queue: O=[2, 5])
5. X places at position 7 (queue: X=[1, 4, 7])
6. O places at position 3 (queue: O=[2, 5, 3])
7. **X places at position 9** → Position 1 is removed automatically (oldest X mark), then position 9 is placed
   - Current queue: X=[4, 7, 9]
   - Board shows: O at [2, 5, 3], X at [4, 7, 9]
   - Animation plays as position 1 fades away

## Quick Start

### Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Deploy to Vercel

Connect your GitHub repository to [Vercel](https://vercel.com) and push to deploy automatically.

For more details, see [specs/001-sliding-tic-tac-toe/quickstart.md](specs/001-sliding-tic-tac-toe/quickstart.md).

## Technology Stack

- **Frontend**: React 18.3+, TypeScript 5.x (strict mode)
- **Build Tool**: Vite 5.x
- **State Management**: Zustand 5.x
- **Testing**: Vitest, React Testing Library
- **Deployment**: Vercel (static site)

## Project Structure

```
src/
├── components/              # React UI components
│   ├── App.tsx             # Root application
│   ├── Board.tsx           # 3×3 board grid
│   ├── Cell.tsx            # Individual board cell
│   ├── GameStatus.tsx      # Status display and controls
│   └── AnimatedMarker.tsx  # Animated mark with removal effect
├── logic/
│   └── gameRules.ts        # Pure game logic: moves, wins, removal
├── state/
│   ├── gameStore.ts        # Zustand store managing game state
│   └── types.ts            # TypeScript types for game entities
├── main.tsx                # App entry point
└── styles.css              # Global Dark theme styles

tests/
├── unit/
│   ├── gameRules.test.ts   # Game logic unit tests
│   └── gameStore.test.ts   # Store action unit tests
└── ui/
    └── App.test.tsx        # Component integration tests

specs/
└── 001-sliding-tic-tac-toe/
    ├── spec.md             # Feature specification
    ├── plan.md             # Implementation plan
    ├── data-model.md       # Data model and entities
    ├── research.md         # Technology decisions
    ├── quickstart.md       # Development and deployment guide
    └── tasks.md            # Implementation task list
```

## Documentation

- **[Feature Specification](specs/001-sliding-tic-tac-toe/spec.md)** – User stories, requirements, and acceptance criteria
- **[Implementation Plan](specs/001-sliding-tic-tac-toe/plan.md)** – Tech stack, architecture, and project structure
- **[Data Model](specs/001-sliding-tic-tac-toe/data-model.md)** – Game entities and state relationships
- **[Quickstart Guide](specs/001-sliding-tic-tac-toe/quickstart.md)** – Local development and Vercel deployment
- **[Task List](specs/001-sliding-tic-tac-toe/tasks.md)** – Feature implementation tasks organized by phase

## Development

### Run Tests

```bash
npm test              # Run tests once
npm run test:watch   # Run tests in watch mode (auto-rerun on changes)
```

### Build for Production

```bash
npm run build        # Compile TypeScript and bundle with Vite
npm run preview      # Preview production build locally
```

### Code Quality

The project enforces TypeScript strict mode and is configured for ESLint (add linting in a future phase if needed).

## Game Design Principles

This project follows the **Last-In, First-Out Constitution**, which establishes these core principles:

1. **Component-First Architecture** – React components as the primary unit of development
2. **Type Safety (NON-NEGOTIABLE)** – TypeScript strict mode throughout
3. **Zustand State Management** – Exclusive global state pattern
4. **Game Logic Isolation** – Pure functions for core mechanics, testable independently
5. **Test-Driven Development** – 90%+ coverage for game logic before UI polish

See `.specify/memory/constitution.md` for the full governance document.

## Future Enhancements

Phase 1 focuses on local two-player gameplay. Future phases could include:

- AI/computer opponent
- Game state persistence (localStorage or backend)
- Multiplayer over network
- Mobile app version
- Gameplay statistics and leaderboards
- Advanced animations and visual effects

## License

MIT
