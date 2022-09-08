<template>
  <c-wrap safe-bar-color="#fff">
    <view class="wrap">
      <view class="header">
        <view class="nav-bar" :style="`padding-top: ${navHeight}px`">
          <uni-nav-bar color="#fff" background-color="transparent" :border="false" />
        </view>

        <view class="con">
          <text class="tit">总积分</text>
          <text class="points">{{ info.totalScore || 0 }}</text>
          <view class="rank">积分排行：{{ info.no || '--' }}</view>
        </view>
      </view>

      <view class="content">
        <c-section>
          <c-field>
            <template #pre>
              <view class="flexBox">
                <image src="@/static/personal-center/奖章@2x.png" mode="widthFix" class="rule-pic" />
                <text class="rule-tit">积分规则</text>
              </view>
            </template>

            <template #suf>
              <!-- <text class="rule-tip">今日已累积</text>
            <text class="today-points">--分</text> -->
            </template>
          </c-field>

          <c-field v-for="item in activity" :key="item.type">
            <view class="active-tit">{{ item.name }}</view>
            <view class="active-intro">{{ item.tips }}</view>

            <template #suf>
              <c-button type="primary" disabled size="small" v-if="item.finished">已完成</c-button>
              <c-button type="default" size="small" v-else :url="item.path">去参与</c-button>
            </template>
          </c-field>
        </c-section>
      </view>
    </view>

    <template #suf>
      <tab-bar model-value="/pages/custom-navbar/index"></tab-bar>
    </template>
  </c-wrap>
</template>

<script setup>
import TabBar from '@/pages/common/TabBar.vue'
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app';

const navHeight = uni.getSystemInfoSync()['statusBarHeight']
const activity = ref([
  {
    type: 'login',
    name: '登录',
    tips: '每次首次登陆得2分',
    finished: false,
    path: ''
  },
  {
    type: 'addActive',
    name: '志愿者活动',
    tips: '参与志愿者活动得5分',
    finished: false,
    path: '/pages/group-center/volunteers-manage/index'
  },
  {
    type: 'gridConsult',
    name: '网格协商',
    tips: '参与网格协商得3分',
    finished: false,
    path: '/pages/group-center/grid-negotiate/index'
  },
  {
    type: 'gridVote',
    name: '网格投票',
    tips: '参与网格投票得3分',
    finished: false,
    path: '/pages/group-center/grid-vote/index'
  },
  {
    type: 'gridSuggestion',
    name: '网格建议',
    tips: '参与网格建议得2分',
    finished: false,
    path: '/pages/personal-center/my-advice/index'
  },
  {
    type: 'gridComplaint',
    name: '网格投诉',
    tips: '参与网格投诉得2分',
    finished: false,
    path: '/pages/personal-center/my-complaint/index'
  },
  {
    type: 'peopleHelp',
    name: '群众互助',
    tips: '领取群众互助得5分',
    finished: false,
    path: '/pages/group-center/need-help/index'
  },
])
const info = ref({})

const initFn = () => {
}

onShow(initFn)

</script>

<style lang="scss" scoped>
.wrap {
  >.header {
    background-color: #36a4ff;
    background-image: url(@/static/personal-center/nav_2x.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    >.con {
      height: 300rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: -70rpx;


      >.tit {
        font-size: 36rpx;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
        font-weight: 400;
        line-height: 50rpx;
      }

      >.points {
        font-family: DINPro-Bold;
        font-size: 100rpx;
        color: #FFFFFF;
        text-align: center;
        font-weight: 700;
        line-height: 128rpx;
      }

      >.rank {
        padding: 6rpx 32rpx;
        height: 50rpx;
        box-sizing: border-box;
        border-radius: 24rpx;
        background-color: rgba(255, 255, 255, 0.1);
        font-size: 26rpx;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
        font-weight: 400;
        display: flex;
        align-items: center;
      }
    }

  }

  >.content {
    padding: 24rpx;

    .flexBox {
      display: flex;
      align-items: center;
    }

    .rule-pic {
      width: 45rpx;
      margin-right: 12rpx;
    }

    .rule-tit {
      font-size: 34rpx;
      color: #222222;
      letter-spacing: 0;
      font-weight: 600;
    }

    .rule-tip {
      font-size: 28rpx;
      color: #333333;
      letter-spacing: 0;
      font-weight: 400;
    }

    .today-points {
      font-size: 28rpx;
      color: #36A4FF;
      letter-spacing: 0;
      font-weight: 400;
      margin-left: 12rpx;
    }

    .active-tit {
      font-size: 32rpx;
      color: #222222;
      letter-spacing: 0;
      font-weight: 600;
      line-height: 45rpx;
      margin-bottom: 12rpx;
    }

    .active-intro {
      font-size: 30rpx;
      color: #999999;
      letter-spacing: 0;
      font-weight: 400;
      line-height: 42rpx;
    }
  }
}
</style>