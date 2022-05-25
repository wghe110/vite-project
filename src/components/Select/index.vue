<template>
  <van-cell-group>
    <van-field
      is-link
      readonly
      :label="label"
      :placeholder="placeholder"
      :disabled="disabled"
      input-align="right"
      error-message-align="right"
      :value="valCN"
      v-bind="$attrs"
      @click="!disabled && showFn()"
    >
      <slot></slot>
    </van-field>

    <van-action-sheet
      v-model="popVisible"
      :title="label"
      @click-overlay="clickOverlayFn"
      @cancel="cancelFn"
      get-container="body"
    >
      <div class="content" :style="{ height: `${contentHeight}px` }">
        <van-cell-group>
          <van-cell
            @click="!opt.disabled && checkedFn(opt)"
            v-for="opt in options"
            :class="{ disabled: opt.disabled }"
            :key="opt.value"
          >
            <!-- 标题 -->
            <template #title>
              <span :style="{ color: checkedColor }" v-if="isChecked(opt)">{{
                opt.text
              }}</span>
              <span v-else>{{ opt.text }}</span>
            </template>

            <!-- 选中图标 -->
            <template #right-icon>
              <van-icon
                name="success"
                :style="{ color: checkedColor }"
                class="checked-icon"
                v-if="isChecked(opt)"
              />
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </van-action-sheet>
  </van-cell-group>
</template>

<script>
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
    contentHeight: {
      type: Number,
      default: 300,
    },
    checkedColor: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {
      popVisible: false,
    };
  },
  computed: {
    valCN() {
      let cn = "";
      const { options, value } = this;
      if (value) {
        const obj = options.find(
          (item) => String(item.value) === String(value)
        );
        if (obj) cn = obj.text;
      }

      return cn;
    },
  },
  methods: {
    showFn() {
      this.popVisible = true;
    },
    clickOverlayFn() {
      console.log("clickOverlayFn");
    },
    cancelFn() {
      console.log("cancelFn");
    },
    checkedFn(obj) {
      const { value } = obj;

      this.$emit("input", value);
      this.$emit("change", value);

      this.popVisible = false;
    },
    isChecked(obj) {
      return String(obj.value) === String(this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  overflow: auto;
}
.disabled {
  color: #c8c9cc;
}
.checked-icon {
  display: flex;
  align-items: center;
}
</style>