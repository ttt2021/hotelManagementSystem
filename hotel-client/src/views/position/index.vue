<template>
  <div class="position-wrapper">
    <div class="title-container">
      <div class="title-wrapper">
        <i class="el-icon-edit-outline"></i>
        <div class="title">职位列表</div>
      </div>
      <div class="add-btn">
        <el-button type="primary" @click="addPosition">新增</el-button>
        <van-popup v-model="show" closeable close-icon="close">
          <div class="add-title">{{ title }}</div>
          <van-field
            v-model="newPosition"
            label="职位"
            placeholder="请输入职位名"
          />
          <van-field
            readonly
            clickable
            name="picker"
            :value="newAuth"
            label="权限"
            placeholder="点击选择权限"
            @click="showPicker = true"
          />
          <van-popup v-model="showPicker" position="bottom">
            <van-picker
              show-toolbar
              :columns="columns"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
          <van-field
            v-model="newPosDesc"
            label="职位描述"
            placeholder="请输入描述信息"
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
    <div class="position-list">
      <el-table :data="positionList" stripe style="width: 100%">
        <el-table-column
          type="index"
          :index="indexMethod"
          label="序号"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="position"
          label="职位"
          width="80"
        ></el-table-column>
        <el-table-column prop="auth" label="权限" width="80"></el-table-column>
        <el-table-column
          prop="addTime"
          label="添加时间"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="addUsername"
          label="添加人"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="positionDesc"
          label="职位描述"
          width="200"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              class="updateBtn"
              @click="handleUpdate(scope.row)"
              ><i class="iconfont icon-update"></i>修改</el-button
            >
            <el-button
              size="mini"
              class="stopBtn"
              @click="handleClick(scope.row)"
              v-if="scope.row.status == 1"
              ><i class="iconfont icon-stop"></i>停用</el-button
            >
            <el-button
              size="mini"
              class="startBtn"
              @click="handleClick(scope.row)"
              v-else
              ><i class="iconfont icon-start"></i>启用</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="count">共{{ count }}个职位</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      newAuth: 0,
      columns: [0, 2, 3, 4, 5, 6, 7, 8],
      showPicker: false,
      newPosition: "",
      newPosDesc: "",
      positionList: [],
      count: 0,
      title: "新增职位",
      isAdd: true,
      updatePos: {},
    };
  },
  mounted() {
    // 挂载时获取职位列表
    this.getList()
  },
  methods: {
    getList() {
      this.$http.showPositionInfo({}).then((res) => {
        console.log(res);
        let positionList = JSON.parse(res).data;
        console.log(positionList);
        this.positionList = positionList;
        this.count = positionList.length;
      });
    },
    handleClick(info) {
      console.log(info);
      let positionId = info.positionId;
      let status = info.status === 1 ? 0 : 1;
      console.log(positionId, status);
      this.$http
        .updateStatus({
          positionId: positionId,
          status: status,
        })
        .then((res) => {
          console.log(res);
          this.getList()
        });
    },
    handleUpdate(info) {
      this.updatePos = info;
      this.newPosition = info.position;
      this.newPosDesc = info.positionDesc;
      this.newAuth = info.auth;
      this.title = "修改职位";
      this.isAdd = false;
      this.show = true;
    },
    addPosition() {
      this.show = true;
    },
    indexMethod(index) {
      return index + 1;
    },
    onConfirm(value) {
      this.newAuth = value;
      this.showPicker = false;
    },
    add() {
      console.log(this.newPosition, this.newPosDesc, this.newAuth);
      let userId = JSON.parse(localStorage.getItem("token")).userId;
      console.log(userId);
      this.$http
        .addPosition({
          userId: userId,
          position: this.newPosition,
          posDesc: this.newPosDesc,
          auth: this.newAuth,
        })
        .then((res) => {
          console.log(res);
          res = JSON.parse(res);
          if (res.code == 0) {
            this.$message({
              showClose: true,
              message: `${res.msg}，请检查网络`,
              type: "error",
            });
            return;
          } else {
            this.newPosition = "";
            this.newPosDesc = "";
            this.newAuth = 0;
            this.getList()
            this.show = false;
          }
        });
    },
    update() {
      let position = this.newPosition;
      let positionDesc = this.newPosDesc;
      let auth = this.newAuth;
      this.$http
        .updatePositionInfo({
          positionId: this.updatePos.positionId,
          position: position,
          positionDesc: positionDesc,
          auth: auth,
        })
        .then((res) => {
          console.log(res);
          res = JSON.parse(res);
          if (res.code == 0) {
            this.$message({
              showClose: true,
              message: `${res.msg}，请检查网络`,
              type: "error",
            });
            return;
          } else {
            this.newPosition = "";
            this.newPosDesc = "";
            this.newAuth = 0;
            this.title = "新增职位";
            this.isAdd = true;
            this.getList()
            this.show = false;
          }
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

.stopBtn {
  color: rgb(255, 61, 72);
}
</style>