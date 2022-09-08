<template>
  <view class="wrap">
    <slot name="pre"></slot>
    <view class="content">
      <slot></slot>
    </view>
    <slot name="suf"></slot>
  </view>
</template>

<style lang="scss" scoped>
.wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f0f2f5;

  >.content {
    flex: 1;
    min-height: 0%;
    overflow: auto;
  }
}
</style>