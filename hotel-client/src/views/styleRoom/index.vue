<template>
  <div class="room-style">
    <div class="title-container">
      <div class="title-wrapper">
        <i class="el-icon-edit-outline"></i>
        <div class="title">客房类型列表</div>
      </div>
      <div class="add-btn">
        <el-button type="primary" @click="addPosition">新增</el-button>
        <van-popup v-model="show" closeable close-icon="close">
          <div class="add-title">{{ title }}</div>
          <van-field
            v-model="roomKind"
            label="客房类型"
            placeholder="请输入客房类型"
          />
          <van-field
            v-model="roomPrice"
            label="客房价格"
            placeholder="请输入客房最低价格"
          />
          <van-field
            v-model="roomCount"
            label="客房数量"
            placeholder="请输入客房数量"
          />
          <van-field
            v-model="roomArea"
            label="客房面积"
            placeholder="请输入客房面积"
          />
          <van-field
            v-model="bedWidth"
            label="客房床宽"
            placeholder="请输入客房床宽"
          />
          <van-field
            v-model="bedStyle"
            label="客房床型"
            placeholder="请输入客房床型"
          />
          <van-field
            v-model="liveCount"
            label="居住人数"
            placeholder="请输入居住人数"
          />
          <van-field
            v-model="window"
            label="窗户"
            placeholder="请输入是否有窗户"
          />
          <van-field
            v-model="floor"
            label="楼层"
            placeholder="请输入居住楼层"
          />
          <van-field
            v-model="smoking"
            label="无烟房"
            placeholder="请输入是否是无烟房"
          />
          <van-field name="radio" label="客房星级">
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
          <van-field name="roomImg" label="客房图片" class="room-img">
            <template #input>
              <van-uploader :after-read="afterRead">
                <img :src="roomImg" alt="" class="showImg" />
              </van-uploader>
            </template>
          </van-field>
          <van-field
            v-model="roomRemark"
            label="客房备注"
            placeholder="请输入客房备注"
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
        <el-button type="primary" @click="updateRoomKind">修改</el-button>
      </span>
    </el-dialog>
    <div class="count">共{{ count }}种房间类型</div>
  </div>
</template>

<script>
import roomImg from "../userInfo/avatar";
import tool from "../../utils/tool";
export default {
  data() {
    return {
      count: 0,
      show: false,
      title: "新增客房类型",
      isAdd: true,
      roomKind: "",
      roomRemark: "",
      roomPrice: null,
      roomCount: null,
      options: [
        {
          value: "1星级",
          label: "1星级",
        },
        {
          value: "2星级",
          label: "2星级",
        },
        {
          value: "3星级",
          label: "3星级",
        },
        {
          value: "4星级",
          label: "4星级",
        },
        {
          value: "5星级",
          label: "5星级",
        },
      ],
      value: "5星级",
      roomImg: roomImg,
      roomArea: "",
      bedWidth: "",
      bedStyle: "",
      liveCount: "2(不可加床)",
      window: "有",
      floor: 6,
      smoking: "否",
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
        path: '/home/queryRoom',
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
        res.data.pop();
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
    updateRoomKind() {
      this.title = "修改房间类型";
      this.roomKind = this.kindInfo.kind;
      this.roomRemark = this.kindInfo.remark;
      this.roomPrice = this.kindInfo.price;
      this.roomCount = this.kindInfo.count;
      this.value = this.kindInfo.rank;
      this.roomImg = this.kindInfo.roomImg;
      this.roomArea = this.kindInfo.area;
      this.bedWidth = this.kindInfo.bedWidth;
      this.bedStyle = this.kindInfo.bedStyle;
      this.liveCount = this.kindInfo.liveCount;
      this.window = this.kindInfo.window;
      this.floor = this.kindInfo.floor;
      this.smoking = this.kindInfo.smoking;
      this.isAdd = false;
      this.centerDialogVisible = false;
      this.show = true;
    },
    update: tool.throttle(async function () {
      this.$http
        .updatedRoomKind({
          roomKindId: this.kindInfo.roomKindId,
          kind: this.roomKind,
          remark: this.roomRemark,
          price: this.roomPrice,
          count: this.roomCount,
          rank: this.value,
          img: this.roomImg,
          area: this.roomArea,
          bedWidth: this.bedWidth,
          bedStyle: this.bedStyle,
          liveCount: this.liveCount,
          window: this.window,
          floor: this.floor,
          smoking: this.smoking,
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
          this.show = false;
          this.kindInfo = res.data;
          console.log(this.kindInfo);
          this.kindList = [];
          this.getList();
          this.getImg();
          setTimeout(() => {
            this.newInfo()
          }, 3000)
        });
    }),
    newInfo() {
      this.title = "添加房间类型";
      this.roomKind = "";
      this.roomRemark = "";
      this.roomPrice = "";
      this.roomCount = null;
      this.value = "5星级";
      this.roomImg = roomImg;
      this.roomArea = "";
      this.bedWidth = "";
      this.bedStyle = "";
      this.liveCount = "2(不可加床)";
      this.window = "有";
      this.floor = 6;
      this.smoking = "否";
      this.isAdd = true;
    },
    addPosition() {
      this.show = true;
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
    },
    afterRead(file) {
      console.log(file);
      this.roomImg = file.content;
    },
    add: tool.throttle(function () {
      if (
        this.roomKind === "" ||
        this.roomPrice === "" ||
        this.roomCount === null ||
        this.roomDesc === "" ||
        this.roomArea === "" ||
        this.bedWidth === "" ||
        this.bedStyle === ""
      ) {
        this.$message({
          showClose: true,
          message: "输入内容不能为空",
          type: "error",
        });
        return;
      }
      let userinfo = JSON.parse(localStorage.getItem("token"));
      console.log(userinfo);
      this.$http
        .addRoomKind({
          kind: this.roomKind,
          price: this.roomPrice,
          count: this.roomCount,
          rank: this.value,
          roomImg: this.roomImg,
          remark: this.roomRemark,
          userId: userinfo.userId,
          username: userinfo.username,
          area: this.roomArea,
          bedWidth: this.bedWidth,
          bedStyle: this.bedStyle,
          liveCount: this.liveCount,
          window: this.window,
          floor: this.floor,
          smoking: this.smoking,
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
          this.show = false;
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success",
          });
          this.roomKind = "";
          this.roomPrice = null;
          this.roomCount = null;
          this.value = "5星级";
          this.roomImg = roomImg;
          this.roomRemark = "";
          this.roomArea = "";
          this.bedWidth = "";
          this.bedStyle = "";
          this.liveCount = "2(不可加床)";
          this.window = "有";
          this.floor = 6;
          this.smoking = "否";
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