<template>
  <div>
    <img src="../../assets/刘德华.jpg" alt="" />
    <img src="@/assets/刘德华.jpg" alt="" />
    <div class="bg"></div>
  </div>
</template>

<script>
import "$p/a";

export default {};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}
.bg {
  width: 300px;
  height: 300px;
  background-image: url("@/assets/刘德华.jpg");
  background-size: cover;
}
</style>