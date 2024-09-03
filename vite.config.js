import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Set this to the correct base path if not serving from root
  build: {
    outDir: 'dist',
  },
})
