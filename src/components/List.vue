<template>
  <div class="wrap-list">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    labelAlign: {
      type: String,
      default: "",
    },
    labelWidth: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
</style>