import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  publicDir: false,
  plugins: [
    react(),
    {
      name: 'serve-public-index',
      configureServer(server) {
        server.middlewares.use((request, _response, next) => {
          if (request.url === '/') {
            request.url = '/public/index.html'
          }
          next()
        })
      },
    },
  ],
  build: {
    rollupOptions: {
      input: 'public/index.html',
    },
  },
})
