<template>
  <div class="allSelect">

    <div v-if="form.type==1">
      <div v-for="(ele,index) in form.select_options" :key="index" class="content">
        <el-radio v-model="form.single_select_answer" :label="ele.label" @change="$emit('change')">{{ele.label}}</el-radio>
        <el-input v-model="ele.text" class="noErr"></el-input>
        <div>
          <uploadFile v-model="ele.image"></uploadFile>
        </div>
      </div>
    </div>

    <div v-else-if="form.type==2">
      <div v-for="(ele,index) in form.select_options" :key="index" class="content">
        <el-checkbox v-model="form.multiple_select_answer" :label="ele.label" @change="$emit('change')">{{ele.label}}</el-checkbox>
        <el-input v-model="ele.text" class="noErr"></el-input>
        <div>
          <uploadFile v-model="ele.image"></uploadFile>
        </div>
      </div>
    </div>

    <div v-else>
        <el-input type="textarea" :rows="6" v-model="form.short_answer"  @change="$emit('change')"></el-input>
    </div>


  </div>
</template>

<script>
import uploadFile from "@/views/home/question/uploadFile.vue";
export default {
  components: { uploadFile },
  props: ["form"],
  data() {
    return {};
  }
};
</script>

<style lang='less'>
.allSelect {
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .noErr{
    .el-input__inner{
      border-color: #DCDFE6;
    }
  }
}
</style>