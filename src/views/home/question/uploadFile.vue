<template>
  <div class="uploadFile">
    <el-upload
      class="avatar-uploader"
      :action="baseUrl+'/question/upload'"
      name="file"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
    <div v-if="type=='video'">
        <video v-if="value" :src="baseUrl+'/'+value" class="avatar" controls></video>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>

    <div v-else>
      <img v-if="value" :src="baseUrl+'/'+value" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>

    </el-upload>
  </div>
</template>

<script>
export default {
    props:['value','type'],
     data() {
      return {
          baseUrl:process.env.VUE_APP_URL,
      };
    },
    methods: {
      handleAvatarSuccess(res) {
          this.$emit('input',res.data.url);
          this.$emit('change')
          // if(this.type=='video'){
          //   this.$parent.$refs.form.validateField('video')
          // }else{
          //   this.$parent.$refs.form.validateField('value')
          // }
          
        // this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        if(this.type=='video'){
            const isMP4=file.type==='video/mp4';
            const is4M =file.size / 1024 / 1024 < 4;
            if(!isMP4){
                this.$message.error('上传视频只能是 MP4 格式!');
            }
            if(!is4M){
                this.$message.error('上传视频大小不能超过 4MB!');
            }
            return isMP4 && is4M;
        }else{
            const isJPG = file.type === 'image/jpeg'||'image/png'||'image/gif';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
        }
        
      }
    }
};
</script>

<style lang='less'>
.uploadFile{
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>