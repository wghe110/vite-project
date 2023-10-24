<template>
  <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
    <el-form-item label="租户账号" prop="tenantAccount">
      <el-input
        v-model="form.tenantAccount"
        style="width: 100%"
        placeholder="请输入租户账号"
        clearable
        maxlength="20"
        show-word-limit
        :disabled="edit"
      ></el-input>
    </el-form-item>

    <el-form-item label="租户名称" prop="tenantName">
      <el-input
        v-model="form.tenantName"
        style="width: 100%"
        placeholder="请输入租户名称"
        clearable
        maxlength="20"
        show-word-limit
      ></el-input>
    </el-form-item>

    <el-form-item label="联系人" prop="contacts">
      <el-input
        v-model="form.contacts"
        style="width: 100%"
        placeholder="请输入联系人"
        clearable
        maxlength="20"
        show-word-limit
      ></el-input>
    </el-form-item>

    <el-form-item label="联系方式" prop="phone">
      <el-input
        v-model="form.phone"
        placeholder="请输入联系方式"
        style="width: 100%"
        maxlength="11"
      ></el-input>
    </el-form-item>

    <el-form-item label="过期时间" prop="expireTime">
      <el-date-picker
        v-model="form.expireTime"
        type="datetime"
        placeholder="选择过期时间"
        style="width: 100%"
        value-format="yyyy-MM-dd HH:mm:ss"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
    </el-form-item>

    <el-form-item label="状态" prop="activeFlag">
      <el-switch
        v-model="form.activeFlag"
        :disabled="edit && form.tenantAccount === 'superAdmin'"
        active-value="1"
        inactive-value="0"
      >
      </el-switch>
    </el-form-item>

    <el-form-item label="菜单" prop="menus">
      <InputMenus v-model="form.menus" :key="key"></InputMenus>
    </el-form-item>
  </el-form>
</template>

<script>
import InputMenus from "@/views/admin/system-page/authority/role/components/InputMenus.vue";
import getRules from "./rules";

export default {
  components: {
    InputMenus,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      oldTenantAccount: "",
      form: {
        tenantAccount: "",
        tenantName: "",
        contacts: "",
        phone: "",
        expireTime: "",
        activeFlag: "1",
        menus: [],
      },
      rules: getRules(this),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
      },
      key: 1,
    };
  },
  methods: {
    getParamsFn() {
      const { menus, ...others } = this.form;
      return {
        ...others,
        menus: menus.join(","),
      };
    },
    resetFields() {
      this.$refs.formRef.resetFields();
      this.key += 1;
    },
    initDataFn(obj) {
      Object.keys(obj).forEach((key) => {
        this.$set(this.form, key, obj[key]);
      });

      const { tenantAccount } = obj;
      this.oldTenantAccount = tenantAccount;
    },
    initMenuFn(arr) {
      this.form.menus = arr;
      this.key += 1;
    },
  },
};
</script>

<style>
</style>