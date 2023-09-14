<template>
  <div class="wrap-pwd">
    <div class="content">
      <h2 class="tit">修改密码</h2>

      <div class="inner-con">
        <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
          <el-form-item label="用户账号" prop="userName">
            <el-input v-model="form.userName"></el-input>
          </el-form-item>
          <el-form-item label="原密码" prop="oldPassword">
            <el-input
              v-model="form.oldPassword"
              auto-complete="new-password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input
              v-model="form.newPassword"
              auto-complete="new-password"
              show-password
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">更新密码</el-button>
            <el-button>取消</el-button>
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

    <el-tooltip
      class="item"
      effect="dark"
      content="Bottom Center 提示文字"
      placement="bottom"
      :tabindex="222222"
      :value="true"
    >
      <div>
        <el-button>下边</el-button>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
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
    };
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
</style>