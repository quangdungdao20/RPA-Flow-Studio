import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'components': path.resolve(__dirname, './src/components'),
      'views': path.resolve(__dirname, './src/views'),
      'layouts': path.resolve(__dirname, './src/layouts'),
      'assets': path.resolve(__dirname, './src/assets'),
      'variables': path.resolve(__dirname, './src/variables'),
      'routes': path.resolve(__dirname, './src/routes.jsx'),
      'routes.js': path.resolve(__dirname, './src/routes.jsx'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
