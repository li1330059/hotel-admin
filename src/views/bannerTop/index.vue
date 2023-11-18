<template>
  <div class="app-container">
    <div class="topUpload">
      <div>上传头图：</div>
      <el-upload
        class="avatar-uploader"
        action="http://admin.zjjatjd.top/admin/upload"
        accept=".jpg,.jpeg,.png,.svg,.svga,gif,JPG,JPEG,PNG,GIF"
        :show-file-list="false"
        :on-success="handleAvatarSuccess">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <div class="bannerUpload">
      <div style="margin-bottom: 10px;">上传轮播图：</div>
      <div class="list">
        <div v-for="(item,index) in banner" :key="index" class="list-item">
          <el-upload
            class="avatar-uploader"
            action="http://admin.zjjatjd.top/admin/upload"
            accept=".jpg,.jpeg,.png,.svg,.svga,gif,JPG,JPEG,PNG,GIF"
            :show-file-list="false"
            :on-success="(response, file, fileList) => handleSuccess(response, file, fileList, index)">
            <img v-if="item.img" :src="item.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="ctrl">
            <el-cascader
              v-model="item.url"
              :options="options"
              @change="handleChange"></el-cascader>
            <el-button type="danger" @click="del(index)">删除</el-button>
          </div>
        </div>
      </div>
      <el-button type="primary" @click="addBanner">添加轮播</el-button>
    </div>
    <el-button type="primary" @click="save">保存</el-button>
  </div>
</template>

<script>
import { bannerAdd,bannerLabel,bannerDetail,bannerEdit } from '@/api/banner'
import { options } from 'runjs';
  export default {
    data() {
      return {
        id:"",
        imageUrl: '',
        banner:[],
        options: []
      };
    },
    created() {
      this.getLabel();
      this.getDetail();
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = res.data.file_name;
      },
      handleSuccess(response, file, fileList, index) {
        this.banner[index].img = response.data.file_name;
      },
      getLabel() {
        bannerLabel().then(res => {
          console.dir(res)
          this.options = res.data.option
        })
      },
      getDetail() {
        bannerDetail().then(res => {
          if(res.data.banner){
            this.banner = JSON.parse(res.data.banner);
            this.imageUrl = res.data.bg_groud_img
            this.id = res.data.id
          }
        })
      },
      addBanner(){
        this.banner.push(
          {
            img:"",
            url:[]
          }
        )
      },
      handleChange(value) {
        console.log(value);
      },
      del(index) {
        this.banner.splice(index, 1);
      },
      save(){
        let params = {
          topImg:this.imageUrl,
          banner:this.banner,
          status:1
        }
        this.listLoading = true
        if(this.id){
          params.id = this.id;
          bannerEdit(params).then(res => {
            this.$message({
              message: '保存成功',
              type: 'success'
            });
          })
        }else{
          bannerAdd(params).then(res => {
            if(res.status == 200){
              this.$message({
                message: '保存成功',
                type: 'success'
              });
            }
            console.log(res)
          })
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
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
  .topUpload{
    display: flex;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px dashed #ccc;
  }
  .bannerUpload{
    margin-bottom: 100px;
    padding-bottom: 20px;
    border-bottom: 1px dashed #ccc;
    ::v-deep .avatar-uploader-icon {
      width: 502px;
      height: 112px;
      line-height: 112px;
    }
    ::v-deep .avatar {
      width: 502px;
      height: 112px;
      display: block;
    }
    .list{
      display: flex;
      flex-wrap: wrap;
      .list-item{
        .ctrl{
          width: 100%;
          display: flex;
        }
        margin: 0 20px 20px 0;
      }
      .avatar-uploader{
        margin-bottom: 10px;
      }
    }
    ::v-deep .el-cascader{
      flex: 1;
      margin-right: 10px;
    }
  }
</style>

