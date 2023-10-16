<template>
  <c-dialog title="新增字典" :visible.sync="visible">
    <FormCom ref="formComRef"></FormCom>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submitFn">确 定</el-button>
      </span>
    </template>
  </c-dialog>
</template>

<script>
import FormCom from "./CreateOrEdit.vue";
import api from "@/apis/system";

export default {
  components: {
    FormCom,
  },
  data() {
    return {
      visible: false,
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.formComRef.resetFields();
        });
      }
    },
  },
  methods: {
    submitFn() {
      this.$refs.formComRef.$refs.formRef.validate((valid) => {
        if (valid) {
          this.createFn();
        }
      });
    },
    createFn() {
      const params = this.$refs.formComRef.getParamsFn();

      api.createDict(params).then((res) => {
        const { dicId, message } = res;
        if (dicId) {
          this.$message.success("新增字典成功");
          this.$emit("success");
          this.visible = false;
        } else {
          this.$message.error(message || "新增字典失败");
        }
      });
    },
  },
};
</script>

<style>
</style>