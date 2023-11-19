<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="所属酒店">
        <el-select v-model="form.uid" placeholder="请选择">
          <el-option
            v-for="item in hotelList"
            :key="item.id+''"
            :label="item.title"
            :value="item.id+''"
            >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="房间详情">
        <el-input v-model="form.value" />
      </el-form-item>
      <el-form-item label="房间规格">
        <el-input type="text" v-model="form.fjgg" />
      </el-form-item>
      <el-form-item label="定价">
        <el-input type="number" v-model="form.dj" />
      </el-form-item>
      <el-form-item label="预定须知">
        <el-input v-model="form.ydxz" />
      </el-form-item>
      <el-form-item label="费用明细">
        <el-input v-model="form.fymx" />
      </el-form-item>
      <el-form-item label="费用政策">
        <el-input v-model="form.fyzc" />
      </el-form-item>
      <el-form-item label="库存">
        <el-input v-model="form.stock" />
      </el-form-item>
      <el-form-item label="上传房间图片">
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
      <el-form-item label="是否推荐">
        <el-switch
          v-model="form.tj"
          :active-value="1"
          :inactive-value="0"
          active-text="是"
          inactive-text="否">
        </el-switch>
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
import { getRoomAdd,getRoomEdit,getRoomDetail,getHotelList } from '@/api/hotel'
export default {
  data() {
    return {
      form: {
        uid:"",
        title: '',
        value: '',
        fjgg: '',
        dj: '',
        ydxz: '',
        fymx: '',
        fyzc:'',
        stock:'',
        tp:'',
        tj:0,
        status:0
      },
      hotelList:[],
    }
  },
  created() {
    getHotelList({}).then(res => {
      if(res.status == 200){
        this.hotelList = res.data.list
        console.dir(this.hotelList)
      }
    })
    if(this.$route.query.id){
      getRoomDetail({id:this.$route.query.id}).then(res => {
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
        getRoomAdd(this.form).then(res => {
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
        getRoomEdit(this.form).then(res => {
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

