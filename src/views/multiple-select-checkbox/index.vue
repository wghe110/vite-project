<template>
  <div>
    <c-multiple-select-checkbox
      v-model="val"
      label="checkbox复选框"
      :options="opts"
    ></c-multiple-select-checkbox>

    <c-multiple-select-checkbox
      v-model="val"
      label="checkbox复选框 disabled"
      :options="opts"
      disabled
    ></c-multiple-select-checkbox>

    <c-multiple-select-checkbox
      v-model="val2"
      label="checkbox复选框 部分disabled"
      :options="opts2"
    ></c-multiple-select-checkbox>

    <c-multiple-select-checkbox
      v-model="val2"
      label="checkbox复选框 错误信息"
      :options="opts2"
      error
      error-message="错误信息"
      error-message-align="right"
    ></c-multiple-select-checkbox>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: ["1"],
      opts: [
        { text: "男", value: "1" },
        { text: "女", value: "0" },
      ],

      val2: [],
      opts2: [
        { text: "男", value: "1", disabled: true },
        { text: "女", value: "0" },
      ],
    };
  },
};
</script>

<style>
</style>