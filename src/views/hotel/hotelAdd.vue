<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="酒店简介">
        <el-input v-model="form.jj" />
      </el-form-item>
      <el-form-item label="酒店手机号">
        <el-input type="text" v-model="form.djphone" />
      </el-form-item>
      <el-form-item label="定价">
        <el-input type="number" v-model="form.dj" />
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.dz" />
      </el-form-item>
      <el-form-item label="酒店详情">
        <el-input v-model="form.value" />
      </el-form-item>
      <el-form-item label="酒店图片">
        <el-upload
          class="avatar-uploader"
          action="http://admin.zjjatjd.top/admin/upload"
          accept=".jpg,.jpeg,.png,.svg,.svga,gif,JPG,JPEG,PNG,GIF"
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
          <img v-if="form.tp" :src="form.tp" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="是否上架">
        <el-switch
          v-model="form.status"
          :active-value="1"
          :inactive-value="0"
          active-text="上架"
          inactive-text="下架">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getHotelAdd,getHotelEdit,getHotelDetail } from '@/api/hotel'
export default {
  data() {
    return {
      form: {
        title: '',
        jj: '',
        djphone: '',
        dj: '',
        dz: '',
        value: '',
        tp:'',
        status:0
      }
    }
  },
  created() {
    if(this.$route.query.id){
      getHotelDetail({id:this.$route.query.id}).then(res => {
        if(res.status == 200){
          this.form = res.data
        }
      })
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.form.tp = res.data.file_name;
    },
    onSubmit() {
      if(!this.$route.query.id){
        getHotelAdd(this.form).then(res => {
          if(res.status == 200){
            this.$message({
              message: '新建成功',
              type: 'success'
            })
            this.$router.back();
          }else{
            this.$message({
              message: res.message,
              type: 'warning'
            })
          }
        })
      }else{
        this.form.id = this.$route.query.id;
        getHotelEdit(this.form).then(res => {
          if(res.status == 200){
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.$router.back();
          }else{
            this.$message({
              message: res.message,
              type: 'warning'
            })
          }
        })
      }
      console.dir(this.form)
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: #fbfdff;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
::v-deep .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 320px;
  height: 180px;
  line-height: 180px;
  text-align: center;
}
::v-deep .avatar {
  width: 320px;
  height: 180px;
  display: block;
}
</style>

