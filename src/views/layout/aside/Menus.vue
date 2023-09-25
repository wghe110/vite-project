<template>
  <el-scrollbar style="height: 100%">
    <div class="wrap-menus">
      <el-menu
        active-text-color="#fff"
        :unique-opened="true"
        :collapse="collapse"
        :collapse-transition="false"
        :default-active="activePath"
        @select="selectFn"
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
  data() {
    return {};
  },
  computed: {
    ...mapState(["menus", "activePath"]),
  },
  methods: {
    selectFn(index, indexPath) {
      const { path } = this.$route;
      if (path === index) return;

      this.$store.commit("setActivePath", index);
      this.$router.push(index);
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
      > i {
        color: #fff;
      }
    }
    .el-menu-item,
    .el-submenu__title,
    .el-submenu__title i {
      color: #c3c5ca;
    }
    .el-menu--collapse {
      .el-submenu__title > i,
      .el-menu-item > i {
        margin: 0;
        font-size: 20px;
        color: #fff;
      }
      .el-menu-item,
      .el-submenu__title {
        text-align: center;
      }
      .el-submenu.is-active {
        background-color: #2d8cf0;
      }
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
.el-menu--popup .el-menu-item.is-active {
  color: #2d8cf0 !important;
  background: #f0faff;
}
</style>