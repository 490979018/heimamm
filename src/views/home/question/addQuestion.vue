<template>
  <div class="addQuestion">
    <el-dialog
      :visible.sync="dialogFormVisible"
      width="600px"
      :fullscreen="true"
    >
    <div slot="title" class="title">新增题库测试</div>
    <div class="content" >
        <el-form :model="form" ref="form" label-width="80px" :rules="rules">

            <el-form-item label="学科" prop="subject" >
                <el-select v-model="form.subject" class="setWidth">
                  <el-option v-for="(ele,index) in subjectArr" :key="index" :label="ele.rid" :value="ele.id" v-show="ele.status==1"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="阶段" prop="step">
            <el-select v-model="form.step" class="setWidth">
              <el-option v-for="(value,key,index) in stepObj" :key="index" :value="+key" :label="value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="企业" prop="enterprise">
            <el-select v-model="form.enterprise"  class="setWidth">
              <el-option v-for="(ele,index) in businessArr" :key="index" :label="ele.eid" :value="ele.id"></el-option>
            </el-select>
          </el-form-item>

        <el-form-item label="城市" prop="city">
            <el-cascader
          v-model="form.city"
          :options="options"  class="setWidth" :props="{value:'label'}"></el-cascader>
        </el-form-item>

        <el-form-item label="题型" prop="type">
            <el-radio-group v-model="form.type" class="setWidth">
              <el-radio  v-for="(value,key,index) in typeObj" :key="index" :label="+key"> {{value}}  </el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="难度" prop="difficulty">
            <el-radio-group v-model="form.difficulty" class="setWidth">
              <el-radio  v-for="(value,key,index) in difficultyObj" :key="index" :label="+key"> {{value}}  </el-radio>
            </el-radio-group>
        </el-form-item>

        <hr style="margin:20px 0">

        <el-form-item  prop="title" label="试题标题"  class="setMargin" >
            <quillEditor v-model="form.title" ref="myQuillEditor" :options="{placeholder:'请在这里输入...'}" @change="reValida('title')"></quillEditor>
        </el-form-item>

        <el-form-item :label="typeObj[form.type]" :prop="{1:'single_select_answer',2:'multiple_select_answer',3:'short_answer'}[form.type]">
          <allSelect :form="form" @change="emitSon"></allSelect>
        </el-form-item>

         <hr style="margin:20px 0">

         <el-form-item label="上传解析视频" label-width="120px" style="text-align:left" prop="video">
          <uploadFile v-model="form.video" type="video" @change="emitSon"></uploadFile>
         </el-form-item>
        
        <hr style="margin:20px 0">

        <el-form-item  prop="answer_analyze" label="答案解析"  class="setMargin" >
          <quillEditor v-model="form.answer_analyze" ref="myQuillEditor" :options="{placeholder:'请在这里输入...'}" @change="reValida('answer_analyze')"></quillEditor>
        </el-form-item>
        <hr style="margin:40px 0">

        <el-form-item label="答案备注" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>

        </el-form>
    </div>




    <div slot="footer" class="footer">
      <el-button @click="dialogFormVisible=false">取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </div>
    </el-dialog>
  </div>
</template>

<script>
import { regionData} from 'element-china-area-data';
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import allSelect from '@/views/home/question/allSelect.vue';
import uploadFile from '@/views/home/question/uploadFile.vue';
import {addQues,editQues} from '@/api/addQuestion.js';
export default {
    props:['subjectArr','stepObj','businessArr','typeObj','difficultyObj','mode'],
    components:{quillEditor,allSelect,uploadFile},
  data() {
    return {
      dialogFormVisible: false,
      options:regionData,
      form:{
          subject:"",
          step:"",
          enterprise:"",
          city:[],
          title:"",
          type:1,
          difficulty:1,
          single_select_answer:"",
          multiple_select_answer:[],
          short_answer:"",
          video:"",
          answer_analyze:"",
          remark:"",
          select_options: [
          {
            label: "A",
            text: "狗不理",
            image: ""
          },
          {
            label: "B",
            text: "猫不理",
            image: ""
          },
          {
            label: "C",
            text: "麻花",
            image: ""
          },
          {
            label: "D",
            text: "炸酱面",
            image: ""
          }
        ]
      },
      rules:{
            subject:[{required:true,message:"请输入信息",trigger:"change"}],
            step:[{required:true,message:"请输入信息",trigger:"change"}],
            enterprise:[{required:true,message:"请输入信息",trigger:"change"}],
            city:[{required:true,message:"请输入信息",trigger:"change"}],
            type:[{required:true,message:"请输入信息",trigger:"change"}],
            difficulty:[{required:true,message:"请输入信息",trigger:"change"}],
            title:[{required:true,message:"请输入信息",trigger:"change"}],
            video:[{required:true,message:"请输入信息",trigger:"change"}],
            answer_analyze:[{required:true,message:"请输入信息",trigger:"change"}],
            remark:[{required:true,message:"请输入信息",trigger:"change"}],  
            single_select_answer:[{required:true,message:"请输入信息",trigger:"change"}],  
            multiple_select_answer:[{required:true,message:"请输入信息",trigger:"change"}],  
      }
    };
  },
  methods:{
      submitForm(){
        this.$refs.form.validate((res)=>{
          if(res){
            if(this.mode=='add'){
              addQues(this.form).then(()=>{});
              this.dialogFormVisible=false;
              this.$emit('sonSearch');
            }else if(this.mode=='edit'){
              let _query=JSON.parse(JSON.stringify(this.form));
              _query.city=_query.city.join(",");
              editQues(_query).then(()=>{});
              this.dialogFormVisible=false;
              this.$emit('sonSearch');
            }
          }
        })
      },
      reValida(val){
        this.$refs.form.validateField([val]);
      },
      emitSon(){
        this.$refs.form.validateField([
          'single_select_answer','multiple_select_answer','short_answer','video'
        ])
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

<style lang='less'>
.addQuestion {
  .title {
    padding-left: 20px;
    width: 100%;
    text-align: left;
    font-size: 18px;
    height: 53px;
    line-height: 53px;
    color: #fff;
    background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  }
  .el-dialog__header {
    padding: 0;
  }
  .footer {
    text-align: center;
  }
  .content{
      width: 835px;
      margin: 0 auto;
      .setWidth{
          width: 300px;
      }
      .el-form-item__label{
        text-align: left;
      }
      .setMargin{
        .el-form-item__content{
          margin-left: 0px !important; 
          margin-top:50px;
        }
      }
  }
}
</style>