<template>
  <div class="wrap-skeleton" id="skeleton">
    <aside class="item"></aside>
    <div class="content">
      <header class="item"></header>
      <section class="inner-con item">加载中...</section>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.wrap-skeleton {
  width: 100vw;
  height: 100vh;
  display: flex;
  background: #fff;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99999;
  > aside {
    width: 224px;
  }
  > .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    > header {
      height: 64px;
    }
    > .inner-con {
      flex: 1;
      margin: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #515a6e;
      font-size: 14px;
    }
  }
  .item {
    background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
    background-size: 400% 100%;
    animation: el-skeleton-loading 1.4s ease infinite;
  }
}
@keyframes el-skeleton-loading {
  0% {
    background-position: 100% 50%;
  }

  to {
    background-position: 0 50%;
  }
}
</style>