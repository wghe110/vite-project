<template>
  <div class="wrap">
    <aside class="aside">
      <van-cell-group>
        <van-cell
          class="menu"
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
      ],
    };
  },
  methods: {
    setIframeSrcFn(item) {
      this.activeMenu = item.path;
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
}
.content {
  padding: 30px;
  flex: 1;
  min-width: 0%;
}
.views {
  box-shadow: #ebedf0 0 4px 12px;
}
.menu {
  cursor: pointer;
}
</style>