<template>
  <c-dialog title="编辑租户" :visible.sync="visible">
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
          this.updateFn();
        }
      });
    },
    updateFn() {
      const params = this.$refs.formComRef.getParamsFn();

      api
        .updateTenant(params)
        .then((res) => {
          try {
            const {
              ajax: { id, msg },
            } = res;
            if (id) {
              this.$message.success(msg || "编辑租户成功");
              this.$emit("success");
              this.visible = false;
            }
          } catch (error) {
            this.$message.success("编辑租户失败");
          }
        })
        .catch((err) => {
          const { data: message } = err;
          this.$message.error(message || "编辑租户失败");
        });
    },
    getDetailFn(id) {
      api
        .getTenantInfo(id)
        .then((res) => {
          const { menus, ...others } = res;
          this.$refs.formComRef.initDataFn({
            ...others,
          });
        })
        .catch((err) => {
          const {
            data: { message },
          } = err;
          this.$message.error(message || "获取详情失败");
        });
    },
    getMenusFn(id) {
      api.getTenantMenus(id).then((res) => {
        let arr = [];
        if (res && res.length) {
          arr = res.map((item) => item.id);
        }

        this.$refs.formComRef.initMenuFn(arr);
      });
    },
  },
};
</script>

<style>
</style>