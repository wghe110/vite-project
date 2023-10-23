<template>
  <div class="wrap-item-add">
    <el-select
      filterable
      placeholder="请选择"
      v-bind="$attrs"
      v-on="$listeners"
      size="small"
      style="flex: 1"
    >
      <el-option
        v-for="item in [...options, ...selfOpt]"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    selfOpt: {
      type: Array,
      default() {
        return [];
      },
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.wrap-item-add {
  display: flex;
  align-items: center;
}
</style>
