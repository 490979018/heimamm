<template>
  <el-dialog :visible.sync="dialogFormVisible" :show-close="false" width="600px" class="addSubject">
    <div slot="title" class="title">新增学科</div>
    <el-form label-width="100px" :model="form" ref="form" :rules="rules">
        
        <el-form-item label="学科编号" style="width:95%" prop="rid" >
            <el-input v-model="form.rid"></el-input>
        </el-form-item>
        
        <el-form-item label="学科名称" style="width:95%" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
            
        <el-form-item label="学科简称" style="width:95%" prop="short_name">
            <el-input v-model="form.short_name"></el-input>
        </el-form-item>
        
        <el-form-item label="学科简介" style="width:95%" prop="intro">
            <el-input v-model="form.intro"></el-input>
        </el-form-item>
        
        <el-form-item label="学科备注" style="width:95%" prop="remark">
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
import {addSub,editSub} from '@/api/addSubject.js';
export default {
    props:{
        mode:{
            type:String,
            default:'add'
        }
    },
  data() {
    
    return {
      dialogFormVisible: false,
      form:{
          rid:"",
          name:"",
          short_name:"",
          intro:"",
          remark:"",
      },
      rules:{
          rid:[
              {required:true,message:"请输入学科编号",trigger:"change"}
          ],
          name:[
              {required:true,message:"请输入学科名称",trigger:"change"}
          ],
          short_name:[
              {required:true,message:"请输入学科简称",trigger:"change"}
          ],
          intro:[
              {required:true,message:"请输入学科简介",trigger:"change"}
          ],
          remark:[
              {required:true,message:"请输入备注",trigger:"change"}
          ],
      }
    };
  },
  methods:{
      submitForm(){
          this.$refs.form.validate((result)=>{
              if(result){
                  if(this.mode=='add'){
                    addSub(this.form).then((res)=>{
                    console.log(res);
                    //   this.$parent.search();
                    this.dialogFormVisible=false;
                    this.$emit('addSubject');
                    })
                  }else if(this.mode=='edit'){
                    editSub(this.form).then((res)=>{
                        console.log(res);
                        this.dialogFormVisible=false;
                        this.$emit('addSubject');
                    })
                  }else{
                      console.log('傻逼');
                  }
              }
          })
      }
  },
  watch:{
      dialogFormVisible(newVal){
          if(newVal==false){
              this.$refs.form.resetFields();
              
          }
      }
  }
};
</script>

<style lang="less">
.addSubject {
  .title {
    position: absolute;
    left: 0;
    top: -50px;
    width: 100%;
    text-align: center;
    font-size: 18px;
    height: 53px;
    line-height: 53px;
    color: #fff;
    // background-color: rgb(18, 155, 250);
    background-color: transparent;
  }
  .el-dialog__header {
    padding: 0;
  }
  .footer{
      text-align: center;
  }
}
</style>