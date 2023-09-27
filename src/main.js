import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter);
import router from './router/index'
import './router/router-guard'

import store from './store/index'
Vue.prototype.$eventBus = new Vue();

import 'normalize.css'

//全局组件
import GlobalComponents from './components/index'
Vue.use(GlobalComponents)

import ElementUI from 'element-ui';
import './element-theme.scss'
Vue.use(ElementUI);

import './style.scss'

import 'view-design/dist/styles/iview.css';

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
