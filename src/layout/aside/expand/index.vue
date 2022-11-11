<template>
  <div class="wrap--expand">
    <el-scrollbar height="100%">
      <Menu v-bind="$attrs"></Menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import Menu from './menu.vue'
</script>

<style lang="scss" scoped>
.wrap--expand {
  width: 255px;
  height: 100%;

  :deep {
    .el-scrollbar__view {
      >.c-menu {
        >.wrap--submenu {
          >.tit {
            height: 64px;
          }
        }

        >.wrap--menu {
          height: 64px;
        }
      }
    }
  }
}
</style>