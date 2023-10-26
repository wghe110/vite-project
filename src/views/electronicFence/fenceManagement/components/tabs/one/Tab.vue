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
    background-color: #F7F8FA;
    display: flex;
    padding-top:16px;
    justify-content: center;
}
</style>