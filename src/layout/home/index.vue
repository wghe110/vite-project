<template>
  <div class="wrap">
    <c-header v-if="showMenu"></c-header>

    <div class="container">
      <c-aside v-if="showMenu"></c-aside>

      <div class="container--right">
        <nav-tab v-if="showMenu"></nav-tab>
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import globalStore from '@/store/global'

import CHeader from './CHeader.vue'
import CAside from '../aside/index.vue'
import NavTab from './NavTab.vue'

import initHeaderAndAside from '@/preload/isShowMenu'
import initToken from '@/preload/token'
import createLoading from '@/preload/loading'
import loadUserInfo from '@/preload/user'
import loadMenus from "@/preload/menu";
import loadDicts from "@/preload/dict";

export default {
  beforeRouteEnter: async (to, from) => {
    // 判断是否隐藏头部和左侧菜单
    initHeaderAndAside();
    // 判断是否携带token
    initToken(to);

    // 创建loading
    const loading = createLoading();
    loading.show();

    // 加载必须资源(菜单/必须字典/用户信息...)，阻塞资源
    try {
      await Promise.all([loadUserInfo(), loadMenus(), loadDicts()])
      loading.hide();
      return true;
    } catch (error) {
      loading.hide();
      return true;
    }
  },
  components: {
    CHeader,
    CAside,
    NavTab
  },
  setup() {
  },
  computed: {
    ...mapState(globalStore, ['showMenu'])
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 100vh;
  display: flex;
  flex-direction: column;

  >.container {
    flex: 1;
    min-height: 400px;
    display: flex;

    >.container--right {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 1200px;

      >.content {
        flex: 1;
        min-height: 200px;
        overflow: auto;
      }
    }
  }
}
</style>