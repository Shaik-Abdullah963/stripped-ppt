// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// Use environment variables for API URL
const apiUrl = process.env.VITE_API_URL || 'http://localhost:3002';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: { icon: true },
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    proxy: {
      // Proxy any calls to /presentations to your backend
      '/presentations': {
        target: apiUrl,
        changeOrigin: true,
        rewrite: (path) => path, // keep the path as-is
      },
      '/slides': {
      target: apiUrl,
      changeOrigin: true,
      rewrite: (path) => path,
    },
    },
  },
});
