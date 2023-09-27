<template>
  <div class="wrap-pagination">
    <el-pagination
      background
      :page-sizes="[10, 20, 30, 40]"
      layout="total, prev, pager, next, sizes, jumper"
      v-bind="$attrs"
      v-on="$listeners"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.wrap-pagination {
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
}
</style>