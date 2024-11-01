import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or "modern"
      }
    }
  },
  plugins: [react(), imagetools()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})