<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getGoodsList"></CategorySelect>
    </el-card>
    <el-card></el-card>
  </div>
</template>

<script>
import CategorySelect from "../../../components/CategorySelect/index.vue";
export default {
  name: "tradeAttr",
  components: { CategorySelect },
  methods:{
    getGoodsList(cForm){
      console.log(cForm.category1Id,cForm.category2Id,cForm.category3Id)
    }
  },
};
</script>

<style lang="scss" scoped>
</style>