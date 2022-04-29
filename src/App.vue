<template>
  <div>
    <div class="demo">vue2-js-project</div>
    <tit>tit</tit>
  </div>
</template>

<script>
import Tit from "/@/components/tit/index.vue";

export default {
  components: {
    Tit,
  },
  data() {
    return {};
  },
  methods: {
    demoFn() {
      const a = 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.demo {
  color: red;
}
</style>