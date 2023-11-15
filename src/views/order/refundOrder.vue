<template>
  <div class="app-container">
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
      <el-table-column label="开始日期">
        <template slot-scope="scope">
          {{ scope.row.startDate }}
        </template>
      </el-table-column>
      <el-table-column label="结束日期">
        <template slot-scope="scope">
          {{ scope.row.stopDate }}
        </template>
      </el-table-column>
      <el-table-column label="房间数量">
        <template slot-scope="scope">
          {{ scope.row.roomNum }}
        </template>
      </el-table-column>
      <el-table-column label="住户姓名">
        <template slot-scope="scope">
          {{ scope.row.liverName }}
        </template>
      </el-table-column>
      <el-table-column label="身份证号">
        <template slot-scope="scope">
          {{ scope.row.IdCard }}
        </template>
      </el-table-column>
      <el-table-column label="手机号">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="酒店名称">
        <template slot-scope="scope">
          {{ scope.row.jdName }}
        </template>
      </el-table-column>
      <el-table-column label="实收金额">
        <template slot-scope="scope">
          {{ scope.row.ssjine }}
        </template>
      </el-table-column>
      <el-table-column label="订单状态">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getRefundList } from '@/api/order'

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
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      let params = {
          "orderNo":"",
          "pageNum":1,
          "pageSize":10,
          "startTime":"2023-11-01 00:00:00",
          "endTime":"2023-11-18 00:00:00"
      }
      getRefundList(params).then(res => {
        this.list = res.data
        this.listLoading = false
      })
    }
  }
}
</script>
