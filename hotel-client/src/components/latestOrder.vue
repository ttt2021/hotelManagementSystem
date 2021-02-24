<template>
  <div class="latest-wrapper">
    <div class="title"><i class="iconfont icon-shouru-copy"></i>最新订单</div>
    <div class="drink-list">
      <el-table style="width: 100%" :data="orderList">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="num" label="房间号"> </el-table-column>
        <el-table-column prop="order1Name" label="入住人1"> </el-table-column>
        <el-table-column prop="order2Name" label="入住人2"> </el-table-column>
        <el-table-column prop="order3Name" label="入住人3"> </el-table-column>
        <el-table-column prop="order4Name" label="入住人4"> </el-table-column>
        <el-table-column prop="orderTime" label="开房时间" width="180px"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderList: [],
    };
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.$http.latestOrderList().then(res => {
        console.log(res)
        res = JSON.parse(res)
        this.orderList = res.data
      })
    }
  },
};
</script>

<style lang="less" scoped>
.latest-wrapper {
  padding: 10px 15px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: rgb(241, 55, 170);
  font-family: "楷体";
}

.iconfont {
  margin-right: 5px;
}

.drink-list {
  margin: 17px 0;
}

/deep/.el-table td, /deep/.el-table th {
  padding: 6px 0;
}

/deep/.el-table .cell {
  text-align: center;
}
</style>