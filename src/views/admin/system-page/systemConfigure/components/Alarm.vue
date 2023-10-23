<template>
  <c-section-item class="wrap-terminal">
    <com-tit>车辆告警设置</com-tit>

    <SettingItem
      icon="Group733"
      name="告警提示"
      :disabled="!carWarnSettingVo.warn"
      v-model="carWarnSettingVo.warn"
      @change="updateFn"
      >告警时弹窗提醒</SettingItem
    >
    <SettingItem
      icon="Group1016"
      name="离线告警"
      :disabled="!carWarnSettingVo.offWarn"
      v-model="carWarnSettingVo.offWarn"
      @change="updateFn"
    >
      <span>当终端信号达到</span>
      <el-input-number
        :min="1"
        :precision="0"
        v-model="carWarnSettingVo.hour"
        :disabled="!carWarnSettingVo.offWarn"
        :controls="false"
        :key="key"
        @change="fixedFn"
        size="mini"
        style="margin: 0 4px; width: 80px"
      ></el-input-number>
      <span>小时后，发出告警</span>
    </SettingItem>
    <SettingItem
      icon="Group755"
      name="凌晨禁行"
      :disabled="!carWarnSettingVo.stop"
      v-model="carWarnSettingVo.stop"
      @change="updateFn"
    >
      <div class="flex-box">
        <span class="label">禁行车辆</span>
        <div class="con">
          <CarMuilSelect
            v-model="carWarnSettingVo.carList"
            :disabled="!carWarnSettingVo.stop"
          />
        </div>
      </div>
    </SettingItem>
  </c-section-item>
</template>

<script>
import ComTit from "./Title.vue";
import SettingItem from "./alarm/SettingItem.vue";
import CarMuilSelect from "@/views/components/CarMuilSelect/index.vue";

export default {
  components: {
    ComTit,
    SettingItem,
    CarMuilSelect,
  },
  props: {
    config: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      carWarnSettingVo: {},
      key: 1,
    };
  },
  watch: {
    config: {
      deep: true,
      immediate: true,
      handler(val) {
        this.initDataFn();
      },
    },
  },
  methods: {
    initDataFn() {
      const { config } = this;
      if (config?.carWarnSettingVo) {
        this.carWarnSettingVo = {
          ...config.carWarnSettingVo,
        };
      } else {
        this.carWarnSettingVo = {};
      }
    },
    fixedFn(val, old) {
      if (!val) {
        this.carWarnSettingVo.hour = old;
        this.key++;
        return;
      }
      this.updateFn();
    },
    updateFn() {
      const newVal = this.getValueFn();
      this.$emit("update", newVal);
    },
    getValueFn() {
      const { terminalTypeVo, areaShowSettingVo, ruleSettingVo } = this.config;
      const { carWarnSettingVo } = this;

      return {
        tcarWarnSettingVo: carWarnSettingVo,
        tareaShowSettingVo: areaShowSettingVo,
        truleSettingVo: ruleSettingVo,
        terminalTypeVo,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.flex-box {
  display: flex;
  align-items: center;
  > .label {
    margin-right: 16px;
  }
  > .con {
    flex: 1;
  }
}
</style>