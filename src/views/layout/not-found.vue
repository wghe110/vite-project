<template>
  <div>{{ comPath }}组件未找到</div>
</template>

<script>
export default {
  data() {
    return {
      comPath: this.$route.meta.path || "--",
    };
  },
  watch: {
    $route(to, from) {
      const {
        meta: { path },
      } = to;
      this.comPath = path;
    },
  },
};
</script>

<style>
</style>