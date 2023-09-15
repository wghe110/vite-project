import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter);
import router from './router/index'
import store from './store/index'
Vue.prototype.$eventBus = new Vue();

import 'normalize.css'
import './style.scss'

//全局组件
import GlobalComponents from './components/index'
Vue.use(GlobalComponents)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { size: 'small' });

import 'view-design/dist/styles/iview.css';

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
