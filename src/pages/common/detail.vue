<template>
  <c-detail :title="info.title" :author="info.author" :date="info.date" :article="info.detail"></c-detail>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { onLoad } from '@dcloudio/uni-app';

const info = ref({})
const id = ref('')
const type = ref(1)

onLoad((arg) => {
  id.value = arg.id || ''
  type.value = arg.id || 1

  if (id.value || id.value === 0) searchFn()
})

const searchFn = () => {

}

// 更改标题
watchEffect(() => {
  type.value;

  let cn = '公共服务'
  switch (String(type.value)) {
    case '1':
      cn = '生活服务'
      break;
    case '2':
      cn = '心理服务'
      break;
    case '3':
      cn = '法律服务'
      break;
    default:
      break;
  }
  uni.setNavigationBarTitle({
    title: cn
  })
})


</script>
<style lang="scss" scoped>
</style>