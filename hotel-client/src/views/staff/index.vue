<template>
  <div class="userinfo-wrapper">
    <div class="title-container">
      <div class="title-wrapper">
        <i class="el-icon-edit-outline"></i>
        <div class="title">员工列表</div>
      </div>
    </div>
    <div class="search-wrapper">
      <div class="search-title">
        <span class="info-title workNum-title">员工号：</span
        ><el-input v-model="inputWorkNum" placeholder="请输入员工号"></el-input>
      </div>
      <div class="search-title search-username">
        <span class="info-title">姓名：</span
        ><el-input v-model="inputUsername" placeholder="请输入姓名"></el-input>
      </div>
      <div class="search-title">
        <span class="info-title">职务：</span
        ><el-input v-model="inputJob" placeholder="请输入职务"></el-input>
      </div>
      <el-button
        type="primary"
        icon="el-icon-search"
        plain
        @click="searchStaff"
      ></el-button>
    </div>
    <div class="position-list">
      <el-table
        :data="
          userList.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="60px"></el-table-column>
        <el-table-column label="员工号" width="80px">
          <template slot-scope="scope">
            <span v-html="scope.row.workNum"></span>
          </template>
        </el-table-column>
        <el-table-column label="员工姓名" width="100px">
          <template slot-scope="scope">
            <span v-html="scope.row.username"></span>
          </template>
        </el-table-column>
        <el-table-column label="职务" width="120px">
          <template slot-scope="scope">
            <span v-html="scope.row.job"></span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="60px"></el-table-column>
        <el-table-column prop="sex" label="性别" width="60px"></el-table-column>
        <el-table-column
          prop="brith"
          label="出生日期"
          width="120px"
        ></el-table-column>
        <el-table-column
          prop="tel"
          label="手机号"
          width="150px"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="电子邮箱"
          width="180px"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="家庭地址"
        ></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userList.length"
        class="pageCount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import tool from '../../utils/tool'
export default {
  data() {
    return {
      userList: [],
      currentPage: 1, //初始页
      pagesize: 5, // 每页数据
      inputWorkNum: "",
      inputUsername: "",
      inputJob: "",
    };
  },
  mounted() {
    // 获取员工列表
    this.getUserList();
  },
  methods: {
    searchStaff: tool.throttle(function() {
      this.$http
        .searchStaff({
          workNum: this.inputWorkNum,
          username: this.inputUsername,
          job: this.inputJob,
        })
        .then((res) => {
          console.log(res);
          res = JSON.parse(res);
          this.userList = res.data;
          if (res.code == 0) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error",
            });
            return;
          }
          // 结果高亮显示
          for (let i = 0; i < res.data.length; i++) {
            const workNumReg = new RegExp(this.inputWorkNum, "i");
            if (workNumReg && this.inputWorkNum !== "") {
              res.data[i].workNum = res.data[i].workNum.replace(
                workNumReg,
                `<span style="color: #FF0033;font-weight: bold;">${this.inputWorkNum}</span>`
              );
            }
            const usernameReg = new RegExp(this.inputUsername, "i");
            if (usernameReg && this.inputUsername !== "") {
              res.data[i].username = res.data[i].username.replace(
                usernameReg,
                `<span style="color: #FF0033;font-weight: bold;">${this.inputUsername}</span>`
              );
            }
            const jobReg = new RegExp(this.inputJob, "i");
            if (jobReg && this.inputJob !== "") {
              res.data[i].job = res.data[i].job.replace(
                jobReg,
                `<span style="color: #FF0033;font-weight: bold;">${this.inputJob}</span>`
              );
            }
          }
          this.inputWorkNum = ''
          this.inputUsername = ''
          this.inputJob = ''
        });
    }),
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },
    getUserList() {
      this.$http.getStaffList({}).then((res) => {
        console.log(res);
        res = JSON.parse(res);
        if (res.code == 0) {
          this.$message({
            showClose: true,
            message: "请检查网络是否有问题",
            type: "error",
          });
          return;
        }
        this.userList = res.data;
        this.count = res.data.length;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.display() {
  display: flex;
  align-items: center;
}

.userinfo-wrapper {
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

.el-table thead {
  font-weight: bold;
}

.add-title {
  margin: 15px 0;
  text-align: center;
  font-family: "楷体";
  font-weight: bold;
  color: #8d8d8d;
  font-size: 24px;
}

/deep/.van-popup {
  padding: 30px;
  overflow: hidden;
}

/deep/.van-field__label {
  width: 4.8em;
}

/deep/.van-popup--bottom {
  padding: 0;
  height: 70%;
  overflow-y: visible;
}

/deep/.van-button {
  margin-top: 15px;
}

/deep/.has-gutter th,
/deep/.el-table__row td {
  text-align: center;
}

/deep/.el-button--mini,
.el-button--mini.is-round {
  padding: 0;
}

/deep/.el-button {
  border: 0;
  font-size: 14px;
}

.iconfont {
  margin-right: 3px;
}

.updateBtn {
  color: #1296db;
}

.startBtn {
  color: rgb(19, 206, 102);
}

.stopBtn,
.deleteBtn {
  color: rgb(255, 61, 72);
}

.viewBtn {
  color: rgb(239, 179, 54);
}

/deep/.el-input__inner {
  height: 24px;
  line-height: 24px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 30px;
  height: 30px;
  display: block;
}

/deep/.van-cell {
  padding: 5px 16px;
}

/deep/.el-input__prefix,
/deep/.el-input__suffix {
  .display();
}

.showAvatar {
  width: 88px;
  height: 88px;
}

.pageCount.el-pagination {
  padding: 15px 5px;
  text-align: center;
  color: #8d8d8d;
}

/deep/.el-select .el-input .el-select__caret {
  margin-top: 0;
}

.userinfo-container {
  font-family: "楷体";
  font-size: 14px;
  font-weight: bold;
}

.userAvatar-wrapper {
  .display();
  margin-bottom: 10px;
}

.avatar-wrapper {
  margin-right: 10px;
}

.avatar-wrapper img {
  width: 100px;
  height: 120px;
}

.info {
  margin-bottom: 5px;
}

.remark-container,
.address {
  word-break: break-all;
  word-wrap: break-word;
  white-space: pre-wrap;
}
</style>