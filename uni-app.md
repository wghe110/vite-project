# uni-app使用实例

## 模版
```vue
<template>
  <view class="content">
    <com ref="comRef"></com>
    <button @tap="getChildFn">获取子组件方法</button>
  </view>
</template>

<script setup>
import Com from './com.vue'
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'

const hello = ref('Hello')
onLoad((options) => {
  console.log('onLoad done', options)
})
onShow(() => {
  console.log('onShow done')
})

const comRef = ref()
const getChildFn = () => {
  comRef.value.sayFn()
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
```

## `vue`模版注意
 - `<template></template`内用`uni-app`的标签，少用`html`标签
 - `<script setup></<script>`用`vue3`的脚本写法
 - `<style lang="scss" scoped></style>`样式使用`scss`书写，组件必须添加`scoped`，但是`uni-app`的`scoped`并不能使样式隔离，父组件的样式还是回影响子组件的样式。原因是它是使用`class`来实现样式隔离的

## 根目录下`components`目录
  - 只放全局组件
  - 按照`uni-app`组件的推荐方法`easycom`，即：符合`components/组件名称/组件名称.vue`目录结构，就可以不用引用、注册，直接在页面中使用

## 状态管理
  状态管理使用`pinia`来实现，具体使用方法可以参考[pinia.md](./pinia.md)
  - `/src/stores/global.js` 存放全局变量，开发过程中，不要随意往里面添加变量
  - 在自己的模块里面添加自己使用的 `store.js`，并命名为模块名
## 事件通讯
- 父子组件通过 `v-bind`/`ref`和`$emit`来通讯(子组件抛出事件使用`defineExpose`)
- 全局事件通过 `uni.$on`/`uni.$emit`来通讯，注意销毁事件监听

## 请求
  - 使用`uni.request` 来发起请求. [文档](https://uniapp.dcloud.net.cn/api/request/request.html)
## 日志打印
  - 使用 `console.log`打印

## 路由
 - 统一配置在 `pages.json`里面
 - 路由跳转使用`<navigator></navigator>`或`uni.navigateTo`[文档](https://uniapp.dcloud.net.cn/api/router.html#navigateto)

## 本地缓存
 - `uni.setStorage`/`uni.getStorage`
 - `uni.setStorageSync`/`uni.getStorageSync`
 - [其他](https://uniapp.dcloud.net.cn/api/storage/storage.html#clearstoragesync)

## un组件
  使用`uni-ui`，暂时不使用其他第三方`ui`组件库，可能会不兼容`app`