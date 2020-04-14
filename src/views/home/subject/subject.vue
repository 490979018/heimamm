<template>
  <div class="subject">
    <el-card class="fistCard">
      <el-form :model="form" :inline="true" label-width="75px" ref="form">
        <el-form-item label="学科编号" prop="rid">
          <el-input class="setWidth" v-model.trim="form.rid"></el-input>
        </el-form-item>

        <el-form-item label="学科名称" prop="name">
          <el-input class="setWidth" v-model.trim="form.name"></el-input>
        </el-form-item>

        <el-form-item label="创建者" prop="username">
          <el-input class="setWidth" v-model.trim="form.username"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" class="setWidth">
            <el-option value label="请选择状态"></el-option>

            <el-option value="0" label="禁用"></el-option>

            <el-option value="1" label="启用"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click='search'>搜索</el-button>
        </el-form-item>

        <el-form-item>
          <el-button @click="reset">清除</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addBlock">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="secCard">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{(pagination.currentPage-1)*pagination.size+scope.$index+1}}</template>
        </el-table-column>

        <el-table-column label="学科编号" prop="rid" width="130"></el-table-column>

        <el-table-column label="学科名称" prop="name" width="200"></el-table-column>

        <el-table-column label="简称" prop="short_name" width="100"></el-table-column>

        <el-table-column label="创建者" prop="username" width="150"></el-table-column>

        <el-table-column label="创建日期" prop="create_time" width="200"></el-table-column>

        <el-table-column label="状态" width="100">
          <template slot-scope="scope">{{scope.row.status==0?"禁用":"启用"}}</template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button class="btn" @click='editBlock(scope.row)'>编辑</el-button>
            <el-button class="btn" @click="changeStatus(scope.row.id)">{{scope.row.status==1?"禁用":"启用"}}</el-button>
            <el-button class="btn" @click="remove(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[1,2,10,20, 30,]"
          :page-size="pagination.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
    <addSubject ref="addSubject" @addSubject="search" :mode="addOrEdit"></addSubject>
  </div>
</template>

<script>
import { subjectSeach,switchStatus,removeSubject } from "@/api/subject.js";
import addSubject from '@/views/home/subject/addSubject.vue';
export default {
  props:{

  },
  data() {
    return {
      addOrEdit:'add',
      form: {
        name: "",
        rid: "",
        username: "",
        status: ""
      },
      pagination:{
        size:2,
        currentPage:1,
        total:400,
      },
      tableData: [],
    };
  },
  components:{
    addSubject,
  },
  methods: {
    handleSizeChange(size) {
      // 这样改是为了后面给 table 交互
      this.pagination.size=size;
      this.pagination.currentPage=1;
      this.getData();
        // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(currentPage) {
      this.pagination.currentPage=currentPage;
      this.getData();
      // console.log(`当前页: ${val}`);
    },
    getData:function(){
      let _params={
      limit:this.pagination.size,
      page:this.pagination.currentPage,
      ...this.form,
    }
    subjectSeach(_params).then(res => {
      // console.log(res);
      this.tableData = res.data.data.items;
      this.pagination.total=res.data.data.pagination.total;
    });
    },
    search:function(){
      this.pagination.currentPage=1;
      this.getData();
    },
    reset:function(){
      this.$refs.form.resetFields();
      this.search();
    },
    changeStatus:function(id){
      switchStatus({id:id}).then(()=>{
        this.$message.success("状态设置成功");
        this.search();
      })
    },
    remove:function(id){
      this.$confirm("确定删除学科?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        removeSubject({id:id}).then(() => {
          this.$message({
            type: "success",
            message: "已删除!"
          });
          this.search();
        }).catch();
      });
    },
    addBlock(){
      this.addOrEdit='add';
      this.$refs.addSubject.form={
          rid:"",
          name:"",
          short_name:"",
          intro:"",
          remark:"",
      };
      this.$refs.addSubject.$refs.form.resetFields();
      this.$refs.addSubject.dialogFormVisible=true;
    },
    editBlock(val){
      this.addOrEdit='edit';
      this.$refs.addSubject.form=JSON.parse(JSON.stringify(val));
      this.$refs.addSubject.dialogFormVisible=true;
    }
  },
  created: function() {
    this.getData();
  }
};
</script>

<style lang='less'>
.subject {
  .setWidth {
    width: 120px;
  }
  .fistCard {
    margin-bottom: 20px;
  }
  .secCard {
    .btn {
      padding: 0;
      margin: 0;
      text-align: center;
      width: 60px;
      height: 30px;
      line-height: 30px;
      margin-right: 10px;
    }
    .pagination{
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>