import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// normalize.css
import 'normalize.css'

const app = createApp(App)
app.use(router)

app.mount('#app')