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
export default {
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
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
    fieldVal() {
      return this.value.map((item) => item.text).join("/");
    },
  },
  methods: {
    showFn() {
      this.popVisible = true;
    },
    // 全部选项选择完毕后，会触发 finish 事件
    onFinish(arg) {
      const { selectedOptions } = arg;

      this.$emit("change", selectedOptions);
      this.$emit("input", selectedOptions);
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
      console.log("clearFn");

      this.$emit("change", []);
      this.$emit("input", []);
    },
  },
};
</script>

<style>
</style>