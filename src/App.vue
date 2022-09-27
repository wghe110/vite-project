<template>
  <router-view></router-view>

  <div class="tips" v-if="!isFullScreen">
    <p>是否要全屏？</p>
    <button @click="yes">是</button>
    <button @click="no">否</button>
  </div>
</template>

<script setup>
import mitt from 'mitt'
import { provide, ref } from 'vue';
import full from './untils/fullscreen'

const emitter = mitt();
const isFullScreen = ref(false)
isFullScreen.value = full.isFullScreen()

// 下发mitt
provide('emitter', emitter)

const yes = () => {
  full.fullscreen(document.documentElement)
  isFullScreen.value = true;
}
const no = () => {
  isFullScreen.value = true;
}

</script>

<style lang="scss" scoped>
.tips {
  position: fixed;
  background-color: #fff;
  padding: 40px;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}
</style>