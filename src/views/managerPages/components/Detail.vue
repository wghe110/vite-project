<template>
  <c-dialog title="租户详情" :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
      <el-form-item label="租户账号" prop="tenantAccount">
        <el-input
          v-model="form.tenantAccount"
          style="width: 100%"
          placeholder=""
          clearable
          maxlength="20"
          show-word-limit
          disabled
        ></el-input>
      </el-form-item>

      <el-form-item label="租户名称" prop="tenantName">
        <el-input
          v-model="form.tenantName"
          style="width: 100%"
          placeholder=""
          clearable
          maxlength="20"
          show-word-limit
          disabled
        ></el-input>
      </el-form-item>

      <el-form-item label="联系人" prop="contacts">
        <el-input
          v-model="form.contacts"
          style="width: 100%"
          placeholder=""
          clearable
          maxlength="20"
          show-word-limit
          disabled
        ></el-input>
      </el-form-item>

      <el-form-item label="联系方式" prop="phone">
        <el-input
          v-model="form.phone"
          placeholder=""
          style="width: 100%"
          maxlength="11"
          disabled
        ></el-input>
      </el-form-item>

      <el-form-item label="过期时间" prop="expireTime">
        <el-date-picker
          v-model="form.expireTime"
          type="datetime"
          placeholder=""
          style="width: 100%"
          disabled
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="状态" prop="activeFlag">
        <el-switch
          v-model="form.activeFlag"
          active-value="1"
          inactive-value="0"
          disabled
        >
        </el-switch>
      </el-form-item>

      <el-form-item label="菜单" prop="menus">
        <InputMenus v-model="form.menus" :key="key" :props="props"></InputMenus>
      </el-form-item>
    </el-form>
  </c-dialog>
</template>

<script>
import InputMenus from "./InputMenus.vue";
import getRules from "./rules";
import api from "@/apis/system-manage/tenant";

export default {
  components: {
    InputMenus,
  },
  data() {
    return {
      visible: false,

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
      props: {
        label: "id",
        disabled: "id",
      },
      key: 1,
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(() => {
          this.resetFields();
        });
      }
    },
  },
  created() {},
  methods: {
    resetFields() {
      this.$refs.formRef.resetFields();
      this.key += 1;
    },
    getDetailFn(id) {
      api
        .getTenantInfo(id)
        .then((res) => {
          const { menus, ...others } = res;
          this.form = {
            ...others,
          };
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
        if (res && res.length) {
          this.form.menus = res.map((item) => item.id);
          this.key += 1;
        } else {
          this.form.menus = [];
        }
      });
    },
  },
};
</script>

<style>
</style>