<template>
  <div class="wrap-dict">
    <c-section-item>
      <c-filter @keydown.enter.native="searchFn">
        <c-filter-item label="字典编码">
          <el-input
            v-model="dicCode"
            placeholder="请输入字典编码"
            style="width: 100%"
            clearable
          ></el-input>
        </c-filter-item>

        <c-filter-item label="字典名称">
          <el-input
            v-model="dicName"
            placeholder="请输入字典名称"
            style="width: 100%"
            clearable
          ></el-input>
        </c-filter-item>

        <c-filter-item>
          <el-button type="primary" @click="searchFn(true)">查询</el-button>
          <el-button @click="resetFn">重置</el-button>
        </c-filter-item>
      </c-filter>
    </c-section-item>

    <c-section-item class="content">
      <div class="info" v-if="isSuperAdmin">
        <el-button type="primary" icon="el-icon-plus" @click="createFn"
          >新增</el-button
        >
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
          row-key="dicId"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="dicCode" label="字典编码"> </el-table-column>
          <el-table-column prop="dicName" label="字典名称"></el-table-column>
          <el-table-column prop="dicSort" label="排序"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <c-action-btns :actions="getActionsFn(scope)"></c-action-btns>
            </template>
          </el-table-column>
        </c-table>
      </div>

      <c-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.current"
        :page-size="page.size"
        :total="page.total"
      ></c-pagination>
    </c-section-item>

    <!-- create dialog -->
    <Create ref="createRef" @success="searchFn(true)"></Create>
    <!-- edit dialog -->
    <Edit ref="editRef" @success="searchFn"></Edit>
    <!-- config dialog -->
    <Config ref="configRef"></Config>
  </div>
</template>

<script>
import api from "@/apis/system";
import Create from "./components/Create.vue";
import Edit from "./components/Edit.vue";
import Config from "./components/Config.vue";

export default {
  components: {
    Create,
    Edit,
    Config,
  },
  data() {
    return {
      isSuperAdmin: false,
      dicCode: "",
      dicName: "",
      page: {
        current: 1,
        size: 10,
        total: 0,
      },
      tableData: [],
      multipleSelection: [],
    };
  },
  created() {
    this.isSuperAdmin = localStorage.getItem("tenantAccount") === "superAdmin";

    this.searchFn(true);
  },
  methods: {
    searchFn(resetPage = false) {
      if (resetPage) this.page.current = 1;

      const params = this.getParamsFn();
      api
        .getDictList(params)
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
        dicCode,
        dicName,
        page: { current, size },
      } = this;

      return {
        page: current - 1, // 好垃圾，竟然第一页传0
        size,
        "dicCode.contains": dicCode,
        "dicName.contains": dicName,
        "dicAttr.equals": "list",
      };
    },
    resetFn() {
      this.dicCode = "";
      this.dicName = "";
      this.page.current = 1;
      this.page.size = 10;

      this.searchFn();
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
    getActionsFn(scope) {
      const { row } = scope;
      const self = this;
      const arr = [];

      if (this.isSuperAdmin) {
        arr.push(
          {
            text: "字典配置",
            clickFn() {
              const target = self.$refs.configRef;
              target.visible = true;
              target.initDicId(row.dicId);
            },
          },
          {
            text: "编辑",
            clickFn() {
              const target = self.$refs.editRef;
              target.visible = true;
              target.getDetailFn(row.dicId);
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
                  self.deleteFn(row.dicId);
                })
                .catch(() => {});
            },
          }
        );
      }

      return arr;
    },
    createFn() {
      this.$refs.createRef.visible = true;
    },
    deleteFn(dicId) {
      api
        .deleteDict(dicId)
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
          const dicIds = multipleSelection.map((item) => item.dicId).join(",");
          this.deleteAllFn(dicIds);
        })
        .catch(() => {});
    },
    deleteAllFn(dicIds) {
      api
        .deleteDictAll({ dicIds })
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
  },
};
</script>


<style lang="scss" scoped>
.wrap-dict {
  height: 100%;
  display: flex;
  flex-direction: column;
  > .content {
    flex: 1;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    > .info {
      margin-bottom: 16px;
    }
    > .table-box {
      flex: 1;
      min-height: 100px;
      overflow: hidden;
    }
  }
}
</style>