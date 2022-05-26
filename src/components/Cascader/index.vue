<template>
  <div>
    <van-cell-group>
      <van-field
        is-link
        readonly
        :value="fieldVal"
        input-align="right"
        error-message-align="right"
        clear-trigger="always"
        :label="label"
        :placeholder="placeholder"
        :disabled="disabled"
        v-bind="$attrs"
        @click="!disabled && showFn()"
      >
        <template #right-icon v-if="clearable && fieldVal">
          <van-icon name="clear" color="#c8c9cc" @click.stop="clearFn" />
        </template>
      </van-field>
    </van-cell-group>

    <van-popup
      v-model="popVisible"
      round
      position="bottom"
      get-container="body"
    >
      <van-cascader
        v-model="cascaderValue"
        :title="label"
        :options="options"
        :active-color="checkedColor"
        v-bind="$attrs"
        @close="casCloseFn"
        @finish="onFinish"
        @change="casChangeFn"
      />
    </van-popup>
  </div>
</template>

<script>
import { addAncestorsFn, patArrayFn } from "./action";

export default {
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    placeholder: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    checkedColor: {
      type: String,
      default: "#345FD8",
    },
    clearable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      popVisible: false,
      cascaderValue: "",
    };
  },
  computed: {
    ancestorData() {
      return addAncestorsFn(this.options);
    },
    patData() {
      return patArrayFn(this.ancestorData);
    },
    fieldVal() {
      const { patData, value } = this;
      let str = value;

      const obj = patData.find((item) => item.value === value);
      if (obj) {
        str = obj.ancestors
          .concat([obj])
          .map((item) => item.text)
          .join("/");
      }

      return str;
    },
  },
  methods: {
    showFn() {
      this.cascaderValue = this.value;
      this.popVisible = true;
    },
    // 全部选项选择完毕后，会触发 finish 事件
    onFinish(arg) {
      const { value, selectedOptions } = arg;

      this.$emit("change", value);
      this.$emit("input", value);
      this.$emit("finish", arg);

      this.popVisible = false;
    },
    casCloseFn() {
      this.$emit("close");

      this.popVisible = false;
    },
    casChangeFn(arg) {
      this.$emit("cas-change", arg);
    },
    clearFn() {
      this.$emit("change", "");
      this.$emit("input", "");
    },
  },
};
</script>

<style>
</style>