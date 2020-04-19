<template>
  <el-container class="layout">
    <el-header class="header">
      <div class="left">
        <i class="el-icon-s-fold" @click="isCollapse=!isCollapse" style="cursor:pointer"></i>
        <img src="@/assets/images/logohome.png" alt style="width:33px;height:28px;margin:0px 15px" />
        <span class="title_home">黑马面面</span>
      </div>
      <div class="right">
        <img :src="imgUrl" alt style="width:34px;height:34px;border-radius:17px" />
        <span class="userInfo">{{userName}}, 您好</span>
        <el-button
          type="primary"
          style="width:60px;height:30px;line-height:34px;text-align:center;margin:0px;padding:0px"
          @click="exit"
        >退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside  class="aside" width="auto" >
        <el-menu :router="true" :default-active="$route.fullPath" :collapse="isCollapse" class="menuTransition">
          <el-menu-item :index="'/home/'+ele.path" v-for="(ele,index) in $router.options.routes[1].children" :key="index" v-show="ele.meta.rules.includes($store.state.role)">
            <i :class="ele.meta.icon"></i>
            <span slot="title">{{ele.meta.title}}</span>
          </el-menu-item>
          <!-- <el-menu-item index="/home/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>

          <el-menu-item index="/home/userList">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>

          <el-menu-item index="/home/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>

          <el-menu-item index="/home/business">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>

          <el-menu-item index="/home/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item> -->
        </el-menu>
      </el-aside>
      <el-main class="main">
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getUserInfo, exitLogin } from "@/api/home.js";
import { removeToken } from "@/utilis/token.js";
export default {
  data() {
    return {
      imgUrl: "",
      baseUrl: process.env.VUE_APP_URL,
      userName: "",
      isCollapse:false,
      inPath:"",
      userInfo:"",
    };
  },
  methods: {
    exit: function() {
      this.$confirm("确定退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        exitLogin().then(() => {
          this.$message({
            type: "success",
            message: "已退出!"
          });
          setTimeout(() => {
            removeToken("token");
            this.$router.push("/login");
          }, 1000);
        });
      });
    }
  },
  created: function() {
    getUserInfo().then(res => {
      // console.log(res);
      this.$store.state.userInfo=res.data.data;
      this.imgUrl = this.baseUrl + "/" + this.$store.state.userInfo.avatar;
      this.userName = this.$store.state.userInfo.username;
      this.$store.state.role=res.data.data.role;
      if(res.data.data.status==0){
        this.$message.warning("您的账号已被禁用,请联系管理员");
        setTimeout(()=>{
          removeToken("token");
          this.$router.push("/login");
        },500)
      }else{
        if(!this.$route.meta.rules.includes(res.data.data.role)){
          this.$message.warning("您无权访问此列表");
          removeToken("token");
          this.$router.push("/login")
        }
      }
    });
    console.log("路由原信息",this.$router);
  }
  // mounted:function(){
  //     if(!getToken('token')){
  //         this.$message.error('请先登录!');
  //         this.$router.push('/login').catch(err=>err);
  //     }
  // }
};
</script>

<style lang="less">
.layout {
  height: 100%;
  .header {
    width: 100%;
    height: 60px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .el-icon-s-fold {
        font-size: 26px;
      }
      .title_home {
        font-size: 22px;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
        
      }
    }
    .right {
      display: flex;
      align-items: center;
      .userInfo {
        font-size: 14px;
        font-weight: bold;
        color: rgba(99, 99, 99, 1);
        margin: 0 15px;
      }
    }
  }
  .aside {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    .menuTransition:not(.el-menu--collapse) {
    // 初始宽度
    width: 160px;
   }
  }
  .main{
    background-color: #E8E9EC;
  }
}
</style>