<template>
  <div class="filter">
    <el-row :gutter="gutter">
      <slot></slot>
    </el-row>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    gutter: {
      type: Number,
      default: 16,
    },
  },
};
</script>

<style lang="scss" scoped>
.filter {
  background-color: #fff;
  border-top: 1px solid var(--el-color-primary);
  padding: 20px;
}
</style>