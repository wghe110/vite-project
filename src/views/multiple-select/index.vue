<template>
  <div>
    <c-multiple-select
      label="多项选择"
      v-model="val"
      :options="opts"
    ></c-multiple-select>

    <c-multiple-select
      label="placeholder"
      v-model="val"
      :options="opts"
      placeholder="请选择"
    ></c-multiple-select>

    <c-multiple-select
      label="disabled"
      v-model="val"
      :options="opts"
      disabled
    ></c-multiple-select>

    <c-multiple-select
      label="clearable"
      v-model="clearVal"
      :options="opts"
      clearable
    ></c-multiple-select>

    <c-multiple-select
      label="选项禁用"
      v-model="val"
      :options="opts2"
    ></c-multiple-select>

    <c-multiple-select
      label="错误信息"
      v-model="val"
      :options="opts2"
      placeholder="请选择"
      error
      error-message="错误信息"
    ></c-multiple-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: [],
      clearVal: ["1", "2", "3", "4"],
      opts: [
        { text: "测试数据1", value: "1" },
        { text: "测试数据2", value: "2" },
        { text: "测试数据3", value: "3" },
        { text: "测试数据4", value: "4" },
        { text: "测试数据5", value: "5" },
        { text: "测试数据6", value: "6" },
        { text: "测试数据7", value: "7" },
        { text: "测试数据8", value: "8" },
        { text: "测试数据9", value: "9" },
      ],

      opts2: [
        { text: "测试数据1", value: "1" },
        { text: "测试数据2", value: "2", disabled: true },
        { text: "测试数据3", value: "3" },
        { text: "测试数据4", value: "4" },
        { text: "测试数据5", value: "5", disabled: true },
        { text: "测试数据6", value: "6" },
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