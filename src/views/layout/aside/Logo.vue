<template>
  <div class="wrap-logo">
    <img src="/logo.png" alt="logo" />
    <h1 class="tit" v-show="!collapse">统一开发平台</h1>
  </div>
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
.wrap-logo {
  height: 64px;
  padding: 10px;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  > img {
    width: 42px;
    height: 42px;
  }
  > .tit {
    margin-left: 16px;
    color: #e5e6e9;
    font-size: 16px;
    font-weight: normal;
    line-height: 1.3;
    min-width: 100px;
  }
}
</style>