<template>
  <div class="wrap-alert" v-if="visible">
    <el-alert v-bind="$attrs" effect="dark" :closable="false" />
    <i class="el-icon-close" @click="closeFn"></i>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      timer: null,
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.timer = setTimeout(() => {
          this.closeFn();
        }, 2500);
      } else {
        clearTimeout(this.timer);
      }
    },
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  methods: {
    closeFn() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap-alert {
  position: relative;
  .el-icon-close {
    color: #fff;
    font-size: 12px;
    position: absolute;
    right: 10px;
    top: 12px;
    cursor: pointer;
  }
}
</style>