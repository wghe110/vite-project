<template>
  <div class="wrap-menus">
    <el-menu
      text-color="#242627"
      active-text-color="#fff"
      mode="horizontal"
      :unique-opened="true"
      :collapse="collapse"
      :collapse-transition="false"
      :default-active="activePath"
      @select="selectFn"
    >
      <MenuComVue :list="menus" />
    </el-menu>
  </div>
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
  overflow: hidden;
  // 自定义菜单样式
  ::v-deep {
    .el-menu {
      background-color: transparent;
      display: flex;
    }
    .el-menu.el-menu--horizontal {
      border-bottom: none;
    }
    .el-submenu {
      &.is-active .el-submenu__title {
        background-color: #0084ff;
      }
      & + .el-submenu {
        margin-left: 2px;
      }
      .el-submenu__title {
        height: 40px;
        line-height: 40px;
        border-bottom: none;
        border-radius: 4px;
        padding: 0 14px;
        color: #fff !important;
        &:hover {
          background-color: #0084ff;
        }
        i {
          color: #fff;
        }
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
.el-menu--popup .el-menu-item {
  &.is-active,
  &:hover i,
  &:hover {
    color: #2d8cf0 !important;
    background-color: #f0faff;
  }
}
</style>