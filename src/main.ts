import { createApp } from 'vue';
import App from './App.vue';

import ElementPlus from 'element-plus'
import 'element-plus-theme-cestc'

import 'normalize.css'
import './styles/init.scss'

// 定义的全局组件
import GlobalComponements from './components/index'

createApp(App)
  .use(ElementPlus)
  .use(GlobalComponements)
  .mount('#app');
