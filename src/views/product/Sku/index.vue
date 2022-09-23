<template>
  <div>
    <el-table border :data="skuList">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="skuName" label="名称" width="width"></el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width"></el-table-column>
      <el-table-column label="默认图片" width="110">
        <template slot-scope="{ row }">
          <img :src="row.skuDefaultImg" style="height: 80px; width: 80px" />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="重量" width="80"></el-table-column>
      <el-table-column prop="weight" label="价格" width="80"></el-table-column>
      <el-table-column label="操作" width="width">
        <template slot-scope="{ row }">
          <el-tooltip content="下架商品" placement="bottom" v-if="row.isSale">
            <el-button type="success" icon="el-icon-bottom" size="mini" @click="cancelSale(row)"></el-button>
          </el-tooltip>
          <el-tooltip content="上架商品" placement="bottom" v-else>
            <el-button type="success" icon="el-icon-top" size="mini" @click="onSale(row)"></el-button>
          </el-tooltip>
          <el-tooltip content="编辑商品" placement="bottom">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit"></el-button>
          </el-tooltip>
          <el-tooltip content="查看详情" placement="bottom">
            <el-button type="info" icon="el-icon-info" size="mini" @click="getSku(row)"></el-button>
          </el-tooltip>
          <el-tooltip content="删除商品" placement="bottom">
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top: 20px; text-align: center" :current-page="page" :total="total" :page-size="limit"
      @current-change="handleCurrentChange" layout="prev,pager,next,total,jumper"></el-pagination>
    <el-drawer title="我是标题" :visible.sync="drawer" :before-close="handleClose" size='40%'>
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="12">{{ sku.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="12">{{ sku.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="12">{{ sku.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="12">
          <el-tag type="success" v-for="attr in sku.skuAttrValueList" :key="attr.id" style="margin-right: 10px">{{
          attr.attrId }}-{{ attr.valueId }}</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel>
            <el-carousel-item v-for="img in sku.skuImageList" :key="img.id">
              <img :src="img.imgUrl" style="width:100%">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
import req from "@/api";
export default {
  name: "Sku",
  data() {
    return {
      page: 1,
      total: 0,
      limit: 10,
      skuList: [],
      sku: {},
      drawer: false,
    };
  },
  methods: {
    async getSkuList() {
      let page = this.page;
      let res = await req.sku.reqSkuList(page, this.limit);
      if (res.code === 200) {
        this.skuList = res.data.records;
        this.total = res.data.total;
      }
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getSkuList();
    },
    async cancelSale(row) {
      let res = await req.sku.reqCancelSale(row.id);
      if (res.code === 200) {
        row.isSale = 0;
        this.$message({
          type: "success",
          message: "下架成功",
        });
      }
    },
    async onSale(row) {
      let res = await req.sku.reqOnSale(row.id);
      if (res.code === 200) {
        row.isSale = 1;
        this.$message({
          type: "success",
          message: "上架成功",
        });
      }
    },
    edit() {
      this.$message({
        type: "info",
        message: "正在开发中",
      });
    },
    async getSku(row) {
      let res = await req.sku.reqGetSkuById(row.id);
      if (res.code === 200) {
        this.sku = res.data;
        this.drawer = true;
      }
    },
    handleClose(done) {
      (this.sku = {}), done();
    },
  },
  mounted() {
    this.getSkuList();
  },
};
</script>

<style lang="scss" scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}

.el-col {
  margin: 20px 10px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>