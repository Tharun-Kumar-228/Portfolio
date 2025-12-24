import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['gsap'],
    exclude: []
  },
  resolve: {
    dedupe: ['gsap']
  },
  server: {
    port:3000,
    host: true
  }
})
