<template>
  <div class="subject">
    <el-card class="fistCard">
      <el-form :model="form" :inline="true" label-width="75px" ref="form">
        <el-form-item label="学科编号">
          <el-input class="setWidth" v-model="form.rid"></el-input>
        </el-form-item>

        <el-form-item label="学科名称">
          <el-input class="setWidth" v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="创建者">
          <el-input class="setWidth" v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-select v-model="form.status" class="setWidth">
            <el-option value label="请选择状态"></el-option>

            <el-option value="0" label="禁用"></el-option>

            <el-option value="1" label="启用"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary">搜索</el-button>
        </el-form-item>

        <el-form-item>
          <el-button>清除</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="secCard">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>

        <el-table-column label="学科编号" prop="rid" width="130"></el-table-column>

        <el-table-column label="学科名称" prop="name" width="200"></el-table-column>

        <el-table-column label="简称" prop="short_name" width="100"></el-table-column>

        <el-table-column label="创建者" prop="username" width="150"></el-table-column>

        <el-table-column label="创建日期" prop="create_time" width="200"></el-table-column>

        <el-table-column label="状态" width="100">
          <template slot-scope="scope">{{scope.row.status==0?"禁用":"启用"}}</template>
        </el-table-column>

        <el-table-column label="操作">
          <el-button class="btn">编辑</el-button>
          <el-button class="btn">{{tableData.status==0?"禁用":"启用"}}</el-button>
          <el-button class="btn">删除</el-button>
        </el-table-column>
      </el-table>

      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[10,20, 30,]"
          :page-size="pagination.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { sujectSeach } from "@/api/subject.js";
export default {
  data() {
    return {
      form: {
        name: "",
        rid: "",
        username: "",
        status: ""
      },
      pagination:{
        size:10,
        currentPage:1,
        total:400,
      },
      tableData: [],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    };
  },
  methods: {
    handleSizeChange(size) {
      // 这样改是为了后面给 table 交互
      this.pagination.size=size;
        // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(currentPage) {
      this.pagination.currentPage=currentPage;
      // console.log(`当前页: ${val}`);
    }
  },
  created: function() {
    sujectSeach(this.$refs.form).then(res => {
      this.tableData = res.data.data.items;
    });
  }
};
</script>

<style lang='less'>
.subject {
  .setWidth {
    width: 120px;
  }
  .fistCard {
    margin-bottom: 20px;
  }
  .secCard {
    .btn {
      padding: 0;
      margin: 0;
      text-align: center;
      width: 60px;
      height: 30px;
      line-height: 30px;
      margin-right: 10px;
    }
  }
}
</style>