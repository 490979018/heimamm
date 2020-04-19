<template>
  <el-dialog :visible.sync="dialogFormVisible" :show-close="false" width="600px" class="addUser">
    <div slot="title" class="title">{{mode=="add"?"新增用户":"编辑用户"}}</div>

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
              <el-option v-for="(value,key,index) in $store.state.roleObj" :key='index' :value='+key' :label="value">

              </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="状态" style="width:95%"  prop="status">
            <el-select v-model="form.status">
                <el-option :value="0" label="禁用">

                </el-option>
                <el-option :value="1" label="启用">

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
import {addUser,editUser} from '@/api/addUser.js';
export default {
  props:{
    mode:{
      type:String
    }
  },
  data() {
  var validateEmail=(rule,value,callback)=>{
    let _test=/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if(_test.test(value)){
      callback();
    }else{
      callback("请输入正确邮箱地址");
    }
  };
  var validatePhone=(rule,value,callback)=>{
    let _test=/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    if(_test.test(value)){
      callback();
    }else{
      callback("请输入正确手机号码");
    }
  };
    return {
      
      dialogFormVisible: false,
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
          email:[{required:true,validator:validateEmail,trigger:"change"}],
          phone:[{required:true,validator:validatePhone,trigger:"change"}],
          role_id:[{required:true,message:"请输入角色",trigger:"change"}],
          status:[{required:true,message:"请输入状态",trigger:"change"}],
          remark:[{required:true,message:"请输入用户备注",trigger:"change"}],
      }
    };
  },
  methods:{
      submitForm(){
          this.$refs.form.validate((res)=>{
            if(res){
              if(this.mode=="add"){
                addUser(this.form).then(()=>{
                  this.$message.success("新增用户成功");
                  this.dialogFormVisible=false;
                  this.$emit('sonSearch');
                })
              }else{
                editUser(this.form).then(()=>{
                  this.$message.success("编辑用户成功");
                  this.dialogFormVisible=false;
                  this.$emit('sonSearch');
                })
              }
            }
          })
      }
  },
  watch:{
    dialogFormVisible(newVal){
      if(newVal==true){
        this.$nextTick(()=>{
          this.$refs.form.clearValidate();
        })
      }
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