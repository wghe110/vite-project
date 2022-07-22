<template>
  <router-view></router-view>
</template>

<script>
import mitt from 'mitt'

import { provide } from 'vue';

export default {
  setup() {
    const emitter = mitt();
    // 下发mitt
    provide('emitter', emitter)
  }
}
</script>

<style scoped>
</style>