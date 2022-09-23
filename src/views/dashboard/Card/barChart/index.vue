<template>
  <div>
    <div class="charts" ref="charts" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  mounted() {
    let barCharts = echarts.init(this.$refs.charts);
    barCharts.setOption({
      xAxis: {
        show:false,
        type:'category',
      },
      yAxis: {
        show:false
      },
      series: [
        {
          type: "bar",
          data: [10, 5, 19, 5, 3,17,8,20,6,3,12,7],
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