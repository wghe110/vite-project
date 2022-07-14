<template>
  <div class="wrap">
    <header class="header" v-if="showHeader">
      头部 showHeader={{ showHeader }}
    </header>

    <div class="content">
      <aside class="aside" v-if="showAside">
        左侧 showAside={{ showAside }}
      </aside>

      <div class="inner-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  loadUserInfo,
  loadMenus,
  loadDicts,
  initHeaderAndAside,
  initToken,
} from "./pre-load";

export default {
  components: {},
  data() {
    return {};
  },
  beforeRouteEnter(to, from, next) {
    // 判断是否隐藏头部和左侧菜单
    initHeaderAndAside(to);
    // 判断是否携带token
    initToken(to);

    // 加载必须资源(菜单/必须字典/用户信息...)，阻塞资源
    Promise.all([loadUserInfo(), loadMenus(), loadDicts()]).then(next);
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