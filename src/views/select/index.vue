<template>
  <div>
    <c-select
      label="单选框"
      placeholder="请选择"
      v-model="val"
      :options="opts"
    ></c-select>

    <c-select
      label="单选框"
      placeholder="请选择"
      v-model="val2"
      :options="opts2"
    ></c-select>

    <c-select
      label="单选框"
      placeholder="请选择"
      v-model="val"
      :options="opts"
      error
      error-message="错误信息"
      error-message-align="right"
    ></c-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: "",
      opts: [
        { text: "测试数据1", value: "1" },
        { text: "测试数据2", value: "2" },
        { text: "测试数据3", value: "3" },
        { text: "测试数据4", value: "4" },
        { text: "测试数据5", value: "5" },
        { text: "测试数据6", value: "6" },
      ],

      val2: "2",
      opts2: [
        { text: "测试数据1", value: "1", disabled: true },
        { text: "测试数据2", value: "2" },
        { text: "测试数据3", value: "3", disabled: true },
        { text: "测试数据4", value: "4" },
        { text: "测试数据5", value: "5" },
        {
          text: "测试数据6测试数据6测试数据6测试数据6测试数据6测试数据6测试数据6",
          value: "6",
        },
        { text: "测试数据7", value: "7" },
        { text: "测试数据8", value: "8" },
        { text: "测试数据9", value: "9" },
      ],
    };
  },
};
</script>

<style>
</style>