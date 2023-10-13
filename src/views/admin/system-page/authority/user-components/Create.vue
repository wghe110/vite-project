<template>
  <c-dialog title="新增用户" :visible.sync="visible">
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
          this.createUserFn();
        }
      });
    },
    createUserFn() {
      const params = this.$refs.formComRef.getParamsFn();

      api.createUser(params).then((res) => {
        const { code, message } = res;
        if (code && code !== 200) {
          this.$message.error(message || "创建用户失败");
        } else {
          this.$message.success("新增角色成功");
          this.$emit("success");
          this.visible = false;
        }
      });
    },
  },
};
</script>

<style>
</style>