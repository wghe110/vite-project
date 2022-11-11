<template>
  <ul class="c-menu">
    <template v-for="(item) in options" :key="item.index">
      <sub-menu v-if="item.type === 'submenu'" :source="item" v-bind="$attrs">
        <Menu v-if="item.children && item.children.length" :options="item.children" v-bind="$attrs"></Menu>
        <empty v-else></empty>
      </sub-menu>

      <menu-item v-else :source="item" v-bind="$attrs"></menu-item>
    </template>
  </ul>
</template>

<script setup>
import { defineComponent } from 'vue';
import MenuItem from './MenuItem.vue'
import SubMenu from './SubMenu.vue'
import Empty from './Empty.vue'

defineComponent('menu')
const props = defineProps({
  options: {
    type: Array,
    default() {
      return []
    }
  },
})

</script>

<style lang="scss" scoped>
.c-menu {
  padding: 0;
  margin: 0;
}
</style>