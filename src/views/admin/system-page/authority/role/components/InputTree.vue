<template>
  <div class="wrap-input-tree">
    <el-tree v-bind="$attrs" v-on="$listeners" ref="treeRef">
      <template #default="{ node, data }">
        <slot :data="data" :node="node"></slot>
      </template>
    </el-tree>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.wrap-input-tree {
  border: 1px solid #cecece;
  padding: 6px;
  height: 40vh;
  overflow: auto;
}
</style>