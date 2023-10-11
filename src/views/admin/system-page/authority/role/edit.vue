<template>
  <c-dialog title="编辑角色" :visible.sync="visible">
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
import FormCom from "./components/CreateOrEdit.vue";
import api from "@/apis/system";

export default {
  components: {
    FormCom,
  },
  data() {
    return {
      visible: false,
      id: null,
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
      const { menus, ...others } = this.$refs.formComRef.getParamsFn();
      const { id } = this;
      const params = {
        parentId: "0",
        ...others,
        id,
      };

      api.updateRole(params).then((res) => {
        const { id, message, msg } = res;
        if (id) {
          this.setAuthorityFn(id);
        } else {
          this.$message.error(message || msg || "编辑角色错误");
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
              this.$message.success("编辑角色成功");
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
    getDetailFn(id) {
      api
        .getRoleDetail(id)
        .then((res) => {
          const { id, ...others } = res;
          this.$refs.formComRef.initDataFn({ ...others });
          this.id = id;
        })
        .catch((err) => {
          const {
            data: { message },
          } = err;
          this.$message.error(message || "获取角色详情失败");
        });
    },
    getMenusFn(id) {
      const params = {
        roles: id,
      };
      api
        .getMenuList(params)
        .then((res) => {
          const { items } = res;
          const arr = this.getCheckedKeysFn(items);
          console.log("===arr", arr);
          this.$refs.formComRef.initMenuFn(arr);
        })
        .catch((err) => {
          const {
            data: { message },
          } = err;
          this.$message.error(message || "获取角色菜单列表失败");
        });
    },
    getCheckedKeysFn(arr, keys = []) {
      arr.forEach((item) => {
        const checked = this.getCheckedStatusFn(item);
        checked && keys.push(item.id);

        const { items } = item;
        items && items.length && this.getCheckedKeysFn(items, keys);
      });

      return keys;
    },
    getCheckedStatusFn(obj) {
      const { items, checked, flag } = obj;
      if (flag) return flag;

      if (items && items.length) {
        obj.flag = items.every((child) => this.getCheckedStatusFn(child));
      } else {
        obj.flag = checked;
      }
      return obj.flag;
    },
  },
};
</script>

<style>
</style>