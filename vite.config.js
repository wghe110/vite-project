import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx()
  ],
  resolve: {
    alias: {
      '@': '/src',
      '$p': '/public'
    }
  },
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
})
