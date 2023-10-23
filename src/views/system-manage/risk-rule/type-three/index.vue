<template>
  <div>
    <ComTitle>报警级别设置</ComTitle>

    <section class="item" v-for="item in alarmList" :key="item.itemCode">
      <h2 class="sub-title">{{ item.itemValue }}</h2>
      <ul class="list">
        <li v-for="item in data.get(item.itemCode)" :key="item.id">
          <List
            :actions="['删除']"
            :source="item"
            v-if="item.alarmValue"
            @command="(obj) => commandFn(obj)"
            >{{ item.alarmValue }}</List
          >
          <ItemAdd
            :options="selectOpts"
            v-else
            @change="(val) => addSureFn(val, item.itemCode)"
          ></ItemAdd>
        </li>
        <li>
          <ListAdd @click.native="addFn(item.itemCode)"></ListAdd>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import api from "@/apis/system-manage/risk-rule";

import ComTitle from "../components/Title.vue";
import List from "../components/List.vue";
import ListAdd from "../components/ListAdd.vue";
import ItemAdd from "../components/ItemAdd.vue";

export default {
  components: {
    ComTitle,
    List,
    ListAdd,
    ItemAdd,
  },
  data() {
    return {
      data: new Map(),
      alarmList: [],
      selectOpts: [],
    };
  },
  created() {
    this.searchAlarmFn().then((list) => {
      list.forEach((item) => {
        this.searchListFn(item.itemCode);
      });
    });

    this.searchOptsFn();
  },
  methods: {
    searchAlarmFn() {
      const params = {
        dicCode: "riskAlarmLevel",
      };

      return new Promise((resolve, reject) => {
        api.getAlarmDict(params).then((res) => {
          const { data } = res;
          try {
            this.alarmList = data;
            resolve(data);
          } catch (error) {
            this.$message.error("获取风险等级字典失败");
          }
        });
      });
    },
    searchListFn(alarmLevel) {
      const params = {
        alarmLevel,
      };

      api.getAlarmList(params).then((res) => {
        const { result } = res;
        try {
          this.data.set(alarmLevel, result);
          this.$forceUpdate(); // map更新需要
        } catch (error) {
          this.$message.error(`获取${alarmLevel}风险等级列表失败`);
        }
      });
    },
    searchOptsFn() {
      api.getAlarmShow().then((res) => {
        const { result } = res;
        try {
          const keys = Object.keys(result);
          this.selectOpts = keys.map((key) => ({
            value: key,
            label: result[key],
          }));
        } catch (error) {
          this.$message.error(`获取下拉列表列表失败`);
        }
      });
    },
    addFn(alarmLevel) {
      this.data.get(alarmLevel).push({
        name: "",
        itemCode: alarmLevel,
        id: Date.now(),
      });
      this.$forceUpdate(); // map更新需要
    },
    addSureFn(alarmCode, alarmLevel) {
      const params = {
        alarmCode,
        alarmLevel,
      };

      api.alarmAdd(params).then(() => {
        this.$message.success(`设置成功`);
        this.searchListFn(alarmLevel);
        this.searchOptsFn();
      });
    },
    commandFn({ item, source }) {
      // console.log('item', item)
      switch (item) {
        case "删除":
          this.deleteFn(source);
          break;
        default:
          break;
      }
    },
    deleteFn({ id, alarmLevel }) {
      const params = {
        id,
      };

      api.alarmDelete(params).then((res) => {
        this.$message.success(`删除成功`);
        this.searchListFn(alarmLevel);
        this.searchOptsFn();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  padding: 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  > li {
    list-style: none;
    margin-bottom: 6px;
    width: calc(50% - 20px);
    &:nth-child(even) {
      margin-left: 40px;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.sub-title {
  font-size: 14px;
  line-height: 1;
  color: #242627;
  margin: 0 0 12px;
}

.item {
  margin-bottom: 40px;
}
</style>
