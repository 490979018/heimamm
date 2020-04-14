<template>
  <el-dialog :visible.sync="dialogFormVisible" :show-close="false" width="600px" class="addBusiness">
    <div slot="title" class="title">新增企业</div>
    <el-form :model="form" ref="form" label-width="100px" :rules="rules">

        <el-form-item label="企业编号" style="width:95%" prop="eid">
            <el-input v-model="form.eid"></el-input>
        </el-form-item>

        <el-form-item label="企业名称" style="width:95%" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="企业简称" style="width:95%" prop="short_name">
            <el-input v-model="form.short_name"></el-input>
        </el-form-item>

        <el-form-item label="企业简介" style="width:95%" prop="intro">
            <el-input v-model="form.intro"></el-input>
        </el-form-item>

        <el-form-item label="企业备注" style="width:95%" prop="remark">
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
import {addBus,editBus} from '@/api/addBusiness.js'
export default {
    props:{
        mode:{
            type:String,
        }
    },
    data() {
        return {
            dialogFormVisible:false,
            form:{
                eid:"",
                name:"",
                short_name:"",
                intro:"",
                remark:"",
            },
            rules:{
                eid:[{required:true,message:"请输入企业编号",trigger:"change"}],
                name:[{required:true,message:"请输入企业编号",trigger:"change"}],
                short_name:[{required:true,message:"请输入企业编号",trigger:"change"}],
                intro:[{required:true,message:"请输入企业编号",trigger:"change"}],
                remark:[{required:true,message:"请输入企业编号",trigger:"change"}],
            }
        }
    },
    methods:{
        submitForm(){
            this.$refs.form.validate((res)=>{
                if(res){
                    if(this.mode=='add'){
                        addBus(this.form).then(()=>{
                            this.dialogFormVisible=false;
                            this.$emit('sonSearch');
                        })
                    }else if(this.mode=="edit"){
                        editBus(this.form).then(()=>{
                            this.dialogFormVisible=false;
                            this.$emit('sonSearch');
                        })
                    }else{
                        console.log("傻逼");
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
}
</script>

<style lang='less'>
.addBusiness{
    .title{
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