<template>
  <div class="wrap-item-add">
    <el-select
      v-model="value"
      filterable
      placeholder="请选择"
      v-on="$listeners"
      size="small"
      style="flex: 1"
    >
      <el-option
        v-for="item in options"
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
    options: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      value: "",
    };
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
