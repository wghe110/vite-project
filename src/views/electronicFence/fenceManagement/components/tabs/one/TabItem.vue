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
        max-width: 120px;
        min-width: 82px;
        height: 36px;
        border-radius: 4px 4px 0 0;
        background-color: #EDEFF1;
        font-size: 14px;
        position: relative;
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
            color: #52555C;
            font-family: PingFang SC;
            position: relative;
            z-index: 2;
        }
        &::before{
            content: '';
            width: 50%;
            height: 100%;
            border-radius: inherit;
            background-color: inherit;
            transform: skewX(-22deg);
            position: absolute;
            left: -7px;
            top: 0;
        }
        &::after{
            content: '';
            width: 50%;
            height: 100%;
            border-radius: inherit;
            background-color: inherit;
            transform: skewX(22deg);
            position: absolute;
            right: -7px;
            top: 0;
        }
        &.active{
            cursor: default;
            background-color: #fff;
            color: #242627;
            font-weight: bolder;
            z-index: 3;
            box-shadow: 0px -2px 4px rgba(204, 204, 204, .3);
            &::before{
                box-shadow: -2px 0px 4px rgba(204, 204, 204, .3);
            }
            &::after{
                box-shadow: 2px 0px 4px rgba(204, 204, 204, .3);
            }
        }
    }
</style>