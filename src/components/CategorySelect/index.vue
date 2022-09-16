<template>
  <div>
    <!-- inline表示为行内表单即一行内可以放入多个表单元素 -->
    <el-form :inline="true" :model="cForm" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select v-model="cForm.category1Id" placeholder="请选择" :disabled="show">
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="c1 in list1"
            :key="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" style="margin-left: 20px">
        <el-select v-model="cForm.category2Id" placeholder="请选择" :disabled="show">
          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="c2 in list2"
            :key="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类" style="margin-left: 20px">
        <el-select v-model="cForm.category3Id" placeholder="请选择" :disabled="show">
          <el-option
            :label="c3.name"
            :value="c3.id"
            v-for="c3 in list3"
            :key="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import req from "@/api";
export default {
  name: "CategorySelect",
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  props:['show'],
  watch: {
    "cForm.category1Id": {
      handler(newVal) {
        this.cForm.category2Id = "";
        this.cForm.category3Id = "";
        this.list2 = [];
        this.list3 = [];
        this.getCategory2(newVal);
      },
    },
    "cForm.category2Id": {
      handler(newVal) {
        this.cForm.category3Id = "";
        this.list3 = [];
        if (newVal) {
          this.getCategory3(newVal);
        }
      },
    },
    "cForm.category3Id": {
      handler(newVal) {
        this.$emit("getCategoryId", this.cForm);
      },
    },
  },
  methods: {
    async getCategory1() {
      let res = await req.tradeattr.reqCategory1List();
      if (res.code === 200) {
        this.list1 = res.data;
      }
    },
    async getCategory2(category1Id) {
      let res = await req.tradeattr.reqCategory2List(category1Id);
      if (res.code === 200) {
        this.list2 = res.data;
      }
    },
    async getCategory3(category2Id) {
      let res = await req.tradeattr.reqCategory3List(category2Id);
      if (res.code === 200) {
        this.list3 = res.data;
      }
    },
  },
  mounted() {
    this.getCategory1();
  },
};
</script>

<style lang="scss" scoped>
</style>