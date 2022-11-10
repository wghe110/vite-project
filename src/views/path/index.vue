<template>
  <h1>img:/demo.jpeg</h1>
  <img src="/demo.jpeg" width="200" alt="">
  <h1>img:@p/demo.jpeg</h1>
  <img src="@p/demo.jpeg" width="200" alt="">
  <h1>img:@/assets/demo.webp</h1>
  <img src="@/assets/demo.webp" width="200" alt="">

  <hr>

  <h1>css background-image:/demo.jpeg</h1>
  <div class="background-image a"></div>
  <h1>css background-image:@p/demo.jpeg</h1>
  <div class="background-image b"></div>
  <h1>css background-image:@/assets/demo.webp</h1>
  <div class="background-image c"></div>
</template>

<style lang="scss" scoped>
.background-image {

  background-size: contain;
  background-color: #ccc;
  background-repeat: no-repeat;
  background-position: center;
  width: 200px;
  height: 200px;

  &.a {
    background-image: url('/demo.jpeg');
  }

  &.b {
    background-image: url('@p/demo.jpeg');
  }

  &.c {
    background-image: url('@/assets/demo.webp');
  }
}
</style>