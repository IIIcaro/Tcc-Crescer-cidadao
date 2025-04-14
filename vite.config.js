import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Configuração para redirecionar requisições /api para o backend PHP
      '/api': {
        target: 'http://localhost', // Seu servidor local (XAMPP/WAMP)
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/backend'), // Remove /api e direciona para /backend
        secure: false
      }
    }
  }
})