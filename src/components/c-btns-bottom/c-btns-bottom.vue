<template>
  <view class="c-btns-bottom">
    <view class="content">
      <c-button :url="url">
        <slot>按钮</slot>
      </c-button>
    </view>
  </view>
</template>

<script setup>
//props
const props = defineProps({
  url: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.c-btns-bottom {
  background: #FFFFFF;
  box-shadow: 0px -6px 12px 0px rgba(0, 0, 0, 0.12);
  border-radius: 24rpx 24rpx 0px 0px;
  padding-bottom: env(safe-area-inset-bottom);
  position: relative;

  >.content {
    padding: 24rpx 40rpx;
  }
}
</style>