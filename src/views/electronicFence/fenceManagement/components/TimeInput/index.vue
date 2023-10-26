<template>
  <div class="wrap-time-input">
    <el-checkbox
      v-model="isFenceTime"
      true-label="0"
      false-label="1"
      @change="checkedFn"
      >全天生效</el-checkbox
    >

    <TimePicker v-model="val" :disabled="isFenceTime === '0'" />
  </div>
</template>

<script>
import TimePicker from "./TimePicker.vue";

export default {
  components: {
    TimePicker,
  },
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isFenceTime: "1",
    };
  },
  computed: {
    val: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
        this.$emit("change", val);
      },
    },
  },
  methods: {
    checkedFn(val) {
      if (val === "0") this.val = ["00:00", "23:59"];
    },
  },
};
</script>

<style>
</style>
