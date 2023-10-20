<template>
  <header class="wrap-header">
    <TopItem></TopItem>
    <BottomItem></BottomItem>
  </header>
</template>

<script>
import TopItem from "./TopItem.vue";
import BottomItem from "./BottomItem.vue";

export default {
  components: {
    TopItem,
    BottomItem,
  },
};
</script>

<style lang="scss" scoped>
.wrap-header {
  height: 100px;
  background-color: #213252;
  background-image: url("@/assets/bg-header.svg");
  background-repeat: no-repeat;
  background-position: left 34px;
  display: flex;
  flex-direction: column;
}
</style>