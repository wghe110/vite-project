<template>
  <c-dialog title="用户详情" :visible.sync="visible">
    <el-form :model="form" ref="formRef" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="form.username"
          style="width: 100%"
          placeholder=""
          clearable
          maxlength="45"
          show-word-limit
          disabled
        ></el-input>
      </el-form-item>

      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="form.name"
          placeholder=""
          style="width: 100%"
          maxlength="30"
          show-word-limit
          disabled
        ></el-input>
      </el-form-item>

      <el-form-item label="部门" prop="deptId">
        <el-cascader
          v-model="form.deptId"
          placeholder=""
          style="width: 100%"
          :options="opts.dept"
          :props="deptProps"
          filterable
          clearable
          disabled
        ></el-cascader>
      </el-form-item>

      <el-form-item label="手机号码" prop="mobile">
        <el-input
          v-model="form.mobile"
          placeholder=""
          style="width: 100%"
          maxlength="11"
          show-word-limit
          disabled
        ></el-input>
      </el-form-item>

      <el-form-item label="电子邮件" prop="email">
        <el-input
          v-model="form.email"
          placeholder=""
          style="width: 100%"
          maxlength="45"
          show-word-limit
          disabled
        ></el-input>
      </el-form-item>

      <el-form-item label="角色" prop="roles">
        <el-select
          v-model="form.roles"
          placeholder=""
          style="width: 100%"
          filterable
          clearable
          multiple
          disabled
        >
          <el-option
            v-for="item in opts.roles"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="查岗编号" prop="compcode">
        <el-input
          v-model="form.compcode"
          placeholder=""
          maxlength="100"
          show-word-limit
          style="width: 100%"
          disabled
        ></el-input>
      </el-form-item>

      <el-form-item label="个人描述标题" prop="discTitle">
        <el-input
          v-model="form.discTitle"
          placeholder=""
          style="width: 100%"
          maxlength="45"
          show-word-limit
          disabled
        ></el-input>
      </el-form-item>

      <el-form-item label="个人描述" prop="discDetail">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          v-model="form.discDetail"
          placeholder=""
          style="width: 100%"
          maxlength="500"
          show-word-limit
          disabled
        >
        </el-input>
      </el-form-item>

      <el-form-item label="注册时间" prop="registerTime">
        <el-input
          v-model="form.registerTime"
          placeholder=""
          style="width: 100%"
          disabled
        ></el-input>
      </el-form-item>

      <el-form-item label="最后登录时间" prop="lastLogin">
        <el-input
          v-model="form.lastLogin"
          placeholder=""
          style="width: 100%"
          disabled
        ></el-input>
      </el-form-item>
    </el-form>
  </c-dialog>
</template>

<script>
import api from "@/apis/system";

export default {
  components: {},
  data() {
    return {
      visible: false,

      form: {
        username: "",
        name: "",
        deptId: [],
        mobile: "",
        email: "",
        roles: [],
        compcode: "",
        discTitle: "",
        discDetail: "",
      },
      opts: {
        roles: [],
        dept: [],
      },
      deptProps: {
        value: "id",
        expandTrigger: "click",
        checkStrictly: true,
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
  created() {
    this.getRoleListFn();
    this.getTreeFn();
  },
  methods: {
    getDetailFn(userId) {
      const params = {
        userId,
      };
      api
        .getUserDetail(params)
        .then((res) => {
          const { roleIds, roles, roleNames, rolesList, deptId, ...others } =
            res;
          this.form.roles = roleIds.split(",");
          this.form.deptId = [deptId];

          const keys = Object.keys({ ...others });
          keys.forEach((key) => {
            this.$set(this.form, key, res[key]);
          });
        })
        .catch((err) => {
          const {
            data: { message },
          } = err;
          this.$message.error(message || "获取用户详情失败");
        });
    },
    getRoleListFn() {
      api.getRoleList({ size: 10000 }).then((res) => {
        const { data } = res;
        this.opts.roles = data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
      });
    },
    getTreeFn() {
      api.getOrgTree().then((res) => {
        this.opts.dept = res || [];
      });
    },
  },
};
</script>

<style>
</style>