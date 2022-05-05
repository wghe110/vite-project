<template>
  <van-cell-group>
    <van-field
      name="slider"
      :label="label"
      :disabled="disabled"
      v-bind="$attrs"
    >
      <template #input>
        <van-slider
          v-model="slider"
          :min="min"
          :max="max"
          :step="step"
          :disabled="disabled"
        >
          <template #button>
            <div class="slider-button">{{ slider }}</div>
          </template>
        </van-slider>
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
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
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
    slider: {
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
.slider-button {
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 1px 2px #00000080;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #666;
}
</style>