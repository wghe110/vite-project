<template>
  <scroll-view class="c-scroll-load-more" scroll-y="true" :refresher-background="refresherBackground"
    :refresher-enabled="refresherEnabled" :refresher-threshold="100" :refresher-triggered="triggered"
    @scrolltolower="loadFn" @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
    @refresherabort="onAbort">
    <slot></slot>

    <uni-load-more :status="status" :content-text="contentText" @clickLoadMore="loadFn"></uni-load-more>
  </scroll-view>
</template>

<script setup>
import { onMounted } from 'vue'
import getLoad from './load-more'
import getRefresh from './refresh'
// props
const props = defineProps({
  load: {  //上滑加载更多函数
    type: Function,
    required: true,
    default() {
      return Promise.reject()
    },
  },
  isFinished: { // 最后一页的标志
    type: Boolean,
    required: true,
    default: false,
  },

  refresherEnabled: { // 是否开启下拉刷新
    type: Boolean,
    default: false,
  },
  refresh: { // 下拉刷新函数
    type: Function,
    default() {
      return Promise.reject()
    }
  },
  refresherBackground: { // 下拉刷新的背景
    type: String,
    default: '#f0f2f5'
  },
})

const { triggered, onPulling, onRefresh, onRestore, onAbort } = getRefresh(props);
const { contentText, status, loadFn } = getLoad(props)

onMounted(() => {
  loadFn()
})

</script>

<style lang="scss" scoped>
.c-scroll-load-more {
  height: 100%;
}
</style>