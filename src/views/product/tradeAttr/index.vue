<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getGoodsList"></CategorySelect>
    </el-card>
    <el-card>
      <!-- 展示属性 -->
      <div v-show="showTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!cForm.category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table style="width=100%;margin-top: 25px;" border="" :data="attrList">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="150"
          ></el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row }">
              <el-tag
                type="success"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                style="margin-left: 20px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{ row }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                @click="updateAttr(row)"
              ></el-button>
              <el-button type="danger" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加或修改属性 -->
      <div v-show="!showTable">
        <el-form :inline="true" ref="form">
          <el-form-item label="属性名" label-width="60px" :model="attrInfo">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="addAttrValue"
          >添加属性值</el-button
        >
        <el-table
          style="width: 100%; margin: 20px 0"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="80"
          ></el-table-column>
          <el-table-column align="center" label="属性值名称" width="width">
            <template slot-scope="{ row }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                @blur="examValueName(row)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="width">
            <template slot-scope="{ row }">
              <el-button type="danger" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button @click="showTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
import req from "@/api";
import CategorySelect from "../../../components/CategorySelect/index.vue";
export default {
  name: "tradeAttr",
  data() {
    return {
      showTable: true,
      cForm: {},
      attrList: [],
      attrInfo: {
        //用于提交添加和编辑属性
        attrName: "",
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3,
      },
    };
  },
  components: { CategorySelect },
  methods: {
    getGoodsList(cForm) {
      this.cForm = cForm;
      if (!this.cForm.category3Id) {
        this.attrList = [];
      }
      if (
        this.cForm.category1Id &&
        this.cForm.category2Id &&
        this.cForm.category3Id
      ) {
        this.getAttrList();
      }
    },
    async getAttrList() {
      let res = await req.tradeattr.reqAttrList(
        this.cForm.category1Id,
        this.cForm.category2Id,
        this.cForm.category3Id
      );
      if (res.code === 200) {
        this.attrList = res.data;
      }
    },
    addAttr() {
      this.showTable = false;
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.cForm.category3Id,
        categoryLevel: 3,
      };
    },
    updateAttr(row) {
      this.showTable = false;
      this.attrInfo = cloneDeep(row);
    },
    addAttrValue() {
      if (this.attrInfo.attrName === "") {
        this.$message("请先输入属性名");
      } else if (
        this.attrInfo.attrValueList.length === 0 ||
        this.attrInfo.attrValueList[this.attrInfo.attrValueList.length - 1]
          .valueName !== ""
      ) {
        this.attrInfo.attrValueList.push({
          attrId: this.attrInfo.id, //此处为属性名的id在修改属性时有row传入，添加属性时自动为undefined，属性值的id由服务器生成
          valueName: "",
        });
      }
    },
    examValueName(row){
      if(row.valueName.trim()===''){
        row.valueName=row.valueName.trim()
        this.$message('属性值不能为连续空格')
      }
      let isRepeat=this.attrInfo.attrValueList.some(item=>{
        if(row!==item){
          return row.valueName===item.valueName
        }
      })
      if(isRepeat){
        row.valueName=''
        this.$message('属性值不能重复')
      }
    }
  },
};
</script>

<style lang="scss" scoped>
</style>