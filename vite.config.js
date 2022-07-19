import { createVuePlugin } from 'vite-plugin-vue2'
import vueJsx from '@vitejs/plugin-vue2-jsx'

export default {
  resolve: {
    alias: {
      '@': '/src',
      '$p': '/public'
    },
  },
  plugins: [
    createVuePlugin(),
    vueJsx()
  ]
}