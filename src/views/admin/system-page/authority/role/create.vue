<template>
  <c-dialog title="新增角色" :visible.sync="visible">
    <FormCom></FormCom>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="visible = false">确 定</el-button>
      </span>
    </template>
  </c-dialog>
</template>

<script>
import FormCom from "./components/CreateOrEdit.vue";

export default {
  components: {
    FormCom,
  },
  data() {
    return {
      visible: true,
    };
  },
};
</script>

<style>
</style>