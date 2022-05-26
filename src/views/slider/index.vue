<template>
  <div>
    <c-slider label="滑块" v-model="val"></c-slider>

    <c-slider label="disabled" v-model="val" disabled></c-slider>

    <c-slider label="min max" :min="10" :max="30" v-model="val"></c-slider>

    <c-slider label="step" v-model="val" :step="5"></c-slider>

    <c-slider
      label="错误信息"
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