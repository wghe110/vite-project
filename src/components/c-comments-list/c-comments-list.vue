<template>
  <view class="comments-list">
    <view class="comment" v-for="item in list" :key="item.id">
      <image :src="item.avatar || default_pic" class="pic" mode="aspectFill" />
      <view class="info">
        <navigator open-type="navigate" hover-class="navigator-hover" class="name">{{ item.createName || '--' }}
        </navigator>
        <view class="words" @click="answerFn">{{ item.content || '--' }}</view>
        <view class="others">
          <text class="create-date">{{ item.updateTime || '--' }}</text>
          <!-- <navigator url="/pages/" class="answer" open-type="navigate" hover-class="navigator-hover" @click="answerFn">
            回复</navigator> -->
        </view>
      </view>
    </view>

    <c-empty v-if="list.length === 0" text="暂无评论"></c-empty>
  </view>
</template>

<script setup>
import default_pic from '@/static/group-members/默认头像@2x.png'

// props
const props = defineProps({
  list: {
    type: Array,
    default() {
      return []
    }
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
const emit = defineEmits(['answer'])

const answerFn = () => {
  console.log('answerFn')
  emit('answer')
}
</script>

<style lang="scss" scoped>
.comments-list {
  >.comment {
    display: flex;

    >.pic {
      width: 66rpx;
      height: 66rpx;
      border-radius: 50%;
      border: 0.63px solid rgba(0, 0, 0, 0.20);
      margin-right: 16rpx;
    }

    >.info {
      flex: 1;
      min-width: 0%;

      >.name {
        font-size: 30rpx;
        color: #3D5C99;
        font-weight: 400;
        line-height: 42rpx;
        margin-bottom: 12rpx;
      }

      >.words {
        font-size: 32rpx;
        color: #333333;
        letter-spacing: 0;
        text-align: justify;
        font-weight: 400;
        line-height: 45rpx;
        margin-bottom: 12rpx;
      }

      >.others {
        display: flex;
        align-items: center;

        >.create-date {
          font-size: 28rpx;
          color: #999999;
          line-height: 40rpx;
          font-weight: 400;
        }

        >.answer {
          font-size: 28rpx;
          color: #36A4FF;
          line-height: 40rpx;
          font-weight: 400;
          margin-left: 24rpx;
        }
      }
    }
  }
}
</style>