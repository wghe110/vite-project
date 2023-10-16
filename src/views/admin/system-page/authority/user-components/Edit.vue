<template>
  <c-dialog title="编辑用户" :visible.sync="visible">
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
          this.updateUserFn();
        }
      });
    },
    updateUserFn() {
      const params = { cscpUserDetailDTO: this.$refs.formComRef.getParamsFn() };

      api.updateUser(params).then((res) => {
        const { code, message } = res;
        if (code && code !== 200) {
          this.$message.error(message || "更新用户失败");
        } else {
          this.$message.success("更新用户成功");
          this.$emit("success");
          this.visible = false;
        }
      });
    },
    getDetailFn(userId) {
      const params = {
        userId,
      };
      api
        .getUserDetail(params)
        .then((res) => {
          const { roleIds, roles, roleNames, rolesList, deptId, ...others } =
            res;
          const obj = {
            deptId,
            ...others,
          };
          obj.roles = roleIds.split(",");

          this.$refs.formComRef.initDataFn(obj);
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