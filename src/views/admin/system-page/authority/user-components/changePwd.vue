<template>
  <c-dialog title="新增用户" :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="110px">
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          v-model="form.newPassword"
          style="width: 100%"
          placeholder="请输入新密码"
          show-password
          clearable
          maxlength="20"
        >
          <template slot="append">
            <el-tooltip
              effect="dark"
              content="密码长度大于8小于20;需要包括小写字母、大写字母、数字、特殊字符.不能包含租户账号、用户名"
            >
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="当前登录密码" prop="currentUserPwd">
        <el-input
          v-model="form.currentUserPwd"
          style="width: 100%"
          show-password
          placeholder="请输入当前登录密码"
          clearable
          maxlength="320"
        ></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submitFn">确 定</el-button>
      </span>
    </template>
  </c-dialog>
</template>

<script>
import api from "@/apis/system";
import { encryptPassword } from "@/utils/tool";

var validatePass = (rule, value, callback) => {
  const tenantAccount = localStorage.getItem("tenantAccount");
  const userName = localStorage.getItem("userName");

  if (value.includes(tenantAccount) || value.includes(userName)) {
    return callback(new Error("密码不能租户账号或用户名"));
  }
  callback();
};

export default {
  components: {},
  data() {
    return {
      visible: false,
      form: {
        newPassword: "",
        currentUserPwd: "",
      },
      rules: {
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 8, message: "密码长度大于8小于20", trigger: "blur" },
          {
            pattern:
              /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[*?!&￥$%^#,./@";:><\[\]}{\-=+_\\|》《。，、？’‘“”~ `]).*$/,
            message: "密码需要包括小写字母、大写字母、数字、特殊字符",
            trigger: "blur",
          },
          { validator: validatePass, trigger: "blur" },
        ],
        currentUserPwd: [
          { required: true, message: "请输入当前登录密码", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.formRef.resetFields();
        });
      }
    },
  },
  methods: {
    submitFn() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.updatePwdFn();
        }
      });
    },
    updatePwdFn() {
      const params = this.getParamsFn();

      api.updatePwd(params).then((res) => {
        const { code, message } = res;
        if (code && code === 200) {
          this.$message.success("修改密码成功");
          this.$emit("success");
          this.visible = false;
        } else {
          this.$message.error(message || "修改密码失败");
        }
      });
    },
    getParamsFn() {
      const { id, userId } = this.current;
      const { newPassword, currentUserPwd } = this.form;
      return {
        cscpUserDetailDTO: {
          id,
          userId,
        },
        newPassword: encryptPassword(newPassword),
        currentUserPwd: encryptPassword(currentUserPwd),
      };
    },
    initCurrentFn(obj) {
      this.current = obj;
    },
  },
};
</script>

<style>
</style>