<template>
  <view class="c-comments">
    <view class="content">
      <view class="input-box">
        <input type="text" v-model.trim="val" class="opt-input" maxlength="300" placeholder="请输入" />
      </view>
      <view class="btn-box">
        <c-button size="small" :disabled="!val" @tap="sendFn">发送</c-button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// props
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  noMarginBottom: {
    type: Boolean,
    default: false
  },
  url: {
    type: String,
    default: ''
  }
})
// emits
const emit = defineEmits(['update:modelValue', 'send'])

const val = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

const sendFn = () => {
  if (!val.value) return;
  emit('send', val.value)
}
</script>

<style lang="scss" scoped>
.c-comments {
  border-radius: 24rpx 24rpx 0 0;
  box-shadow: 0px -6px 6px 0px rgba(0, 0, 0, 0.12);
  background-color: #fff;
  padding-bottom: env(safe-area-inset-bottom);

  >.content {
    padding: 20rpx 24rpx;
    display: flex;


    >.input-box {
      flex: 1;
      min-width: 0%;
      border-radius: 45rpx;
      height: 80rpx;
      display: flex;
      align-items: center;
      background-color: #ececed;
      padding: 0 40rpx;

      >.opt-input {
        width: auto;
        position: relative;
        overflow: hidden;
        flex: 1;
        line-height: 1;
        font-size: 28rpx;
        height: 80rpx;
      }
    }

    >.btn-box {
      width: 142rpx;
      margin-left: 20rpx;
    }
  }
}
</style>
