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
</template>

<script setup>
import { ref } from 'vue'
const val = ref(0)

setInterval(() => {
  val.value = Math.random() * 10000000
  console.log('change', val.value)
}, 12000);
</script>

<style lang="scss" scoped>
.number {
  font-family: 'Dio';
  font-size: 24px;
  color: #fff;
}
</style>