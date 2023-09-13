import { createVuePlugin } from 'vite-plugin-vue2'
import vueJsx from '@vitejs/plugin-vue2-jsx'

export default {
  resolve: {
    alias: {
      '@': '/src'
    },
  },
  plugins: [
    createVuePlugin(),
    vueJsx()
  ],
  server: {
    // 反向代理配置
    proxy: {
      '/api': 'http://udp6hx.devops.com'
    }
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