<template>
  <div class="wrap-setting">
    <div class="tit">
      <iconpark-icon
        :name="icon"
        size="16px"
        class="icon"
        v-if="icon"
      ></iconpark-icon>
      <span class="name">{{ name }}</span>
      <span class="info">{{ info }}</span>
      <el-switch
        v-bind="$attrs"
        v-on="$listeners"
        :active-value="1"
        :inactive-value="0"
        active-color="#409eff"
        inactive-color="#dcdfe6"
      >
      </el-switch>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "--",
    },
    info: {
      type: String,
      default: "--",
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap-setting {
  margin-bottom: 26px;
  &:last-child {
    margin-bottom: 0;
  }
  > .tit {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    > .icon {
      margin-right: 6px;
    }
    > .name {
      color: #242627;
      font-family: PingFang SC;
      font-size: 14px;
      line-height: 20px;
      font-weight: bolder;
      margin-right: 24px;
    }
    > .info {
      color: #a5a9b1;
      font-family: PingFang SC;
      font-size: 14px;
      line-height: 20px;
      min-width: 190px;
      margin-right: 24px;
    }
  }
}
</style>