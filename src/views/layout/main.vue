<template>
  <div class="wrap">
    <header class="header">头部</header>
    <div class="content">
      <aside class="aside">左侧</aside>
      <div class="inner-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
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