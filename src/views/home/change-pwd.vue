<template>
  <div class="wrap-pwd">
    <div class="content">
      <h2 class="tit">修改密码</h2>

      <div class="inner-con">
        <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
          <el-form-item label="用户账号" prop="userName">
            <el-input
              v-model="form.userName"
              readonly
              :disabled="loading"
            ></el-input>
          </el-form-item>
          <el-form-item label="原密码" prop="oldPassword">
            <el-input
              v-model="form.oldPassword"
              auto-complete="new-password"
              show-password
              :disabled="loading"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input
              v-model="form.newPassword"
              auto-complete="new-password"
              show-password
              :disabled="loading"
            >
              <el-tooltip effect="dark" slot="suffix" :content="pwdRule">
                <i class="el-icon-warning"></i>
              </el-tooltip>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="btn"
              :loading="loading"
              @click="submitFn"
              >更新密码</el-button
            >
            <el-button :disabled="loading" class="btn" @click="cancelFn"
              >取消</el-button
            >
          </el-form-item>
        </el-form>

        <el-alert
          title="您的密码存在一定风险，出于安全考虑，需更新密码后才能继续登录。"
          type="warning"
          :closable="false"
        >
        </el-alert>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/apis/pwd";
import { encryptPassword } from "@/utils/tool";
import { Message } from "element-ui";

export default {
  data() {
    return {
      form: {
        userName: "",
        tenantAccount: "",
        newPassword: "",
        oldPassword: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
        ],
        oldPassword: [
          { required: true, message: "请输入原密码", trigger: "blur" },
        ],
      },
      loading: false,
      pwdRule: "",
      isSuccessed: false,
    };
  },
  created() {
    this.getRuleFn();
  },
  methods: {
    submitFn() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.saveFn();
        }
      });
    },
    saveFn() {
      const params = this.getParamsFn();

      this.loading = true;
      api
        .updatePwd(params)
        .then((data) => {
          const { token } = data || {};
          if (token) {
            this.isSuccessed = true;

            localStorage.setItem("token", token);
            return this.$Message.success({
              content: "修改密码成功！",
              onClose: () => {
                this.$router.replace("/welcome");
              },
            });
          }

          const msg = data.msg || data.title;
          Message.error(msg);
        })
        .catch((res) => {
          const msg = res.data.msg || res.data.title;
          Message.error(msg);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    cancelFn() {
      this.$router.replace("/welcome");
      this.form.userName = localStorage.getItem("userName");
      this.form.tenantAccount = localStorage.getItem("tenantAccount");
    },
    getRuleFn() {
      api.getPwdRule().then((res) => {
        this.pwdRule = res;
      });
    },
    getParamsFn() {
      const {
        form: { userName, tenantAccount, newPassword, oldPassword },
      } = this;

      return {
        userName,
        tenantAccount,
        newPassword: encryptPassword(newPassword),
        oldPassword: encryptPassword(oldPassword),
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap-pwd {
  height: 100vh;
  background-color: #eeeff0;
  display: flex;
  justify-content: center;
  align-items: center;
  > .content {
    width: 560px;
    background-color: #fff;
    border-radius: 4px;
    > .tit {
      border-bottom: 1px solid #ebebeb;
      height: 56px;
      padding: 0 24px;
      margin: 0;
      font-size: 16px;
      line-height: 56px;
      font-weight: 600;
    }
    .inner-con {
      padding: 40px;
    }
  }
}

.btn {
  width: 100px;
}
</style>