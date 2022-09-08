<template>
  <c-wrap>
    <view class="inner-con">
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

            <uni-forms-item name="addr">
              <c-input is-required label="详细地址" v-model="formState.addr" placeholder="请输入">
                <template #suf>
                  <uni-icons type="location-filled" size="26" color="#36A4FF" @click="chooseLocation"></uni-icons>
                </template>
              </c-input>
            </uni-forms-item>

            <uni-forms-item name="advice">
              <c-input type="textarea" v-model="formState.advice" placeholder="请详细描述求助内容" maxlength="300"
                show-limit-num>
              </c-input>
            </uni-forms-item>

            <uni-forms-item name="url">
              <c-input label="链接地址" v-model="formState.url" placeholder="请输入"></c-input>
            </uni-forms-item>

            <uni-forms-item name="reg">
              <c-input label="正则" v-model="formState.reg" placeholder="请输入小写字母"></c-input>
            </uni-forms-item>

            <uni-forms-item name="opt">
              <c-input label="自定义" v-model="formState.opt" placeholder="请输入3到5的数字"></c-input>
            </uni-forms-item>

            <uni-forms-item name="vercode">
              <c-input label="验证码" v-model="formState.vercode" placeholder="请输入">
                <template #suf>
                  <view class="link">
                    <text class="line"></text>
                    <c-send-msg :count-num="10" v-model:status="status" @send="sendMsg">获取验证码</c-send-msg>
                  </view>
                </template>
              </c-input>
            </uni-forms-item>

            <uni-forms-item name="sex">
              <c-select label="性别" v-model="formState.sex" placeholder="请选择" :options="opt.sex">
              </c-select>
            </uni-forms-item>

            <uni-forms-item name="birthday">
              <c-date-picker label="出生年月" v-model="formState.birthday" :has-line="false" placeholder="请选择" type="date">
              </c-date-picker>
            </uni-forms-item>
          </uni-forms>
        </c-section>
      </view>
      <c-button block @tap="submit">确定</c-button>
    </view>

    <template #suf>
      <tab-bar model-value="/pages/form/index"></tab-bar>
    </template>
  </c-wrap>

</template>

<script setup>
import TabBar from '@/pages/common/TabBar.vue'
import { ref, reactive, toRaw } from 'vue'
import validate from '@/utils/validate'
import rules from './rules'

const formState = reactive({})
const formRef = ref()
const opt = {
  sex: [
    { value: '0', text: '男' },
    { value: '1', text: '女' },
  ]
}

const submit = () => {
  validate(rules, toRaw(formState)).then((res) => {
    console.log('校验通过：', res)

    uni.showLoading({
      title: '正在提交',
      mask: true
    })

    setTimeout(() => {
      uni.hideLoading()
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

const status = ref('default')
const sendMsg = () => {
  status.value = 'sending';
  setTimeout(() => {
    status.value = 'countdown';
  }, 1000)
}

// 获取位置
const chooseLocation = () => {
  uni.chooseLocation({
    success(res) {
      console.log('chooseLocation=====', res)
      formState.addr = `${res.address} ${res.name}`
    }
  })
}
</script>

<style lang="scss" scoped>
.inner-con {
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
