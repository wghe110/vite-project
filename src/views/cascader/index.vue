<template>
  <div>
    <c-cascader v-model="val" label="级联选择" :options="options"></c-cascader>

    <c-cascader
      v-model="val"
      label="clearable"
      :options="options"
      clearable
    ></c-cascader>

    <c-cascader
      v-model="val"
      label="disabled"
      :options="options"
      disabled
    ></c-cascader>

    <c-cascader
      v-model="val"
      label="placeholder"
      :options="options"
      placeholder="请选择"
    ></c-cascader>

    <c-cascader
      v-model="val"
      label="错误信息"
      :options="options"
      placeholder="请选择"
      error
      error-message="错误信息"
    ></c-cascader>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: [],
      options: [
        {
          text: "浙江省",
          value: "330000",
          children: [{ text: "杭州市", value: "330100" }],
        },
        {
          text: "江苏省",
          value: "320000",
          children: [{ text: "南京市", value: "320100" }],
        },
      ],
    };
  },
};
</script>

<style>
</style>