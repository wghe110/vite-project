<template>
  <view>
    <text>pinia的count={{ count }}</text>
    <button @click="add">直接修改count+1</button>
    <button @click="store.add">调用stroe方法修改count+1</button>

    <button @click="requestFn">发起请求</button>

    <Certification></Certification>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import demoStore from './store'
import { storeToRefs } from 'pinia'
import Certification from './certification.vue'

import apis from './api'

const store = demoStore()
const { count } = storeToRefs(store)

const add = () => {
  store.count += 1
}
console.log('store', store.add)

const requestFn = () => {
  const params = {
    // houseId: 123
  }
  apis.getUserScoreRank(params).then((res) => {
    console.log('res=====', res)
  })
}

</script>