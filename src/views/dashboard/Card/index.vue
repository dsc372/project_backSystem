<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="6">
                <el-card>
                    <Detail :title="'总销售额'" :count="'$ 126560'">
                        <template slot="charts">
                            <span style="font-size: 14px">周同比&nbsp;&nbsp;56.67% <i class="el-icon-top" style="color:greenyellow"></i></span>
                            <span style="margin-left: 10px; font-size: 14px">日同比&nbsp;&nbsp;19.96% <svg t="1663906057040" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5480" width="16" height="16"><path d="M325.456896 862.27968" p-id="5481" fill="#d81e06"></path><path d="M882.05824 862.27968" p-id="5482" fill="#d81e06"></path><path d="M236.027904 877.161472" p-id="5483" fill="#d81e06"></path><path d="M960.132096 877.161472" p-id="5484" fill="#d81e06"></path><path d="M64.134144 845.290496" p-id="5485" fill="#d81e06"></path><path d="M131.974144 648.752128c-30.418944 30.430208-6.474752 84.301824 34.917376 84.301824L858.258432 733.053952c42.899456 0 65.325056-53.85216 34.916352-84.301824L547.487744 302.569472c-19.930112-19.974144-49.374208-19.95264-69.327872 0L131.974144 648.752128z" p-id="5486" fill="#d81e06"></path><path d="M960.51712 845.290496" p-id="5487" fill="#d81e06"></path></svg>
                            </span>
                        </template>
                        <template slot="footer">
                            <span style="font-size: 14px">日销售额:$ 12423</span>
                        </template>
                    </Detail>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <Detail :title="'访问量'" :count="'88460'">
                        <template slot="charts">
                            <LineChart></LineChart>
                        </template>
                        <template slot="footer">
                            <span style="font-size: 14px">日访问量:123</span>
                        </template>
                    </Detail>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <Detail :title="'支付笔数'" :count="'87360'">
                        <template slot="charts">
                        <BarChart></BarChart>
                        </template>
                        <template slot="footer">
                            <span style="font-size: 14px">转换率:64%</span>
                        </template>
                    </Detail>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <Detail :title="'运营活动效果'" :count="'78%'">
                        <template slot="charts">
                            <ProgressChart></ProgressChart>
                        </template>
                        <template slot="footer">
                            <span style="font-size: 14px">周同比&nbsp;&nbsp;37.52% <svg t="1663905735838" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5030" width="16" height="16"><path d="M325.456896 862.27968" p-id="5031" fill="#1afa29"></path><path d="M882.05824 862.27968" p-id="5032" fill="#1afa29"></path><path d="M236.027904 877.161472" p-id="5033" fill="#1afa29"></path><path d="M960.132096 877.161472" p-id="5034" fill="#1afa29"></path><path d="M63.683584 788.737024" p-id="5035" fill="#1afa29"></path><path d="M958.46912 788.737024" p-id="5036" fill="#1afa29"></path><path d="M64.77824 858.791936" p-id="5037" fill="#1afa29"></path><path d="M163.396608 289.168384c-40.577024 0-66.526208 54.183936-35.44064 85.25824L477.217792 723.704832c20.031488 20.031488 49.82272 20.031488 69.853184 0l349.274112-349.278208c30.30528-30.294016 6.677504-85.25824-34.927616-85.25824L163.396608 289.168384z" p-id="5038" fill="#1afa29"></path><path d="M959.522816 858.791936" p-id="5039" fill="#1afa29"></path></svg></span>
                            <span style="margin-left: 10px; font-size: 14px">日同比&nbsp;&nbsp;15.32% <svg t="1663905735838" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5030" width="16" height="16"><path d="M325.456896 862.27968" p-id="5031" fill="#1afa29"></path><path d="M882.05824 862.27968" p-id="5032" fill="#1afa29"></path><path d="M236.027904 877.161472" p-id="5033" fill="#1afa29"></path><path d="M960.132096 877.161472" p-id="5034" fill="#1afa29"></path><path d="M63.683584 788.737024" p-id="5035" fill="#1afa29"></path><path d="M958.46912 788.737024" p-id="5036" fill="#1afa29"></path><path d="M64.77824 858.791936" p-id="5037" fill="#1afa29"></path><path d="M163.396608 289.168384c-40.577024 0-66.526208 54.183936-35.44064 85.25824L477.217792 723.704832c20.031488 20.031488 49.82272 20.031488 69.853184 0l349.274112-349.278208c30.30528-30.294016 6.677504-85.25824-34.927616-85.25824L163.396608 289.168384z" p-id="5038" fill="#1afa29"></path><path d="M959.522816 858.791936" p-id="5039" fill="#1afa29"></path></svg></span>
                        </template>
                    </Detail>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Detail from "./Detail/index.vue";
import LineChart from "./lineChart/index.vue";
import BarChart from "./barChart/index.vue"
import ProgressChart from "./progressChart/index.vue"
export default {
    components: { Detail, LineChart ,BarChart,ProgressChart},
};
</script>

<style lang="scss" scoped>

</style>
