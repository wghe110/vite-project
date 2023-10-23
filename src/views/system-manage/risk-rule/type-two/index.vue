<template>
  <div>
    <ComTitle>风控坐席人员</ComTitle>

    <div class="filter">
      <el-select v-model="val" style="width: 100%" placeholder="" filterable>
        <el-option
          v-for="item in opts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          @click.native="selectFn(item)"
        >
        </el-option>
      </el-select>
    </div>

    <ul class="list">
      <li v-for="item in data" :key="item.id">
        <List :source="item" @command="commandFn" :actions="['删除']">{{
          item.name
        }}</List>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "@/apis/system-manage/risk-rule";

import ComTitle from "../components/Title.vue";
import List from "../components/List.vue";

export default {
  components: {
    ComTitle,
    List,
  },
  data() {
    return {
      val: "",
      data: [],
      opts: [],
    };
  },
  created() {
    this.searchFn();
    this.searchOptsFn();
  },
  methods: {
    searchFn() {
      api.getSeatList().then((res) => {
        const { result } = res;
        try {
          this.data = result;
        } catch (error) {
          this.$message.error(`获取风控坐席人员查询失败`);
        }
      });
    },
    searchOptsFn() {
      api.getSeatShow().then((res) => {
        const { result } = res;
        try {
          this.opts = result.map((item) => ({
            value: item.userId,
            label: item.name,
          }));
        } catch (error) {
          this.$message.error(`风控坐席人员下拉框查询失败`);
        }
      });
    },
    commandFn({ item, source }) {
      switch (item) {
        case "删除":
          this.deleteFn(source);
          break;
        default:
          break;
      }
    },
    deleteFn({ id }) {
      const params = {
        id,
      };

      api.seatDelete(params).then(() => {
        this.$message.success(`删除成功`);
        this.searchFn();
        this.searchOptsFn();
      });
    },
    selectFn(opt) {
      const { value } = opt;
      const params = {
        userId: value,
      };

      api.seatAdd(params).then(() => {
        this.val = "";
        this.$message.success(`设置成功`);

        this.searchFn();
        this.searchOptsFn();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  padding: 0;
  > li {
    list-style: none;
    margin-bottom: 6px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.filter {
  margin-bottom: 16px;
}
</style>
