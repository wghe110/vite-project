<template>
  <div class="wrap-tab">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: {
        type: String,
        default: ''
    },
  },
  methods: {
    changeFn(val) {
        this.$emit('input', val)
        this.$emit('change', val)
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap-tab{
    display: flex;
    padding-top:16px;
    justify-content: center;
    border-bottom: 1px solid #EAEBEC;
    background-color: #fff;
    margin: 0 24px;
    display: flex;
}
</style>