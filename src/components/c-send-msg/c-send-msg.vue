<template>
  <view :class="`c-send-msg ${status}`" @click="sendMsg">
    <text class="text">
      <slot>获取验证码</slot>
    </text>
    <text class="sending">正在发送</text>
    <text class="num">{{ count }}</text>
  </view>
</template>

<script setup>
import { watch, ref } from 'vue';

// props
const props = defineProps({
  countNum: {
    type: Number,
    default: 60
  },
  status: {
    type: String,
    default: 'default', // default-可点击 sending-发送中 countdown-倒计时中
  }
})
//emits
const emit = defineEmits(['send', 'update:status'])

const count = ref()
const sendMsg = () => {
  if (props.status !== 'default') return;
  count.value = props.countNum
  emit('send')
}

const countDown = () => {
  count.value -= 1;
  if (count.value >= 0) {
    setTimeout(countDown, 1000)
  } else {
    emit('update:status', 'default')
  }
}

watch(() => props.status, (val) => {
  if (val === 'countdown') countDown()
})


</script>

<style lang="scss" scoped>
.c-send-msg {
  position: relative;
  display: inline-block;

  &.countdown {
    >.text {
      opacity: 0;
      pointer-events: none;
    }

    >.num {
      display: block;
    }
  }

  &.sending {
    >.text {
      opacity: 0;
      pointer-events: none;
    }

    >.sending {
      display: block;
    }
  }

  >.text {
    font-size: 30rpx;
    color: #36A4FF;
    font-weight: 400;
  }

  >.num {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    color: #bbb;
    display: none;
    font-weight: 600;
  }

  >.sending {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    color: #bbb;
    display: none;
    white-space: nowrap;
  }
}
</style>