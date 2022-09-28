<template>
  <number-com ref="numberRef" :from="from" :to="to" :duration="duration" :delay="delay" :easing="easing"
    :format="formatFn" />
</template>

<script setup>
import { ref, nextTick, watch } from 'vue';
import NumberCom from 'vue-number-animation/Number.vue'

// props
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 5
  },
  delay: {
    type: Number,
    default: 0
  },
  easing: {
    type: String,
    default: 'Power1.easeOut' // more:https://greensock.com/docs/v2/Easing
  },
  precision: {
    type: Number,
    default: 0
  },
  enUs: {
    type: Boolean,
    default: false
  }
})

const numberRef = ref()
const from = ref(0)
const to = ref(0)

// change
watch(() => props.modelValue, (val, old) => {
  from.value = old
  to.value = val
})

// methods
const formatFn = (number) => {
  const numberFormat = new Intl.NumberFormat("en-US")
  const val = number.toFixed(props.precision)
  return props.enUs ? numberFormat.format(val) : val;
}
const play = () => {
  nextTick(() => {
    numberRef.value.play()
  })
}
const pause = () => {
  nextTick(() => {
    numberRef.value.pause()
  })
}
const restart = () => {
  nextTick(() => {
    numberRef.value.restart()
  })
}

defineExpose({
  play,
  pause,
  restart
})
</script>