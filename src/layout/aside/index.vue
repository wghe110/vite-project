<template>
  <aside class="wrap--aside">
    <section class="container--worktable"> </section>

    <section class="content">
      <el-scrollbar height="100%">
        <menu-expand :options="mock"></menu-expand>
      </el-scrollbar>
    </section>
  </aside>
</template>

<script setup>
import MenuExpand from './expand/index.vue'
import mock from './mock.js'
</script>

<style lang="scss" scoped>
.wrap--aside {
  height: 100%;
  border-right: 1px solid #E2E9F2;
  background-color: #F9FAFE;
  min-width: 96px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  >.container--worktable {
    height: 64px;
    background-color: #E6EEFF;
  }

  >.content {
    flex: 1;
    min-height: 200px;
  }
}
</style>