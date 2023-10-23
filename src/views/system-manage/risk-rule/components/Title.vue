<template>
    <h2 class="wrap-title">
        <span class="word">
             <slot></slot>
        </span>       
    </h2>
</template>

<style lang="scss" scoped>
.wrap-title {
    padding: 8px 0;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    &::before{
        content: '';
        display: block;
        width: 4px;
        height: 14px;
        background-color: #0084FF;
        border-radius: 13px;
        margin-right: 6px;
    }
    >.word{
        font-size: 16px;
        color: #242627;
        line-height: 1;
    }
}
</style>