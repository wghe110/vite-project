<template>
  <view class="wrap">
    <image src="@/static/welcome.gif" mode="widthFix" class="pic" />
  </view>
</template>

<script setup>
import login from '@/login/index'
const isProd = import.meta.env.PROD

if (!isProd) {
  login().then(() => {
    console.log('登录成功')
    // 跳转到首页
    uni.switchTab({
      url: '/pages/home/index'
    })
  }).catch(() => {
    console.log('登录失败')
    // 跳转到注册页
    uni.redirectTo({
      url: '/pages/registered/index'
    })
  })
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  >.pic {
    width: 450rpx;
  }
}
</style>
