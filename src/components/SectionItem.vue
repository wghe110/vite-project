<template>
  <div class="wrap-section-item">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.wrap-section-item {
  padding: 24px;
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>