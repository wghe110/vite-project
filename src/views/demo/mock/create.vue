<template>
  <div class="wrap-create">
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="第一级节点数">
        <el-input v-model="form.first"></el-input>
      </el-form-item>
      <el-form-item label="第二级节点数">
        <el-input v-model="form.second"></el-input>
      </el-form-item>
      <el-form-item label="第三级节点数">
        <el-input v-model="form.three"></el-input>
      </el-form-item>

      <p>节点数：{{ nodeNum }}</p>
      <p>车辆数：{{ carNum }}</p>
      <el-form-item>
        <el-button
          type="primary"
          :disabled="loading"
          :loading="loading"
          @click="createFn"
          >立即创建</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mock } from "mockjs";
import { saveAs } from "file-saver";

export default {
  data() {
    return {
      loading: false,
      form: {
        first: 10,
        second: 10,
        three: 100,
      },
    };
  },
  computed: {
    nodeNum() {
      const { first, second, three } = this.form;
      return 1 + first + first * second + first * second * three;
    },
    carNum() {
      const { first, second, three } = this.form;
      return 1 * first * second * three;
    },
  },
  methods: {
    createFn() {
      this.loading = true;
      setTimeout(() => {
        const aData = [
          {
            id: "1",
            name: "中电鸿信",
            pid: "0",
            children: [],
            type: 0,
          },
        ];

        const { first, second, three } = this.form;
        for (let i = 0; i < first; i++) {
          const oFirst = this.createOrgFn(aData[0].id);
          aData[0].children.push(oFirst);

          for (let j = 0; j < second; j++) {
            const oSecond = this.createOrgFn(oFirst.id);
            oFirst.children.push(oSecond);

            for (let k = 0; k < three; k++) {
              const cThree = this.createCarFn(oSecond.id);
              oSecond.children.push(cThree);
            }
          }
        }
        const aPat = this.patDataFn(aData);
        this.downloadFn(aPat);
      }, 10);
    },
    downloadFn(obj) {
      const str = JSON.stringify(obj, null, 2);
      var blob = new Blob(["export default ", str], {
        type: "application/x-javascript;charset=utf-8",
      });
      saveAs(blob, "10,000.js");
      this.loading = false;
    },
    createOrgFn(pid) {
      return {
        id: mock("@guid()"),
        name: mock("@cword(6)"),
        pid,
        type: 0,
        children: [],
      };
    },
    createCarFn(pid) {
      return {
        id: mock("@guid()"),
        name: "苏A" + mock('@string("upper", 5)'),
        type: 1,
        pid,
        keyId: mock("@guid()"),
        status: mock("@pick([0, 1, 2, 3])"), //0行驶在线 1停车在线 2 离线 3未定位
      };
    },
    patDataFn(tree, target = []) {
      tree.forEach((item) => {
        const { children, ...others } = item;
        target.push({
          ...others,
        });

        children && children.length && this.patDataFn(children, target);
      });

      return target;
    },
  },
};
</script>

<style>
</style>