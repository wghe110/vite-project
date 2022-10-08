import Echarts from './Echarts/index.vue'
import NumberAnimation from './NumberAnimation/index.vue'
import VideoPlayer from './VideoPlayer/index.vue'
import SeamlessScroll from './SeamlessScroll/index.vue'

export default {
  install: (app, options) => {
    /**
     * 1. 通过 app.component() 和 app.directive() 注册一到多个全局组件或自定义指令。
     * 2. 通过 app.provide() 使一个资源可被注入进整个应用。
     * 3. 向 app.config.globalProperties 中添加一些全局实例属性或方法
     */
    app.component('chart', Echarts)
    app.component('number-animation', NumberAnimation)
    app.component('video-player', VideoPlayer)
    app.component('seamless-scroll', SeamlessScroll)
  }
}