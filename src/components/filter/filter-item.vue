<template>
  <el-col :span="span">
    <div class="filter-item">
      <label>{{ label || "--" }}</label>
      <span>
        <slot></slot>
      </span>
    </div>
  </el-col>
</template>

<script lang="ts">
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    span: {
      type: Number,
      default: 6,
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-item {
  display: flex;
  align-items: center;
  > label {
    margin-right: 16px;
    color: #4b4b4b;
    font-size: 14px;
  }
  > span {
    flex: 1;
    flex-shrink: 1;
  }
}
</style>