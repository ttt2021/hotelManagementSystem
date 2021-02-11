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
          <div class="add-title">新增员工</div>
          <van-field
            v-model="newUsername"
            label="姓名"
            placeholder="请输入姓名"
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
          <van-field v-model="newAge" label="年龄" placeholder="请输入年龄" />
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
            placeholder="请输入身份证号"
          />
          <van-field
            v-model="newBirth"
            label="出生日期"
            placeholder="请输入出生日期"
          />
          <van-field
            v-model="newEntryData"
            label="入职日期"
            placeholder="请输入入职日期"
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
          <van-button round block type="info" @click="add">确定增加</van-button>
          <!-- <van-button round block type="info" @click="add" v-if="isAdd"
            >确定增加</van-button
          >
          <van-button round block type="info" @click="update" v-else
            >确定修改</van-button
          > -->
        </van-popup>
      </div>
    </div>
    <div class="position-list">
      <el-table :data="userList" style="width: 100%">
        <el-table-column
          type="index"
          :index="indexMethod"
          label="序号"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="workNum"
          label="员工号"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="username"
          label="员工姓名"
          width="80"
        ></el-table-column>
        <!-- <el-table-column
          prop="avatar"
          label="头像"
          width="120"
        ></el-table-column> -->
        <el-table-column prop="job" label="职务" width="80"></el-table-column>
        <el-table-column prop="age" label="年龄" width="50"></el-table-column>
        <el-table-column prop="sex" label="性别" width="50"></el-table-column>
        <!-- <el-table-column
          prop="brith"
          label="出生日期"
          width="100"
        ></el-table-column> -->
        <el-table-column
          prop="tel"
          label="手机号"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="idCard"
          label="身份证号码"
          width="120"
        ></el-table-column>
        <!-- <el-table-column
          prop="address"
          label="地址"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="电子邮件"
          width="150"
        ></el-table-column> -->
        <!-- <el-table-column
          prop="entryData"
          label="入职日期"
          width="120"
        ></el-table-column> -->
        <!-- <el-table-column
          prop="addTime"
          label="添加时间"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="addUser"
          label="添加人"
          width="100"
        ></el-table-column> -->
        <el-table-column
          prop="status"
          label="状态"
          width="60"
        ></el-table-column>
        <!-- <el-table-column
          prop="leaveData"
          label="离职日期"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="leaveTime"
          label="离职办理时间"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="leaveUser"
          label="离职办理人"
          width="120"
        ></el-table-column> -->
        <!-- <el-table-column
          prop="remarks"
          label="备注"
          width="200"
        ></el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
            >
              移除
            </el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="count">共{{ count }}个职位</div>
  </div>
</template>

<script>
import newAvatar from './avatar'
export default {
  data() {
    return {
      count: 0,
      userList: [],
      show: false,
      showPicker: false,
      newUsername: "",
      newJob: "客房经理",
      newAge: null,
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
          value: "离职",
          label: "离职",
        },
        {
          value: "休假",
          label: "休假",
        },
      ],
      value: "入职",
      positionList: []
    };
  },
  mounted() {
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
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
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
    add() {
      if (
        this.newUsername === "" ||
        this.newAge === "" ||
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

      let username = (JSON.parse(localStorage.getItem("token"))).username;
      console.log(username)
      // 添加职员
      this.$http.addUser({
        username: this.newUsername,
        job: this.newJob,
        avatar: this.newAvatar,
        age: this.newAge,
        sex: this.newSex,
        tel: this.newTel,
        address: this.newAddress,
        email: this.newEmail,
        idCard: this.newIdCard,
        brith: this.newBirth,
        entryData: this.newEntryData,
        status: this.value,
        remarks: this.newRemarks,
        addUser: username
      }).then(res => {
        console.log(res)
      })
    },
  },
};
</script>

<style lang="less" scoped>
.display() {
  display: flex;
  align-items: center;
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

.count {
  font-size: 16px;
  font-family: "楷体";
  color: #8d8d8d;
  text-align: right;
  margin-top: 10px;
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

/deep/.el-input__inner {
  height: 24px;
  line-height: 24px;
}

/deep/.el-select .el-input .el-select__caret {
  margin-top: 8px;
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

.showAvatar {
  width: 88px;
  height: 88px;
}

// /deep/.van-button {
//   margin-top: 0;
// }

// /deep/.van-button--normal {
//   padding: 0;
// }

// /deep/.van-button {
//   height: 88px;
//   line-height: 88px;
// }
</style>