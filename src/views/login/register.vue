<template>
  <!-- 这个是模态框的总结构 -->
  <el-dialog :visible.sync="dialogFormVisible" :show-close="false" width="600px">
      <div slot="title" class="register">用户注册</div>
      <!-- 表单 -->
       <el-form :model="form" label-width="70px" ref="form" :rules="rules">

      
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="baseUrl+'/uploads'"
          name="image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="昵称" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>

      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item label="图形码" prop="code">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code"></el-input>
          </el-col>
          <el-col :span="7" :offset="1" class="phoneCodeOut">
            
            <img  alt="" class="codeImg" @click="getCodeUrl" :src="codeUrl">
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="验证码" prop="rcode">
        <el-row>
          <el-col :span="16" >
            <el-input v-model="form.rcode"></el-input>
          </el-col>
          <el-col :span="7" :offset="1" >
            <el-button class="phoneCode" @click="validateCode" :disabled="timetol!=60">获取手机验证码 <span v-if="timetol!=60">{{timetol}}</span> </el-button>
          </el-col>
        </el-row>
      </el-form-item>

    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import axios from 'axios';
import {getPhoneCode} from '@/api/register.js';
import {userRegister} from '@/api/register.js';
export default {
  name: "register",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        // 头像地址
        avatar: "",
        username:"",
        email:"",
        phone:"",
        password:"",
        code:"",
        rcode:"",
      },
      baseUrl: process.env.VUE_APP_URL,
      imageUrl: "",
      timetol:60,
      codeUrl:process.env.VUE_APP_URL + "/captcha?type=sendsms",
      rules:{
        avatar:[
          {required:true,message:"请上传头像",trigger:"change"}
        ],
        username:[
          {required:true,message:"请输入昵称",trigger:"change"}
        ],
        email:[
          {required:true,message:"请输入邮箱",trigger:"change"},
           {
            validator: (rule, value, callback) => {
              // 正则校验
              let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("请正确输入邮箱地址");
              }
            }
          }
        ],
        phone:[
          {required:true,message:"请输入手机号",trigger:"change"},
           {
            validator: (rule, value, callback) => {
              // 正则校验
              let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("请正确输入手机号码");
              }
            }
          }
        ],
        password:[
          {required:true,message:"请输入正确密码",trigger:"change"},
          {min:4,max:6,message:"请输入4~6位正确密码",trigger:"change"},
        ],
        code:[
          {required:true,message:"请输入图形码",trigger:"change"},
          {min:4,max:4,message:"请输入4位正确图形码",trigger:"change"},
        ],
        rcode:[
          {required:true,message:"请输入手机验证码",trigger:"change"},
          {min:4,max:4,message:"请输入手机验证码",trigger:"change"},
        ],
      }
    };
  },
   methods: {
    // 上传前处理
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      // 它return的值就是控制让不让你通过  true通过  false不通过
      // return false
      return isJPG && isLt2M;
    },
    // 上传成功处理
    handleAvatarSuccess(res) {
      // res就是上传图片接口调用成功后的返回值
      window.console.log(res);
      this.imageUrl = this.baseUrl + "/" + res.data.file_path;
      this.form.avatar = res.data.file_path;
      this.$refs.form.validateField("avatar",(result)=>{
        console.log(result);
      })
    },
    submitForm:function(){
      this.$refs.form.validate(result=>{
        console.log(result);
        userRegister({
          avatar: this.form.avatar,
          username:this.form.username,
          email:this.form.email,
          phone:this.form.phone,
          password:this.form.password,
          rcode:this.form.rcode,
        }).then((res)=>{
          if(res.data.code==200){
            this.$message.success('注册成功');
            this.dialogFormVisible=false;
          }
        })
      })
    },
    getCodeUrl:function(){
      this.codeUrl=process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now();
    },
    validateCode:function(){
      let _pass=true;
      this.$refs.form.validateField(["code","phone"],error=>{
        if(error!=''){
          _pass=false;
        }
      });
      if(_pass===false){
          return
        }else{
          getPhoneCode({code:this.form.code,phone:this.form.phone,}).then((res)=>{
            this.$message.success(res.data.data.captcha+'');
          });
          this.timetol=59;
          let timeId=setInterval(() => {
            
            this.timetol--;
            if(this.timetol<=0){
              clearInterval(timeId);
              this.timetol=60;
            }
          }, 1000);
        }
    },
  },
  watch: {
    dialogFormVisible:function(newVal){
      if(!newVal){
        this.$refs.form.resetFields();
        this.imageUrl='';
      }
    }
  },
};
</script>

<style ang='less'>
.register {
  text-align: center;
  font-size: 18px;
  color: #fff;
  background-color: rgb(18, 155, 250);
}
.el-dialog__header {
  padding: 0;
}
 .avatar-uploader {
    width: 178px;
    margin: 0 auto;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
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
  .codeImg{
    border: 1px solid #ccc;
    height: 40px;
    width: 100%;
    border-radius: 5px;
  }
  .phoneCodeOut{
    height: 40px;
  }
  .phoneCode{
    width: 100%;
  }
</style>
