<template>
  <van-cell-group>
    <van-field
      name="radio"
      :label="label"
      input-align="right"
      error-message-align="right"
      v-bind="$attrs"
      :disabled="disabled"
    >
      <template #input>
        <van-radio-group
          v-model="radioVal"
          direction="horizontal"
          :disabled="disabled"
        >
          <van-radio
            :name="opt.value"
            v-for="opt in options"
            :key="opt.value"
            :disabled="opt.disabled"
            >{{ opt.text }}</van-radio
          >
        </van-radio-group>
      </template>

      <slot></slot>
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
      type: [String, Number],
      default: "",
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
    radioVal: {
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