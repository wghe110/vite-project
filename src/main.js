import Vue from 'vue'
import App from './App.vue'

//vue-router
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import router from './router/index'

//vant
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

//vant-plus
import VantPlus from './components/index'
Vue.use(VantPlus)

//deskboard
import '@vant/touch-emulator'

// normalize.css
import 'normalize.css'

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')