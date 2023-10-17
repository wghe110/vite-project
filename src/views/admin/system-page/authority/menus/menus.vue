<template>
  <div class="wrap-menus">
    <c-section-item class="content">
      <div class="info">
        <el-button type="primary" icon="el-icon-plus" @click="createFn()"
          >新增</el-button
        >
        <el-input
          placeholder="请输入菜单名称查找"
          v-model.trim="tit"
          style="width: 400px"
          clearable
          @input="filterFn"
          @clear="filterFn"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="table-box">
        <c-table
          :data="treeData"
          row-key="id"
          :expand-row-keys="expandKeys"
          @expand-change="expandFn"
          :row-class-name="tableRowClassName"
          ref="tableRef"
          border
          :key="tableKey"
        >
          <el-table-column
            prop="title"
            label="菜单名称"
            show-overflow-tooltip
            min-width="140"
          >
          </el-table-column>
          <el-table-column prop="icon" label="图标" width="80" align="center">
            <template slot-scope="scope">
              <Icon
                v-if="scope.row.icon"
                :type="scope.row.icon"
                size="20"
              ></Icon>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ aType[scope.row.type] || "暂无数据" }}
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="路由名称"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="url"
            label="访问路径"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" width="136">
            <template slot-scope="scope">
              <c-action-btns :actions="getActionsFn(scope)"></c-action-btns>
            </template>
          </el-table-column>
        </c-table>
      </div>
    </c-section-item>

    <!-- create dialog -->
    <Create ref="createRef" @success="searchFn"></Create>
    <!-- edit dialog -->
    <Edit ref="editRef" @success="searchFn"></Edit>
  </div>
</template>

<script>
import api from "@/apis/system";
import { Icon } from "view-design";
import { arrayToTree } from "@/utils/tool";
import { getAncestorIdsFn } from "./tool";
import Create from "./components/Create.vue";
import Edit from "./components/Edit.vue";

export default {
  components: {
    Icon,
    Create,
    Edit,
  },
  data() {
    return {
      timer: null,
      tit: "",
      tableData: [],
      aType: {
        menu1: "一级菜单",
        menu2: "二级菜单（不含三级菜单），三级菜单",
        "menu2-sp": "二级菜单（含三级菜单）",
        "non-menu": "非菜单页面",
        "non-button": "数据/按钮",
        button: "数据/按钮",
      },
      expandKeys: [],
      matchIds: [],
      tableKey: 0, // 重新渲染table
    };
  },
  computed: {
    treeData() {
      return arrayToTree(this.tableData);
    },
  },
  created() {
    this.searchFn();
  },
  methods: {
    searchFn() {
      api.getMenusTree().then((res) => {
        this.tableData = res || [];
      });
    },
    createFn(parent = { id: 0, title: "/" }) {
      this.$refs.createRef.visible = true;
      this.$refs.createRef.initParentFn(parent);
    },
    getActionsFn(scope) {
      const { row } = scope;
      const self = this;
      const arr = [
        {
          text: "新增",
          clickFn() {
            self.createFn(row);
          },
        },
        {
          text: "编辑",
          clickFn() {
            const target = self.$refs.editRef;
            target.visible = true;
            target.getDetailFn(row.id);

            const { parentId } = row;
            if (parentId === "0") {
              target.initParentFn({ id: "0", title: "/" });
              return;
            }
            const parentNode = self.tableData.find(
              (item) => item.id === parentId
            );
            parentNode && target.initParentFn(parentNode);
          },
        },
        {
          text: "删除",
          clickFn() {
            self
              .$confirm("确定删除该节点（包括子节点）数据？", "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              })
              .then(() => {
                self.deleteFn(row.id);
              })
              .catch(() => {});
          },
        },
      ];

      return arr;
    },
    deleteFn(id) {
      api
        .deleteMenu(id)
        .then((res) => {
          const { code } = res;
          if (code === 0) {
            this.$message.success("删除成功");
            this.searchFn();
            return;
          }

          this.$message.error("删除失败");
        })
        .catch((err) => {
          console.error(err);
          this.$message.error("删除失败");
        });
    },
    expandFn({ id }, status) {
      const { expandKeys } = this;
      const set = new Set(expandKeys);
      status ? set.add(id) : set.delete(id);

      this.expandKeys = [...set];
    },
    tableRowClassName({ row }) {
      const { id } = row;
      const { matchIds } = this;
      if (matchIds.includes(id)) return "match";
      return "";
    },
    filterFn() {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setMatchFn();
        this.setExpandFn();
      }, 500);
    },
    setMatchFn() {
      this.matchIds = [];

      const { tit, tableData } = this;
      if (!tit) return;

      const aRows = tableData.filter((item) => item.title.includes(tit));
      if (aRows.length) {
        this.matchIds = aRows.map((item) => item.id);
      } else {
        this.$message.warning("未匹配到数据");
      }
    },
    setExpandFn() {
      this.expandKeys = [];
      this.tableKey += 1;
      if (!this.tit) return;

      const { matchIds, tableData } = this;
      const aIds = matchIds.map((id) => getAncestorIdsFn(tableData, id));

      const set = new Set([].concat.apply([], aIds));
      this.expandKeys = [...set];
    },
  },
};
</script>


<style lang="scss" scoped>
.wrap-menus {
  height: 100%;
  display: flex;
  flex-direction: column;
  > .content {
    flex: 1;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    > .info {
      display: flex;
      justify-content: space-between;
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
<style lang="scss">
.el-table .match td {
  background-color: #f0f9eb !important;
}
</style>