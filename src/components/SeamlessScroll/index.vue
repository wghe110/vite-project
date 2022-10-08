<template>
  <div class="seamless-scroll" ref="wrapRef" @click="playFn">
    <div class="scroll" ref="scrollRef" :style="{transform: `translateY(${-len}px)`}">
      <section class="content" ref="contentRef">
        <slot></slot>
      </section>
      <section class="copy" ref="copyRef">
        <slot v-if="canMove"></slot>
      </section>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  step: {
    type: Number,
    default: 4
  }
})

const wrapRef = ref()
const scrollRef = ref()
const contentRef = ref()
const canMove = ref(false)
const len = ref(0)
let timer;

const initFn = () => {
  const h_wrap = wrapRef.value.clientHeight
  const h_content = contentRef.value.clientHeight
  canMove.value = h_content > h_wrap
}

const moveFn = () => {
  initFn()
  len.value += props.step / 2
  timer = requestAnimationFrame(moveFn)
  checkFn()
}

const checkFn = () => {
  const h_content = contentRef.value.clientHeight
  if (len.value >= h_content) len.value = 0
}

const playFn = () => {
  if (!canMove.value) return;

  pauseFn()
  timer = requestAnimationFrame(moveFn)
}
const pauseFn = () => {
  if (timer) cancelAnimationFrame(timer)
}

// life
onMounted(() => {

})
</script>

<style lang="scss" scoped>
.seamless-scroll {
  height: 100%;
  overflow: hidden;
}

.content {
  background-color: blue;
  overflow: hidden;
}

.copy {
  background-color: red;
  overflow: hidden;
}
</style>