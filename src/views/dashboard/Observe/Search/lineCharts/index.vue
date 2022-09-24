<template>
    <div>
        <div class="header">
            <span>搜索用户数</span>
            <i class="el-icon-info"></i>
        </div>
        <div class="main">
            <span class="main-title">12321</span>
            <span class="main-content">17.1<svg t="1663905735838" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="5030" width="14" height="14">
                    <path d="M325.456896 862.27968" p-id="5031" fill="#1afa29"></path>
                    <path d="M882.05824 862.27968" p-id="5032" fill="#1afa29"></path>
                    <path d="M236.027904 877.161472" p-id="5033" fill="#1afa29"></path>
                    <path d="M960.132096 877.161472" p-id="5034" fill="#1afa29"></path>
                    <path d="M63.683584 788.737024" p-id="5035" fill="#1afa29"></path>
                    <path d="M958.46912 788.737024" p-id="5036" fill="#1afa29"></path>
                    <path d="M64.77824 858.791936" p-id="5037" fill="#1afa29"></path>
                    <path
                        d="M163.396608 289.168384c-40.577024 0-66.526208 54.183936-35.44064 85.25824L477.217792 723.704832c20.031488 20.031488 49.82272 20.031488 69.853184 0l349.274112-349.278208c30.30528-30.294016 6.677504-85.25824-34.927616-85.25824L163.396608 289.168384z"
                        p-id="5038" fill="#1afa29"></path>
                    <path d="M959.522816 858.791936" p-id="5039" fill="#1afa29"></path>
                </svg></span>
        </div>
        <div class="footer">
            <div class="charts" ref="charts"></div>
        </div>
    </div>
</template>

<script>
import * as echarts from "echarts";
export default {
    mounted() {
        let lineCharts = echarts.init(this.$refs.charts);
        lineCharts.setOption({
            xAxis: {
                show: false,
                type: 'category',
            },
            yAxis: {
                show: false
            },
            series: [
                {
                    type: "line",
                    data: [10, 5, 19, 5, 3, 17, 8, 1, 6, 3, 12, 7,11,6,5],
                    smooth: true,
                    color: 'yellowgreen',
                    itemStyle: {
                        opacity: 0
                    },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: 'yellowgreen',
                                },
                                {
                                    offset: 1,
                                    color: '#fff',
                                }
                            ]
                        }
                    }
                },
            ],
        })
    }
}
</script>

<style lang="scss" scoped>
.header {
    color: #999;
}

i {
    margin-left: 20px;
}

.main {
    margin: 10px 0;
}

.main-title {
    margin-right: 30px;
    font-size: 18px;
}

.main-content {
    font-size: 14px;
    color: #999;
}

.charts {
    width: 100%;
    height: 70px;
    margin-left: -33px;
}
</style>