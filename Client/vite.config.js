import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',                 // Cho phép truy cập từ bên ngoài
    port: process.env.PORT || 5173  // Dùng PORT do Render cung cấp
  }
})
