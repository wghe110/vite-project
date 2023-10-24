<template>
  <div class="wrap-input-tree">
    <div class="loading" v-show="loading">
      <i class="el-icon-loading"></i>
    </div>

    <el-tree v-show="!loading" v-bind="$attrs" v-on="$listeners" ref="treeRef">
      <template #default="{ node, data }">
        <slot :data="data" :node="node"></slot>
      </template>
    </el-tree>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap-input-tree {
  border: 1px solid #cecece;
  padding: 6px;
  height: 40vh;
  overflow: auto;
  .loading {
    text-align: center;
    font-size: 20px;
  }
}
</style>