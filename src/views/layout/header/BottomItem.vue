<template>
  <div class="wrap-bottom">
    <img src="@/assets/logo.svg" alt="" class="logo" />
    <div class="menus">
      <Menus></Menus>
    </div>
    <div class="actions">
      <iconpark-icon
        name="kaiqishengyin"
        color="#fff"
        size="20px"
      ></iconpark-icon>
    </div>
  </div>
</template>

<script>
import Menus from "./components/Menus.vue";

export default {
  components: {
    Menus,
  },
};
</script>

<style lang="scss" scoped>
.wrap-bottom {
  flex: 1;
  min-height: 60px;
  display: flex;
  align-items: center;
  > .logo {
    margin-left: 24px;
    margin-right: 78px;
    position: relative;
    top: -8px;
  }
  > .menus {
    flex: 1;
    min-width: 900px;
  }
  > .actions {
    width: 126px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 24px;
    border-left: 1px solid rgba(57, 76, 114, 0.6);
    margin-left: 16px;
  }
}
</style>