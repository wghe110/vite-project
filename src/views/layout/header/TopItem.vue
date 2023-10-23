<template>
  <div class="wrap-top">
    <div class="time">2023年10月20日 星期五10:23</div>

    <el-dropdown @command="userCommandFn" size="small" placement="bottom-end">
      <div class="user">
        <div>
          <span>租户：</span>
          <span class="value">休闲鞋</span>
        </div>
        <div>
          <span>用户：</span>
          <span class="value">张三</span>
        </div>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import api from "@/apis/login";

export default {
  data() {
    return {};
  },
  methods: {
    userCommandFn(val) {
      switch (val) {
        case "logout":
          this.logoutFn();
          break;

        default:
          break;
      }
    },
    logoutFn() {
      const params = {
        url: window.location.origin,
      };

      api
        .logout(params)
        .then(() => {
          this.$message.success("退出登录成功");
          localStorage.removeItem("token");
          this.$router.push("/login");
          this.$store.commit("setInited", false);
        })
        .catch((err) => {
          console.error(err);
          this.$message.error("退出登录失败");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap-top {
  display: flex;
  height: 28px;
  align-items: center;
  margin-top: 12px;
  justify-content: flex-end;
  padding: 0 24px;

  > .time {
    color: rgba(255, 255, 255, 0.8);
    font-family: PingFang SC;
    font-size: 12px;
    line-height: 1.2;
    margin-right: 12px;
  }
  .user {
    color: rgba(255, 255, 255, 0.8);
    font-family: PingFang SC;
    font-size: 12px;
    line-height: 1.2;
    display: flex;
    cursor: pointer;
    > div {
      margin-left: 12px;
    }
    .value {
      color: #fff;
    }
  }
}
</style>