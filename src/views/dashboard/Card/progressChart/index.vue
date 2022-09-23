<template>
  <div>
    <div class="charts" ref="charts" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
import { PATTERNLIKE_TYPES } from "@babel/types";
import * as echarts from "echarts";
export default {
  mounted() {
    let progressCharts = echarts.init(this.$refs.charts);
    progressCharts.setOption({
      xAxis: {
        show:false,
        min:0,
        max:100,
      },
      yAxis: {
        show:false,
        type:'category',
      },
      series: [
        {
          type: "bar",
          data: [78],
          color:"pink",
          barWidth:12,
          showBackground:true,
          backgroundStyle:{
            color:'#eee',
          }
        },
      ],
      grid:{
        left:0,
        top:0,
      }
    });
  },
};
</script>

<style lang="scss" scope>
</style>