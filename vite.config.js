import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      uni(),
    ],
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    server: {},
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
        }
      }
    }
  }
})
