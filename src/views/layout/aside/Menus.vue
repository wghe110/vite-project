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
        <MenuComVue :list="menus" />
      </el-menu>
    </div>
  </el-scrollbar>
</template>

<script>
import { mapState } from "vuex";
import MenuComVue from "./MenuCom.vue";

export default {
  components: {
    MenuComVue,
  },
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(["menus"]),
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
      > i {
        color: #fff;
      }
    }
    .el-menu-item,
    .el-submenu__title,
    .el-submenu__title i {
      color: #c3c5ca;
    }
  }
}
</style>

<style lang="scss">
.el-submenu__title,
.el-menu-item {
  > i {
    margin-right: 6px;
  }
}
</style>