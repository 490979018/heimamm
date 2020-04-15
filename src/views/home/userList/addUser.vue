<template>
  <el-dialog :visible.sync="dialogFormVisible" :show-close="false" width="600px" class="addUser">
    <div slot="title" class="title">新增用户</div>

    <el-form label-width="100px" :model="form" ref="form" :rules="rules">

        <el-form-item label="用户名" style="width:95%" prop="username">
            <el-input v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" style="width:95%" prop="email">
            <el-input v-model="form.email"></el-input>
        </el-form-item>

        <el-form-item label="电话" style="width:95%" prop="phone">
            <el-input v-model="form.phone"></el-input>
        </el-form-item>

        <el-form-item label="角色" style="width:95%"  prop="role_id">
            <el-select v-model="form.role_id">
                <el-option value="2" label="管理员">

                </el-option>
                <el-option value="3" label="学生">

                </el-option>
                <el-option value="4" label="老师">

                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="状态" style="width:95%"  prop="status">
            <el-select v-model="form.status">
                <el-option value="0" label="禁用">

                </el-option>
                <el-option value="1" label="启用">

                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="用户备注" style="width:95%" prop="remark">
            <el-input v-model="form.remark"></el-input>
        </el-form-item>

    </el-form>








    <div slot="footer" class="footer">
        <el-button @click="dialogFormVisible=false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: true,
      form:{
          username:"",
          email:"",
          phone:"",
          role_id:"",
          status:"",
          remark:"",
      },
      rules:{
          username:[{required:true,message:"请输入用户名",trigger:"change"}],
          email:[{required:true,message:"请输入邮箱地址",trigger:"change"}],
          phone:[{required:true,message:"请输入手机号码",trigger:"change"}],
          role_id:[{required:true,message:"请输入角色",trigger:"change"}],
          status:[{required:true,message:"请输入状态",trigger:"change"}],
          remark:[{required:true,message:"请输入用户备注",trigger:"change"}],
      }
    };
  },
  methods:{
      submitForm(){
          this.$refs.form.validate((res)=>{
            console.log(res);
          })
      }
  }
};
</script>

<style lang="less">
.addUser {
  .title {
    width: 100%;
    text-align: center;
    font-size: 18px;
    height: 53px;
    line-height: 53px;
    color: #fff;
    background-color: rgb(18, 155, 250);
  }
  .footer{
      text-align: center;
  }
}
</style>