<template>
  <c-section-item class="wrap-map">
    <com-tit>地图显示设置 </com-tit>

    <div class="content">
      <div class="config">
        <SettingItem
          icon="Group967"
          name="车辆显示"
          info="在地图中默认显示所有车辆"
          v-model="areaShowSettingVo.carShow"
          @change="updateFn"
        ></SettingItem>
        <SettingItem
          icon="Group741"
          name="车牌显示"
          info="在地图中显示车牌号"
          v-model="areaShowSettingVo.carMoShow"
          @change="updateFn"
        ></SettingItem>
        <SettingItem
          icon="Group739"
          name="地物显示"
          info="在地图中显示地物"
          v-model="areaShowSettingVo.earthMatterShow"
          @change="updateFn"
        ></SettingItem>
        <SettingItem
          icon="Group837"
          name="围栏显示"
          info="在地图中显示电子围栏"
          v-model="areaShowSettingVo.fenceShow"
          @change="updateFn"
        ></SettingItem>
      </div>

      <ViewMap :config="config" />
    </div>
  </c-section-item>
</template>

<script>
import ComTit from "./Title.vue";
import SettingItem from "./map/SettingItem.vue";
import ViewMap from "./map/View.vue";

export default {
  components: {
    ComTit,
    SettingItem,
    ViewMap,
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
      areaShowSettingVo: {},
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
      if (config?.areaShowSettingVo) {
        this.areaShowSettingVo = {
          ...config.areaShowSettingVo,
        };
      } else {
        this.areaShowSettingVo = {};
      }
    },
    updateFn() {
      const newVal = this.getValueFn();
      this.$emit("update", newVal);
    },
    getValueFn() {
      const { terminalTypeVo, carWarnSettingVo, ruleSettingVo } = this.config;
      const { areaShowSettingVo } = this;

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
.wrap-map {
  > .content {
    display: flex;
    > .config {
      margin-right: 89px;
    }
  }
}
</style>