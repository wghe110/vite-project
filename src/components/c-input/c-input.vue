<template>
  <view :class="`c-input ${hasLine ? 'has-line' : ''}`">
    <slot name="pre"></slot>
    <view class="content">
      <text class="icon-required" v-if="isRequired">*</text>
      <view class="label" v-if="label" :style="`width:${labelWidth}`">
        {{ label }}
      </view>

      <view class="textarea-box" v-if="type === 'textarea'">
        <textarea class="textarea" v-model="val" :placeholder="placeholder" :rows="rows" :maxlength="maxlength || 10000"
          placeholder-class="c-input-placeholder" :style="`overflow-y: auto; height: ${height}`"></textarea>
        <view class="limit" v-if="showLimitNum && maxlength">{{ val.length }}/{{ maxlength }}</view>
      </view>

      <view class="input-box" v-else>
        <input type="text" v-model="val" class="input" placeholder-class="c-input-placeholder"
          :maxlength="maxlength || 10000" :placeholder="placeholder" selection-start="-1" selection-end="-1"
          cursor="-1">

        <view class="limit" v-if="showLimitNum && maxlength">{{ val.length }}/{{ maxlength }}</view>
      </view>
    </view>
    <slot name="suf"></slot>
  </view>
</template>

<script setup>
import { computed } from 'vue';
// props
const props = defineProps({
  modelValue: {
    type: String,
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
  type: {
    type: String,
    default: 'text'
  },
  rows: {
    type: Number,
    default: 3,
  },
  maxlength: {
    type: [Number, String],
    default: '-1'
  },
  height: {
    type: String,
    default: ''
  },
  showLimitNum: {
    type: Boolean,
    default: false,
  }
})

// emits
const emit = defineEmits(['update:modelValue', 'input', 'change'])

const val = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
    emit('input', val)
    emit('change', val)
  }
})
</script>

<style lang="scss" scoped>
.c-input {
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

    >.input-box {
      flex: 1;
      min-width: 0%;
      display: flex;

      >.input {
        line-height: 60rpx;
        height: 60rpx;
        width: auto;
        font-size: 30rpx;
        color: #666;
        flex: 1;
      }


      >.limit {
        font-size: 30rpx;
        color: #666666;
        letter-spacing: 0;
        font-weight: 400;
        line-height: 60rpx;
        margin-left: 12rpx;
      }
    }

    >.textarea-box {
      flex: 1;
      min-width: 0%;

      >.textarea {
        font-size: 30rpx;
        color: #666;
        width: 100%;
      }

      >.limit {
        font-size: 30rpx;
        color: #666666;
        letter-spacing: 0;
        font-weight: 400;
        line-height: 30rpx;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>

<style lang="scss">
.c-input-placeholder {
  color: #bbb;
  font-weight: 400;
  font-size: 30rpx;
}
</style>
