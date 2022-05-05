import { createVuePlugin } from 'vite-plugin-vue2'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default {
  resolve: {
    alias: {
      '/@': '/src',
      '/@public': '/public'
    }
  },
  plugins: [createVuePlugin(), vueJsx()]
}