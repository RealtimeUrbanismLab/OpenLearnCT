import { defineConfig } from 'vite'

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
})
