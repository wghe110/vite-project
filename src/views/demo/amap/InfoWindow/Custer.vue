<template>
  <el-tooltip content="Top center" placement="top">
    <el-button>Dark</el-button>
  </el-tooltip>
</template>

<script>
import { Button, Tooltip } from "element-ui";

export default {
  components: {
    ElButton: Button,
    ElTooltip: Tooltip,
  },
};
</script>

<style>
</style>