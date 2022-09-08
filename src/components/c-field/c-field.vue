<template>
  <view :class="`c-field ${hasLine ? 'has-line' : ''} ${size}`" @click="goFn">
    <slot name="pre"></slot>
    <view class="content">
      <slot></slot>
    </view>
    <slot name="suf"></slot>
    <view class="link-icon" v-if="isLink">
      <uni-icons type="forward" size="20" color="#ccc"></uni-icons>
    </view>
  </view>
</template>

<script setup>
// props
const props = defineProps({
  hasLine: {
    type: Boolean,
    default: true
  },
  isLink: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: ''
  },
  url: {
    type: String,
    default: ''
  }
})

const goFn = () => {
  if (props.url) uni.navigateTo({
    url: props.url
  })
}

</script>

<style lang="scss" scoped>
.c-field {
  // background-color: #fff;
  position: relative;
  padding: 24rpx;
  box-sizing: border-box;
  min-height: 108rpx;
  display: flex;
  align-items: center;

  &.has-line {
    &::after {
      content: '';
      height: 0px;
      border-bottom: 1px solid #ddd;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      transform: scaleY(0.5);
    }
  }

  &.mini {
    padding: 20rpx 24rpx;
    min-height: 80rpx;
  }


  >.content {
    color: #222;
    font-size: 32rpx;
    font-weight: 400;
    flex: 1;
    min-width: 0%;
  }

  .link-icon {
    font-size: 0;
  }
}
</style>