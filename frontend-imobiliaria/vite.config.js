import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,   // 🔹 garante acesso pelo Docker
    port: 5173
  }
})
