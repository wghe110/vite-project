import vue from '@vitejs/plugin-vue2'
import vueJsx from '@vitejs/plugin-vue2-jsx'

export default {
  resolve: {
    alias: {
      '@': '/src'
    },
  },
  plugins: [
    vue(),
    vueJsx()
  ],
  server: {
    // 反向代理配置
    proxy: {
      '/api': 'http://117.88.101.69:8085'
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