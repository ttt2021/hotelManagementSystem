<template>
  <div class="room-style">
    <div class="title-container">
      <div class="title-wrapper">
        <i class="el-icon-edit-outline"></i>
        <div class="title">客房类型列表</div>
      </div>
    </div>
    <div class="roomStyle-container" v-for="(item, kindIndex) in kindList">
      <div class="kind-wrapper">
        <template v-for="(items, indexs) in item">
          <div class="kind-content" @click="showDetail(kindIndex, indexs)">
            <img src="../../assets/room.png" alt="" />
            <div class="room-kindName">{{ items.kind }}</div>
          </div>
        </template>
      </div>
    </div>
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="60%"
      center
      :title="kindInfo.kind"
    >
      <span class="roomImg-infos">
        <div class="room-kind-img">
          <img :src="kindInfo.roomImg" alt="" />
        </div>
        <div class="room-kind-content">
          <div class="kind-infos">
            <div class="info-wrapper">
              <div class="name">建筑面积：</div>
              <div class="content">{{ kindInfo.area }}</div>
            </div>
            <div class="info-wrapper">
              <div class="name">楼层：</div>
              <div class="content">{{ kindInfo.floor }}</div>
            </div>
          </div>
          <div class="kind-infos">
            <div class="info-wrapper">
              <div class="name">客房星级：</div>
              <div class="content">{{ kindInfo.rank }}</div>
            </div>
            <div class="info-wrapper">
              <div class="name">客房数量：</div>
              <div class="content">{{ kindInfo.count }}</div>
            </div>
          </div>
          <div class="kind-infos">
            <div class="info-wrapper">
              <div class="name">客房最低价格：</div>
              <div class="content">{{ kindInfo.price }}</div>
            </div>
            <div class="info-wrapper">
              <div class="name">入住人数：</div>
              <div class="content">{{ kindInfo.liveCount }}</div>
            </div>
          </div>
          <div class="kind-infos">
            <div class="info-wrapper">
              <div class="name">床宽：</div>
              <div class="content">{{ kindInfo.bedWidth }}</div>
            </div>
            <div class="info-wrapper">
              <div class="name">床型：</div>
              <div class="content">{{ kindInfo.bedStyle }}</div>
            </div>
          </div>
          <div class="kind-infos">
            <div class="info-wrapper">
              <div class="name">窗户：</div>
              <div class="content">{{ kindInfo.window }}窗</div>
            </div>
            <div class="info-wrapper">
              <div class="name">无烟房：</div>
              <div class="content">{{ kindInfo.smoking }}</div>
            </div>
          </div>
          <div class="kind-infos">
            <div class="info-wrapper">
              <div class="name">添加人：</div>
              <div class="content">{{ kindInfo.username }}</div>
            </div>
            <div class="info-wrapper">
              <div class="name">添加时间：</div>
              <div class="content">{{ kindInfo.addTime }}</div>
            </div>
          </div>
          <div class="kind-infos">
            <div class="infos-wrapper">
              <div class="name">备注：</div>
              <div class="content">{{ kindInfo.remark }}</div>
            </div>
          </div>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="viewKindRoom">查看</el-button>
      </span>
    </el-dialog>
    <div class="count">共{{ count }}种房间类型</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      kindList: [],
      centerDialogVisible: false,
      kindInfo: {},
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    viewKindRoom() {
      let roomKindId = this.kindInfo.roomKindId
      this.$router.push({
        path: '/viewRoom',
        query: {
          roomKindId: roomKindId
        }
      })
    },
    getList() {
      this.$http.getRoomKind({}).then((res) => {
        console.log(res);
        res = JSON.parse(res);
        if (res.code == 0) {
          this.$message({
            showClose: true,
            message: `${res.msg}，请重新刷新`,
            type: "error",
          });
          return;
        }
        let list = [];
        for (let i = 0; i < res.data.length; i++) {
          if ((i + 1) % 5 == 0) {
            this.kindList.push(list);
            list = [];
            list.push(res.data[i]);
            console.log(list);
          } else {
            list.push(res.data[i]);
          }
        }
        if (list.length !== 0) {
          this.kindList.push(list);
        }
        console.log(this.kindList);
        this.count = res.data.length;
      });
    },
    showDetail(row, col) {
      console.log(row, col);
      console.log(this.kindList[row][col]);
      let kindInfo = this.kindList[row][col];
      this.kindInfo = kindInfo;
      this.getImg();
    },
    getImg() {
      let kindInfo = this.kindInfo;
      this.$http
        .getKindImg({
          roomImgId: kindInfo.roomKindId,
        })
        .then((res) => {
          console.log(res);
          res = JSON.parse(res);
          if (res.code == 0) {
            this.$message({
              showClose: true,
              message: `${res.msg}，请刷新`,
              type: "error",
            });
            return;
          }
          kindInfo.roomImg = res.data.img;
          kindInfo.remark = kindInfo.remark === "" ? "无" : kindInfo.remark;
          console.log(kindInfo);
          this.kindInfo = kindInfo;
          this.centerDialogVisible = true;
        });
    }
  },
};
</script>

<style lang="less" scoped>
.display() {
  display: flex;
  align-items: center;
}

.room-style {
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

.count {
  font-size: 16px;
  font-family: "楷体";
  color: #8d8d8d;
  text-align: right;
  margin-top: 10px;
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

/deep/.van-button {
  margin-top: 15px;
}

/deep/.van-field__body {
  height: 24px !important;
}

.room-img {
  height: 100px;
}

.showImg {
  width: 180px;
  height: 150px;
}

/deep/.van-cell {
  padding: 5px 16px;
}

/deep/.el-input__icon {
  line-height: 24px;
}

/deep/.el-input__inner {
  line-height: 24px;
  height: 24px;
}

.kind-wrapper {
  display: flex;
  text-align: center;
  justify-content: center;
  margin-bottom: 20px;
}

.kind-content {
  flex: 1;
  text-align: center;
  font-size: 16px;
  color: #8d8d8d;
  font-family: "楷体";
  font-weight: bold;
}

.kind-content img {
  width: 150px;
  height: 150px;
  display: inline-block;
}

.room-kind-img img {
  width: 150px;
  height: 180px;
}

.roomImg-infos {
  display: flex;
}

.room-kind-content {
  width: 100%;
}

.kind-infos {
  width: 100%;
  margin-left: 20px;
  color: #8d8d8d;
  display: flex;
  padding: 5px 0;
}

.info-wrapper {
  flex: 1;
  display: flex;
}

.infos-wrapper {
  display: flex;
  word-break: break-all;
  word-wrap: break-word;
  white-space: pre-wrap;
}

/deep/.el-dialog--center .el-dialog__body {
  padding: 25px 25px 15px;
}

/deep/.el-button + .el-button {
  margin-left: 50px;
}
</style>