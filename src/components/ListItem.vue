<template>
  <div class="wrap-list-item">
    <slot name="label">
      <label :class="align" :style="{ width: lWidth }">{{ label }}</label>
    </slot>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    labelAlign: {
      type: String,
      default: "",
    },
    labelWidth: {
      type: String,
      default: "",
    },
  },
  computed: {
    align() {
      const { labelAlign, $parent } = this;
      return labelAlign || $parent.labelAlign || "left";
    },
    lWidth() {
      const { labelWidth, $parent } = this;
      return labelWidth || $parent.labelWidth || "56px";
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap-list-item {
  display: flex;
  & + .wrap-list-item {
    margin-top: 12px;
  }
  > label {
    color: #8e929a;
    font-family: PingFang SC;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.4;
    margin-right: 16px;
    &.right {
      text-align: right;
    }
  }
  > .content {
    flex: 1;
    min-width: 40px;
    color: #242627;
    font-family: PingFang SC;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.4;
  }
}
</style>