<template>
  <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
    <el-form-item label="名称" prop="name">
      <el-input
        v-model="form.name"
        style="width: 100%"
        placeholder="请输入名称"
        clearable
        maxlength="50"
      ></el-input>
    </el-form-item>

    <el-form-item label="扩展属性" prop="roleExtent">
      <el-input
        v-model="form.roleExtent"
        placeholder="请输入扩展属性"
        style="width: 100%"
      ></el-input>
    </el-form-item>

    <el-form-item label="图标" prop="icon">
      <el-select
        v-model="form.icon"
        placeholder="请选择图标"
        style="width: 100%"
        filterable
      >
        <template #prefix v-if="form.icon">
          <Icon :type="form.icon" size="18" color="#2A2A2A"></Icon>
        </template>
        <el-option
          v-for="item in iconList"
          :key="item"
          :label="item"
          :value="item"
        >
          <Icon :type="item" size="20" style="margin-right: 16px"></Icon>
          <span>{{ item }}</span>
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="菜单" prop="menus">
      <InputMenus v-model="form.menus" :key="key"></InputMenus>
    </el-form-item>
  </el-form>
</template>

<script>
import { iconList } from "./icon-list";
import { Icon } from "view-design";
import InputMenus from "./InputMenus.vue";
import api from "@/apis/system";

const validateNameFn = (rule, value, callback) => {
  api.validName({ name: value }).then((res) => {
    const { code, msg } = res;
    if (code !== 200) {
      return callback(new Error(msg || "名称校验失败"));
    }
    callback();
  });
};

export default {
  components: {
    Icon,
    InputMenus,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        name: "",
        roleExtent: "",
        icon: "",
        menus: [],
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            pattern: /^[0-9a-zA-Z\u4e00-\u9fa5]+$/,
            message: "名称不允许存在特殊字符",
            trigger: "change",
          },
          { validator: validateNameFn, trigger: "submit" },
        ],
        icon: [{ required: true, message: "请选择图标", trigger: "change" }],
      },
      iconList: [...new Set(iconList)],
      key: 1,
    };
  },
  created() {
    if (this.edit) this.rules.name.pop();
  },
  methods: {
    getParamsFn() {
      return {
        ...this.form,
      };
    },
    resetFields() {
      this.$refs.formRef.resetFields();
      this.key += 1;
    },
    initDataFn(obj) {
      Object.keys(obj).forEach((key) => {
        this.$set(this.form, key, obj[key]);
      });
    },
    initMenuFn(arr) {
      this.form.menus = arr;
    },
  },
};
</script>

<style>
</style>