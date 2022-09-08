<template>
  <c-wrap safe-bar-color="#fff">
    <view class="link">
      <navigator url="/pages/common/outside-link?url=https://www.baidu.com/" open-type="navigate"
        hover-class="navigator-hover">
        百度
      </navigator>
    </view>
    <view class="link">
      <navigator url="/pages/common/outside-link?url=https://www.163.com/" open-type="navigate"
        hover-class="navigator-hover">
        网易
      </navigator>
    </view>

    <template #suf>
      <tab-bar model-value="/pages/out-link/index"></tab-bar>
    </template>
  </c-wrap>
</template>

<script setup>
import TabBar from '@/pages/common/TabBar.vue'

</script>

<style lang="scss" scoped>
.link {
  color: blue;
}
</style>