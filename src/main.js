import {
  createSSRApp
} from "vue";
import App from "./App.vue"

// pinia
import * as Pinia from 'pinia';

// 请求拦截
import './apis/interceptor'

export function createApp() {
  const app = createSSRApp(App);
  app.use(Pinia.createPinia());

  return {
    app,
    Pinia,
  };
}
