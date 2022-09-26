<template>
  <div class="wrap">
    <div>
      <img src="/images/loading.gif" alt="">
    </div>
    <p>正在加载资源 {{progress}}%</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Preload from 'preload-it';
import { ref } from 'vue'

const progress = ref(0)
const preload = Preload();
const router = useRouter()
// 批量导入预加载资源，如果想只加载一部分，要改一下这个目录
const assets = import.meta.globEager(['../../../assets/preload/**'])
const aLoad = Object.values(assets).map(item => item.default)

preload.fetch(aLoad)
preload.oncomplete = () => {
  // 加载完毕
  router.push('/home')
}
preload.onprogress = event => {
  // 进度
  progress.value = event.progress
}
preload.onerror = items => {
  // 加载错误
  console.error('预加载失败项：', items);
}
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>