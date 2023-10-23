<template>
  <div class="wrap-system">
    <ComTerminal :config="config" @update="updateFn" />
    <ComAlarm :config="config" @update="updateFn" />
    <ComMap :config="config" @update="updateFn" />
  </div>
</template>

<script>
import ComTerminal from "./components/Terminal.vue";
import ComAlarm from "./components/Alarm.vue";
import ComMap from "./components/Map.vue";
import api from "@/apis/system-manage/system";

export default {
  components: {
    ComTerminal,
    ComAlarm,
    ComMap,
  },
  data() {
    return {
      config: {},
    };
  },
  created() {
    this.getConfigFn();
  },
  methods: {
    getConfigFn() {
      api.getSysConfig().then((res) => {
        const { result } = res;
        this.config = result || {};
      });
    },
    updateFn(newVal) {
      api.updateSys(newVal).then((res) => {
        const { code, message } = res;
        if (code === 200) {
          this.$message.success(message || "编辑成功");
          this.getConfigFn();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap-system {
}
</style>