<template>
  <van-field v-bind="$attrs" v-on="$listeners" input-align="right" error-message-align="right" class="opt-field">
    <template #default>
      <slot name="default"></slot>
    </template>

    <template #label>
      <slot name="label"></slot>
    </template>

    <template #input>
      <slot name="input"></slot>
    </template>

    <template #left-icon>
      <slot name="left-icon"></slot>
    </template>

    <template #right-icon>
      <slot name="right-icon"></slot>
    </template>

    <template #button>
      <slot name="button"></slot>
    </template>

    <template #extra>
      <slot name="extra"></slot>
    </template>
  </van-field>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.opt-field {
  &::before {
    top: 22px;
  }

  &::after {
    border-color: #eee;
  }

  ::v-deep {
    .van-field__label {
      line-height: 44px;
      font-size: 15px;
      color: #222222;
      font-weight: 500;
    }

    .van-field__body {
      line-height: 44px;
      font-size: 14px;
      color: #666666;
      letter-spacing: 0;
      font-weight: 400;
    }

    .van-field__left-icon {
      display: flex;
      align-items: center;
    }
  }
}
</style>
