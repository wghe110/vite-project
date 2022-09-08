<template>
  <view class="wrap">
    <view style="margin-bottom: 80rpx">
      <c-section class="opt-form">
        <uni-forms ref="formRef" :modelValue="formState">
          <uni-forms-item name="name">
            <c-input label="真实姓名" v-model="formState.name" placeholder="请输入"></c-input>
          </uni-forms-item>

          <uni-forms-item name="cards">
            <c-input label="身份证号" v-model="formState.cards" placeholder="请输入"></c-input>
          </uni-forms-item>

          <uni-forms-item name="phone">
            <c-input label="手机号码" v-model="formState.phone" placeholder="请输入"></c-input>
          </uni-forms-item>



          <uni-forms-item name="code">
            <c-input label="验证码" v-model="formState.code" placeholder="请输入">
              <template #suf>
                <view class="link">
                  <text class="line"></text>
                  <c-send-msg :count-num="60" v-model:status="status" @send="sendMsg">获取验证码</c-send-msg>
                </view>
              </template>
            </c-input>
          </uni-forms-item>


        </uni-forms>
      </c-section>
    </view>
    <c-button block @tap="submit">确定</c-button>
  </view>
</template>

<script setup>
import { ref, reactive, toRaw } from 'vue'
import validate from '@/utils/validate'
import rules from './rules'
import request from '@/apis/index'
import apis from '@/pages/index/api'

const formState = reactive({})
const formRef = ref()


const submit = () => {
  validate(rules, toRaw(formState)).then((res) => {
    // console.log('校验通过：', res)
    uni.showLoading({
      title: '正在提交',
      mask: true
    })

    const params = toRaw(formState)
    request.post('/uc/api/mini/bind', params)
      .then((res) => {
        // 更新token和用户信息
        const { token } = res;
        uni.setStorageSync('token', token)
        uni.setStorageSync('user', res)

        // 绑定成功 跳转到群动态
        uni.switchTab({
          url: '/pages/group-dynamic/index'
        })

        setTimeout(() => {
          uni.showToast({
            title: '实名认证成功'
          })
        }, 0)
      })
  }).catch(err => {
    console.log('校验不通过：', err)
    uni.showToast({
      title: err[0].errorMessage,
      mask: true,
      icon: 'error'
    })
  })

  uni.showLoading({
    title: '正在加载',
    mask: true
  })
}

const status = ref('default')
const sendMsg = () => {
  const reg = /^(13[0-9]|14[014-9]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  if (formState.phone && reg.test(formState.phone)) {
    const params = {
      phone: formState.phone
    }
    status.value = 'sending';
    apis.getCode(params).then(res => {
      // console.log('getCode', res)
      // const code = Math.random().toString()
      // formState.code = code.slice(2, 8);
      status.value = 'countdown';
    }).catch(() => {
      status.value = 'default';
    })
  } else {
    uni.showToast({
      title: '号码格式错误',
      icon: 'error'
    })
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 100vh;
  background-color: #f0f2f5;
  padding: 24rpx;
  box-sizing: border-box;
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
