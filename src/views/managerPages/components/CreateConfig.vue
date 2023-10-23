<template>
  <c-dialog title="新增字典项" :visible.sync="visible" append-to-body>
    <FormCom ref="formComRef" :dic-id="dicId"></FormCom>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submitFn">确 定</el-button>
      </span>
    </template>
  </c-dialog>
</template>

<script>
import FormCom from "./ConfigForm.vue";
import api from "@/apis/system";

export default {
  components: {
    FormCom,
  },
  data() {
    return {
      visible: false,
      dicId: "",
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

      api.createDictItem(params).then((res) => {
        const { dicId, message } = res;
        if (dicId) {
          this.$message.success("新增字典项成功");
          this.$emit("success");
          this.visible = false;
        } else {
          this.$message.error(message || "新增字典项失败");
        }
      });
    },
    initDicIdFn(dicId) {
      this.dicId = dicId;
    },
  },
};
</script>

<style>
</style>