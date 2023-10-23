<template>
  <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
    <el-form-item label="字典项编码" prop="itemCode">
      <el-input
        v-model="form.itemCode"
        style="width: 100%"
        placeholder="请输入字典项编码"
        clearable
        maxlength="20"
        show-word-limit
      ></el-input>
    </el-form-item>

    <el-form-item label="字典值" prop="itemValue">
      <el-input
        v-model="form.itemValue"
        placeholder="请输入字典值"
        style="width: 100%"
        maxlength="20"
        show-word-limit
      ></el-input>
    </el-form-item>

    <el-form-item label="显示排序" prop="itemSort">
      <el-input
        v-model="form.itemSort"
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
import getRules from "./rules-config";

export default {
  components: {},
  props: {
    dicId: {
      type: [String, Number],
      default: "",
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      oldCode: "",
      form: {
        itemCode: "",
        itemValue: "",
        itemSort: "",
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
        dicId: this.dicId,
      };
    },
    resetFields() {
      this.$refs.formRef.resetFields();
    },
    initDataFn(obj) {
      Object.keys(obj).forEach((key) => {
        this.$set(this.form, key, obj[key]);
      });

      const { itemCode } = obj;
      this.oldCode = itemCode;
    },
  },
};
</script>

<style>
</style>