import { defineConfig } from 'vite'
import { cpSync } from 'fs'
import { resolve } from 'path'

export default defineConfig({
  base: './',
  server: {
    port: 8000,
    host: true,
    open: true,
    cors: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  optimizeDeps: {
    exclude: ['three'],
  },
  publicDir: 'public',
  plugins: [
    {
      name: 'copy-src',
      closeBundle() {
        // Copy src directory to dist after build
        cpSync('src', 'dist/src', { recursive: true })
      }
    }
  ]
})
