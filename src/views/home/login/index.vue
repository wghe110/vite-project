<template>
  <div class="wrap-login">
    <section class="content" @keydown.enter="submitFn">
      <aside class="alert">
        <Alert
          :title="alert.title"
          :type="alert.type"
          :visible.sync="alert.visible"
        />
      </aside>

      <div>
        <h1 class="tit">统一研发框架</h1>

        <el-form :model="form" :rules="rules" ref="formRef" label-width="0">
          <el-form-item label="租户名" prop="tenantAccount">
            <el-input
              v-model="form.tenantAccount"
              autocomplete="off"
              placeholder="请输入租户名"
              :disabled="loading"
            >
              <template slot="prepend">
                <i class="el-icon-user icon"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="userName">
            <el-input
              v-model="form.userName"
              autocomplete="off"
              placeholder="请输入用户名"
              :disabled="loading"
            >
              <template slot="prepend">
                <i class="el-icon-user icon"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              autocomplete="off"
              placeholder="请输入密码"
              :disabled="loading"
              show-password
              auto-complete="new-password"
            >
              <template slot="prepend">
                <i class="el-icon-lock icon"></i>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码" prop="code">
            <el-input
              v-model="form.code"
              autocomplete="off"
              placeholder="请输入验证码"
              class="code-input"
              :disabled="loading"
            >
              <template slot="prepend">
                <i class="el-icon-key icon"></i>
              </template>
              <template slot="append">
                <div
                  class="box-code"
                  v-loading="loadingCode"
                  element-loading-spinner="el-icon-loading"
                  @click.stop="!loadingCode && getCodeFn()"
                >
                  <img :src="code.url" alt="验证码" class="pic-code" />
                </div>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              class="btn-submit"
              :loading="loading"
              @click="!isSuccess && !loading && submitFn()"
              >登 录</el-button
            >
          </el-form-item>
        </el-form>

        <div class="info">
          <div></div>
          <div>
            <el-checkbox v-model="rememberMe">记住我</el-checkbox>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from "@/apis/login";
import { encryptPassword } from "@/utils/tool";
import { formatLockedTime } from "./utils";
import rules from "./rules";
import Alert from "./Alert.vue";

export default {
  components: {
    Alert,
  },
  data() {
    return {
      form: {
        tenantAccount: "",
        userName: "",
        password: "",
        code: "",
      },
      rememberMe: false,
      rules,
      loading: false,
      loadingCode: true,
      code: {
        key: "",
        url: "",
      },

      alert: {
        type: "error",
        title: "--",
        visible: false,
      },
      isSuccess: false,
    };
  },
  created() {
    this.getCodeFn();
  },
  methods: {
    getCodeFn() {
      this.loadingCode = true;
      api
        .getCode()
        .then((res) => {
          if (!res || Object.keys(res).length === 0)
            return this.customerAlertFn({
              message: `获取验证码失败`,
            });

          this.code.key = Object.keys(res)[0];
          this.code.url = Object.values(res)[0];
        })
        .finally(() => {
          this.loadingCode = false;
        });
    },
    submitFn() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.loginFn();
        }
      });
    },
    loginFn() {
      const headers = this.getHeadersFn();
      const params = this.getParamsFn();

      this.loading = true;
      api
        .login(params, headers)
        .then(this.loginSucFn)
        .catch(this.loginFailFn)
        .finally(() => {
          this.loading = false;
        });
    },
    loginSucFn(res) {
      const { userName, tenantAccount } = this.form;
      localStorage.setItem("userName", userName);
      localStorage.setItem("tenantAccount", tenantAccount);

      const { validatePaswd } = this.$route.meta;
      const { passwordStatus } = res;

      if (validatePaswd && passwordStatus) {
        const msg =
          passwordStatus === 1
            ? "初始密码强度较弱，请修改后再重新登录！"
            : "密码已使用3个月，请修改后再重新登录！";

        return this.$alert(msg, "修改密码", {
          confirmButtonText: "确定",
          showClose: false,
          callback: () => {
            this.$router.replace("/change-pwd");
          },
        });
      }

      this.isSuccess = true;

      const { token } = res;
      localStorage.setItem("token", token);

      this.customerAlertFn({
        type: "success",
        message: `登录成功`,
      });
      setTimeout(() => {
        this.$router.replace("/welcome");
      }, 2000);
    },
    loginFailFn(err) {
      this.getCodeFn();

      const { status } = err;

      if (status === 401) {
        if (err.data.attempts) {
          return this.customerAlertFn({
            message: `登录失败，您还有 ${err.data.attempts} 尝试机会！`,
          });
        }

        const locktime = formatLockedTime(err.data.lockoutTime);
        this.customerAlertFn({
          message: `登录失败，您的账号已被锁定，请在 ${locktime} 后重试！`,
        });
      }

      if (err.data && err.data.title) {
        if (err.data.message === "captcha.validate.failed") {
          return this.customerAlertFn({
            message: "验证码错误",
          });
        }
        if (err.data.message === "captcha.missing") {
          return this.customerAlertFn({
            message: "验证码失效",
          });
        }
        return this.customerAlertFn({
          message: err.data.title,
        });
      }

      this.customerAlertFn({
        message: "登录失败，用户名或密码错误！",
      });
    },
    getHeadersFn() {
      const {
        form: { code },
        code: { key },
      } = this;

      return {
        Biyicaptchakey: key,
        Biyicaptcha: JSON.stringify({
          code,
        }),
      };
    },
    getParamsFn() {
      const {
        form: { tenantAccount, userName, password },
        rememberMe,
      } = this;

      return {
        rememberme: rememberMe ? "1" : "0",
        tenantAccount,
        username: userName,
        password: encryptPassword(password),
      };
    },
    customerAlertFn({ type = "error", message = "--" }) {
      this.alert.title = message;
      this.alert.type = type;
      this.alert.visible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap-login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-image: url("/bg.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  > .content {
    width: 448px;
    min-height: 510px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.6);
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 5px;
    margin-right: 11%;
    display: flex;
    align-items: center;
    padding: 40px 40px;
    position: relative;
    > div {
      width: 368px;
    }
    .tit {
      color: #4f79e3;
      font-size: 36px;
      font-weight: 400;
      margin: 0;
      margin-bottom: 24px;
      line-height: 1.3;
      text-align: center;
    }
  }
  .icon {
    font-size: 14px;
  }
  .btn-submit {
    width: 100%;
    height: 56px;
    font-size: 18px;
  }
  .pic-code {
    cursor: pointer;
    height: 38px;
    width: 114px;
  }
  .box-code {
    line-height: 0;
    ::v-deep {
      .el-loading-spinner {
        margin-top: -8px;
      }
    }
  }
  .info {
    display: flex;
    justify-content: space-between;
  }
  .alert {
    position: absolute;
    left: -2px;
    right: -2px;
    top: -2px;
  }

  // 自定义表单样式
  .code-input {
    ::v-deep {
      .el-input__inner {
        height: 40px;
        line-height: 40px;
      }
    }
  }
  ::v-deep {
    .el-form-item__label {
      overflow: hidden;
      padding: 0;
      height: 0;
    }
    .el-input__inner {
      height: 56px;
      line-height: 56px;
    }
    .el-input-group__prepend {
      padding: 0 14px;
    }
    .el-input__inner {
      padding: 0 7px;
    }
    .el-input-group__append {
      padding: 0;
    }
    .el-form-item.is-error {
      .el-input-group__prepend,
      .el-input-group__append {
        border-color: #f56c6c;
      }
    }
  }
}
</style>