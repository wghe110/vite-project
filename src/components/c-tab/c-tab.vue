<template>
  <view class="c-tab">
    <view :class="`item ${item.value === modelValue ? 'checked' : ''}`" v-for="item in options" :key="item.value"
      @click="checkFn(item)">
      <text class="text">{{ item.text }}</text>
    </view>
  </view>
</template>

<script setup>
// props
const props = defineProps({
  modelValue: String,
  options: {
    type: Array,
    default() {
      return []
    }
  },
})

// emits
const emit = defineEmits(['update:modelValue', 'input', 'change'])

const checkFn = (item) => {
  const { value } = item
  emit('update:modelValue', value)
  emit('input', value)
  emit('change', value)
}
</script>

<style lang="scss" scoped>
.c-tab {
  height: 100rpx;
  display: flex;
  box-shadow: 0 6rpx 6rpx #ccc;
  background-color: #fff;
  position: relative;
  z-index: 12;

  >.item {
    flex: 1;
    min-width: 0%;
    display: flex;
    align-items: center;
    justify-content: center;

    &.checked {
      position: relative;

      >.text {
        color: #36A4FF;
        font-weight: 600;
        ;
      }

      &::after {
        content: '';
        height: 6rpx;
        width: 40rpx;
        border-radius: 3rpx;
        position: absolute;
        bottom: 14rpx;
        left: 50%;
        transform: translateX(-50%);
        background-color: #36A4FF;
      }
    }

    >.text {
      font-size: 32rpx;
      color: #222222;
      letter-spacing: 0;
      font-weight: 400;
    }
  }
}
</style>