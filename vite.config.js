import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  base: '/',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2020',
    cssCodeSplit: true,
    // Berkas kecil di-inline sebagai data URI; di atas ini tetap jadi berkas
    // terpisah supaya bisa di-cache selamanya lewat nama ber-hash.
    assetsInlineLimit: 2048,

    // Pemecahan chunk hanya relevan untuk bundle browser. Pada build SSR,
    // react & kawan-kawan dianggap eksternal sehingga tidak boleh di-chunk.
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom', 'react-router-dom'],
              motion: ['framer-motion'],
              i18n: ['i18next', 'react-i18next']
            }
          }
        }
  },

  server: {
    port: 3000
  }
}))
