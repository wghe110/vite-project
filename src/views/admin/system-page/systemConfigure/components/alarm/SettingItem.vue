<template>
  <div class="wrap-setting">
    <div class="tit">
      <iconpark-icon
        :name="icon"
        size="16px"
        class="icon"
        v-if="icon"
      ></iconpark-icon>
      <span>{{ name }}</span>
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

    <div :class="`info ${disabled ? 'disabled' : ''}`">
      <slot></slot>
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap-setting {
  margin-bottom: 32px;
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
    > span {
      color: #242627;
      font-family: PingFang SC;
      font-size: 14px;
      line-height: 20px;
      font-weight: bolder;
      margin-right: 24px;
    }
  }
  > .info {
    color: #242627;
    font-family: PingFang SC;
    font-size: 14px;
    display: flex;
    align-items: center;
    line-height: 20px;
    margin-left: 22px;
    &.disabled {
      color: #a5a9b1;
    }
  }
}
</style>