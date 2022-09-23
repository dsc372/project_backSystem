<template>
  <div>
    <div class="charts" ref="charts" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  mounted() {
    let lineCharts = echarts.init(this.$refs.charts);
    lineCharts.setOption({
      xAxis: {
        show:false,
        type:'category',
      },
      yAxis: {
        show:false
      },
      series: [
        {
          type: "line",
          data: [10, 5, 19, 5, 3,17,8,1,6,3,12,7],
          smooth:true,
          color:'yellowgreen',
          itemStyle:{
            opacity:0
          },
          areaStyle:{
            color:{
                type:'linear',
                x:0,
                y:0,
                x2:0,
                y2:1,
                colorStops:[
                    {
                        offset:0,
                        color:'yellowgreen',
                    },
                    {
                        offset:1,
                        color:'#fff',
                    }
                ]
            }
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