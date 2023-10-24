<template>
  <c-dialog title="新增租户" :visible.sync="visible">
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
import FormCom from "./CommonForm.vue";
import api from "@/apis/system-manage/tenant";

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

      api
        .addTenant(params)
        .then((res) => {
          try {
            const {
              ajax: { id, msg },
            } = res;
            if (id) {
              this.$message.success(msg || "新增租户成功");
              this.$emit("success");
              this.visible = false;
            }
          } catch (error) {
            this.$message.success("新增租户失败");
          }
        })
        .catch((err) => {
          const { data: message } = err;
          this.$message.error(message || "新增租户失败");
        });
    },
  },
};
</script>

<style>
</style>