import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config — single-file dev server, fast HMR.
// Wireframe is meant to be `npm install && npm start`.
export default defineConfig({
  plugins: [react()],
  server: { port: 3000, open: true }
});
