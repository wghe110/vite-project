<template>
  <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
    <el-form-item label="上层菜单" prop="parentRow">
      <el-input
        v-model="form.parentUrl"
        style="width: 100%"
        placeholder=""
        clearable
        readonly
      ></el-input>
    </el-form-item>

    <el-form-item label="类型" prop="type">
      <el-select
        v-model="form.type"
        placeholder="请选择类型"
        style="width: 100%"
        filterable
      >
        <el-option
          v-for="item in opts.type"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="标题" prop="title">
      <el-input
        v-model="form.title"
        style="width: 100%"
        placeholder="请输入标题"
        clearable
        maxlength="30"
        show-word-limit
      ></el-input>
    </el-form-item>

    <el-form-item label="图标" prop="icon" v-if="form.type !== 'button'">
      <el-select
        v-model="form.icon"
        placeholder="请选择图标"
        style="width: 100%"
        filterable
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

    <el-form-item label="路由名称" prop="name" v-if="form.type !== 'button'">
      <el-input
        v-model="form.name"
        placeholder="请输入路由名称"
        style="width: 100%"
        maxlength="80"
        show-word-limit
      ></el-input>
    </el-form-item>

    <el-form-item label="路由路径" prop="url" v-if="form.type !== 'button'">
      <el-input
        v-model="form.url"
        placeholder="一级菜单路径必须以 ' / '开头，二级及其他路径可不以 ' / '开头 "
        style="width: 100%"
        maxlength="100"
      ></el-input>
    </el-form-item>

    <el-form-item
      label="vue组件位置"
      prop="component"
      v-if="form.type !== 'menu2-sp' && form.type !== 'button'"
    >
      <el-input
        v-model="form.component"
        placeholder="组件位于src下路径，例如：views/main/main.vue"
        style="width: 100%"
        maxlength="200"
        type="textarea"
        autosize
      ></el-input>
    </el-form-item>

    <el-form-item label="权限码" prop="permissionCode">
      <el-input
        v-model="form.permissionCode"
        placeholder="请输入权限码"
        style="width: 100%"
      ></el-input>
    </el-form-item>

    <el-form-item label="排序" prop="orderby">
      <el-input
        v-model="form.orderby"
        placeholder="请输入排序"
        style="width: 100%"
        maxlength="20"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { iconList } from "@/views/admin/system-page/authority/role/components/icon-list";
import { Icon } from "view-design";
import rules from "./rules";

export default {
  components: {
    Icon,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        parentUrl: "",
        parentId: "",
        type: "",
        title: "",
        icon: "",
        name: "",
        url: "",
        component: "",
        permissionCode: "",
        orderby: "",
      },
      rules,
      iconList: [...new Set(iconList)],
      opts: {
        type: [
          { value: "menu1", label: "一级菜单" },
          { value: "menu2", label: "二级菜单（不含三级菜单），三级菜单" },
          { value: "menu2-sp", label: "二级菜单（含三级菜单）" },
          { value: "non-menu", label: "非菜单页面" },
          { value: "button", label: "数据/按钮" },
        ],
      },
    };
  },
  methods: {
    getParamsFn() {
      const { parentUrl, type, icon, name, url, component, ...others } =
        this.form;

      if (type === "menu2-sp")
        return {
          type,
          icon,
          name,
          url,
          ...others,
        };

      if (type === "button")
        return {
          type,
          ...others,
        };

      return {
        type,
        icon,
        name,
        url,
        component,
        ...others,
      };
    },
    resetFields() {
      this.$refs.formRef.resetFields();
    },
    initDataFn(obj) {
      Object.keys(obj).forEach((key) => {
        this.$set(this.form, key, obj[key]);
      });
    },
    initParentFn(parent) {
      const { id, title } = parent;
      this.form.parentId = id;
      this.form.parentUrl = title;
    },
  },
};
</script>

<style>
</style>