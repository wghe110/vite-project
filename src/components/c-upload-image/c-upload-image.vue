<template>
  <view :class="`c-upload-image ${hasLine ? 'has-line' : ''}`">
    <slot name="pre"></slot>

    <view class="content">
      <text class="icon-required" v-if="isRequired">*</text>
      <view class="label" v-if="label" :style="`width:${labelWidth}`">
        {{ label }}
      </view>

      <view class="input-box">
        <view class="success-box" v-for="(item, index) in itemList" :key="index" @click="perviewImg(index)">
          <image :src="item" v-if="item" mode="aspectFill" class="img"></image>
          <view class="icon-close" @click.stop="handleRemove(index)">
            <uni-icons type="clear" size="23" color="#B4B9BF"></uni-icons>
          </view>
        </view>
        <view :class="{ 'insert-btn': true, disabled: itemList.length >= maxlength }" @click="chooseImage">
          <uni-icons type="camera" size="40" color="#B8C1CC"></uni-icons>
          <text class="num">{{ itemList.length + 1 }} / {{ maxlength }}</text>
        </view>
      </view>
    </view>
    <slot name="suf"></slot>
  </view>
</template>

<script setup>
import { computed, defineEmits } from 'vue'

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
    default: ''
  },
  showLimitNum: {
    type: Boolean,
    default: false,
  },
  uploadUrl: {
    type: String,
    default: ''
  }
})

// emits
const emit = defineEmits(['update:modelValue', 'input', 'change'])

const itemList = computed({
  get() {
    return props.modelValue
  },
  set(itemList) {
    emit('update:modelValue', itemList)
    emit('input', itemList)
    emit('change', itemList)
  }
})

const perviewImg = (index) => {
  let urls = []
  if (index !== -1) {
    urls[0] = itemList.value[index]
  } else {
    urls = itemList.value
  }
  uni.previewImage({ urls })
}

const handleRemove = (index) => {
  itemList.value.splice(index, 1)
}

const uploadImage = (tempFilePaths) => {
  uni.uploadFile({
    url: props.uploadUrl,
    header: { 'token': uni.getStorageSync('token'), },
    filePath: tempFilePaths[0],
    name: 'file',
    success: (response) => {
      const res = JSON.parse(response.data)
      if (res?.code === 0) {
        const { url } = res.data
        itemList.value.push(url)
      }
    }
  })
}

const chooseImage = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      uploadImage(res.tempFilePaths)
    }
  })
}

</script>


<style lang="scss" scoped>
.c-upload-image {
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

      >.insert-btn {
        width: 120rpx;
        height: 120rpx;
        display: flex;
        background-color: #F0F2F5;
        border-radius: 6rpx;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        &.disabled {
          display: none;
        }

        > .num {
          font-size: 24rpx;
          color: #999999;
          text-align: center;
          font-weight: 400;
          line-height: 33rpx;
          position: relative;
          top: -10rpx;
        }
      }

      >.success-box {
        position: relative;
        width: 120rpx;
        height: 120rpx;
        margin-right: 12rpx;
        margin-bottom: 12rpx;
        background-color: #F0F2F5;
        border-radius: 6rpx;

        >.img {
          width: 100%;
          height: 100%;
          border-radius: 6rpx;
        }

        >.icon-close {
          width: 23px;
          height: 23px;
          background: #FFFFFF;
          border-radius: 50%;
          position: relative;
          right: -80rpx;
          top: -150rpx;
        }
      }
    }
  }
}
</style>
