import Vue from "vue/dist/vue.esm.js";
import ContentVue from './Custer.vue'

const createInfoWindow = (AMap) => {
  const app = new Vue({
    components: { ContentVue },
    template: `<ContentVue/>`,
  }).$mount();


  // 创建信息窗体
  const infoWindow = new AMap.InfoWindow({
    anchor: "bottom-center",
    content: app.$el,
  });

  return { infoWindow, app };
};

export default createInfoWindow;