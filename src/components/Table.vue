<template>
  <div class="wrap-table">
    <el-table v-bind="$attrs" ref="tableRef" v-on="$listeners" height="100%">
      <slot></slot>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.wrap-table {
  height: 100%;
}
</style>