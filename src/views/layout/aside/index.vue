<template>
  <aside :class="`wrap-aside ${collapse ? 'collapse' : ''}`">
    <Logo :collapse="collapse" />
    <Menus :collapse="collapse" />
  </aside>
</template>

<script>
import Logo from "./Logo.vue";
import Menus from "./Menus.vue";

export default {
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Logo,
    Menus,
  },
};
</script>

<style lang="scss" scoped>
.wrap-aside {
  width: 224px;
  background-color: #515a6e;
  height: 100vh;
  display: flex;
  flex-direction: column;
  transition: width 0.2s;
  flex-shrink: 0;
  &.collapse {
    width: 64px;
  }
}
</style>