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
  & + .wrap-section-item {
    margin-top: 16px;
  }
}
</style>