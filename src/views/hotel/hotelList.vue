<template>
  <div class="app-container">
    <div style="margin-bottom: 20px">
      <el-button type="primary" @click="add('')">新增酒店</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="酒店详情">
        <template slot-scope="scope">
          {{ scope.row.value }}
        </template>
      </el-table-column>
      <el-table-column label="酒店简介">
        <template slot-scope="scope">
          {{ scope.row.jj }}
        </template>
      </el-table-column>
      <el-table-column label="定价">
        <template slot-scope="scope">
          {{ scope.row.dj }}
        </template>
      </el-table-column>
      <el-table-column label="店家手机号">
        <template slot-scope="scope">
          {{ scope.row.djphone }}
        </template>
      </el-table-column>
      <el-table-column label="店家地址">
        <template slot-scope="scope">
          {{ scope.row.dz }}
        </template>
      </el-table-column>
      <el-table-column label="酒店状态">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div class="btn-group">
            <div @click="add(scope.row.id)">编辑</div>
            <div @click="del(scope.row.id)">删除</div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 20px;text-align: right;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="form.pageNum"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="form.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { getHotelList,getHotelDel } from '@/api/hotel'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      total:0,
      form: {
          pageNum:1,
          pageSize:20
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getHotelList(this.form).then(res => {
        console.log(res)
        this.list = res.data.list
        this.total = res.data.total
        this.listLoading = false
      })
    },
    add(id){
      this.$router.push({
        path:"/hotelManage/hotelAdd",
        query: {
          id:id
        }
      })
    },
    del(id) {
      this.$confirm('是否删除该酒店, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        getHotelDel({id:id}).then(res => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetchData();
        })
      })
    },
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.form.pageNum = val;
      this.fetchData()
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container{
  .btn-group{
    display: flex;
    div{
      margin: 0 10px;
      color:#409eff;
      cursor: pointer;
    }
  }
}
</style>
