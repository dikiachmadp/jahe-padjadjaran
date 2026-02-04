import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/', // WAJIB untuk Vercel

  // Path aliases for cleaner imports
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'assets': path.resolve(__dirname, './src/assets')
    }
  },

  build: {
    outDir: 'dist',
    sourcemap: false,
    // ❌ hapus terser
    // minify: 'terser',

    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion']
        }
      }
    }
  },

  server: {
    port: 3000
  }
})
