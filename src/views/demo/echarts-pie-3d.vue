<template>
  <chart :option="option"></chart>
</template>

<script setup>
import 'echarts-gl'
import get3dOpt from './pie-3d'

const option = get3dOpt([
  {
    name: '单位1评分',
    value: 33,
    itemStyle: {
      opacity: 1,
      color: '#EAC266'
    }
  },
  {
    name: '单位2评分',
    value: 67,
    itemStyle: {
      opacity: 1,
      color: '#CE231A',
    }
  },
  {
    name: '单位3评分',
    value: 47,
    itemStyle: {
      opacity: 1,
      color: '#F68F46',
    }
  },
  {
    name: '单位4评分',
    value: 267,
    itemStyle: {
      opacity: 1,
      color: '#DF3B4F',
    }
  }
], .65, 100, 4)
</script>