<template>
  <el-scrollbar style="height: 100%">
    <div class="wrap-menus">
      <el-menu
        default-active="1-4-1"
        active-text-color="#fff"
        :unique-opened="true"
        :collapse="collapse"
        :collapse-transition="false"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item-group>
            <span slot="title">分组一</span>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <span slot="title">选项4</span>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>
  </el-scrollbar>
</template>

<script>
export default {
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap-menus {
  // 自定义菜单样式
  ::v-deep {
    .el-menu {
      background-color: #515a6e;
      border-right: none;
    }
    .el-submenu.is-opened > .el-menu {
      background-color: #363e4f;
    }
    .el-menu-item.is-active {
      background-color: #2d8cf0 !important;
    }
    .el-menu-item:focus,
    .el-menu-item:hover,
    .el-submenu__title:hover {
      background-color: transparent;
      color: #fff;
    }
    .el-menu-item,
    .el-submenu__title,
    .el-submenu__title i {
      color: #c3c5ca;
    }
  }
}
</style>