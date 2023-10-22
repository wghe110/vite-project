import Vue from "vue/dist/vue.esm.js";
import ContentVue from './Content.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

const createInfoWindow = (AMap) => {
  // 挂载vue元素
  const element = document.createElement("div");

  const app = new Vue({
    components: { ContentVue },
    template: `<ContentVue/>`,
  });
  app.$mount(element);


  // 创建信息窗体
  const infoWindow = new AMap.InfoWindow({
    anchor: "bottom-center",
    content: element,
  });

  return { infoWindow, app };
};

export default createInfoWindow;