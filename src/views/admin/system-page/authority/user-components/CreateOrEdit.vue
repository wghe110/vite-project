<template>
  <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
    <el-form-item label="用户名" prop="username">
      <el-input
        v-model="form.username"
        style="width: 100%"
        placeholder="请输入用户名"
        clearable
        maxlength="45"
        show-word-limit
        :disabled="edit"
      ></el-input>
    </el-form-item>

    <el-form-item label="姓名" prop="name">
      <el-input
        v-model="form.name"
        placeholder="请输入姓名"
        style="width: 100%"
        maxlength="30"
        show-word-limit
      ></el-input>
    </el-form-item>

    <el-form-item label="部门" prop="deptId">
      <el-cascader
        v-model="form.deptId"
        placeholder="请选择部门"
        style="width: 100%"
        :options="opts.dept"
        :props="deptProps"
        filterable
        clearable
      ></el-cascader>
    </el-form-item>

    <el-form-item label="手机号码" prop="mobile">
      <el-input
        v-model="form.mobile"
        placeholder="请输入手机号码"
        style="width: 100%"
        maxlength="11"
        show-word-limit
      ></el-input>
    </el-form-item>

    <el-form-item label="电子邮件" prop="email">
      <el-input
        v-model="form.email"
        placeholder="请输入电子邮件"
        style="width: 100%"
        maxlength="45"
        show-word-limit
      ></el-input>
    </el-form-item>

    <el-form-item label="角色" prop="roles">
      <el-select
        v-model="form.roles"
        placeholder="请选择角色"
        style="width: 100%"
        filterable
        clearable
        multiple
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
        placeholder="请输入查岗编号"
        maxlength="100"
        show-word-limit
        style="width: 100%"
      ></el-input>
    </el-form-item>

    <el-form-item label="个人描述标题" prop="discTitle">
      <el-input
        v-model="form.discTitle"
        placeholder="请输入个人描述标题"
        style="width: 100%"
        maxlength="45"
        show-word-limit
      ></el-input>
    </el-form-item>

    <el-form-item label="个人描述" prop="discDetail">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        v-model="form.discDetail"
        placeholder="请输入个人描述"
        style="width: 100%"
        maxlength="500"
        show-word-limit
      >
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import api from "@/apis/system";
import getRules from "./rules";
import getParentIdsFn from "./getCasNodeId";

export default {
  components: {},
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      oldUserName: "",
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
      rules: getRules(this),
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
  created() {
    this.getRoleListFn();
    this.getTreeFn();
  },
  methods: {
    getParamsFn() {
      const { roles, deptId, ...others } = this.form;
      return {
        groups: [],
        roles: roles.join(","),
        deptId: deptId[deptId.length - 1],
        ...others,
      };
    },
    resetFields() {
      this.$refs.formRef.resetFields();
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
    initDataFn(obj) {
      const { deptId, ...others } = obj;
      Object.keys({ ...others }).forEach((key) => {
        this.$set(this.form, key, obj[key]);
      });

      const ids = getParentIdsFn(this.opts.dept, deptId);
      this.form.deptId = [...ids, deptId];

      const { username } = obj;
      this.oldUserName = username;
    },
  },
};
</script>

<style>
</style>