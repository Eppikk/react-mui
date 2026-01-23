import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        advancedChunks: {
          groups: [
            {
              name: 'react',
              test: /[\\/]node_modules[\\/]react(-dom)?[\\/]/,
            },
            {
              name: 'mui',
              test: /[\\/]node_modules[\\/](@mui|@emotion)[\\/]/,
            },
            {
              name: 'tanstack',
              test: /[\\/]node_modules[\\/]@tanstack[\\/]/,
            },
          ],
        },
      },
    },
  },
})
