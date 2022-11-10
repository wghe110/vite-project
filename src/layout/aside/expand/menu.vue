<template>
  <ul class="c-menu">
    <template v-for="(item, idx) in options" key="item.name">
      <sub-menu v-if="item.type === 'submenu'" :key="item.name" :source="item">
        <Menu v-if="item.children && item.children.length" :options="item.children"></Menu>
      </sub-menu>

      <menu-item v-else :key="idx" :source="item"></menu-item>
    </template>
  </ul>
</template>

<script setup>
import { defineComponent } from 'vue';
import MenuItem from './MenuItem.vue'
import SubMenu from './SubMenu.vue'
defineComponent('menu')
defineProps({
  options: {
    type: Array,
    default() {
      return []
    }
  }
})
</script>

<style lang="scss" scoped>
.c-menu {
  padding: 0;
}
</style>