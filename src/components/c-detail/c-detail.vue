<template>
  <view :class="`c-detail ${noSafeArea ? 'no-safe-area' : ''}`">
    <slot name="pre"></slot>

    <view class="content">
      <view class="inner-con">
        <slot name="con-pre"></slot>

        <view class="tit">{{ title }}</view>
        <view class="intro">
          <text class="author">{{ author }}</text>
          <text class="date">{{ date }}</text>
        </view>

        <view class="rich-box">
          <rich-text :nodes="article" class="rich-text"></rich-text>
        </view>

        <slot name="con-suf"></slot>
      </view>
    </view>

    <slot name="suf"></slot>
  </view>
</template>

<script setup>
import { ref } from 'vue'
// props
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  author: {
    type: String,
    default: '',
  },
  date: {
    type: String,
    default: ''
  },
  article: {
    type: String,
    default: ''
  },
  noSafeArea: {
    type: Boolean,
    default: false
  }
})

</script>
<style lang="scss" scoped>
.c-detail {
  height: 100vh;
  box-sizing: border-box;
  padding-bottom: env(safe-area-inset-bottom);
  display: flex;
  flex-direction: column;
  background-color: #fff;

  &.no-safe-area {
    padding-bottom: 0;
  }

  >.content {
    flex: 1;
    min-height: 0%;
    overflow: auto;

    >.inner-con {
      padding: 40rpx;

      >.tit {
        font-size: 54rpx;
        color: #333333;
        letter-spacing: 0;
        font-weight: 500;
        line-height: 75rpx;
        margin-bottom: 24rpx;
      }

      >.intro {
        display: flex;
        margin-bottom: 40rpx;

        >.author {
          font-size: 30rpx;
          color: #36A4FF;
          font-weight: 400;
          line-height: 42rpx;
          margin-right: 24rpx;
        }

        >.date {
          font-size: 30rpx;
          color: #999999;
          font-weight: 400;
          line-height: 42rpx;
        }
      }
    }
  }
}
</style>