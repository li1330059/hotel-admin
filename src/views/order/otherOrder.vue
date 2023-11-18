<template>
  <div class="app-container">
    <div class="form-cont">
      <el-input class="inp" v-model="form.orderNo" placeholder="订单号" />
      <el-date-picker class="inp" v-model="form.startTime" type="date" placeholder="开始时间" style="width: 100%;" />
      <el-date-picker class="inp" v-model="form.endTime" type="date" placeholder="结束时间" style="width: 100%;" />
      <el-button type="primary" @click="fetchData">搜索</el-button>
      <el-button @click="reset">重置</el-button>
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
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="订单号">
        <template slot-scope="scope">
          {{ scope.row.ddhao }}
        </template>
      </el-table-column>
      <el-table-column label="使用日期">
        <template slot-scope="scope">
          {{ scope.row.syrq }}
        </template>
      </el-table-column>
      <el-table-column label="出行人">
        <template slot-scope="scope">
          {{ scope.row.cxr }}
        </template>
      </el-table-column>
      <el-table-column label="数量">
        <template slot-scope="scope">
          {{ scope.row.num }}
        </template>
      </el-table-column>
      <el-table-column label="联系人手机号">
        <template slot-scope="scope">
          {{ scope.row.lxrPhone }}
        </template>
      </el-table-column>
      <el-table-column label="实收金额">
        <template slot-scope="scope">
          {{ scope.row.ssjine }}
        </template>
      </el-table-column>
      <el-table-column label="订单归属">
        <template slot-scope="scope">
          {{ scope.row.dd }}
        </template>
      </el-table-column>
      <el-table-column label="订单状态">
        <template slot-scope="scope">
          {{ scope.row.status }}
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
import { getTicketList } from '@/api/order'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total:0,
      form: {
          orderNo:"",
          pageNum:1,
          pageSize:20,
          startTime:"",
          endTime:""
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getTicketList(this.form).then(res => {
        console.log(res)
        this.list = res.data.list
        this.total = res.data.total
        this.listLoading = false
      })
    },
    reset(){
      this.form = {
          orderNo:"",
          pageNum:1,
          pageSize:20,
          startTime:"",
          endTime:""
      }
      this.fetchData()
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
.form-cont{
  display: flex;
  margin-bottom: 20px;
  .inp{
    width: 200px!important;
    margin-right: 20px;
  }
}
</style>
