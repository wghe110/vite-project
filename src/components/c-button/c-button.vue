<template>
  <view :class="`c-button ${block ? 'block' : ''} ${size} ${disabled ? 'disabled' : ''} ${type}`" @click="goTo">
    <slot name="pre"></slot>
    <text class="con">
      <slot></slot>
    </text>
    <slot name="suf"></slot>
  </view>
</template>

<script setup>
// props
const props = defineProps({
  block: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'primary'
  },
  url: {
    type: String,
    default: ''
  }
})

const goTo = () => {
  if (props.url) {
    uni.navigateTo({
      url: props.url
    })
  }
}
</script>

<style lang="scss" scoped>
.c-button {
  padding: 20rpx 24rpx;
  box-sizing: border-box;
  height: 90rpx;
  display: flex;
  border-radius: 45rpx;
  align-items: center;
  justify-content: center;

  &.primary {
    background-color: #36A4FF;
  }

  &.default {
    border: 1px solid rgba(54, 164, 255, 1);

    >.con {
      color: #36A4FF;
    }
  }

  &.block {
    width: 100%;
  }

  &.small {
    padding: 15rpx 20rpx;
    height: 80rpx;
  }

  &.disabled {
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.5;
  }

  >.con {
    font-size: 36rpx;
    color: #FFFFFF;
    font-weight: 400;
  }
}
</style>
