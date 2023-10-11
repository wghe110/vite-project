<template>
  <c-dialog title="角色详情" :visible.sync="visible">
    <el-form :model="form" ref="formRef" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="form.name"
          style="width: 100%"
          placeholder=""
          clearable
          maxlength="50"
          disabled
        ></el-input>
      </el-form-item>

      <el-form-item label="扩展属性" prop="roleExtent">
        <el-input
          v-model="form.roleExtent"
          placeholder=""
          style="width: 100%"
          disabled
        ></el-input>
      </el-form-item>

      <el-form-item label="图标" prop="icon">
        <el-select
          v-model="form.icon"
          placeholder=""
          style="width: 100%"
          filterable
          disabled
        >
          <template #prefix v-if="form.icon">
            <Icon :type="form.icon" size="18" color="#2A2A2A"></Icon>
          </template>
          <el-option
            v-for="item in iconList"
            :key="item"
            :label="item"
            :value="item"
          >
            <Icon :type="item" size="20" style="margin-right: 16px"></Icon>
            <span>{{ item }}</span>
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="菜单" prop="menus">
        <InputMenus v-model="form.menus" :key="key" :props="props"></InputMenus>
      </el-form-item>
    </el-form>
  </c-dialog>
</template>

<script>
import api from "@/apis/system";
import { iconList } from "./components/icon-list";
import { Icon } from "view-design";
import InputMenus from "./components/InputMenus.vue";

export default {
  components: {
    Icon,
    InputMenus,
  },
  data() {
    return {
      visible: false,

      form: {
        name: "",
        roleExtent: "",
        icon: "",
        menus: [],
      },
      iconList: [...new Set(iconList)],
      key: 1,
      props: {
        children: "items",
        label: "id",
        disabled: "id",
      },
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
        .getRoleDetail(id)
        .then((res) => {
          const { icon, name, roleExtent } = res;
          this.form.icon = icon;
          this.form.name = name;
          this.form.roleExtent = roleExtent;
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
          this.form.menus = arr;
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