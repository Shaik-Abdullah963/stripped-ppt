// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      // optional SVGR options
      svgrOptions: {
        icon: true,
        // more options: https://react-svgr.com/docs/options/
      },
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',  // convenient alias if you like
    },
  },
});
