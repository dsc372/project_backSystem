<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px"
      >添加</el-button
    >
    <el-table style="width: 100%" border :data="list">
      <el-table-column type="index" label="序号" width="80%"></el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width"
      ></el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template>
          <el-button type="warning" icon="el-icon-edit" size="mini">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- page-sizes用于调整每一页中的数据量 -->
    <el-pagination
      style="margin-top: 20px; textAlign: center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      @current-change="handleCurrentChange"
      layout="prev,pager,next,total,jumper"
    ></el-pagination>
  </div>
</template>

<script>
import req from "@/api";
import { get } from 'js-cookie';
export default {
  name: "tradeMark",
  data() {
    return {
      page: 1,
      limit: 3,
      total: 0, //总共数据条数
      list: [], //列表展示的数据
    };
  },
  methods: {
    async getPageList() {
      let res = await req.trademark.reqTradeMarkList(this.page, this.limit);
      if (res.code === 200) {
        this.total = res.data.total;
        this.list = res.data.records;
      }
    },
    handleCurrentChange(page){
      this.page=page
      this.getPageList()
    }
  },
  mounted() {
    this.getPageList();
  },
};
</script>

<style lang="scss" scoped>
</style>