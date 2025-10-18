 import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 10000,
    allowedHosts: ['waether-api-1.onrender.com'],
    proxy: {
      '/api': {
        target: 'https://waether-api-1.onrender.com', // your backend Render URL
        changeOrigin: true,
        secure: true
      }
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 10000,
    allowedHosts: ['waether-api-1.onrender.com']
  }
})
