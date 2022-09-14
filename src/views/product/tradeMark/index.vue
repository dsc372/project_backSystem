<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0px"
      @click="showDialogFormVisible"
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
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- page-sizes用于调整每一页中的数据量 -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      @current-change="handleCurrentChange"
      layout="prev,pager,next,total,jumper"
    ></el-pagination>
    <!-- visible.sync控制显示与隐藏 -->
    <el-dialog
      :title="tmForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <!-- 通过rules传入校验规则，并将From-Item的prop属性设置为需校验的字段名即可 -->
      <el-form :model="tmForm" :rules="rules" style="width: 80%" ref="form">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- action为图片上传地址
            before-upload:上传之前的回调
            on-success:上传成功的回调
           -->
          <el-upload
            class="avatar-uploader"
            action="/goods-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div>只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import req from "@/api";
export default {
  name: "tradeMark",
  data() {
    return {
      page: 1,
      limit: 3,
      total: 0, //总共数据条数
      list: [], //列表展示的数据
      dialogFormVisible: false,
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" }, //trigger为触发类型
          {
            min: 2,
            max: 10,
            message: "长度必须为2到10个字符",
            trigger: "change",
          },
        ],
        logoUrl: [{ required: true, message: "请选择品牌图片" }],
      },
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
    handleCurrentChange(page) {
      this.page = page;
      this.getPageList();
    },
    showDialogFormVisible() {
      this.dialogFormVisible = true;
    },
    handleAvatarSuccess(res, file) {
      //res为上传成功后服务器返回的数据，file为更详细的数据
      this.tmForm.logoUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    addOrUpdateTradeMark() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          let res = await req.trademark.reqAddOrUpdateTradeMark(this.tmForm);
          if (res.code === 200) {
            this.$message(this.tmForm.id ? "修改成功" : "添加成功");
            this.getPageList(this.tmForm.id ? 1 : this.page);
            this.tmForm = {
              tmName: "",
              logoUrl: "",
            };
          }
        } else {
          this.$message.error("品牌信息不正确");
        }
      });
    },
    updateTradeMark(row) {
      this.dialogFormVisible = true;
      this.tmForm = { ...row };
    },
    deleteTradeMark(row) {
      this.$confirm("此操作将永久删除该品牌, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await req.trademark.reqDeleteTradeMark(row.id);
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getPageList(this.list.length>1?this.page:this.page-1)
          }else{
            this.$message.error("删除失败!");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.getPageList();
  },
};
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  margin-left: -55px;
  border: 1px dashed #d9d9d9;
  border-radius: 2px;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>