<template>
  <c-wrap>
    <view class="wrap">
      <view style="margin-bottom: 80rpx">
        <c-section class="opt-form">
          <uni-forms ref="formRef" :modelValue="formState">
            <uni-forms-item name="uname">
              <c-input label="真实姓名" v-model="formState.uname" placeholder="请输入"></c-input>
            </uni-forms-item>

            <uni-forms-item name="ID">
              <c-input label="身份证号" v-model="formState.ID" placeholder="请输入"></c-input>
            </uni-forms-item>

            <uni-forms-item name="phone">
              <c-input label="手机号码" v-model="formState.phone" placeholder="请输入"></c-input>
            </uni-forms-item>

            <uni-forms-item name="email">
              <c-input label="邮箱" v-model="formState.email" placeholder="请输入"></c-input>
            </uni-forms-item>
          </uni-forms>
        </c-section>
      </view>
      <c-button block @tap="submit">确定</c-button>
    </view>
  </c-wrap>

</template>

<script setup>
import { ref, reactive, toRaw } from 'vue'
import validate from '@/utils/validate'
import rules from './rules'

const formState = reactive({})
const formRef = ref()

const submit = () => {
  validate(rules, toRaw(formState)).then((res) => {
    console.log('校验通过：', res)

    uni.showLoading({
      title: '正在提交',
      mask: true
    })

    setTimeout(() => {
      uni.showToast({
        title: '注册成功'
      })

      uni.switchTab({
        url: '/pages/home/index'
      })
    }, 2000)
  }).catch(err => {
    console.log('校验不通过：', err)
    uni.showToast({
      title: err[0].errorMessage,
      mask: true,
      icon: 'error'
    })
    setTimeout(() => {
      uni.hideToast()
    }, 1500)
  })

  uni.showLoading({
    title: '正在加载',
    mask: true
  })
}


</script>

<style lang="scss" scoped>
.wrap {
  padding: 24rpx;
}

.link {
  position: relative;
  padding-left: 34rpx;
  line-height: 60rpx;

  >.line {
    position: absolute;
    left: 0;
    height: 44rpx;
    top: 8rpx;
    border-left: 1px solid #ddd;
    transform: scaleX(0.5);
  }
}
</style>
