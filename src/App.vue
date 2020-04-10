<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {getToken} from '@/utilis/token.js';
export default {
  mounted:function(){
     if(getToken('token')){
          this.$router.push('/home').catch(err=>err);
        }else{
          this.$router.push('/login').catch(err=>err);
        }
    
  }
}
</script>

<style lang='less'>
@import url(~@/style/base.css);
#app{
  .test{
    width: 200px;
    height: 200px;
    border: 1px solid black;
  }
}
</style>