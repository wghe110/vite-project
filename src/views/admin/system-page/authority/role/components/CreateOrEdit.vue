<template>
  <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
    <el-form-item label="名称" prop="name">
      <el-input
        v-model="form.name"
        style="width: 100%"
        placeholder="请输入名称"
        clearable
      ></el-input>
    </el-form-item>

    <el-form-item label="扩展属性" prop="roleExtent">
      <el-input
        v-model="form.roleExtent"
        placeholder="请输入扩展属性"
        style="width: 100%"
      ></el-input>
    </el-form-item>

    <el-form-item label="图标" prop="icon">
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

    <el-form-item label="菜单" prop="menus">
      <InputMenus v-model="form.menus"></InputMenus>
    </el-form-item>
  </el-form>
</template>

<script>
import { iconList } from "./icon-list";
import { Icon } from "view-design";
import InputMenus from "./InputMenus.vue";

export default {
  components: {
    Icon,
    InputMenus,
  },
  data() {
    return {
      form: {
        name: "",
        roleExtent: "",
        icon: "",
        menus: ["1628035401946042370", "162803588345633587"],
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        icon: [{ required: true, message: "请选择图标", trigger: "blur" }],
      },
      iconList: [...new Set(iconList)],
    };
  },
  created() {},
  methods: {},
};
</script>

<style>
</style>