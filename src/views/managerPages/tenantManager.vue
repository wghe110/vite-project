<template>
  <div class="wrap-tenant">
    <c-section-item>
      <c-filter @keydown.enter.native="searchFn">
        <c-filter-item label="租户账号">
          <el-input
            v-model="form.tenantAccount"
            placeholder="请输入租户账号"
            style="width: 100%"
            clearable
          ></el-input>
        </c-filter-item>

        <c-filter-item label="租户名称">
          <el-input
            v-model="form.tenantName"
            placeholder="请输入租户名称"
            style="width: 100%"
            clearable
          ></el-input>
        </c-filter-item>

        <c-filter-item label="联系人">
          <el-input
            v-model="form.contacts"
            placeholder="请输入联系人"
            style="width: 100%"
            clearable
          ></el-input>
        </c-filter-item>

        <c-filter-item label="状态">
          <el-select
            v-model="form.activeFlag"
            placeholder="请选择状态"
            style="width: 100%"
            clearable
          >
            <el-option label="激活" value="1"></el-option>
            <el-option label="非激活" value="0"></el-option>
          </el-select>
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
          <el-table-column type="selection" width="55" :selectable="selectFn">
          </el-table-column>
          <el-table-column prop="tenantAccount" label="租户账号">
          </el-table-column>
          <el-table-column prop="tenantName" label="租户名称"></el-table-column>
          <el-table-column prop="contacts" label="联系人"></el-table-column>
          <el-table-column prop="phone" label="联系电话"></el-table-column>
          <el-table-column prop="activeFlag" label="状态" width="80">
            <template slot-scope="scope">
              <el-switch
                :value="scope.row.activeFlag"
                :disabled="scope.row.tenantAccount === 'superAdmin'"
                active-value="1"
                inactive-value="0"
                @change="(val) => changeStatusFn(val, scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="expireTime" label="过期时间"></el-table-column>
          <el-table-column label="操作" width="130">
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
    <!-- Detail dialog -->
    <Detail ref="detailRef"></Detail>
  </div>
</template>

<script>
import api from "@/apis/system-manage/tenant";
import Create from "./components/Create.vue";
import Edit from "./components/Edit.vue";
import Detail from "./components/Detail.vue";

export default {
  components: {
    Create,
    Edit,
    Detail,
  },
  data() {
    return {
      isSuperAdmin: false,
      form: {
        tenantAccount: "",
        tenantName: "",
        contacts: "",
        activeFlag: "",
      },
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
    selectFn(row, idx) {
      return row.tenantAccount !== "superAdmin";
    },
    searchFn(resetPage = false) {
      if (resetPage) this.page.current = 1;

      const params = this.getParamsFn();
      api
        .getList(params)
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
        form: { tenantAccount, tenantName, contacts, activeFlag },
        page: { current, size },
      } = this;

      return {
        page: current - 1, // 好垃圾，竟然第一页传0
        size,
        "tenantAccount.contains": tenantAccount,
        "tenantName.contains": tenantName,
        "contacts.contains": contacts,
        "activeFlag.contains": activeFlag,
      };
    },
    resetFn() {
      this.form = {
        tenantAccount: "",
        tenantName: "",
        contacts: "",
        activeFlag: "",
      };
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
      const arr = [
        {
          text: "查看",
          clickFn() {
            const target = self.$refs.detailRef;
            target.visible = true;
            target.getDetailFn(row.id);
            target.getMenusFn(row.id);
          },
        },
        {
          text: "编辑",
          clickFn() {
            const target = self.$refs.editRef;
            target.visible = true;
            target.getDetailFn(row.id);
            target.getMenusFn(row.id);
          },
        },
      ];

      if (row.tenantAccount !== "superAdmin") {
        arr.push({
          text: "删除",
          clickFn() {
            self
              .$confirm("确定删除这条数据？", "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              })
              .then(() => {
                self.deleteFn(row.id);
              })
              .catch(() => {});
          },
        });
      }

      return arr;
    },
    createFn() {
      this.$refs.createRef.visible = true;
    },
    deleteFn(id) {
      api
        .deleteTenant(id)
        .then(() => {
          this.$message.success("删除成功");
          this.searchFn(true);
          return;
        })
        .catch((err) => {
          console.error(err);
          const {
            data: { title },
          } = err;
          this.$message.error(title || "删除失败");
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
          const ids = multipleSelection.map((item) => item.id).join(",");
          this.deleteAllFn(ids);
        })
        .catch(() => {});
    },
    deleteAllFn(ids) {
      const params = {
        ids,
      };
      api
        .batchDeleteTenant(params)
        .then((res) => {
          const { code, message } = res;

          if (code !== 200 && code !== 0) {
            this.$message.error(message || "删除失败");
            return;
          }

          this.$message.success("删除成功");
          this.searchFn(true);
        })
        .catch((err) => {
          const {
            data: { title },
          } = err;
          this.$message.error(title || "删除失败");
        });
    },
    changeStatusFn(val, row) {
      const params = {
        activeFlag: val,
        id: row.id,
      };
      api
        .changeStatus(params)
        .then((res) => {
          this.$message.success("操作成功");
          this.searchFn();
        })
        .catch((err) => {
          this.$message.error("操作失败");
          this.searchFn();
        });
    },
  },
};
</script>


<style lang="scss" scoped>
.wrap-tenant {
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