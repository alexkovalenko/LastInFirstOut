# Quickstart: AI Opponent

## Prerequisites

- Node.js 18+ installed
- npm package manager

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the local app in your browser:

`http://localhost:5173`

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

## Notes

- No backend or runtime environment variables are required for phase two.
- Single-player mode runs fully in the browser.
- The AI logic is designed to work with the existing static SPA architecture.
