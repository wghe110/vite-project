<template>
  <div class="wrap-left-item">
    <i class="el-icon-s-unfold icon" v-if="collapse" @click="toggleFn"></i>
    <i class="el-icon-s-fold icon" v-else @click="toggleFn"></i>

    <span class="word">菜单管理</span>
  </div>
</template>

<script>
export default {
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleFn() {
      this.$emit("update:collapse", !this.collapse);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap-left-item {
  display: flex;
  align-items: center;

  .icon {
    font-size: 24px;
    color: #515a6e;
    margin-right: 16px;
    cursor: pointer;
  }
  .word {
    font-size: 14px;
    font-weight: 700;
    color: #515a6e;
  }
}
</style>