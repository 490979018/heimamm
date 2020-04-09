<template>
  <!-- 这个是模态框的总结构 -->
  <el-dialog :visible.sync="dialogFormVisible" :show-close="false" width="600px" class="register">
    <div slot="title" class="title">用户注册</div>
    <el-form :model="form" label-width="60px" ref="form" :rules="rules">

      
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

    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
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
        
      },
      baseUrl: process.env.VUE_APP_URL,
      imageUrl: "",
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

        ]
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
      })
    }
  }
};
</script>


 <style lang="less" scoped>
.register {
  .title {
    height: 53px;
    background: rgba(3, 192, 249, 1);
    color: #fff;
    text-align: center;
    line-height: 53px;
  }
}
</style>
<style lang="less">
.register {
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
  
}
</style>