<template>
  <div>
    <c-slider label="滑块" v-model="val"></c-slider>

    <c-slider label="滑块 disabled" v-model="val" disabled></c-slider>

    <c-slider label="滑块min max" :min="10" :max="30" v-model="val"></c-slider>

    <c-slider label="滑块 step" v-model="val" :step="5"></c-slider>

    <c-slider
      label="滑块 错误信息"
      v-model="val"
      error
      error-message="错误信息"
      error-message-align="right"
    ></c-slider>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: 10,
    };
  },
};
</script>

<style>
</style>