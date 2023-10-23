<template>
  <div class="wrap-view">
    <h2 class="tit">效果示例</h2>
    <div class="content">
      <img
        src="@/assets/system/marker.svg"
        class="marker"
        style="left: 38px; top: 57px"
        v-show="config.areaShowSettingVo.earthMatterShow"
        alt=""
      />
      <img
        src="@/assets/system/marker2.svg"
        class="marker"
        style="right: 35px; top: 80px"
        v-show="config.areaShowSettingVo.earthMatterShow"
        alt=""
      />
      <img
        src="@/assets/system/fence.png"
        class="marker"
        style="right: 67px; top: 34px"
        v-show="config.areaShowSettingVo.fenceShow"
        alt=""
      />
      <img
        src="@/assets/system/car.svg"
        class="marker"
        style="left: 113px; top: 28px"
        v-show="config.areaShowSettingVo.carShow"
        alt=""
      />
      <div class="carNo" v-show="config.areaShowSettingVo.carMoShow">
        苏A00000
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap-view {
  > .tit {
    color: #52555c;
    font-family: PingFang SC;
    font-size: 14px;
    font-style: normal;
    line-height: 1;
    margin-bottom: 8px;
    font-weight: normal;
    margin-top: -24px;
  }
  > .content {
    width: 380px;
    height: 164px;
    background-image: url("@/assets/system/map.png");
    background-size: 100%;
    position: relative;
    .marker {
      position: absolute;
    }
    .carNo {
      position: absolute;
      left: 107px;
      top: 75px;
      width: 64px;
      height: 18px;
      color: #52555c;
      font-family: PingFang SC;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #d8dfe6;
    }
  }
}
</style>