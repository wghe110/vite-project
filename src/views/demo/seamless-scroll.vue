<template>
  <div class="wrap">
    <section class="scroll-box">
      <seamless-scroll ref="seamlessRef">
        <p v-for="(item, idx) in 5" :key="idx" :style="{fontSize: idx * 4 + 'px', color: '#fff', lineHeight: 1.6}">
          记忆里的昨天，充斥着离别的味道，总是显得寂静黯然，凉凉的微风拂过，带着我的莫名惆怅，似落花有情流水无意的飘散在回忆的长廊，于是也就习惯了深沉的模样，习惯了寂静的枯灯。每当夜幕降临，浓浓的寂寞袭上心头，才知道，指缝中溜走了太多的岁月，尘埃中湮没了太多的往事，无奈中留下了太多的叹息。
        </p>
      </seamless-scroll>
    </section>

    <div class="btn-box">
      <button>改变内容</button>
      <button @click="playFn">滚动</button>
      <button @click="pauseFn">暂停</button>
      <button @click="cancelFn">取消滚动</button>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue'

const seamlessRef = ref()
const playFn = () => {
  seamlessRef.value.playFn()
}
const pauseFn = () => {
  seamlessRef.value.pauseFn()
}
const cancelFn = () => {
  seamlessRef.value.cancelFn()
}
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;

  >.scroll-box {
    flex: 1;
    min-height: 0%;
  }
}
</style>