<template>
  <view>
    <uni-datetime-picker v-bind="$attrs" v-model="pickerVal" ref="pickerRef">

      <view :class="`c-date-picker ${hasLine ? 'has-line' : ''}`">
        <slot name="pre"></slot>
        <view class="content">
          <text class="icon-required" v-if="isRequired">*</text>
          <view class="label" v-if="label" :style="`width:${labelWidth}`">
            {{ label }}
          </view>
          <view class="picker-box" @click="showPop">
            <view class="placeholder" v-if="!modelValue">{{ placeholder }}</view>
            <view class="val-box">{{ modelValue }}</view>

            <view class="clear" @click.stop="clearFn" v-if="clearable && modelValue">
              <uni-icons type="clear" color="#bbb" size="20"></uni-icons>
            </view>
            <uni-icons type="calendar" color="#bbb" size="20"></uni-icons>
          </view>
        </view>
        <slot name="suf"></slot>
      </view>

    </uni-datetime-picker>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue';

// props
const props = defineProps({
  modelValue: {
    type: [String, Number, Array],
    default: ''
  },
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
    default: '135rpx'
  },
  placeholder: {
    type: String,
    default: ''
  },
  isRequired: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: true,
  },
})

// emits
const emit = defineEmits(['update:modelValue', 'input', 'change'])

const pickerRef = ref()
const pickerVal = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
    emit('input', val)
    emit('change', val)
  }
})

const clearFn = () => {
  pickerRef.value.clear()
}

</script>

<style lang="scss" scoped>
.c-date-picker {
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
      color: red;
      font-weight: 600;
      position: absolute;
      margin-left: -14rpx;
      margin-top: 10rpx;
    }

    >.label {
      line-height: 60rpx;
      color: #333;
      font-size: 30rpx;
      margin-right: 24rpx;
      font-weight: 600;
    }

    >.picker-box {
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