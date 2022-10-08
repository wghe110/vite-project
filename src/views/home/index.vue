<template>
  <div class="wrap">
    <section class="col col-item">
      <div class="row row-1">
        <h2>3d单柱状图</h2>
        <div class="chart-box">
          <chart-bar @click="clickBar"></chart-bar>
        </div>
      </div>
      <div class="row row-1">
        <h2>多3d柱状图</h2>
        <div class="chart-box">1</div>
      </div>
      <div class="row row-1">
        <h2>堆叠3d柱状图</h2>
        <div class="chart-box">
          1
        </div>
      </div>
    </section>
    <section class="col col-item">
      <div class="row row-1">
        <h2>视频</h2>
        <div class="video-box">
          <video-item></video-item>
        </div>
      </div>
      <div class="row row-1">
        <h2>流媒体</h2>
        <div class="content-box">
          <!-- <video-stream></video-stream> -->
        </div>
      </div>
      <div class="row row-1">
        <h2>3d饼状图</h2>
        <div class="content-box">
          <chart-pie></chart-pie>
        </div>
      </div>
    </section>
    <section class="col flex-1" style="margin: 0 20px">
      <div class="row row-1">
        <h2>地图</h2>
        <div class="content-box">1</div>
      </div>
    </section>
    <section class="col col-item">
      <div class="row row-1">
        <h2>无缝滚动</h2>
        <div class="content-box">
          <div class="scroll-out">
            <demo-seamless></demo-seamless>
          </div>
        </div>
      </div>
      <div class="row row-1">
        <h2>定距离滚动</h2>
        <div class="content-box">
          1
        </div>
      </div>
      <div class="row row-1"></div>
    </section>
    <section class="col col-item">
      <div class="row row-1">
        <h2>特殊字体</h2>
        <div class="content-box">
          <font-face></font-face>
        </div>
      </div>
      <div class="row row-1">
        <h2>字体图标</h2>
        <div class="content-box">
          <icon-font></icon-font>
        </div>
      </div>
      <div class="row row-1">
        <h2>数字动画</h2>
        <div class="video-box">
          <number-demo></number-demo>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import FontFace from '../demo/font-face.vue'
import IconFont from '../demo/icon-font.vue'
import NumberDemo from '../demo/number-animation.vue'
import ChartBar from '../demo/echarts-bar-3d.vue'
import ChartPie from '../demo/echarts-pie-3d.vue'
import VideoItem from '../demo/video.vue'
import VideoStream from '../demo/stream-video.vue'
import DemoSeamless from '../demo/seamless-scroll.vue'

const clickBar = (params) => {
  console.log(params)
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 100%;
  position: relative;
  background-image: url('@/assets/preload/bg@2x.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
}

.col {
  display: flex;
  flex-direction: column;

  &.flex-1 {
    flex: 1;
    min-width: 0%;
  }

  &.col-item {
    width: 290px;

    &+.col-item {
      margin-left: 20px;
    }
  }
}

.row {
  background-color: rgba(0, 0, 0, .2);
  display: flex;
  flex-direction: column;

  &.row-1 {
    flex: 1;
    min-height: 0%;
  }

  &.row-2 {
    flex: 2;
    min-height: 0%;
  }

  &+.row {
    margin-top: 20px;
  }

  >h2 {
    color: #fff;
    margin: 0 0 24px;
    font-size: 20px;
    font-family: 'pingFang';
  }

  >.chart-box,
  >.video-box,
  >.content-box {
    flex: 1;
    min-height: 0%;
  }
}

.scroll-out {
  height: 100%;
}
</style>