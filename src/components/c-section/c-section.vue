<template>
  <view :class="`c-section ${noMarginBottom ? 'no-margin-bottom' : ''}`" @click="goFn">
    <slot></slot>
  </view>
</template>

<script setup>
// props
const props = defineProps({
  noMarginBottom: {
    type: Boolean,
    default: false
  },
  url: {
    type: String,
    default: ''
  }
})

const goFn = () => {
  if (!props.url) return;
  uni.navigateTo({
    url: props.url
  })
}

</script>

<style lang="scss" scoped>
.c-section {
  background-color: #fff;
  border-radius: 12px;
  // box-shadow: 0px 1px 0px 0px rgba(221, 221, 221, 1);
  min-height: 100rpx;
  margin-bottom: 24rpx;

  &.no-margin-bottom {
    margin-bottom: 0;
  }
}
</style>