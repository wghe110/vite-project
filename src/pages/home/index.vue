<template>
  <c-wrap safe-bar-color="#fff">
    <view class="scroll-box">
      <c-scroll-load-more :is-finished="isFinished" :load="searchFn" refresher-enabled :refresh="refreshFn">
        <view class="inner-con">
          <c-section v-for="item in aList" :key="item">
            <c-field :has-line="false">{{ item }}</c-field>
          </c-section>

          <c-empty v-if="!aList.length"></c-empty>
        </view>
      </c-scroll-load-more>
    </view>

    <template #suf>
      <tab-bar model-value="/pages/home/index"></tab-bar>
    </template>
  </c-wrap>
</template>

<script setup>
import TabBar from '@/pages/common/TabBar.vue'
import { ref } from 'vue'

const aList = ref([])
const isFinished = ref(false)
const pagination = {
  pageNum: 1,
  pageSize: 10,
}

const searchFn = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      for (let i = 1; i <= pagination.pageSize; i++) {
        const idx = (pagination.pageNum - 1) * pagination.pageSize + i
        aList.value.push(`测试 ${idx}`)

        if (idx >= 30) isFinished.value = true;
        resolve()
      }

      pagination.pageNum++
    }, 1500)
  })
}

const refreshFn = () => {
  pagination.pageNum = 1;
  aList.value = []
  isFinished.value = false;
  uni.showLoading({
    title: '正在加载'
  })

  return searchFn().then(() => {
    uni.hideLoading()
  })
}

</script>

<style lang="scss">
.scroll-box {
  height: 100%;
  // overflow: auto;

  .inner-con {
    padding: 24rpx;
  }
}
</style>