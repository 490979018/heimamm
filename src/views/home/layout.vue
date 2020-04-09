<template>
  <el-container class="layout">
        <el-header class="header">
            <div class="left">
                <i class='el-icon-s-fold'></i>
                <img src="" alt="">
                <span></span>
            </div>
            <div class="right"></div>
        </el-header>
        <el-container>
            <el-aside width="400px" class="aside">Aside</el-aside>
            <el-main class="main">Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {

}
</script>

<style lang="less">
.layout{
    height: 100%;
    .header{
        width: 100%;
        height:60px;
        background:rgba(255,255,255,1);
        box-shadow:0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    }
    .aside{
        width:201px;
        background:rgba(255,255,255,1);
        box-shadow:0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    }
}

</style>