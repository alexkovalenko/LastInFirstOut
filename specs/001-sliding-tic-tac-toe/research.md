# Research: Sliding Tic Tac Toe

## Decision

Use React + TypeScript + Vite for the UI and development environment, with Zustand as the single source of truth for client-side game state. Vitest and React Testing Library will cover game logic and component behavior. The app will be a static SPA, deployable locally and on Vercel.

## Rationale

- The user explicitly requested TypeScript, React, Vite, and Zustand.
- Vite is the standard modern build tool for React + TypeScript and works well with Vercel static deployments.
- Zustand is a lightweight, easy-to-use state library that fits the local game state pattern without adding Redux complexity.
- Pure game logic functions make the FIFO sliding rules easy to unit test, separate from React rendering.
- Static deployment is appropriate because the first phase has no backend and only requires in-browser state.

## Alternatives Considered

- **React local state / Context**: Rejected because a separate Zustand store gives clearer global game state, easier testing, and cleaner queue management.
- **Redux**: Rejected due to unnecessary boilerplate for a small two-player game.
- **Create React App**: Rejected because Vite is faster to boot, produces smaller bundles, and is the desired stack.
- **Persisted state in localStorage**: Rejected for phase one because the scope is a simple session-based game; persistence can be added later if needed.

## Deployment Decision

- **Local development**: `npm run dev` using Vite.
- **Vercel**: static site deployment with `npm run build` and output directory `dist`.
- No API or backend endpoint is required for this phase.
