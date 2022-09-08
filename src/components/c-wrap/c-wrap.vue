<template>
  <view class="wrap" :style="`background-color: ${backgroundColor}`">
    <slot name="pre"></slot>
    <view class="content">
      <slot></slot>
    </view>
    <slot name="suf"></slot>

    <view class="safe-area" :style="`background-color: ${safeBarColor}`"></view>
  </view>
</template>

<script setup>
const props = defineProps({
  safeBarColor: {
    type: String,
    default: 'transparent'
  },
  backgroundColor: {
    type: String,
    default: '#f0f2f5'
  }
})
</script>

<style lang="scss" scoped>
.wrap {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f0f2f5;

  >.content {
    flex: 1;
    min-height: 0%;
    overflow: auto;
  }

  >.safe-area {
    height: env(safe-area-inset-bottom);
  }
}
</style>