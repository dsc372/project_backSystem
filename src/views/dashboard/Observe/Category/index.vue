<template>
    <div>
        <el-card>
            <div slot="header" class="header">
                <span>销售额类占比</span>
                <div style="margin-top: -7px">
                    <el-radio-group v-model="value" size="mini">
                        <el-radio-button label="全部渠道"></el-radio-button>
                        <el-radio-button label="线上"></el-radio-button>
                        <el-radio-button label="门店"></el-radio-button>
                    </el-radio-group>
                </div>
            </div>
            <div class="charts" ref="charts"></div>
        </el-card>
    </div>
</template>

<script>
    import * as echarts from 'echarts'
export default {
    data() {
        return {
            value: '全部渠道',
            option : {
                tooltip: {
                    trigger: 'item'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: true,
                            position: 'outside'
                        },
                        labelLine: {
                            show: true
                        },
                        data: [
                            { value: 1048, name: '联盟广告' },
                            { value: 735, name: '视频广告' },
                            { value: 580, name: '搜索引擎' },
                            { value: 484, name: '直接访问' },
                            { value: 300, name: '邮件营销' }
                        ]
                    }
                ]
            },
        }
    },
    mounted() {
        let piaCharts = echarts.init(this.$refs.charts)
        piaCharts.setOption(this.option)
    }
}
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    height: 30px;
    border-bottom: 1px solid #ccc;
    justify-content: space-between;
}

.charts {
    width: 100%;
    height: 265px;
}
</style>