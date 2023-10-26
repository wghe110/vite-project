<template>
  <div class="wrap-create">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
      <el-form-item label="围栏名称" prop="fenceName">
        <el-input
          v-model="form.fenceName"
          placeholder="请输入围栏名称"
          style="width: 100%"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item label="生效时间" prop="currentTime">
        <TimeInput v-model="form.currentTime" />
      </el-form-item>

      <el-form-item label="告警类别" prop="warnType">
        <el-select
          v-model="form.warnType"
          placeholder="请选择"
          style="width: 100%"
          clearable
        >
          <el-option
            v-for="item in opts.warnType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-row
        :gutter="8"
        v-show="form.warnType === '5' || form.warnType === '6'"
      >
        <el-col :span="18">
          <el-form-item label="速度限制" prop="showSpeedLimit">
            <el-input
              v-model="form.showSpeedLimit"
              placeholder="非必填"
              style="width: 100%"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <span class="unit">km/h</span>
        </el-col>
      </el-row>

      <el-form-item label="关联车辆" prop="carId">
        <CarMuilSelect
          v-model="form.carId"
          style="width: 100%"
          placeholder="非必填，请选择车辆"
        />
      </el-form-item>

      <el-form-item label="地图显示" prop="isPlatShowing">
        <el-switch
          v-model="form.isPlatShowing"
          :active-value="0"
          :inactive-value="1"
        ></el-switch>
      </el-form-item>

      <el-form-item label="绘制围栏" prop="plat">
        <Draw v-model="form.plat" />
      </el-form-item>

      <el-form-item label="区域范围" prop="area">
        <span>{{ form.area || "--" }}</span>
      </el-form-item>

      <div class="btn">
        <el-button>重置</el-button>
        <el-button type="primary">启用围栏</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import TimeInput from "./TimeInput/index.vue";
import api from "@/apis/electronic-fence/fence-manage";
import CarMuilSelect from "@/views/components/CarMuilSelect/index.vue";
import Draw from "./draw/index.vue";

export default {
  components: {
    TimeInput,
    CarMuilSelect,
    Draw,
  },
  data() {
    return {
      form: {
        fenceName: "",
        currentTime: ["00:00", "23:59"],
        warnType: "",
        showSpeedLimit: "",
        isPlatShowing: "0",
        plat: "",
      },
      rules: {
        fenceName: [
          { required: true, message: "请输入围栏名称", trigger: "blur" },
        ],
        plat: [{ required: true, message: "请绘制围栏", trigger: "submit" }],
        showSpeedLimit: [
          {
            pattern: /^[0-9]+$/,
            message: "请输入正确的数字",
            trigger: "blur",
          },
        ],
      },
      opts: {
        warnType: [],
      },
    };
  },
  created() {
    this.getWarmTypeOptsFn();
  },
  methods: {
    getWarmTypeOptsFn() {
      const params = { dicCode: "fenceAlarmType" };
      api
        .getWarmTypeDict(params)
        .then((res) => {
          const { data } = res;
          this.opts.warnType = data.map((item) => ({
            value: item.itemValue,
            label: item.itemCode,
          }));
        })
        .catch();
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap-create {
  padding: 24px;
  ::v-deep {
    .el-form-item {
      margin-bottom: 16px;
    }
  }
  .unit {
    color: #242627;
    font-family: PingFang SC;
    font-size: 14px;
    line-height: 36px;
  }
}
</style>
