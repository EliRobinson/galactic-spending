import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/galactic-spending/', // Replace with your actual repository name
  build: {
    outDir: 'dist',
    sourcemap: true
  }
}) 