<template>
  <div class="wrap-amap">
    <div id="container"></div>
    <el-button @click="drawCircleFn">画圆</el-button>

    <div class="hidden">
      <ContentCom ref="conRef"></ContentCom>
    </div>
  </div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
import ContentCom from "./InfoWindow/Content.vue";

export default {
  components: {
    ContentCom,
  },
  data() {
    return {
      map: null,
      mouseTool: null,
      AMap: null,
    };
  },
  mounted() {
    this.initAMap();
  },
  unmounted() {
    this.map?.destroy();
  },
  methods: {
    initAMap() {
      AMapLoader.load({
        key: "52e93030f3584a6ac53b4712d2b4e5d6",
        version: "2.0",
        plugins: ["AMap.MouseTool"],
      })
        .then((AMap) => {
          this.AMap = AMap;
          this.map = new AMap.Map("container", {
            viewMode: "2D",
            zoom: 11,
            center: [116.397428, 39.90923],
          });
          this.mouseTool = new AMap.MouseTool(this.map);
          this.mouseTool.on("draw", this.drawFinishedFn);
          // this.map.on("mousemove", this.showInfoMove);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    drawCircleFn() {
      const { mouseTool } = this;
      mouseTool.circle({
        strokeColor: "#FF33FF",
        strokeWeight: 6,
        strokeOpacity: 0.2,
        fillColor: "#1791fc",
        fillOpacity: 0.4,
        strokeStyle: "solid",
      });
    },
    drawFinishedFn(event) {
      // event.obj 为绘制出来的覆盖物对象
      console.log("覆盖物对象绘制完成", event);
      console.log(event.obj.getRadius()); //获取半径
      console.log(event.obj.getCenter()); //获取中心点

      this.mouseTool.close(false);
      const self = this;
      const infoWindow = new self.AMap.InfoWindow({
        isCustom: true,
        content: self.$refs["conRef"].$el,
        offset: new self.AMap.Pixel(-9, -60),
      });

      infoWindow.open(this.map, this.map.getCenter());
    },
    showInfoMove(e) {
      console.log(e.lnglat.getLng() + "," + e.lnglat.getLat());
    },
  },
};
</script>

<style  scoped>
.wrap-amap {
  width: 100%;
  height: 100%;
  min-height: 300px;
}
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
}
.hidden {
  width: 0px;
  height: 0px;
  position: fixed;
  overflow: hidden;
  left: 0;
  top: 0;
}
</style>