import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/dashboard/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://www.aulify.mx/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''), 
      },
    },
  },
});