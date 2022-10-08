<template>
  <div class="number">
    <number-animation v-model="val"></number-animation>
  </div>
  <div class="number">
    <number-animation v-model="val" :precision="3"></number-animation>
  </div>
  <div class="number">
    <number-animation v-model="val" :precision="3" :duration="8"></number-animation>
  </div>
  <div class="number">
    <number-animation v-model="val" :precision="3" :duration="8" :delay="2"></number-animation>
  </div>
  <div class="number">
    <number-animation v-model="val" :precision="3" :duration="8" :delay="2" en-us></number-animation>
  </div>

  <button @click="changeNum">改变数字</button>
</template>

<script setup>
import { ref } from 'vue'
const val = ref(0)

const changeNum = () => {
  val.value = Math.random() * 10000000
  console.log('change', val.value)
}
</script>

<style lang="scss" scoped>
.number {
  font-family: 'Dio';
  font-size: 24px;
  color: #fff;
}
</style>