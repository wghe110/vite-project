<template>
  <div class="wrap-right-item">
    <div class="fullscreen">
      <el-tooltip effect="dark" :content="fullscreen ? '退出全屏' : '全屏'">
        <div class="icon-box" @click="fullscreenFn">
          <i class="el-icon-aim" v-if="fullscreen"></i>
          <i class="el-icon-full-screen" v-else></i>
        </div>
      </el-tooltip>
    </div>
    <el-dropdown @command="userCommandFn">
      <section class="user">
        <span>张三</span>
        <img src="/user.png" alt="pic" />
      </section>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="personal">个人中心</el-dropdown-item>
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullscreen: false,
    };
  },
  created() {
    document.addEventListener("fullscreenchange", this.fullscreenChangeFn);
  },
  beforeDestroy() {
    document.removeEventListener("fullscreenchange", this.fullscreenChangeFn);
  },
  methods: {
    fullscreenFn() {
      const { fullscreen } = this;
      fullscreen
        ? document.exitFullscreen()
        : document.documentElement.requestFullscreen();
    },
    fullscreenChangeFn() {
      const ele = document.fullscreenElement;
      this.fullscreen = ele && ele === document.documentElement;
    },
    userCommandFn(val) {
      console.log("userCommandFn", val);
      console.log("this.$router", this.$router);
      this.$router.push({ path: "/biyi-role" });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap-right-item {
  display: flex;
  align-items: center;
  > .fullscreen {
    margin-right: 16px;
    .icon-box {
      cursor: pointer;
    }
  }
  .user {
    display: flex;
    align-items: center;
    cursor: pointer;
    > span {
      font-size: 14px;
      color: #2d8cf0;
    }
    > img {
      width: 32px;
      height: 32px;
      margin-left: 8px;
    }
  }
}
</style>