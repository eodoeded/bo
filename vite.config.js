// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ethicronics: resolve(__dirname, 'ethicronics.html'),
        animation: resolve(__dirname, 'animation.html'),
        cards_animation: resolve(__dirname, 'cards_animation.html'),
      },
    },
  },
})
