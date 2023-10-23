<template>
  <div>
    <ComTitle>报警自动处理设置</ComTitle>
    <p class="tips">
      设置自动处理的报警类型将在发生后由系统自动下发提示，并纳入处理完成
    </p>

    <ul class="list">
      <li v-for="(item, idx) in data" :key="item.id">
        <ItemEdit
          v-if="item.isEdit || item.isAdd"
          :source="item"
          @cancel="cancelFn(idx, item)"
          @save="saveFn"
        ></ItemEdit>
        <List v-else :source="item" @command="commandFn">{{
          item.alarmValue
        }}</List>
      </li>
      <li>
        <ListAdd @click.native="addFn"></ListAdd>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "@/apis/system-manage/risk-rule";

import ComTitle from "../components/Title.vue";
import List from "../components/List.vue";
import ListAdd from "../components/ListAdd.vue";
import ItemEdit from "../components/ItemEdit.vue";

export default {
  components: {
    ComTitle,
    List,
    ListAdd,
    ItemEdit,
  },
  data() {
    return {
      data: [],
    };
  },
  created() {
    this.searchFn();
  },
  methods: {
    searchFn() {
      api.getAutoAlarmList().then((res) => {
        const { result } = res;
        try {
          this.data = result.map((item) => ({
            ...item,
            type: item.alarmCode,
            isEdit: false,
            isAdd: false,
          }));
        } catch (error) {
          this.$message.error(`告警自动处理配置查询失败`);
        }
      });
    },
    addFn() {
      this.data.push({
        id: Date.now(),
        type: "",
        isAdd: true,
        isEdit: false,
        msg: "",
        des: "",
      });
    },
    commandFn({ item, source }) {
      switch (item) {
        case "删除":
          this.deleteFn(source);
          break;
        case "修改":
          this.editFn(source);
          break;
        default:
          break;
      }
    },
    cancelFn(idx, obj) {
      const { type } = obj;
      if (type) {
        // 编辑
        obj.isEdit = false;
      } else {
        // 新增
        this.data.splice(idx, 1);
      }
    },
    saveFn(obj) {
      const { isEdit, isAdd } = obj;

      if (isEdit) this.queryUpdateFn(obj);
      if (isAdd) this.queryAddFn(obj);
    },
    queryUpdateFn({ id, type }) {
      const params = {
        id,
        alarmCode: type,
      };

      api.autoAlarmUpdata(params).then(() => {
        this.$message.success(`更新成功`);
        this.searchFn();
      });
    },
    queryAddFn({ type }) {
      const params = {
        alarmCode: type,
      };

      api.autoAlarmAdd(params).then((res) => {
        const { code, message } = res;
        if (code === 200) {
          this.$message.success(`添加成功`);
          this.searchFn();
        } else {
          this.$message.error(message || `添加失败`);
        }
      });
    },
    deleteFn({ id }) {
      const params = {
        id,
      };

      api.autoAlarmDelete(params).then(() => {
        this.$message.success(`删除成功`);
        this.searchFn();
      });
    },
    editFn(obj) {
      obj.isEdit = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.tips {
  font-size: 14px;
  color: #a5a9b1;
  line-height: 22px;
  margin-bottom: 16px;
}
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
</style>
