<template>
  <c-dialog title="字典项列表" :visible.sync="visible" size="large">
    <div class="wrap-config">
      <c-filter @keydown.enter.native="searchFn">
        <c-filter-item label="字典项编码" style="width: 33.3%">
          <el-input
            v-model="itemCode"
            placeholder="请输入字典项编码"
            style="width: 100%"
            clearable
          ></el-input>
        </c-filter-item>

        <c-filter-item label="字典值" style="width: 33.3%">
          <el-input
            v-model="itemValue"
            placeholder="请输入字典值"
            style="width: 100%"
            clearable
          ></el-input>
        </c-filter-item>

        <c-filter-item>
          <el-button type="primary" @click="searchFn(true)">查询</el-button>
          <el-button @click="resetFn">重置</el-button>
        </c-filter-item>
      </c-filter>

      <div class="content">
        <div class="info">
          <el-button icon="el-icon-plus" @click="createFn">新增</el-button>
          <el-button
            icon="el-icon-delete"
            @click="batchDeleteFn"
            :disabled="multipleSelection.length === 0"
            >删除</el-button
          >
        </div>

        <div class="table-box">
          <c-table
            :data="tableData"
            row-key="itemId"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="itemCode" label="字典项编码">
            </el-table-column>
            <el-table-column prop="itemValue" label="字典值"></el-table-column>
            <el-table-column prop="itemSort" label="排序"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <c-action-btns :actions="getActionsFn(scope)"></c-action-btns>
              </template>
            </el-table-column>
          </c-table>
        </div>
      </div>
    </div>

    <template #footer>
      <c-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.current"
        :page-size="page.size"
        :total="page.total"
      ></c-pagination>
    </template>

    <!-- create dialog -->
    <Create ref="createRef" @success="searchFn(true)"></Create>
    <!-- edit dialog -->
    <Edit ref="editRef" @success="searchFn"></Edit>
  </c-dialog>
</template>

<script>
import api from "@/apis/system";
import Create from "./CreateConfig.vue";
import Edit from "./EditConfig.vue";

export default {
  components: {
    Create,
    Edit,
  },
  data() {
    return {
      visible: false,
      dicId: "",

      itemCode: "",
      itemValue: "",
      page: {
        current: 1,
        size: 10,
        total: 0,
      },
      tableData: [],
      multipleSelection: [],
    };
  },
  watch: {
    visible(val) {
      if (val) this.resetFn();
    },
  },
  methods: {
    getActionsFn(scope) {
      const { row } = scope;
      const self = this;
      const arr = [
        {
          text: "编辑",
          clickFn() {
            const target = self.$refs.editRef;
            target.visible = true;
            target.initDataFn(row);
            target.initDicIdFn(row.dicId);
          },
        },
        {
          text: "删除",
          clickFn() {
            self
              .$confirm("确定删除这条数据？", "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              })
              .then(() => {
                self.deleteFn(row.itemId);
              })
              .catch(() => {});
          },
        },
      ];

      return arr;
    },
    searchFn(resetPage = false) {
      if (resetPage) this.page.current = 1;

      const params = this.getParamsFn();
      api
        .getDictItemList(params)
        .then((res) => {
          const { recordsTotal, data } = res;
          this.tableData = data || [];
          this.page.total = recordsTotal || 0;
        })
        .finally(() => {
          // 清空多选
          this.multipleSelection = [];
        });
    },
    getParamsFn() {
      const {
        dicId,
        itemCode,
        itemValue,
        page: { current, size },
      } = this;

      return {
        page: current - 1, // 好垃圾，竟然第一页传0
        size,
        "itemCode.contains": itemCode,
        "itemValue.contains": itemValue,
        "dicId.equals": dicId,
      };
    },
    resetFn() {
      this.itemCode = "";
      this.itemValue = "";
      this.page.current = 1;
      this.page.size = 10;
      this.multipleSelection = [];

      this.searchFn();
    },
    createFn() {
      this.$refs.createRef.initDicIdFn(this.dicId);
      this.$refs.createRef.visible = true;
    },
    handleSizeChange(val) {
      this.page.size = val;
      this.searchFn(true);
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.searchFn();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deleteFn(itemId) {
      api
        .deleteDictItem(itemId)
        .then(() => {
          this.$message.success("删除成功");
          this.searchFn(true);
          return;
        })
        .catch((err) => {
          console.error(err);
          this.$message.error("删除失败");
        });
    },
    batchDeleteFn() {
      const { multipleSelection } = this;

      this.$confirm("确定删除勾选的数据？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const itemIds = multipleSelection
            .map((item) => item.itemId)
            .join(",");
          this.deleteAllFn(itemIds);
        })
        .catch(() => {});
    },
    deleteAllFn(itemIds) {
      api
        .deleteDictItemAll({ itemIds })
        .then((res) => {
          const { code, message } = res;
          if (code === 500) {
            return this.$message.error(message || "删除失败");
          }

          this.$message.success("删除成功");
          this.searchFn(true);
          return;
        })
        .catch((err) => {
          console.error(err);
          this.$message.error("删除失败");
        });
    },
    initDicId(dicId) {
      this.dicId = dicId;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap-config {
  height: calc(70vh - 100px);
  display: flex;
  flex-direction: column;
  > .content {
    padding-top: 24px;
    flex: 1;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    > .info {
      margin-bottom: 16px;
    }
    > .table-box {
      flex: 1;
      min-height: 200px;
    }
  }
}
</style>