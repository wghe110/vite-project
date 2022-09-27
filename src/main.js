import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
const pinia = createPinia()

// normalize.css
import 'normalize.css'
// common styles
import '@/style.scss'

// 全局组件/指令/属性或方法
import globalPlugins from './components/index'

// 数字动画
import VueNumber from 'vue-number-animation'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(globalPlugins)
app.use(VueNumber)

app.mount('#app')