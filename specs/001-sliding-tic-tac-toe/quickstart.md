# Quickstart: Sliding Tic Tac Toe

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the local app in your browser. Vite will print the local URL, typically `http://localhost:5173`.

4. Build for production:

```bash
npm run build
```

5. Preview the production build locally:

```bash
npm run preview
```

## Vercel Deployment

1. Connect the repository to Vercel.
2. Set the framework preset to **Vite** or use the following build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy the site.

### Optional: Local Vercel testing

If you have the Vercel CLI installed, you can run:

```bash
npx vercel dev
```

## Environment Variables

No runtime environment variables are required for this phase.

## Project Structure

```
LastInFirstOut/
├── src/
│   ├── components/      # React UI components
│   ├── logic/          # Pure game rules and logic
│   ├── state/          # Zustand game store
│   ├── App.tsx         # Root app component
│   ├── main.tsx        # Entry point
│   └── styles.css      # Global styles
├── tests/              # Test files
├── specs/              # Feature specifications and design docs
├── dist/               # Production build output (generated)
├── package.json        # Project dependencies
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── index.html          # HTML entry template
```

## Notes

- The application is a static single-page app (SPA) with no backend dependency.
- Zustand manages the game state; the store is initialized in `src/state/gameStore.ts`.
- Game logic is isolated in `src/logic/gameRules.ts` for easy testing and reuse.
