<template>
  <div class="userList">
    <el-card class="firstCard">
      <el-form label-width="75px" :inline="true" :model="form" ref="form" >

        <el-form-item label="用户名称" prop="username">
          <el-input style="width:100px" v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="用户邮箱" prop="email">
          <el-input style="width:150px" v-model="form.email"></el-input>
        </el-form-item>

        <el-form-item label="角色" prop="role_id">
          <el-select v-model="form.role_id"  style="width:150px">
            <el-option v-for="(value,key,index) in $store.state.roleObj" :key="index" :value="key" :label="value">

            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" @click="addBlock">+ 新增用户</el-button>
        </el-form-item>


      </el-form>
    </el-card>

    <el-card class="secCard" > 
      <el-table :data="tableData" border style="width: 100%">

        <el-table-column label="序号" width="80">
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>

        <el-table-column label="用户名" prop="username" width="150">

        </el-table-column>

        <el-table-column label="电话" prop="phone" width="180">

        </el-table-column>

        <el-table-column label="邮箱" prop="email" width="200">

        </el-table-column>

        <el-table-column label="角色" width="100">
          <template slot-scope="scope">
            {{scope.row.role_id===1?"超级管理员":(scope.row.role_id===2?"管理员":(scope.row.role_id===3?"老师":"学生"))}}
          </template>
        </el-table-column>

        <el-table-column label="备注" prop="remark" width="180">

        </el-table-column>

        <el-table-column label="状态"  width="80">
          <template slot-scope="scope">
            {{scope.row.status==0?"禁用":"启用"}}
          </template>

        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="editBlock(scope.row)">编辑</el-button>
            <el-button @click="changeStatus(scope.row.id)">
              {{scope.row.status==0?"启用":"禁用"}}
            </el-button>
            <el-button @click="del(scope.row.id)">删除</el-button>
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
    <addUser ref="addUser" @sonSearch='search'  :mode="addOrEdit"></addUser>
    

  </div>
</template>

<script>
import {userSeach,switchStatus,removeUser} from '@/api/userList.js';
import addUser from '@/views/home/userList/addUser.vue';
export default {
  components:{
    addUser,
  },
    data() {
      return {
        addOrEdit:"add",
        form:{
          role_id:"",
          username:"",
          email:"",
          page:1,
          limit:10,
        },
        tableData: [],
        pagination:{
          currentPage:1,
          size:10,
          total:100,
        }
      }
    },
    methods:{
      getData(){
        this.form.page=this.pagination.currentPage;
        this.form.limit=this.pagination.size;
        userSeach(this.form).then((res)=>{
          // console.log(res);
          this.tableData=res.data.data.items;
          this.pagination.total=res.data.data.pagination.total;
        })
      },
      handleSizeChange(size){
        this.pagination.size=size;
        this.search();
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
          this.$message.success('状态设置成功');
          this.getData();
        })
      },
      del(id){
        this.$confirm("确定删除用户信息?","友情提示",{
          confirmButtonText:"确定",
          cancelButtonText:"取消",
          type:"warning",
        }).then(()=>{
          removeUser({id:id}).then(()=>{
            this.$message.success("删除成功");
            this.search();
          })
        })
      },
      addBlock(){
        this.addOrEdit='add';
        this.$refs.addUser.dialogFormVisible=true;
        this.$refs.addUser.form={
          username:"",
          email:"",
          phone:"",
          role_id:"",
          status:"",
          remark:"",
      };
      },
      editBlock(row){
        this.addOrEdit='edit';
        this.$refs.addUser.dialogFormVisible=true;
        this.$refs.addUser.form=JSON.parse(JSON.stringify(row));
        console.log(this.$refs.addUser.form);
      }
    },
    created:function(){
      this.getData();
    }
}
</script>

<style lang='less'>
  .userList{
    .firstCard{
      margin-bottom: 20px;
    }
    .secCard{
      .pagination{
      text-align: center;
      margin-top: 20px;
      }
    }
  }
</style>