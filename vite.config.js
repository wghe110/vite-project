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
  ],
  server: {
    // 反向代理配置
    proxy: {}
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 500
  },
  preview: {
    // 预览模式代理
    proxy: {}
  }
}