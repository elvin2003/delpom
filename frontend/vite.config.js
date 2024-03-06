import { defineConfig } from 'vite'
import dns from 'dns'
import preact from '@preact/preset-vite'

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  server: {
    host: 'localhost',
    port: 3000
  }
})
