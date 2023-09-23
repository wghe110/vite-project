<template>
  <header class="wrap-header">
    <LeftItem v-bind="$attrs" v-on="$listeners" />
    <RightItem />
  </header>
</template>

<script>
import LeftItem from "./LeftItem.vue";
import RightItem from "./RightItem.vue";

export default {
  components: {
    LeftItem,
    RightItem,
  },
};
</script>

<style lang="scss" scoped>
.wrap-header {
  height: 64px;
  background-color: #fff;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>