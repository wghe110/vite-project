<template>
  <div>
    <c-select-radio
      label="单选框"
      v-model="val"
      :options="opts"
    ></c-select-radio>

    <c-select-radio
      label="预选值"
      v-model="checkedVal"
      :options="opts"
    ></c-select-radio>

    <c-select-radio
      label="disabled"
      v-model="val"
      :options="opts"
      disabled
    ></c-select-radio>

    <c-select-radio
      label="部分disabled"
      v-model="val"
      :options="opts2"
    ></c-select-radio>

    <c-select-radio
      label="错误信息"
      v-model="val"
      :options="opts2"
      error
      error-message="错误信息"
      error-message-align="right"
    ></c-select-radio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: "",
      checkedVal: "dangyuan",
      opts: [
        { text: "党员", value: "dangyuan" },
        { text: "群众", value: "qunzhong" },
      ],
      opts2: [
        { text: "党员", value: "dangyuan", disabled: true },
        { text: "群众", value: "qunzhong" },
      ],
    };
  },
};
</script>

<style>
</style>