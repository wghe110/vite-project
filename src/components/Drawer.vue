<template>
  <el-drawer
    :wrapperClosable="wrapperClosable"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template #title>
      <slot name="title"></slot>
    </template>
    <slot></slot>
  </el-drawer>
</template>

<script>
export default {
  props: {
    wrapperClosable: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>