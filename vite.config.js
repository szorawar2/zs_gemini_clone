import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {nodePolyfills} from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),

  ],
  base: '/zs_gemini_clone/', // Replace with your repo name
  build: {
    outDir: 'dist', // Default output directory
  }

})


