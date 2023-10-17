<template>
  <c-dialog title="编辑菜单" :visible.sync="visible">
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
import FormCom from "./FormModel.vue";
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
          this.updateFn();
        }
      });
    },
    updateFn() {
      const params = this.$refs.formComRef.getParamsFn();

      api.addMenu(params).then((res) => {
        const { id, message, msg } = res;
        if (id) {
          this.$message.success("更新菜单成功");
          this.$emit("success");
          this.visible = false;
        } else {
          this.$message.error(message || msg || "更新菜单失败");
        }
      });
    },
    getDetailFn(id) {
      api.getMenuInfo(id).then((res) => {
        this.$refs.formComRef.initDataFn(res);
      });
    },
    initParentFn(parent) {
      setTimeout(() => {
        this.$refs.formComRef.initParentFn(parent);
      });
    },
  },
};
</script>

<style>
</style>