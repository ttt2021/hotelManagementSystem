<template>
  <div class="drink-wrapper">
    <div class="title-container">
      <div class="title-wrapper">
        <i class="el-icon-edit-outline"></i>
        <div class="title">日志列表</div>
      </div>
    </div>
    <div class="search-wrapper">
      <div class="search-title">
        <span class="info-title workNum-title">员工名：</span
        ><el-input v-model="inputName" placeholder="请输入员工名"></el-input>
      </div>
      <div class="search-title">
        <span class="info-title">时间：</span>
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="inputTime"
          style="width: 100%"
        ></el-date-picker>
      </div>
      <el-button
        type="primary"
        icon="el-icon-search"
        plain
        @click="searchLog"
      ></el-button>
    </div>
    <div class="drink-list">
      <el-table
        style="width: 100%"
        :data="
          logList.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="员工名">
          <template slot-scope="scope">
            <span v-html="scope.row.username"></span>
          </template>
        </el-table-column>
        <el-table-column prop="text" label="日志内容"> </el-table-column>
        <el-table-column label="日志时间">
          <template slot-scope="scope">
            <span v-html="scope.row.logTime"></span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="logList.length"
        class="pageCount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import tool from "../../utils/tool";
import formatTime from "../../utils/formatTime";
export default {
  data() {
    return {
      logList: [],
      currentPage: 1, //初始页
      pagesize: 10, // 每页数据
      inputName: '',
      inputTime: ''
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.$http.getLogList({}).then((res) => {
        console.log(res);
        res = JSON.parse(res);
        if (res.code == 0) {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "error",
          });
          return;
        }
        this.logList = res.data
        console.log(this.logList);
      });
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },
    searchLog: tool.throttle(function () {
      this.$http
        .searchLogList({
          username: this.inputName,
          logTime: this.inputTime,
        })
        .then((res) => {
          console.log(res);
          res = JSON.parse(res);
          if (res.code == 0) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error",
            });
            return;
          }
          console.log(res.data);
          this.logList = res.data;
          // 结果高亮显示
          for (let i = 0; i < res.data.length; i++) {
            console.log(res.data[i]);
            const nameReg = new RegExp(this.inputName, "i");
            if (nameReg && this.inputName !== "") {
              res.data[i].username = res.data[i].username.replace(
                nameReg,
                `<span style="color: #FF0033;font-weight: bold;">${this.inputName}</span>`
              );
            }
            this.inputTime = formatTime.getSearchTime(this.inputTime)
            const timeReg = new RegExp(this.inputTime, "i");
            if (timeReg && this.inputTime !== "") {
              res.data[i].logTime = res.data[i].logTime.replace(
                timeReg,
                `<span style="color: #FF0033;font-weight: bold;">${this.inputTime}</span>`
              );
            }
          }
          this.inputName = "";
          this.inputTime = "";
        });
    }),
  },
};
</script>

<style lang="less" scoped>
.display() {
  display: flex;
  align-items: center;
}

.drink-wrapper {
  height: 650px;
}

.title-container {
  margin-bottom: 20px;
  .display();
  justify-content: space-between;
}

.title-wrapper {
  font-size: 16px;
  font-family: "楷体";
  font-weight: bold;
  color: #8d8d8d;
  .display();
}

.title {
  margin-left: 5px;
}

.el-table thead {
  font-weight: bold;
}

.add-title {
  margin: 25px 0 10px 0;
  text-align: center;
  font-family: "楷体";
  font-weight: bold;
  color: #8d8d8d;
  font-size: 24px;
}

/deep/.van-button--mini {
  margin: 10px auto;
  display: flex;
}

/deep/.has-gutter th,
/deep/.el-table__row td {
  text-align: center;
}

.pageCount.el-pagination {
  padding: 15px 5px;
  text-align: center;
  color: #8d8d8d;
}

/deep/.el-button {
  border: 0;
  font-size: 14px;
}

.iconfont {
  margin-right: 3px;
}

.deleteBtn {
  color: rgb(255, 61, 72);
}

.updateBtn {
  color: #1296db;
}

.search-wrapper {
  margin-bottom: 10px;
  justify-content: center;
}

.search-wrapper,
.search-title {
  .display();
}

.search-username {
  margin-right: 15px;
}

.search-wrapper /deep/.el-input__inner {
  width: 150px;
  height: 35px !important;
}

.info-title {
  width: 60px;
}

.workNum-title {
  width: 90px;
}
</style>