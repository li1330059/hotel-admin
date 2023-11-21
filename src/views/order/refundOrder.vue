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
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="联系方式">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="退款金额">
        <template slot-scope="scope">
          {{ scope.row.jine }}
        </template>
      </el-table-column>
      <el-table-column label="订单归属">
        <template slot-scope="scope">
          {{ scope.row.owner }}
        </template>
      </el-table-column>
      <el-table-column label="退款原因">
        <template slot-scope="scope">
          {{ scope.row.tkyy }}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div class="btn-group" v-if="scope.row.status != '已退款'&&scope.row.status != '已通过'">
            <div @click="openRefund(scope.row)">退款</div>
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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form ref="reform" :model="reform" label-width="120px">
        <el-form-item label="审核">
          <el-switch
            v-model="reform.type"
            :active-value="1"
            :inactive-value="0"
            active-text="通过"
            inactive-text="不通过">
          </el-switch>
        </el-form-item>
        <el-form-item label="拒绝理由" v-if="reform.type == 0">
          <el-input v-model="reform.text" type="textarea"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="refund">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRefundList,setRefund,setNoRefund } from '@/api/order'

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
      },
      reform: {
          type:0,
          text:""
      },
      dialogVisible: false,
      reId:"",
      dd:""
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getRefundList(this.form).then(res => {
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
    },
    openRefund(val) {
      this.dialogVisible = true;
      this.reId = val.id;
      this.dd = val.dd;
    },
    refund(){
      let params = {
        id:this.reId,
        dd:this.dd
      }
      if(this.reform.type == 1){
        setRefund(params).then(res => {
            if(res.status == 200){
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.dialogVisible = false;
              this.fetchData()
            }else{
              this.$message({
                message: res.message,
                type: 'warning'
              })
            }
        })
      }else{
        params.wtgyy = this.reform.text
        setNoRefund(params).then(res => {
            if(res.status == 200){
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.dialogVisible = false;
              this.fetchData()
            }else{
              this.$message({
                message: res.message,
                type: 'warning'
              })
            }
        })
      }
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
.btn-group{
  display: flex;
  div{
    margin: 0 10px;
    color:#409eff;
    cursor: pointer;
  }
}
</style>
