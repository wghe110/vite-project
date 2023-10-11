<template>
  <c-dialog title="新增角色" :visible.sync="visible">
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
import FormCom from "./components/CreateOrEdit.vue";
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
      const { menus, ...others } = this.$refs.formComRef.getParamsFn();
      const params = {
        parentId: 0,
        ...others,
      };

      api.cscpRoless(params).then((res) => {
        const { id, message, msg } = res;
        if (id) {
          this.setAuthorityFn(id);
        } else {
          this.$message.error(message || msg || "创建角色错误");
        }
      });
    },
    setAuthorityFn(id) {
      const { menus } = this.$refs.formComRef.getParamsFn();
      const params = {
        roles: id,
        menus: menus.join(","),
        permissions: "",
      };
      api
        .updateAuthority(params)
        .then((res) => {
          try {
            const {
              ajax: { id },
            } = res;

            if (id) {
              this.$message.success("新增角色成功");
              this.$emit("success");
              this.visible = false;
            }
          } catch (error) {
            this.$message.error("更新权限失败");
          }
        })
        .catch((err) => {
          const { data: message } = err;
          this.$message.error(message || "更新权限失败");
        });
    },
  },
};
</script>

<style>
</style>