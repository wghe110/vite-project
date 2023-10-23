<template>
  <h2 class="wrap-tit">
    <slot></slot>
  </h2>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.wrap-tit {
  margin: 0 0 16px;
  color: #242627;
  font-family: PingFang SC;
  font-size: 16px;
  line-height: 1.2;
  font-weight: 500;
  display: flex;
  align-items: center;
  &::before {
    content: "";
    width: 4px;
    height: 14px;
    display: block;
    border-radius: 2px;
    background: #0084ff;
    margin-right: 7px;
  }
}
</style>