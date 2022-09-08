<template>
  <view class="c-empty">
    <image :src="src" mode="widthFix" class="pic" :style="`width: ${picWidth}`" />
    <text class="con">{{ text }}</text>
  </view>
</template>

<script setup>
import empty_pic from '@/static/empty.png'

// props
const props = defineProps({
  src: {
    type: String,
    default: empty_pic
  },
  text: {
    type: String,
    default: '暂无任何内容',
  },
  picWidth: {
    type: String,
    default: '64%'
  }
})

</script>

<style lang="scss" scoped>
.c-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  >.pic {
    width: 60%;
    margin-bottom: 40rpx;
  }

  >.con {
    color: #222;
    font-size: 30rpx;
  }
}
</style>