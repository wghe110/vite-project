<template>
  <div class="wrap-role">
    <c-section-item>
      <c-filter @keydown.enter.native="searchFn">
        <c-filter-item label="角色名">
          <el-input
            v-model="uname"
            placeholder="请输入角色名称"
            style="width: 100%"
            clearable
          ></el-input>
        </c-filter-item>

        <c-filter-item>
          <el-button type="primary" @click="searchFn(true)">查询</el-button>
          <el-button @click="cancelFn">重置</el-button>
        </c-filter-item>
      </c-filter>
    </c-section-item>

    <c-section-item class="content">
      <div class="info">
        <el-button type="primary" icon="el-icon-plus" @click="createFn"
          >新增</el-button
        >
      </div>

      <div class="table-box">
        <c-table :data="tableData">
          <el-table-column prop="name" label="角色名"> </el-table-column>
          <el-table-column prop="dataScope" label="权限范围">
            <template slot-scope="scope">
              <span>{{ getScopeNameFn(scope.row.dataScope) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="icon" label="图标">
            <template slot-scope="scope">
              <Icon
                v-if="scope.row.icon"
                :type="scope.row.icon"
                size="20"
              ></Icon>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160">
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

    <!-- dialog -->
    <c-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </template>
    </c-dialog>

    <c-drawer title="我是标题" :visible.sync="drawer">
      <c-list>
        <c-list-item label="URL地址">安徽托卡智能科技有限公司</c-list-item>
        <c-list-item label="URL地址"
          >安徽托卡智能科技有限公司安徽托卡智能科技有限公司安徽托卡智能科技有限公司安徽托卡智能科技有限公司</c-list-item
        >
        <c-list-item label="URL地址">安徽托卡智能科技有限公司</c-list-item>
        <c-list-item label="URL地址">安徽托卡智能科技有限公司</c-list-item>
        <c-list-item label="URL地址">安徽托卡智能科技有限公司</c-list-item>
      </c-list>
    </c-drawer>
  </div>
</template>

<script>
import { Icon } from "view-design";
import api from "@/apis/system";

export default {
  components: {
    Icon,
  },
  data() {
    return {
      uname: "",
      page: {
        current: 1,
        size: 10,
        total: 0,
      },
      tableData: [],

      dialogVisible: false,
      drawer: false,
    };
  },
  created() {},
  methods: {
    searchFn(resetPage = false) {
      if (resetPage) this.page.current = 1;

      const params = this.getParamsFn();
      api.getRoleList(params).then((res) => {
        const { recordsTotal, data } = res;
        this.tableData = data || [];
        this.page.total = recordsTotal || 0;
      });
    },
    getParamsFn() {
      const {
        uname,
        page: { current, size },
      } = this;

      return {
        page: current,
        size,
        "name.contains": uname,
      };
    },
    cancelFn() {
      this.uname = "";
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
    getActionsFn(scope) {
      const { row } = scope;
      return [
        {
          text: "查看",
          clickFn() {
            console.log("查看scope", row);
          },
        },
        {
          text: "编辑",
          clickFn() {
            console.log("编辑scope", row);
          },
        },
        {
          text: "删除",
          clickFn() {
            console.log("删除scope", row);
          },
        },
        {
          text: "关闭",
          clickFn() {
            console.log("关闭scope", row);
          },
        },
      ];
    },
    createFn() {
      this.$alert("这是一段内容", "标题名称", {
        confirmButtonText: "确定",
        callback: (action) => {
          this.$message({
            type: "info",
            message: `action: ${action}`,
          });
        },
      });
    },
    dialogFn() {
      this.dialogVisible = true;
    },
    getScopeNameFn(num) {
      const aNames = [
        "全部数据权限",
        "自定数据权限",
        "本部门数据权限",
        "本部门及以下数据权限",
        "仅本人数据权限",
      ];
      return num ? aNames[num - 1] : "暂无数据";
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap-role {
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