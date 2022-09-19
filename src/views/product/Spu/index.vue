<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect
        @getCategoryId="getList"
        :show="showTable===0?false:true"
      ></CategorySelect>
    </el-card>
    <el-card>
      <!-- 展示列表 -->
      <div v-show="showTable===0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom: 25px"
          :disabled="!cForm.category3Id"
          @click="addSpu"
          >添加SPU</el-button
        >
        <el-table style="width: 100%" border :data="spuList">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="spuName"
            label="SPU名称"
            width=""
          ></el-table-column>
          <el-table-column
            prop="description"
            label="SPU描述"
            width=""
          ></el-table-column>
          <el-table-column prop="prop" label="操作" width="">
            <template slot-scope="{ row }">
              <el-tooltip content="添加SKU" placement="bottom">
                <el-button
                  type="success"
                  icon="el-icon-plus"
                  size="mini"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="修改SPU" placement="bottom">
                <el-button
                  type="warning"
                  icon="el-icon-edit"
                  size="mini"
                  style="margin-left: 20px"
                  @click="updateSpu(row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="查看当前SKU的全部SKU列表" placement="bottom">
                <el-button
                  type="info"
                  icon="el-icon-info"
                  size="mini"
                  style="margin-left: 20px"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="删除SPU" placement="bottom">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  style="margin-left: 20px"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 20px; text-align: center"
          :current-page="page"
          :total="total"
          :page-size="limit"
          @current-change="handleCurrentChange"
          layout="prev,pager,next,total,jumper"
        ></el-pagination>
      </div>
      <!-- 添加或修改SPU -->
      <SpuForm v-show="showTable===1" ref="spu" :changeShowTable.sync="showTable"></SpuForm>
      <!-- 添加SKU -->
      <SkuForm v-show="showTable===2"></SkuForm>
    </el-card>
  </div>
</template>

<script>
import req from "@/api";
import CategorySelect from "@/components/CategorySelect/index.vue";
import SpuForm from "./spuForm/index.vue";
import SkuForm from "./skuForm/index.vue";
export default {
  name: "Spu",
  data() {
    return {
      cForm: {},
      spuList: [],
      page: 1,
      limit: 5,
      total: 0,
      showTable: 0,//0展示列表，1表示添加或修改SPU，2表示添加SKU
    };
  },
  components: { CategorySelect, SkuForm, SpuForm },
  methods: {
    getList(cForm) {
      this.cForm = cForm;
      if (!this.cForm.category3Id) {
        this.spuList = [];
      }
      if (
        this.cForm.category1Id &&
        this.cForm.category2Id &&
        this.cForm.category3Id
      ) {
        this.getSpuList();
      }
    },
    async getSpuList() {
      let res = await req.spu.reqSpuList(
        this.page,
        this.limit,
        this.cForm.category3Id
      );
      if (res.code === 200) {
        this.total = res.data.total;
        this.spuList = res.data.records;
      }
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getSpuList();
    },
    addSpu(){
      this.showTable=1
    },
    updateSpu(row){
      this.showTable=1
      this.$refs.spu.initSpuData(row)
    },
  },
};
</script>

<style lang="scss" scoped>
</style>