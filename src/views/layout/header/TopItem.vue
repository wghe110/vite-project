<template>
  <div class="wrap-top">
    <div class="time">{{ otime }}</div>

    <el-dropdown @command="userCommandFn" size="small" placement="bottom-end">
      <div class="user">
        <div>
          <span>租户：</span>
          <span class="value">{{ tenantAccount }}</span>
        </div>
        <div>
          <span>用户：</span>
          <span class="value">{{ userName }}</span>
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
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

export default {
  data() {
    return {
      otime: "--",
      userName: "--",
      tenantAccount: "--",
      preTime: Date.now(),
      timer: null,
    };
  },
  created() {
    this.initDateFn();
    this.userName = localStorage.getItem("userName");
    this.tenantAccount = localStorage.getItem("tenantAccount");
  },
  beforeDestroy() {
    this.timer && cancelAnimationFrame(this.timer);
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
    initDateFn() {
      const { preTime } = this;
      const now = Date.now();
      if (now - preTime >= 1000) {
        this.preTime = now;
        this.changeTimeFn();
      }
      this.timer = requestAnimationFrame(this.initDateFn);
    },
    changeTimeFn() {
      const now = new Date();
      const otime = format(now, "yyyy年MM月dd日  iiii  HH:mm:ss", {
        locale: zhCN,
      });
      this.otime = otime;
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
    min-width: 184px;
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