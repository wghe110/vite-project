<template>
  <div class="wrap">
    <aside class="aside">
      <van-cell-group>
        <van-cell
          :class="{ menu: true, checked: item.path === activeMenu }"
          v-for="item in menus"
          :key="item.path"
          @click="setIframeSrcFn(item)"
          >{{ item.name }}</van-cell
        >
      </van-cell-group>
    </aside>

    <section class="content">
      <iframe
        :src="activeMenu"
        frameborder="0"
        width="375"
        height="667"
        class="views"
        ref="iframeRef"
      ></iframe>
    </section>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      activeMenu: "/#/select",
      menus: [
        {
          name: "select 下拉框",
          path: "/#/select",
        },
        {
          name: "select-radio 下拉框",
          path: "/#/select-radio",
        },
        {
          name: "multiple-select 多选下拉框",
          path: "/#/multiple-select",
        },
        {
          name: "multiple-select-checkbox 多选下拉框",
          path: "/#/multiple-select-checkbox",
        },
        {
          name: "slider 滑块",
          path: "/#/slider",
        },
        {
          name: "datetime-picker 时间选择",
          path: "/#/datetime-picker",
        },
        {
          name: "upload 上传",
          path: "/#/upload",
        },
        {
          name: "cascader 级联选择",
          path: "/#/cascader",
        },
        {
          name: "tree-multiple-select 分类多选",
          path: "/#/tree-multiple-select",
        },

        {
          name: "form 表单",
          path: "/#/form",
        },
      ],
    };
  },
  created() {
    const { path, query } = this.$route;
    if (path === "/demo") {
      if (query.path) this.activeMenu = query.path;
    }
  },
  methods: {
    setIframeSrcFn(item) {
      if (this.activeMenu === item.path) return;

      this.activeMenu = item.path;
      this.$router.push({
        query: {
          path: item.path,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.aside {
  width: 240px;
  background-color: #fff;
  box-shadow: 0 8px 12px #ebedf0;
  padding: 30px 0;
  box-sizing: border-box;
}
.wrap {
  height: 100vh;
  background-color: #f7f8fa;
  display: flex;
  overflow: auto;
}
.content {
  padding: 30px;
  flex: 1;
  min-width: 0%;
  overflow: auto;
}
.views {
  box-shadow: #ebedf0 0 4px 12px;
}
.menu {
  cursor: pointer;
  &.checked {
    background-color: #f7f8fa;
    font-weight: bolder;
  }
}
</style>