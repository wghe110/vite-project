<template>
  <button @click="add">添加子组件</button>
  <child v-for="(item, idx) in numChild" :key="idx" ref="childRef"></child>
  <button @click="getAllChild">调用子组件方法</button>
</template>

<script setup>
import { inject, ref } from 'vue'
import Child from './child.vue'

const childRef = ref()
const numChild = ref(2);

const getAllChild = () => {
  console.log('childRef', childRef.value)

  if (childRef.value && childRef.value.length) {
    childRef.value.forEach(item => {
      item.childFn()
    })
  }
}
const add = () => {
  numChild.value += 1;
}

const emitter = inject('emitter')
console.log('emitter', emitter)
</script>