import { defineConfig } from 'vite'
import dns from 'dns'
import preact from '@preact/preset-vite'
import { resolve } from 'path'


dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  server: {
    host: true,
    strictPort: true,
    port: 3000,
  }
})
