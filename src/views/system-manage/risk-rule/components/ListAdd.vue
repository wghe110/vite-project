<template>
    <div class="wrap-list-add">
        <i class="el-icon-circle-plus-outline"></i>
        <span>新增</span>
    </div>
</template>

<style lang="scss" scoped>
.wrap-list-add {
    height: 36px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    &:hover{
        background-color: #f9fafc;
        border-radius: 2px;
    }
    >span{
        font-size: 14px;
        color: #0084FF;
        margin-left: 2px;
    }
    .el-icon-circle-plus-outline{
        font-size: 14px;
        color: #0084FF;
    }
}
</style>