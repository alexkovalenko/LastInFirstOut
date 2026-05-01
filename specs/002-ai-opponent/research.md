# Research: AI Opponent

## Decision

Implement the computer opponent entirely on the client side within the existing React + TypeScript + Vite application. Use a deterministic, rule-based AI that evaluates the current board state and FIFO queue rules using the same game logic functions already present in `src/logic/gameRules.ts`.

## Rationale

- The current feature is a static single-page app with no backend, so a client-side AI is the simplest and most maintainable solution.
- A rule-based AI can support both "easy" and "medium" difficulty levels while remaining testable and deterministic.
- Reusing existing game logic ensures the AI follows the same rules as the human player and avoids divergence between single-player and multiplayer modes.
- Keeping AI evaluation synchronous and bounded by 2 seconds preserves responsiveness for local and Vercel deployment.

## Alternatives Considered

- **Server-side AI**: Rejected because this phase must remain a static SPA with no backend dependency.
- **Minimax/Lookahead search**: Rejected for phase two due to added complexity and unnecessary performance overhead for a 3×3 board with FIFO rule nuances.
- **Fully random AI only**: Rejected because the user requested an engaging computer opponent, not just random play.

## Deployment Decision

- Keep the existing build and deployment flow.
- No new runtime services or environment variables are required for the AI opponent.
- Local development remains `npm run dev`; production build remains `npm run build`; Vercel static deployment remains unchanged.
