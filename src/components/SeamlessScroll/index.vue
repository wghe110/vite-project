<template>
  <div class="seamless-scroll" ref="wrapRef" @mouseenter="timer && pauseFn()" @mouseleave="isPaused && playFn()">
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
    default: 2
  },
  autoScroll: {
    type: Boolean,
    default: false
  }
})

const wrapRef = ref()
const contentRef = ref()
const canMove = ref(false)
const len = ref(0)
const timer = ref();
const isPaused = ref(false)

const checkCanMoveFn = () => {
  const h_wrap = wrapRef.value.clientHeight
  const h_content = contentRef.value.clientHeight
  canMove.value = h_content > h_wrap
}

const moveFn = () => {
  len.value += props.step / 2
}

const checkMoveEndFn = () => {
  const h_content = contentRef.value.clientHeight
  if (len.value >= h_content) len.value = 0
}

const processFn = () => {
  checkCanMoveFn()
  if (!canMove.value) return;
  moveFn()
  checkMoveEndFn()
  timer.value = requestAnimationFrame(processFn)
}


const playFn = () => {
  if (timer.value) pauseFn()

  processFn()
}
const pauseFn = () => {
  if (timer.value) {
    isPaused.value = true
    cancelAnimationFrame(timer.value)
  } else {
    isPaused.value = false
  }

  timer.value = null
}

const cancelFn = () => {
  if (timer.value) {
    cancelAnimationFrame(timer.value)
    timer.value = null
    isPaused.value = false
  }

}

// life
onMounted(() => {
  if (props.autoScroll) playFn()
})

// export
defineExpose({
  playFn,
  pauseFn,
  cancelFn
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