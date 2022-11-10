import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
const pinia = createPinia()

// normalize.css
import 'normalize.css'
import '@/style.css'

//element-plus
import ElementPlus from 'element-plus'
import 'element-plus-theme-cestc'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// 全局组件/指令/属性或方法
import globalPlugins from './components/index'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(globalPlugins)
app.use(ElementPlus, { size: 'small', locale: zhCn })

app.mount('#app')