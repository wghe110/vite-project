<template>
  <div class="wrap--expand">
    <Menu v-bind="$attrs"></Menu>
  </div>
</template>

<script setup>
import Menu from './menu.vue'
</script>

<style lang="scss" scoped>
.wrap--expand {
  width: 255px;
}
</style>