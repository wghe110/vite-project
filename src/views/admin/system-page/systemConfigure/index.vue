<template>
  <div class="wrap-system">
    <CarMuilSelect v-model="demoVal"></CarMuilSelect>

    <br /><br />

    <CreateMock></CreateMock>

    <Demo></Demo>

    <br /><br />
    <hr />
    <br /><br />

    <el-input
      placeholder="输入关键字进行过滤"
      v-model.trim="filterText"
      @input="fliterFn"
    >
    </el-input>
    <div style="height: 200px; overflow: auto">
      <VueEasyTree
        node-key="value"
        height="200px"
        :data="carData"
        show-checkbox
        :props="treeProps"
        ref="treeRef"
        :default-expand-all="expand"
        :key="key"
        :default-checked-keys="checkedKeys"
        @check="checkFn"
      ></VueEasyTree>
    </div>

    <br />

    <el-input
      type="textarea"
      :rows="6"
      placeholder=""
      readonly=""
      :value="checkedNodesStr"
    >
    </el-input>
  </div>
</template>

<script>
import WorkerJS from "./worker.js?worker";
import VueEasyTree from "@wchbrad/vue-easy-tree";
import "@wchbrad/vue-easy-tree/src/assets/index.scss";
import oneData from "./mock-tree/one";
import Demo from "./demo.vue";
import { arrayToTreeFn } from "@/utils/tool";
import api from "@/apis/demo";
import * as pako from "pako";
import * as atob from "atob";
import CreateMock from "./mock/create.vue";
import CarMuilSelect from "./components/CarMuilSelect/index.vue";

export default {
  components: {
    VueEasyTree,
    Demo,
    CreateMock,
    CarMuilSelect,
  },
  data() {
    return {
      demoVal: [],
      timer: null,
      filterText: "",
      carData: oneData,
      treeProps: {
        label: "label",
      },
      checkedKeys: [],
      patData: [],
      expand: false,
      key: 1,
    };
  },
  created() {
    this.getPatDataFn();
    this.getTreeFn();
  },
  computed: {
    checkedNodes() {
      const { checkedKeys, patData } = this;
      return patData.filter((item) => checkedKeys.includes(item.value));
    },
    checkedNodesStr() {
      return this.checkedNodes.map((item) => item.label).join(",");
    },
  },
  methods: {
    fliterFn(val) {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.filterFn(val);
      }, 700);
    },
    getPatDataFn() {
      const self = this;
      const worker = new WorkerJS();
      worker.postMessage(JSON.stringify(this.carData));
      worker.onmessage = function (e) {
        self.patData = JSON.parse(e.data);
        worker.terminate();
      };
    },
    filterFn(val) {
      if (!val) {
        this.carData = oneData;
        this.expand = false;
        this.key++;
        return;
      }

      const arr = this.patData.filter((item) => item.label.includes(val));

      const aKeys = arr.map((item) => {
        const { ancestorKeys } = item;
        if (ancestorKeys) {
          return ancestorKeys.split(",");
        } else {
          return [];
        }
      });

      const matchKeys = arr.map((item) => item.value);
      aKeys.forEach((item) => {
        matchKeys.push(...item);
      });

      const set = new Set(matchKeys);
      const aResultKeys = [...set];
      const nodes = this.patData.filter((item) =>
        aResultKeys.includes(item.value)
      );
      this.carData = arrayToTreeFn(nodes, "value", "pid");
      this.expand = true;
      this.key++;
    },
    checkFn({ value }, { checkedKeys }) {
      const checked = checkedKeys.includes(value);
      checked ? this.checkedFn(value) : this.uncheckedFn(value);
    },
    uncheckedFn(key) {
      const { checkedKeys, patData } = this;
      const set = new Set(checkedKeys);
      // 删除后代
      const offspring = patData.filter((item) => {
        const { ancestorKeys } = item;
        if (ancestorKeys) {
          const arr = ancestorKeys.split(",");
          return arr.includes(key);
        }
        return false;
      });

      offspring.forEach((item) => {
        set.delete(item.value);
      });
      // 删除自己
      set.delete(key);
      // 删除祖先
      const node = patData.find((item) => item.value === key);
      if (node.ancestorKeys) {
        const keys = node.ancestorKeys.split(",");
        keys.forEach((val) => {
          set.delete(val);
        });
      }

      this.checkedKeys = [...set];
    },
    checkedFn(key) {
      const { checkedKeys, patData } = this;
      const set = new Set(checkedKeys);

      // 添加后代
      const offspring = patData.filter((item) => {
        const { ancestorKeys } = item;
        if (ancestorKeys) {
          const arr = ancestorKeys.split(",");
          return arr.includes(key);
        }
        return false;
      });

      offspring.forEach((item) => {
        set.add(item.value);
      });
      // 添加自己
      set.add(key);

      this.checkedKeys = [...set];
    },
    getTreeFn() {
      const params = {
        type: 1,
      };

      api.getTree(params).then((res) => {
        console.log("===", res);
        const { result } = res;
        let strData = atob(result);
        const charData = strData.split("").map(function (x) {
          return x.charCodeAt(0);
        });
        const binData = new Uint8Array(charData);
        let data = pako.inflate(binData);
        data = this.Utf8ArrayToStr(data);
        console.log("+++++", JSON.stringify(data));
      });
    },
    Utf8ArrayToStr(array) {
      let out, i, len, c;
      let char2, char3;
      out = "";
      len = array.length;
      i = 0;
      while (i < len) {
        c = array[i++];
        switch (c >> 4) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
            // 0xxxxxxx
            out += String.fromCharCode(c);
            break;
          case 12:
          case 13:
            // 110x xxxx   10xx xxxx
            char2 = array[i++];
            out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
            break;
          case 14:
            // 1110 xxxx  10xx xxxx  10xx xxxx
            char2 = array[i++];
            char3 = array[i++];
            out += String.fromCharCode(
              ((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0)
            );
            break;
        }
      }
      return JSON.parse(out);
    },
  },
};
</script>

<style>
</style>