import { createVuePlugin } from 'vite-plugin-vue2'

export default {
  resolve: {
    alias: {
      '/@': '/src',
      '/@public': '/public'
    }
  },
  plugins: [createVuePlugin()]
}