<template>
  <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
    <el-form-item label="字典编码" prop="dicCode">
      <el-input
        v-model="form.dicCode"
        style="width: 100%"
        placeholder="请输入字典编码"
        clearable
        maxlength="20"
        show-word-limit
      ></el-input>
    </el-form-item>

    <el-form-item label="字典名称" prop="dicName">
      <el-input
        v-model="form.dicName"
        placeholder="请输入字典名称"
        style="width: 100%"
        maxlength="20"
        show-word-limit
      ></el-input>
    </el-form-item>

    <el-form-item label="显示排序" prop="dicSort">
      <el-input
        v-model="form.dicSort"
        placeholder="请输入排序"
        style="width: 100%"
      ></el-input>
    </el-form-item>

    <el-form-item label="描述" prop="description">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        v-model="form.description"
        placeholder="请输入描述"
        style="width: 100%"
        maxlength="100"
        show-word-limit
      >
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import getRules from "./rules";

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
      oldCode: "",
      oldName: "",
      form: {
        dicCode: "",
        dicName: "",
        dicSort: "",
        description: "",
      },
      rules: getRules(this),
    };
  },
  created() {},
  methods: {
    getParamsFn() {
      return {
        ...this.form,
        dicAttr: "list",
      };
    },
    resetFields() {
      this.$refs.formRef.resetFields();
    },
    initDataFn(obj) {
      Object.keys(obj).forEach((key) => {
        this.$set(this.form, key, obj[key]);
      });

      const { dicCode, dicName } = obj;
      this.oldCode = dicCode;
      this.oldName = dicName;
    },
  },
};
</script>

<style>
</style>