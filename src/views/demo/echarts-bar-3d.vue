<template>
  <chart :option="option"></chart>
</template>

<script setup>
import * as echarts from 'echarts'

// 绘制左侧面
const wid = 20;
const w1 = Math.sin(Math.PI / 6) * wid; //4
const w2 = Math.sin(Math.PI / 3) * wid; // 6.8
const snapHeight = wid / 2;
const CubeLeft = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint;
    const c0 = [shape.x, shape.y];
    const c1 = [shape.x - w2, shape.y];
    const c2 = [shape.x - w2, xAxisPoint[1]];
    const c3 = [shape.x, xAxisPoint[1]];
    ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath();
  },
});
// 绘制右侧面
const CubeRight = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint;
    const c1 = [shape.x, shape.y];
    const c2 = [shape.x, xAxisPoint[1]];
    const c3 = [shape.x + w1, xAxisPoint[1] - w2 + snapHeight];
    const c4 = [shape.x + w1, shape.y - w2 + snapHeight];
    ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath();
  },
});
// 绘制顶面
const CubeTop = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    //
    const c1 = [shape.x, shape.y];
    const c2 = [shape.x + w1, shape.y - w2 + snapHeight]; //右点
    const c3 = [shape.x - w2 + w1, shape.y - w2 + snapHeight];
    const c4 = [shape.x - w2, shape.y];
    ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath();
  },
});
// 三个面图形
echarts.graphic.registerShape('CubeLeft', CubeLeft);
echarts.graphic.registerShape('CubeRight', CubeRight);
echarts.graphic.registerShape('CubeTop', CubeTop);

let xData = ['2017', '2018', '2019', '2020', '2021'];
let yData = [150, 126, 260, 220, 184];
const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    backgroundColor: 'rgba(9, 24, 48, 0.5)',
    borderColor: 'rgba(75, 253, 238, 0.4)',
    textStyle: {
      color: '#CFE3FC',
    },
    borderWidth: 1,
    formatter: function (params) {
      let item = '';
      item += params[0].name;
      params.forEach(function (itm) {
        item += ': ' + itm.value + '万元';
      });
      return item;
    },
  },
  grid: {
    top: '10%',
    left: '5%',
    bottom: '5%',
    right: '5%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: xData,
    axisLine: {
      show: true,
      lineStyle: {
        color: '#3e6f8e',
        width: 1,
      },
    },
    axisTick: {
      show: false,
      length: 9,
      alignWithLabel: false,
      lineStyle: {
        color: '#AAA',
      },
    },
    axisLabel: {
      fontSize: 14,
      margin: 10,
      color: 'white',
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: '#ffffff',
        opacity: 0.2,
        width: 1,
      },
    },
  },
  yAxis: {
    name: '单位：万元',
    type: 'value',
    nameTextStyle: {
      color: 'white',
      fontSize: 16,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#3e6f8e',
        width: 1,
      },
    },
    axiosTick: {
      show: false,
    },
    axisLabel: {
      color: 'white',
      fontSize: 14,
      margin: 10,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#ffffff',
        opacity: 0.2,
        width: 1,
      },
    },
    nameGap: 20,
  },
  series: [
    {
      type: 'bar',
      label: {
        normal: {
          show: true,
          position: 'top',
          fontSize: 16,
          color: '#fff',
          offset: [0, -10],
        },
      },
      tooltip: {
        show: false,
      },
      itemStyle: {
        color: 'transparent',
      },
      data: yData,
    },
    {
      type: 'custom',
      renderItem: (params, api) => {
        const location = api.coord([api.value(0), api.value(1)]);
        location[0] = location[0] + wid * 0;
        const xlocation = api.coord([api.value(0), 0]);
        xlocation[0] = xlocation[0] + wid * 0;
        return {
          type: 'group',
          children: [
            {
              type: 'CubeLeft',
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: xlocation,
              },
              style: {
                stroke: '#FFECEC',
                lineWidth: 1,
                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#FF9D4B',
                  },
                  {
                    offset: 1,
                    color: 'rgba(255,148,0,0.35)',
                  },
                ]),
              },
            },
            {
              type: 'CubeRight',
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: xlocation,
              },
              style: {
                stroke: '#FFECEC',
                lineWidth: 1,
                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#FF4444',
                  },
                  {
                    offset: 1,
                    color: 'rgba(221,35,35,0.35)',
                  },
                ]),
              },
            },
            {
              type: 'CubeTop',
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: xlocation,
              },
              style: {
                stroke: '#FFECEC',
                lineWidth: 1,
                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#FF4444',
                  },
                  {
                    offset: 1,
                    color: 'rgba(243,148,148,0.81)',
                  },
                ]),
              },
            },
          ],
        };
      },
      color: 'blue',
      data: yData,
    },
  ],
};

</script>