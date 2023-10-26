<template>
  <div :class="{'wrap-tab-item': true, 'active': active}" @click="!active && changeFn()">
    <span class="content">
        <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    computed: {
        active() {
            return this.value && this.value === this.$parent.value
        }
    },
    methods: {
        changeFn() {
            this.$parent.changeFn(this.value)
        }
    }
}
</script>

<style lang="scss" scoped>
    .wrap-tab-item{
        width: 34%;
        min-width: 82px;
        height: 42px;
        background-color: #fff;
        position: relative;
        flex: 1;
        cursor: pointer;
        & + .wrap-tab-item{
            margin-left: 10px;
        }
        >.content{
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #242627;
            font-family: PingFang SC;
            font-size: 14px;
            position: relative;
        }
        &.active{
            cursor: default;
            font-weight: bolder;
            &::after{
                content: '';
                width: 100%;
                height: 2px;
                position: absolute;
                left: 0;
                bottom: -1px;
                background-color: #0084FF;
            }
        }
    }
</style>