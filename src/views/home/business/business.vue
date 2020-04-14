<template>
  <div class="business">
    <el-card class="firstCard"> 
      <el-form label-width="75px" :inline="true" :model="form" ref="form" >
        
        <el-form-item label="企业编号" prop="eid">
          <el-input class="setWidth" v-model="form.eid"></el-input>
        </el-form-item>

        <el-form-item label="企业名称" prop="name">
          <el-input style="width:150px" v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="创建者" prop="username">
          <el-input class="setWidth" v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status" >
          <el-select v-model="form.status" style="width:150px">
            
            <el-option value="0" label="禁用">

            </el-option>

            <el-option value="1" label="启用">

            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" @click="addBlock">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="secCard">
      <el-table :data="tableData">

        <el-table-column label="序号" width="80">
          <template slot-scope="scope">
            {{(pagination.currentPage-1)*pagination.size+scope.$index+1}}
          </template>
        </el-table-column>

        <el-table-column label="企业编号" prop="eid" width="130">

        </el-table-column>

        <el-table-column label="企业名称" prop="name" width="200">

        </el-table-column>

        <el-table-column label="创建者" prop="username" width="150">

        </el-table-column>

        <el-table-column label="创建日期" prop="create_time" width="200">

        </el-table-column>

        <el-table-column label="状态" prop="status" width="100">
          <template slot-scope="scope">
            <div :class="{fontRed:scope.row.status==0,fontGreen:scope.row.status==1}">{{scope.row.status==0?"禁用":"启用"}}</div>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button class="btn" @click="editBlock(scope.row)">编辑</el-button>
            <el-button :class="{btn:true,btnRed:scope.row.status==1,btnGreen:scope.row.status==0}" @click="changeStatus(scope.row.id)">
              {{scope.row.status==0?"启用":"禁用"}}
            </el-button>
            <el-button class="btn" @click="del(scope.row.id)">删除</el-button>
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
    <addBusiness ref="addBusiness" @sonSearch="search"   :mode="addOrEdit"></addBusiness>
  </div>
</template>

<script>
import {busList,switchStatus,remove} from '@/api/business.js';
import addBusiness from '@/views/home/business/addBusiness.vue';
export default {
  components:{
    addBusiness,
  },
  data() {
    return {
      addOrEdit:"add",
      form:{
        status:"",
        eid:"",
        name:"",
        username:"",
        page:"",
        limit:"",
      },
      tableData:[],
      pagination:{
        currentPage:1,
        size:2,
        total:100
      }
    }
  },
  methods:{
    getData(){
      this.form.limit=this.pagination.size;
      this.form.page=this.pagination.currentPage;
      busList(this.form).then((res)=>{
        console.log(res);
        this.tableData=res.data.data.items;
        this.pagination.total=res.data.data.pagination.total;
      })
    },
    handleSizeChange(size){
      this.pagination.size=size;
      this.getData();
    },
    handleCurrentChange(currentPage){
      this.pagination.currentPage=currentPage;
      this.getData();
    },
    search(){
      this.pagination.currentPage=1;
      this.getData();
    },
    reset(){
      this.$refs.form.resetFields();
      this.search();
    },
    changeStatus(id){
      switchStatus({id:id}).then(()=>{
        this.$message.success("状态设置成功");
        this.search();
      })
    },
    addBlock(){
      this.addOrEdit='add';
      this.$refs.addBusiness.dialogFormVisible=true;
      this.$refs.addBusiness.form={
                eid:"",
                name:"",
                short_name:"",
                intro:"",
                remark:"",
            };
    },
    editBlock(val){
      this.addOrEdit='edit';
      this.$refs.addBusiness.dialogFormVisible=true;
      this.$refs.addBusiness.form=JSON.parse(JSON.stringify(val));
    },
    del(id){
      this.$confirm("确定删除企业?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        remove({id:id}).then(() => {
          this.$message({
            type: "success",
            message: "已删除!"
          });
          this.search();
        }).catch();
      });
    }
  },
  created(){
    this.getData();
  }
}
</script>

<style lang="less">
.business{
  .firstCard{
    margin-bottom: 20px;
    .setWidth{
      width: 100px;
    }
  }
  .secCard{
    .btn {
      padding: 0;
      margin: 0;
      text-align: center;
      width: 60px;
      height: 30px;
      line-height: 30px;
      margin-right: 10px;
      
    }
    .btnRed{
      color: #fff;
      font-weight: 700;
      background-color: rgba(243, 57, 57, 0.829);
    }
    .btnGreen{
      color: #fff;
      font-weight: 700;
      background-color: rgba(52, 235, 52, 0.774);
    }
    .fontRed{
      color: rgba(243, 57, 57, 0.829);
      font-weight: 700;
    }
    .fontGreen{
      color: rgba(52, 235, 52, 0.774);
      font-weight: 700;
    }
    .pagination{
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>