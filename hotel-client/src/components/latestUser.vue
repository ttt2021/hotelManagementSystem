<template>
  <div class="latest-wrapper">
    <div class="title"><i class="iconfont icon-shouru-copy"></i>最新员工</div>
    <div class="drink-list">
      <el-table style="width: 100%" :data="userList">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="sex" label="性别"> </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="tel" label="手机号"> </el-table-column>
        <el-table-column prop="brith" label="出生日期"> </el-table-column>
        <el-table-column prop="email" label="电子邮箱" width="180px"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: [],
    };
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.$http.latestOrdeUserList().then(res => {
        console.log(res)
        res = JSON.parse(res)
        this.userList = res.data
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
  padding: 9px 0;
}

/deep/.el-table .cell {
  text-align: center;
}
</style>