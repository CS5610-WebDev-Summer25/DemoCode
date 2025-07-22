import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
        globals: true, // Optional: Allows using describe, test, etc. without explicit imports
        environment: 'jsdom',
        setupFiles: ['./src/setupTests.js'], // Or './src/setupTests.ts' for TypeScript
      },
})
