import Vue from 'vue'
import App from './App.vue'

//vue-router
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import router from './router/index'

// vuex
import store from './store/index'

// eventBus
Vue.prototype.$eventBus = new Vue();

// normalize.css
import 'normalize.css'

//全局组件
import GlobalComponents from './components/index'
Vue.use(GlobalComponents)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')