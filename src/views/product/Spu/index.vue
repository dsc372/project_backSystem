<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect
        @getCategoryId="getList"
        :show="showTable === 0 ? false : true"
      ></CategorySelect>
    </el-card>
    <el-card>
      <!-- 展示列表 -->
      <div v-show="showTable === 0">
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
                  @click="addSku(cForm,row)"
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
                  @click="deleteSpu(row)"
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
      <SpuForm
        v-show="showTable === 1"
        ref="spu"
        @changeShowTable="changeShowTable"
      ></SpuForm>
      <!-- 添加SKU -->
      <SkuForm v-show="showTable === 2" ref="sku" @changeShowTable="changeShowTable"></SkuForm>
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
      showTable: 0, //0展示列表，1表示添加或修改SPU，2表示添加SKU
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
    async getSpuList(page = 1) {
      this.page = page;
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
      this.getSpuList(this.page);
    },
    addSpu() {
      this.showTable = 1;
      this.$refs.spu.initAddSpuData(this.cForm.category3Id);
    },
    updateSpu(row) {
      this.showTable = 1;
      this.$refs.spu.initUpdateSpuData(row);
    },
    changeShowTable(config) {
      this.showTable = config.show;
      if (config.flag === "update") {
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }
    },
    async deleteSpu(row) {
      this.$confirm(`此操作将永久删除该SPU, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await req.spu.reqDeleteSpu(row.id);
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getSpuList(this.page);
          }else{
            this.$message({
              type: "error",
              message: "删除失败!",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    addSku(cForm,row){
      this.showTable=2
      this.$refs.sku.getData(cForm,row)
    }
  },
};
</script>

<style lang="scss" scoped>
</style>