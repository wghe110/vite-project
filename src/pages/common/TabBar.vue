<template>
  <view class="tab-bar">
    <view :class="`item ${item.pagePath === modelValue ? 'checked' : ''}`" v-for="item in tabList" :key="item.pagePath"
      @click="checkFn(item)">
      <image class="img default" :src="item.iconPath" mode="aspectFit" />
      <image class="img active" :src="item.selectedIconPath" mode="aspectFit" />
      <text class="name">{{ item.text }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'

import pic_qdt from '@/static/tabbar/group-dt.png'
import pic_qdt_active from '@/static/tabbar/group-dt-active.png'
import pic_qcy from '@/static/tabbar/group-mem.png'
import pic_qcy_active from '@/static/tabbar/group-mem-active.png'
import pic_zccx from '@/static/tabbar/group-zc.png'
import pic_zccx_active from '@/static/tabbar/group-zc-active.png'
import pic_qzx from '@/static/tabbar/group-center.png'
import pic_qzx_active from '@/static/tabbar/group-center-active.png'
import pic_wd from '@/static/tabbar/personal.png'
import pic_wd_active from '@/static/tabbar/personal-active.png'

// props
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
})

const tabList = [
  {
    pagePath: '/pages/home/index',
    text: '首页',
    iconPath: pic_qdt,
    selectedIconPath: pic_qdt_active
  },
  {
    pagePath: '/pages/form/index',
    text: '表单',
    iconPath: pic_qcy,
    selectedIconPath: pic_qcy_active
  },
  {
    pagePath: '/pages/out-link/index',
    text: '外链',
    iconPath: pic_zccx,
    selectedIconPath: pic_zccx_active
  },
  {
    pagePath: '/pages/custom-navbar/index',
    text: '自定义头部',
    iconPath: pic_qzx,
    selectedIconPath: pic_qzx_active
  },
]

const checkFn = (item) => {
  const { pagePath } = item;

  if (pagePath === props.modelValue) return;
  // console.log('checkFn', item)
  uni.switchTab({
    url: pagePath
  })
}

onShow(() => {
  uni.hideTabBar({
    animation: false
  })
})
</script>

<style lang="scss" scoped>
.tab-bar {
  position: relative;
  display: flex;
  background-color: #fff;
  box-shadow: 0px -2px 2px 0px rgba(0, 0, 0, 0.1);
  height: 100rpx;
  overflow: hidden;
  z-index: 9;

  >.item {
    flex: 1;
    min-width: 0%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &.checked {
      >.img {
        &.default {
          display: none;
        }

        &.active {
          display: flex;
        }
      }

      >.name {
        color: #36A4FF;
        font-weight: 500;
      }
    }

    >.img {
      height: 40rpx;
      margin-bottom: 8rpx;
      width: 40rpx;

      &.active {
        display: none;
      }
    }

    >.name {
      font-size: 20rpx;
      color: #666666;
      letter-spacing: 0;
      font-weight: 400;
      line-height: 28rpx;
    }
  }
}
</style>