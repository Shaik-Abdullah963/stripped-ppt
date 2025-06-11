// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

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
        target: 'http://localhost:3002',
        changeOrigin: true,
        rewrite: (path) => path, // keep the path as-is
      },
    },
  },
});
