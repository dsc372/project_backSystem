<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="tm in tradeMarkList"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder="SPU描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="/goods-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuImgList"
          :on-preview="handlePictureCardPreview"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelectSaleAttr.length}未选择`"
          style="margin: 0 20px 20px 0"
          v-model="attrIdAndName"
        >
          <el-option
            :label="attr.name"
            :value="`${attr.id}:${attr.name}`"
            v-for="attr in unSelectSaleAttr"
            :key="attr.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrIdAndName"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="saleAttrName"
            label="属性名"
            width="150"
          ></el-table-column>
          <el-table-column label="属性值列表" width="width">
            <template slot-scope="{ row }">
              <el-tag
                :key="tag.id"
                v-for="tag in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="{ row }">
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button @click="$emit('update:changeShowTable', 0)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import req from "@/api";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      spu: {
        category3Id: 0,
        description: "",
        spuName: "",
        tmId: "",
        spuImageList: [], //当前spu有的属性
        spuSaleAttrList: [],
      },
      tradeMarkList: [],
      spuImgList: [],
      saleAttrList: [], //每个spu都要有的属性
      inputVisible: false, //tag
      inputValue: "", //tag
      attrIdAndName: "", //收集为选择的属性ID
    };
  },
  computed: {
    unSelectSaleAttr() {
      return this.saleAttrList.filter((item) => {
        //返回还没有选择的属性
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name !== item1.saleAttrName;
        });
      });
    },
  },
  methods: {
    handleRemove(file, fileList) {
      //file是删除的照片信息，fileList是删除之后的照片数组
      this.spuImgList = fileList;
    },
    handleSuccess(response, file, fileList) {
      console.log(2);
      this.spuImgList = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    async initSpuData(spu) {
      //该函数在父组件中通过ref调用
      let spuRes = await req.spu.reqSpu(spu.id);
      if (spuRes.code === 200) {
        this.spu = spuRes.data;
      }
      let tradeMarkRes = await req.spu.reqTradeMarkList();
      if (tradeMarkRes.code === 200) {
        this.tradeMarkList = tradeMarkRes.data;
      }
      let spuImgRes = await req.spu.reqSpuImgList(spu.id);
      if (spuImgRes.code === 200) {
        //应ElementUI要求，对返回数据的结构进行修改
        spuImgRes.data.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.spuImgList = spuImgRes.data;
      }
      let saleRes = await req.spu.reqBaseSaleList();
      if (saleRes.code === 200) {
        this.saleAttrList = saleRes.data;
      }
    },
    addSaleAttr(){
        const [baseSaleAttrId,saleAttrName]=this.attrIdAndName.split(':')
        let newAttr={baseSaleAttrId,saleAttrName,spuSaleAttrValueList:[]}
        this.spu.spuSaleAttrList.push(newAttr)
    },
  },
};
</script>

<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>