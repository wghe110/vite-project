<template>
  <div class="wrap-filter-item">
    <slot name="label">
      <label class="label" v-if="label">
        {{ label }}
      </label>
    </slot>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap-filter-item {
  padding: 8px 12px;
  display: flex;
  width: 25%;
  box-sizing: border-box;
  &:last-child {
    flex: 1;
    width: auto;
  }
  .label {
    width: 88px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: rgba(0, 0, 0, 0.7);
    font-size: 14px;
    line-height: 1.2;
    text-align: right;
    margin-right: 12px;
  }
  .content {
    flex: 1;
    min-width: 100px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>