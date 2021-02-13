<template>
  <div class="userinfo-wrapper">
    <div class="title-container">
      <div class="title-wrapper">
        <i class="el-icon-edit-outline"></i>
        <div class="title">员工列表</div>
      </div>
      <div class="add-btn">
        <el-button type="primary" @click="addUser">新增</el-button>
        <van-popup v-model="show" closeable close-icon="close">
          <div class="add-title">{{ title }}</div>
          <van-field
            v-model="newUsername"
            label="姓名"
            readonly
            v-if="!isAdd"
          />
          <van-field
            v-model="newUsername"
            label="姓名"
            placeholder="请输入姓名"
            v-else
          />
          <van-field
            readonly
            clickable
            name="picker"
            :value="newJob"
            label="职务"
            placeholder="点击选择职务"
            @click="showPicker = true"
          />
          <van-popup v-model="showPicker" position="bottom">
            <van-picker
              show-toolbar
              :columns="positionList"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
          <van-field name="newAvatar" label="头像">
            <template #input>
              <van-uploader :after-read="afterRead"
                ><img :src="newAvatar" alt="" class="showAvatar"
              /></van-uploader>
            </template>
          </van-field>
          <van-field name="radio" label="性别">
            <template #input>
              <van-radio-group v-model="newSex" direction="horizontal">
                <van-radio name="男">男</van-radio>
                <van-radio name="女">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field
            v-model="newTel"
            type="tel"
            label="手机号"
            placeholder="请输入手机号"
          />
          <van-field
            v-model="newAddress"
            label="家庭地址"
            placeholder="请输入家庭住址"
          />
          <van-field
            v-model="newEmail"
            label="电子邮箱"
            placeholder="请输入电子邮箱"
          />
          <van-field
            v-model="newIdCard"
            label="身份证号"
            readonly
            v-if="!isAdd"
          />
          <van-field
            v-model="newIdCard"
            label="身份证号"
            placeholder="请输入身份证号"
            v-else
          />
          <van-field
            v-model="newBirth"
            label="出生日期"
            readonly
            v-if="!isAdd"
          />
          <van-field
            v-model="newBirth"
            label="出生日期"
            placeholder="请输入出生日期"
            v-else
          />
          <van-field
            v-model="newEntryData"
            label="入职日期"
            readonly
            v-if="!isAdd"
          />
          <van-field
            v-model="newEntryData"
            label="入职日期"
            placeholder="请输入入职日期"
            v-else
          />
          <van-field name="radio" label="状态">
            <template #input>
              <el-select v-model="value" clearable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>
          </van-field>
          <van-field
            v-model="newRemarks"
            label="备注"
            placeholder="请输入备注信息"
          />
          <van-button round block type="info" @click="add" v-if="isAdd"
            >确定增加</van-button
          >
          <van-button round block type="info" @click="update" v-else
            >确定修改</van-button
          >
        </van-popup>
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
        @click="searchUser"
      ></el-button>
    </div>
    <div class="position-list">
      <el-table
        :data="
          userList.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column label="员工号" width="120">
          <template slot-scope="scope">
            <span v-html="scope.row.workNum"></span>
          </template>
        </el-table-column>
        <el-table-column label="员工姓名" width="120">
          <template slot-scope="scope">
            <span v-html="scope.row.username"></span>
          </template>
        </el-table-column>
        <el-table-column label="职务" width="120">
          <template slot-scope="scope">
            <span v-html="scope.row.job"></span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="80"></el-table-column>
        <el-table-column prop="sex" label="性别" width="80"></el-table-column>
        <el-table-column
          prop="tel"
          label="手机号"
          width="140"
        ></el-table-column>
        <el-table-column
          prop="idCard"
          label="身份证号码"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="100"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              class="viewBtn"
              @click="handleView(scope.row)"
              ><i class="iconfont icon-view"></i>查看</el-button
            >
            <el-button
              size="mini"
              class="updateBtn"
              @click="handleUpdate(scope.row)"
              ><i class="iconfont icon-update"></i>修改</el-button
            >
          </template>
        </el-table-column>
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
      <van-popup v-model="view" closeable close-icon="close">
        <div class="add-title">员工信息</div>
        <div class="userinfo-container">
          <div class="userAvatar-wrapper">
            <div class="avatar-wrapper">
              <img :src="userinfo.avatar" alt="" />
            </div>
            <div class="username-wrapper">
              <div class="workNum info">员工号：{{ userinfo.workNum }}</div>
              <div class="username info">姓名：{{ userinfo.username }}</div>
              <div class="age-sex info">
                <div class="sex info">性别：{{ userinfo.sex }}</div>
                <div class="age info">年龄：{{ userinfo.age }}</div>
                <div class="job info">职务：{{ userinfo.job }}</div>
              </div>
              <div class="birth info">出生日期：{{ userinfo.brith }}</div>
            </div>
          </div>
          <div class="tel-email">
            <div class="tel info">手机号：{{ userinfo.tel }}</div>
            <div class="email info">电子邮箱：{{ userinfo.email }}</div>
          </div>
          <div class="address info">家庭地址：{{ userinfo.address }}</div>
          <div class="addinfo-wrapper">
            <div class="addUser info">添加人：{{ userinfo.addUser }}</div>
            <div class="addTime info">添加时间：{{ userinfo.addTime }}</div>
          </div>
          <div class="status-wrapper">
            <div class="status info">状态：{{ userinfo.status }}</div>
            <div class="entry info">就职日期：{{ userinfo.entryData }}</div>
          </div>
          <div class="status-wrapper">
            <div class="status info">身份证号：{{ userinfo.idCard }}</div>
          </div>
          <div class="leave-wrapper" v-if="userinfo.leaveData !== ''">
            <div class="leave info">离职日期：{{ userinfo.leaveData }}</div>
            <div class="entry info">离职办理人：{{ userinfo.leaveUser }}</div>
            <div class="status info">
              离职办理日期：{{ userinfo.leaveTime }}
            </div>
          </div>
          <div
            class="remark-wrapper info remark-container"
            v-if="userinfo.remarks !== null"
          >
            备注：{{ userinfo.remarks }}
          </div>
          <div class="remark-wrapper info" v-if="userinfo.remarks === null">
            备注：无
          </div>
        </div>
        <van-button round block type="info" @click="updatedInfo"
          >修改信息</van-button
        >
      </van-popup>
    </div>
  </div>
</template>

<script>
import newAvatar from "./avatar";
import tool from '../../utils/tool'
export default {
  data() {
    return {
      title: "新增员工",
      userList: [],
      show: false,
      showPicker: false,
      newUsername: "",
      newJob: "客房经理",
      newSex: "男",
      newTel: "",
      newAddress: "",
      newIdCard: "",
      newBirth: "",
      newEntryData: "",
      newEmail: "",
      newRemarks: "",
      newAvatar: newAvatar,
      options: [
        {
          value: "入职",
          label: "入职",
        },
        {
          value: "在职",
          label: "在职",
        },
        {
          value: "停职",
          label: "停职",
        },
        {
          value: "离职",
          label: "离职",
        },
        {
          value: "休假",
          label: "休假",
        },
      ],
      value: "入职",
      positionList: [],
      currentPage: 1, //初始页
      pagesize: 5, // 每页数据
      view: false,
      userinfo: {},
      isAdd: true,
      inputWorkNum: "",
      inputUsername: "",
      inputJob: "",
    };
  },
  mounted() {
    // 获取员工列表
    this.getUserList();
    // 获取职位列表
    this.$http.showPositionInfo({}).then((res) => {
      // console.log(res)
      let positionInfo = JSON.parse(res).data;
      console.log(positionInfo);
      let positionList = [];
      for (let i = 0; i < positionInfo.length; i++) {
        positionList.push(positionInfo[i].position);
      }
      this.positionList = positionList;
    });
  },
  methods: {
    searchUser: tool.throttle(function() {
      this.$http
        .searchUser({
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
      this.$http.getUserList({}).then((res) => {
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
    afterRead(file) {
      console.log(file);
      this.showAvatar = false;
      this.newAvatar = file.content;
    },
    onConfirm(value) {
      this.newJob = value;
      this.showPicker = false;
    },
    indexMethod(index) {
      return index + 1;
    },
    addUser() {
      this.show = true;
    },
    add: tool.throttle(function() {
      if (
        this.newUsername === "" ||
        this.newTel === "" ||
        this.newAddress === "" ||
        this.newIdCard === "" ||
        this.newBirth === "" ||
        this.newEntryData === "" ||
        this.newEmail === ""
      ) {
        this.$message({
          showClose: true,
          message: "内容不能为空",
          type: "error",
        });
        return;
      }
      // 验证电子邮箱
      let emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      if (!emailReg.test(this.newEmail)) {
        this.$message({
          showClose: true,
          message: "邮箱错误",
          type: "error",
        });
        return;
      }
      // 验证手机号
      if (!/^1[3456789]\d{9}$/.test(this.newTel)) {
        this.$message({
          showClose: true,
          message: "手机号错误",
          type: "error",
        });
        return;
      }
      // 验身份证
      if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(this.newIdCard)) {
        this.$message({
          showClose: true,
          message: "身份证错误",
          type: "error",
        });
        return;
      }

      let username = JSON.parse(localStorage.getItem("token")).username;
      console.log(username);
      // 添加职员
      this.$http
        .addUser({
          username: this.newUsername,
          job: this.newJob,
          avatar: this.newAvatar,
          sex: this.newSex,
          tel: this.newTel,
          address: this.newAddress,
          email: this.newEmail,
          idCard: this.newIdCard,
          brith: this.newBirth,
          entryData: this.newEntryData,
          status: this.value,
          remarks: this.newRemarks,
          addUser: username,
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
          this.getUserList();
          this.newUsername = "";
          this.newTel = "";
          this.newAddress = "";
          this.newEmail = "";
          this.newEntryData = "";
          this.newIdCard = "";
          this.newBirth = "";
          this.newRemarks = "";
          this.newSex = "男";
          this.newJob = "客房经理";
          this.newAvatar = newAvatar;
          this.value = "入职";
          this.show = false;
        });
    }),
    // 获取个人信息
    handleView(info) {
      console.log(info.workNum);
      this.$http
        .getUserInfo({
          workNum: info.workNum,
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
          let userinfo = res.data;
          console.log(userinfo);
          this.userinfo = userinfo;
          this.$http
            .getAvatar({
              userId: userinfo.userId,
            })
            .then((AvatarRes) => {
              AvatarRes = JSON.parse(AvatarRes);
              if (AvatarRes.code == 0) {
                this.$message({
                  showClose: true,
                  message: AvatarRes.msg,
                  type: "error",
                });
                return;
              }
              this.userinfo.avatar = AvatarRes.data.avatar;
              this.view = true;
            });
        });
    },
    handleUpdate(info) {
      console.log(info.workNum);
      this.$http
        .getUserInfo({
          workNum: info.workNum,
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
          let userinfo = res.data;
          console.log(userinfo);
          this.userinfo = userinfo;
          this.$http
            .getAvatar({
              userId: userinfo.userId,
            })
            .then((AvatarRes) => {
              AvatarRes = JSON.parse(AvatarRes);
              if (AvatarRes.code == 0) {
                this.$message({
                  showClose: true,
                  message: AvatarRes.msg,
                  type: "error",
                });
                return;
              }
              this.userinfo.avatar = AvatarRes.data.avatar;
              this.updatedInfo();
            });
        });
    },
    updatedInfo() {
      this.view = false;
      this.title = "修改信息";
      this.newUsername = this.userinfo.username;
      this.newJob = this.userinfo.job;
      this.newAvatar = this.userinfo.avatar;
      this.newTel = this.userinfo.tel;
      this.newAddress = this.userinfo.address;
      this.newEmail = this.userinfo.email;
      this.newIdCard = this.userinfo.idCard;
      this.newBirth = this.userinfo.brith;
      this.newEntryData = this.userinfo.entryData;
      this.value = this.userinfo.status;
      this.newRemarks = this.userinfo.remarks;
      this.isAdd = false;
      this.show = true;
    },
    update: tool.throttle(function() {
      this.$http
        .updatedUserinfo({
          userId: this.userinfo.userId,
          job: this.newJob,
          avatar: this.newAvatar,
          tel: this.newTel,
          address: this.newAddress,
          email: this.newEmail,
          status: this.value,
          remarks: this.remarks,
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
          this.getUserList();
          this.show = false;
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success",
          });
          this.newUsername = "";
          this.newTel = "";
          this.newAddress = "";
          this.newEmail = "";
          this.newEntryData = "";
          this.newIdCard = "";
          this.newBirth = "";
          this.newRemarks = "";
          this.newSex = "男";
          this.newJob = "客房经理";
          this.newAvatar = newAvatar;
          this.value = "入职";
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