import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    // 别名
    alias: []
  },
  css: {
    // 指定传递给 CSS 预处理器的选项
    preprocessorOptions: {
      scss: {
        additionalData: `$injectedColor: orange;`
      }
    }
  },
  server: {
    // 反向代理
    proxy: {}
  },
})
