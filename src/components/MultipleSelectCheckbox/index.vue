<template>
  <van-cell-group>
    <van-field
      name="checkboxGroup"
      :label="label"
      input-align="right"
      v-bind="$attrs"
      :disabled="disabled"
    >
      <template #input>
        <van-checkbox-group
          v-model="checkboxGroup"
          direction="horizontal"
          :disabled="disabled"
        >
          <van-checkbox
            :name="opt.value"
            shape="square"
            v-for="opt in options"
            :key="opt.value"
            :disabled="opt.disabled"
            >{{ opt.text }}</van-checkbox
          >
        </van-checkbox-group>
      </template>
    </van-field>
  </van-cell-group>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    checkboxGroup: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
        this.$emit("change", val);
      },
    },
  },
};
</script>

<style>
</style>