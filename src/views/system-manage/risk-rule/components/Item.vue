<template>
    <div class="wrap-item">
        <div>
            <slot></slot>
        </div>        
    </div>
</template>

<style lang="scss" scoped>
.wrap-item {
    flex: 1;
    background-color: #fff;
    border-radius: 4px;
    height: 100%;
    overflow: auto;
    >div{
        padding: 16px 24px;
    }
}
.wrap-item + .wrap-item{
    margin-left: 16px;
}
</style>