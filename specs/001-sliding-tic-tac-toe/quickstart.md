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

## Notes

- No runtime environment variables are required for the first phase.
- The application is a static SPA and does not require a backend for phase one.
- Use Vite’s preview server to verify the production build before deploying.
