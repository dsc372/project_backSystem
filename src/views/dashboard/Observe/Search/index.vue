<template>
    <div>
        <el-card>
            <div slot="header">
                <div class="searchHeader">
                    <span>线上热门搜索</span>
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <i class="el-icon-more"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item>双皮奶</el-dropdown-item>
                            <el-dropdown-item>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

                </div>
            </div>
            <div>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <LineCharts style="margin-top:-20px"></LineCharts>
                    </el-col>
                    <el-col :span="12">
                        <LineCharts style="margin-top:-20px"></LineCharts>
                    </el-col>
                </el-row>
                <el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                    <el-table-column prop="rank" label="排名" width="80">
                    </el-table-column>
                    <el-table-column prop="keyWord" label="搜索关键字"  width="180">
                    </el-table-column>
                    <el-table-column prop="num" label="用户数" sortable>
                    </el-table-column>
                    <el-table-column prop="up" label="周涨幅" sortable>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>

<script>
import LineCharts from "./lineCharts/index.vue";
export default {
    components: { LineCharts },
    data() {
      return {
        tableData: [{
          rank: '1',
          keyWord: '肯德基',
          num: '12345',
          up:'7.8%'
        },
        {
          rank: '2',
          keyWord: '麦当劳',
          num: '8976',
          up:'-5.6%'
        },]
      }
    },
}
</script>

<style lang="scss" scoped>
.searchHeader {
    display: flex;
    height: 30px;
    border-bottom: 1px solid #ccc;
    justify-content: space-between;
}
</style>