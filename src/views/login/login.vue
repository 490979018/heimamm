<template>
  <div class="login">
    <div class="left">
      <div class="title">
        <img src="@/assets/images/loginlogo.png" alt />
        <span class="titleName1">黑马面团</span>
        <span class="titleLine">|</span>
        <span class="titleName2">用户登录</span>
      </div>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="tel">
          <el-input v-model="form.tel" placeholder="请输入手机号" prefix-icon="el-icon-user-solid"></el-input>
          <!-- <el-input v-model="form.name"></el-input> -->
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            :show-password="isShow"
            prefix-icon="el-icon-lock"
          ></el-input>
          <!-- <el-input v-model="form.name"></el-input> -->
        </el-form-item>
        <el-form-item prop="code">
          <el-row>
            <el-col :span="17">
              <el-input v-model="form.code" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
            </el-col>
            <el-col :span="7">
              <img src="@/assets/images/key.jpg" alt="" class="keyCode">
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item >
          <el-checkbox v-model="form.isCheck" class="agre" >
            我已阅读并同意
            <el-link type="primary" class="link"> 用户协议 </el-link> 和
            <el-link type="primary" class="link"> 隐私条款 </el-link>
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm()" class="btn">登录</el-button>
          <br>
          <el-button type="primary" class="btn" @click="$refs.registerCom.dialogFormVisible=true">注册</el-button>
          <register ref="registerCom"></register>
        </el-form-item>
      </el-form>


    
    </div>
    <div class="right">
      <img src="@/assets/images/login_banner_ele.png" alt />
    </div>
  </div>
</template>

<script>
import register from './register.vue';
export default {
  components:{
    register, 
  },
  name: "login",
  data() {
    return {
      isShow: true,
      form: {
        tel: "",
        password: "",
        code: "",
        isCheck:'',
      },
      rules:{
        tel:[
          {required:true,message:'请输入正确手机号码',trigger:'change'},
          {min:11,max:11,message:"请输入11位手机号码",trigger:"change",}
        ],
        password:[
          {required:true,message:'请输入正确密码',trigger:'change'},
          {min:5,max:8,message:"请输入5~8位正确密码",trigger:"change",}
        ],
        code:[
          {required:true,message:'请输入4位正确验证码',trigger:'change'},
          {min:4,max:4,message:"请输入4位正确验证码",trigger:"change",}
        ]
      },
    };
  },
  methods:{
      submitForm() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$message.success('你好呀小可爱');
          } else {
            // this.$message.error('账号或密码错误');
            return false;
          }
        });
      },
      resetForm() {
        this.$refs.form.resetFields();
      },
      // dialog(){
      //   this.$refs.registerCom.dialogFormVisible=true;
      // },
  }
};
</script>

<style lang='less'>
.login {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;

  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  .left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 43px;
    .title {
      height: 30px;
      line-height: 30px;
      margin-bottom: 30px;
      // border: 1px solid black;

      .titleName1 {
        font-size: 24px;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin: 0 10px;
      }
      .titleName2 {
        font-size: 22px;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin: 0 10px;
      }
      .titleLine {
        color: #ccc;
        font-size: 24px;
      }
    }
    .keyCode{
      width: 100%;
      height: 40px;
    }
    .btn{
      width: 100%;
      margin-bottom: 26px;
    }
    .link{
      line-height: 20px;
    }
    // .el-dialog__header{
    // padding: 0;
    // }
  }
}
</style>