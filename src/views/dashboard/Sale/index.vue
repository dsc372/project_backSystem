<template>
    <div>
        <el-card class="box-card" style="margin:10px 0">
            <div slot="header" class="clearfix">
                <el-tabs v-model="activeName" @tab-click="handleClick" class="tab">
                    <el-tab-pane label="销售额" name="first"></el-tab-pane>
                    <el-tab-pane label="访问量" name="second"></el-tab-pane>
                </el-tabs>
                <div class="right">
                    <a @click="setDate">今日</a>
                    <a @click="setWeek">本周</a>
                    <a @click="setMonth">本月</a>
                    <a @click="setYear">本年</a>
                    <el-date-picker v-model="date" type="datetimerange" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期" size="mini" class="date" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
            </div>
            <div>
                <el-row :gutter="10">
                    <el-col :span="16">
                        <div class="charts" ref="charts"></div>
                    </el-col>
                    <el-col :span="6" style="float:right;margin-top:-20px">
                        <h3>门店{{title}}</h3>
                        <ul>
                            <li v-for="attr in rank" :key="attr.num">
                                <span class="rindex">{{attr.num}}</span>
                                <span>{{attr.name}}</span>
                                <span class="rvalue">{{attr.value}}</span>
                            </li>
                        </ul>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import dayjs from 'dayjs'
export default {
    data() {
        return {
            activeName: 'first',
            rank: [
                {
                    num: 1,
                    name: '肯德基',
                    value: 12345,
                },
                {
                    num: 2,
                    name: '麦当劳',
                    value: 9878,
                },
                {
                    num: 3,
                    name: '汉堡王',
                    value: 8364,
                },
                {
                    num: 4,
                    name: '德克士',
                    value: 6757,
                },
                {
                    num: 5,
                    name: '赛百味',
                    value: 5781,
                },
                {
                    num: 6,
                    name: '华莱士',
                    value: 3752,
                },
                {
                    num: 7,
                    name: '必胜客',
                    value: 2897,
                },
            ],
            option: {
                title: {
                    text: '销售额趋势',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        type: 'bar',
                        barWidth: '60%',
                        data: [10, 52, 200, 334, 390, 330, 220, 110, 98, 178, 144, 77]
                    }
                ]
            },
            barCharts: null,
            date:[],
        };
    },
    computed: {
        title() {
            return this.activeName === 'first' ? '销售额' : '访问量'
        }
    },
    methods: {
        handleClick() {
            this.$set(this.option.title, 'text', `${this.title}趋势`)
            this.barCharts.setOption(this.option)
        },
        setDate(){
            const day=dayjs().format('YYYY-MM-DD')
            this.date=new Array()
            this.date.push(day)
            this.date.push(day)
        },
        setWeek(){
            const start=dayjs().day(1).format('YYYY-MM-DD')
            const end=dayjs().day(7).format('YYYY-MM-DD')
            this.date=new Array()
            this.date.push(start)
            this.date.push(end)
        },
        setMonth(){
            const start=dayjs().startOf('month').format('YYYY-MM-DD')
            const end=dayjs().endOf('month').format('YYYY-MM-DD')
            this.date=new Array()
            this.date.push(start)
            this.date.push(end)
        },
        setYear(){
            const start=dayjs().startOf('year').format('YYYY-MM-DD')
            const end=dayjs().endOf('year').format('YYYY-MM-DD')
            this.date=new Array()
            this.date.push(start)
            this.date.push(end)
        },
    },
    mounted() {
        this.barCharts = echarts.init(this.$refs.charts)
        this.barCharts.setOption(this.option)
    }
};
</script>

<style lang="scss" scoped>
.clearfix {
    position: relative;
    display: flex;
    justify-content: space-between;
}

.tab {
    width: 100%;
}

.right {
    position: absolute;
    right: 0;
}

.date {
    margin-left: 20px;
}

.right a {
    font-size: 14px;
    margin: 0 10px;
}

.charts {
    height: 300px;
    width: 100%;
}

ul {
    list-style: none;
    width: 100%;
    height: 300px;
    padding: 0;
}

ul li {
    height: 8%;
    margin-bottom: 15px;
}

.rindex {
    float: left;
    width: 20px;
    height: 20px;
    margin-right: 20px;
    border-radius: 50%;
    color: #fff;
    background-color: #000;
    text-align: center;
}

.rvalue {
    float: right;
    margin-right: 30px;
}
</style>