<template>
  <c-dialog title="编辑字典" :visible.sync="visible">
    <FormCom ref="formComRef" edit></FormCom>

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
          this.updateFn();
        }
      });
    },
    updateFn() {
      const params = this.$refs.formComRef.getParamsFn();

      api.createDict(params).then((res) => {
        const { dicId, message } = res;
        if (dicId) {
          this.$message.success("编辑字典成功");
          this.$emit("success");
          this.visible = false;
        } else {
          this.$message.error(message || "编辑字典失败");
        }
      });
    },
    getDetailFn(dicId) {
      api
        .getDictInfo(dicId)
        .then((res) => {
          this.$refs.formComRef.initDataFn(res);
        })
        .catch((err) => {
          const {
            data: { message },
          } = err;
          this.$message.error(message || "获取用户详情失败");
        });
    },
  },
};
</script>

<style>
</style>