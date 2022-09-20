<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">{{ spu.spuName }}</el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          placeholder="价格(元)"
          type="number"
          v-model="skuInfo.price"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder="规格描述"
          v-model="skuInfo.skuDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item
            :label="attr.attrName"
            v-for="attr in attrInfoList"
            :key="attr.id"
          >
            <el-select
              value=""
              placeholder="请选择"
              v-model="attr.attrIdAndValueId"
            >
              <el-option
                :label="attrValue.valueName"
                :value="`${attr.id}:${attrValue.id}`"
                v-for="attrValue in attr.attrValueList"
                :key="attrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item
            :label="saleAttr.saleAttrName"
            v-for="saleAttr in spuSaleAttrList"
            :key="saleAttr.id"
            style="margin: 0 20px 20px 0"
          >
            <el-select value="" placeholder="请选择" v-model="saleAttr.attrIdAndValueId">
              <el-option
                :label="saleAttrValue.saleAttrValueName"
                :value="`${saleAttr.id}:${saleAttrValue.id}`"
                v-for="saleAttrValue in saleAttr.spuSaleAttrValueList"
                :key="saleAttrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table border :data="spuImageList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="80"></el-table-column>
          <el-table-column prop="" label="图片" width="">
            <template slot-scope="{row}">
              <img :src="row.imgUrl" alt="" style="width:100px;height:100px">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width=""></el-table-column>
          <el-table-column prop="" label="操作" width="">
            <template slot-scope="{row}">
              <el-button type="primary" v-if="!row.isDefault" @click="changeDefault(row)">设为默认</el-button>
              <el-button v-else @click="cancelDefault(row)">取消默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import req from "@/api";
export default {
  data() {
    return {
      spuImageList: [],
      spuSaleAttrList: [],
      attrInfoList: [],
      skuInfo: {
        //第一类：由父组件传递
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        //第二类：通过双向绑定获得
        skuName: "",
        price: "",
        weight: "",
        skuDesc: "",
        //第三类：通过代码收集
        skuImageList: [],
        skuDefaultImg: "",
        skuAttrValue: [], //平台属性
        skuSaleAttrValueList: [], //销售属性
      },
      spu: {},
      tempImgList:[],//暂时存放选中的图片，但此时的数据缺少isDefault
    };
  },
  methods: {
    async getData(cForm, spu) {
      this.skuInfo.category3Id = spu.category3Id;
      this.skuInfo.spuId = spu.id;
      this.skuInfo.tmId = spu.tmId;
      this.spu = spu;
      let imgRes = await req.sku.reqSpuImageList(spu.id);
      if (imgRes.code === 200) {
        imgRes.data.forEach(item=>{
          item.isDefault=0
        })
        this.spuImageList = imgRes.data;
      }
      let saleAttrRes = await req.sku.reqSpuSaleAttrList(spu.id);
      if (saleAttrRes.code === 200) {
        this.spuSaleAttrList = saleAttrRes.data;
      }
      let attrInfoRes = await req.sku.reqAttrInfoList(
        cForm.category1Id,
        cForm.category2Id,
        cForm.category3Id
      );
      if (attrInfoRes.code === 200) {
        this.attrInfoList = attrInfoRes.data;
      }
    },
    handleSelectionChange(selection){
      this.tempImgList=selection
    },
    changeDefault(row){
      this.spuImageList.forEach(item=>{
        item.isDefault=0
      })
      row.isDefault=1
      this.skuInfo.skuDefaultImg=row.imgUrl
    },
    cancelDefault(row){
      row.isDefault=0
      this.skuInfo.skuDefaultImg=''
    },
    cancel(){
      this.$emit("changeShowTable", {show:0,flag:'update'});
      Object.assign(this._data,this.$options.data())
    }
  },
};
</script>

<style lang="scss" scoped>
</style>