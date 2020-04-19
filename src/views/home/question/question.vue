<template>
  <div class="question">
    <el-card class="firstCard">
      <el-form label-width="60px" :model="form" ref="form">
      <el-row>
        <el-col :span="5">
          <el-form-item label="学科" prop="subject">
            <el-select v-model="form.subject">
              <el-option v-for="(ele,index) in subjectArr" :key="index" :label="ele.rid" :value="ele.id" v-show="ele.status==1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度" prop="difficulty">
            <el-select v-model="form.difficulty">
              <el-option v-for="(value,key,index) in difficultyObj" :key="index" :value="key" :label="value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="阶段" prop="step">
            <el-select v-model="form.step">
              <el-option v-for="(value,key,index) in stepObj" :key="index" :value="key" :label="value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作者" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="企业" prop="enterprise">
            <el-select v-model="form.enterprise">
              <el-option v-for="(ele,index) in businessArr" :key="index" :label="ele.eid" :value="ele.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="form.status">
              <el-option label="禁用" :value="0"></el-option>
              <el-option label="启用" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="题型" prop="type">
            <el-select v-model="form.type">
              <el-option v-for="(value,key,index) in typeObj" :key="index" :value="key" :label="value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期" prop="create_date">
            <el-date-picker v-model="form.create_date" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4"></el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label-width="12px">
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button>清除</el-button>
            <el-button type="primary" @click="addBlock">+ 新增试题</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="4"></el-col>
      </el-row>
    </el-form>
    </el-card>

    <el-card class="secCard">
      <el-table :data="tableData" :border="true" style="width:100%">
        <el-table-column label="序号" width="60">
          <template slot-scope="scope">
            {{(pagination.currentPage-1)*pagination.size+scope.$index+1}}
          </template>
        </el-table-column>

        <el-table-column label="题目">
          <template slot-scope="scope">
            <div v-html="scope.row.title"></div>
          </template>
        </el-table-column>

        <el-table-column label="学科.阶段" width="100">
          <template slot-scope="scope">
            <div> {{scope.row.subject_name}}.{{stepObj[scope.row.type]}} </div>
          </template>
        </el-table-column>

        <el-table-column label="题型" prop="title" width="60">
          <template slot-scope="scope">
            <div> {{typeObj[scope.row.type]}} </div>
          </template>
        </el-table-column>

        <el-table-column label="企业" prop="enterprise_name" width="100">
          
        </el-table-column>

        <el-table-column label="创建者" prop="username" width="150">
          
        </el-table-column>

        <el-table-column label="状态" prop="status" width="60">
          <template slot-scope="scope">
            {{scope.row.status==0?"禁用":"启用"}}
          </template>
        </el-table-column>

        <el-table-column label="访问量" prop="reads" width="80">
          
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="editBlock(scope.row)">编辑</el-button>
            <el-button @click="changeStatus(scope.row.id)"> {{scope.row.status==0?"启用":"禁用"}} </el-button>
            <el-button @click="del(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[1,2,10,20, 30,]"
          :page-size="pagination.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
    <addQuestion ref="addQuestion" @sonSearch="search" :mode="addOrEdit" :subjectArr="subjectArr" :stepObj='stepObj'
    :businessArr="businessArr" :typeObj="typeObj" :difficultyObj='difficultyObj'></addQuestion>

  </div>
</template>

<script>
import {subjectSeach} from '@/api/subject.js';
import {getQuestion,switchStatus,removeQuestion} from '@/api/question.js'
import {busList} from '@/api/business.js';
import addQuestion from '@/views/home/question/addQuestion.vue';

export default {
  components:{
    addQuestion,
  },
  data() {
    return {
      addOrEdit:"add",
      form:{
        title:"",
        subject:"",
        enterprise:"",
        type:"",
        step:"",
        username:"",
        status:"",
        difficulty:"",
        create_date:"",
        page:1,
        limit:10
      },
      tableData:[],
      subjectArr:[],
      businessArr:[],
      stepObj:{1:'初级',2:'中级',3:'高级'},
      typeObj:{1:'单选',2:'多选',3:'简答'},
      difficultyObj:{1:'简单',2:'一般',3:'困难'},
      pagination:{
        size:10,
        currentPage:1,
        total:400,
      },
    }
  },
  methods: {
     handleSizeChange(size) {
      // 这样改是为了后面给 table 交互
      this.pagination.size=size;
      this.pagination.currentPage=1;
      this.getData();
        // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(currentPage) {
      this.pagination.currentPage=currentPage;
      this.getData();
      // console.log(`当前页: ${val}`);
    },
    getData(){
      this.form.page=this.pagination.currentPage;
      this.form.limit=this.pagination.size;
      getQuestion(this.form).then((res)=>{
        // console.log(res);
        res.data.data.items.forEach((ele)=>{
          ele.city=ele.city.split(',');
        })
        this.tableData=res.data.data.items;
        this.pagination.total=res.data.data.pagination.total;
      })
  },
    search(){
      this.pagination.currentPage=1;
      this.getData();
    },
    changeStatus(id){
      switchStatus({id:id}).then(()=>{
        this.$message.success("状态设置成功");
        this.getData();
      })
    },
    del(id){
      this.$confirm('确定是否删除?','系统提示',{
        confirmButtonText:"确定",
        cancelButtonText:"取消",
        type:"warning"
      }).then(()=>{
        removeQuestion({id:id}).then(()=>{
          this.$message.success("删除成功");
          this.search();
        })
      })
    },
    addBlock(){
      this.addOrEdit="add";
      this.$refs.addQuestion.dialogFormVisible=true;
      this.$refs.addQuestion.form={
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
      };
    },
    editBlock(row){
      this.addOrEdit='edit';
      this.$refs.addQuestion.dialogFormVisible=true;
      this.$refs.addQuestion.form=JSON.parse(JSON.stringify(row));
    }
  },
  created(){
    subjectSeach({limit:1000}).then((res)=>{
      // console.log(res);
      this.subjectArr=res.data.data.items;
    });
    busList({limit:1000}).then((res)=>{
      // console.log(res);
      this.businessArr=res.data.data.items;
    });
    this.getData();
  },
  
};
</script>

<style lang='less'>
.question {
  .firstCard{
    margin-bottom: 20px;
    .el-form-item__label{
    padding: 0 20px 0 0 ;
    }
  }

  .secCard{
    .pagination{
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>