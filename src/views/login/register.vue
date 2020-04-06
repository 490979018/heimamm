<template>
  <!-- 这个是模态框的总结构 -->
  <el-dialog :visible.sync="dialogFormVisible" :show-close="false" width="600px">
    <div slot="title" class="register">用户注册</div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
    name:'register',
    data() {
        return {
            dialogFormVisible:false,
        }
    },
};
</script>

<style >
.register{
      text-align: center;
      font-size: 18px;
      color: #fff;
      background-color: rgb(18, 155, 250);
    }
.el-dialog__header{
    padding: 0;
}
</style>