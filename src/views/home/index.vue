<template>
  <div class="wrap">
    <ComHeader v-if="showHeader" />

    <div class="content">
      <ComAside v-if="showAside" />

      <div class="inner-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import createLoading from "./preload/loading";
import loadUserInfo from "./preload/load-user-info";
import loadDicts from "./preload/dict";
import initHeaderAndAside from "./preload/init-header-aside";
import initToken from "./preload/init-token";
import loadMenus from "./preload/init-menus";

import ComHeader from "./header/index.vue";
import ComAside from "./aside/index.vue";

export default {
  components: {
    ComHeader,
    ComAside,
  },
  data() {
    return {};
  },
  beforeRouteEnter(to, from, next) {
    // 判断是否隐藏头部和左侧菜单
    initHeaderAndAside(to);
    // 判断是否携带token
    initToken(to);

    // 加载必须资源(菜单/必须字典/用户信息...)，阻塞资源
    const loading = createLoading();
    loading.show();

    Promise.all([loadUserInfo(), loadMenus(), loadDicts()])
      .then(next)
      .finally(() => {
        loading.hide();
      });
  },
  computed: {
    ...mapState(["showHeader", "showAside"]),
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.wrap {
  height: 100vh;
  display: flex;
  flex-direction: column;
  > .header {
    height: 64px;
    background-color: #ccc;
  }
  > .content {
    flex: 1;
    min-height: 400px;
    display: flex;
    > .aside {
      width: 240px;
      background-color: #999;
    }
    > .inner-content {
      flex: 1;
      min-width: 500px;
      overflow: auto;
    }
  }
}
</style>