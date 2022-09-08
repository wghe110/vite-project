<template>
  <view>
    <view :class="`c-select ${hasLine ? 'has-line' : ''}`">
      <slot name="pre"></slot>
      <view class="content">
        <text class="icon-required" v-if="isRequired">*</text>
        <view class="label" v-if="label" :style="`width:${labelWidth}`">
          {{ label }}
        </view>
        <view class="select-box" @click="showPop">
          <view class="placeholder" v-if="!valText">{{ placeholder }}</view>
          <view class="val-box">{{ valText }}</view>

          <view class="clear" @click.stop="clearFn" v-if="clearable && valText">
            <uni-icons type="clear" color="#bbb" size="20"></uni-icons>
          </view>
          <uni-icons type="forward" color="#bbb" size="20"></uni-icons>
        </view>
      </view>
      <slot name="suf"></slot>
    </view>

    <uni-popup ref="popupRef" type="bottom">
      <view class="pop" :style="`margin-bottom: -${safeBottomLen}px`">
        <view class="header">
          <text class="con">{{ label }}</text>
          <view class="icon-close" @click="cancelFn">
            <uni-icons type="closeempty" size="22" color="#999"></uni-icons>
          </view>
        </view>

        <view class="content">
          <view :class="`item ${isChecked(item) ? 'checked' : ''}`" v-for="item in options" :key="item.value"
            @click="checkedFn(item)">
            <view class="item-con" :style="`color: ${isChecked(item) ? checkedColor : ''}`">{{ item.text }}</view>
            <view class="item-icon">
              <uni-icons type="checkmarkempty" size="21" :color="checkedColor"></uni-icons>
            </view>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue';

// props
const props = defineProps({
  modelValue: String,
  hasLine: {
    type: Boolean,
    default: true
  },
  label: {
    type: String,
    default: ''
  },
  labelWidth: {
    type: String,
    default: '120rpx'
  },
  placeholder: {
    type: String,
    default: ''
  },
  isRequired: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array,
    default() {
      return []
    }
  },
  checkedColor: {
    type: String,
    default: "#36A4FF",
  },
  clearable: {
    type: Boolean,
    default: true,
  },
})

// emits
const emit = defineEmits(['update:modelValue', 'input', 'change'])

const popupRef = ref()
const showPop = () => {
  popupRef.value.open()
}

const valText = computed(() => {
  let text = props.modelValue;
  const obj = props.options.find(item => String(item.value) === String(props.modelValue))
  obj && (text = obj.text)

  return text;
})

const cancelFn = () => {
  popupRef.value.close()
}
const checkedFn = (obj) => {
  const { value } = obj;
  if (String(value) === String(props.modelValue)) return;

  emit("update:modelValue", value);
  emit("input", value);
  emit("change", value);

  cancelFn()
}

const isChecked = (obj) => {
  return String(obj.value) === String(props.modelValue);
}

const clearFn = () => {
  checkedFn({
    value: ''
  })
}

// 获取底部安全区域
const info = uni.getSystemInfoSync()
const safeBottomLen = info.safeAreaInsets.bottom || 0
</script>

<style lang="scss" scoped>
.c-select {
  display: flex;
  padding: 24rpx;
  position: relative;

  &.has-line {
    &::after {
      content: '';
      height: 0px;
      border-bottom: 1px solid #ddd;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      transform: scaleY(0.5);
    }
  }


  >.content {
    flex: 1;
    min-width: 0%;
    display: flex;

    >.icon-required {
      font-size: 30rpx;
      color: #FF3333;
      font-weight: 600;
      margin-top: 10rpx;
      margin-right: 6rpx;
    }

    >.label {
      line-height: 60rpx;
      color: #333;
      font-size: 30rpx;
      margin-right: 24rpx;
      font-weight: 600;
    }

    >.select-box {
      flex: 1;
      min-width: 0%;
      display: flex;
      line-height: 60rpx;

      >.val-box {
        flex: 1;
        min-width: 0%;
        font-size: 30rpx;
        color: #666;
      }

      >.clear {
        margin: 0 24rpx;
      }

      >.placeholder {
        color: #bbb;
        font-weight: 400;
        font-size: 30rpx;
      }
    }
  }
}

.pop {
  background-color: #fff;
  border-radius: 24rpx 24rpx 0 0;
  padding-bottom: env(safe-area-inset-bottom);

  >.header {
    padding: 36rpx 24rpx 24rpx;
    position: relative;
    display: flex;
    justify-content: center;

    >.con {
      margin: 0 24rpx;
      text-align: center;
      font-size: 30rpx;
      color: #333;
      font-weight: 600;
    }

    >.icon-close {
      position: absolute;
      right: 24rpx;
      top: 30rpx;
    }
  }

  >.content {
    padding: 24rpx;
    min-height: 300rpx;
    max-height: 60vh;
    overflow: auto;

    >.item {
      position: relative;
      display: flex;
      min-height: 108rpx;
      padding: 24rpx 0;
      align-items: center;
      box-sizing: border-box;

      &::after {
        content: '';
        height: 0;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        border-bottom: 1px solid #ddd;
        transform: scaleY(0.5);
      }

      &:last-child:not(:first-child) {
        &::after {
          display: none;
        }
      }

      &.checked {
        >.item-icon {
          display: block;
        }

        >.item-con {
          font-weight: 600;
        }
      }

      >.item-con {
        flex: 1;
        min-width: 0%;
        line-height: 1.4;
        display: flex;
        justify-content: center;
        font-size: 30rpx;
        color: #333;
      }

      >.item-icon {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        display: none;
      }
    }
  }
}
</style>
