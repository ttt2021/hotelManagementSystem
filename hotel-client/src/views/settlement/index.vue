<template>
  <div class="checkOut-wrapper">
    <div class="queryRoom-wrapper">
      <div class="title-container">
        <div class="title-wrapper">
          <i class="el-icon-edit-outline"></i>
          <div class="title">订房信息列表</div>
        </div>
        <!-- <div class="add-btn">
        <el-button @click="toggleSelection">取消</el-button>
        <el-button type="primary" @click="order">开房</el-button>
      </div> -->
      </div>
      <div class="drink-list">
        <el-table style="width: 100%" :data="roomList">
          <el-table-column type="index" label="序号" width="50px"></el-table-column>
          <el-table-column prop="roomInfo.num" label="房间号" width="80px"></el-table-column>
          <el-table-column
            prop="roomInfo.name"
            label="房间名称"
          ></el-table-column>
          <el-table-column
            prop="roomInfo.kind"
            label="房间类型"
          ></el-table-column>
          <el-table-column prop="roomInfo.price" label="单价" width="50px"></el-table-column>
          <el-table-column prop="order1Name" label="入住人1"></el-table-column>
          <el-table-column prop="order2Name" label="入住人2"></el-table-column>
          <el-table-column prop="order3Name" label="入住人3"></el-table-column>
          <el-table-column prop="order4Name" label="入住人4"></el-table-column>
          <el-table-column
            prop="orderTime"
            label="入住时间"
            width="160px"
          ></el-table-column>
          <el-table-column
            prop="expectedCheckout"
            label="退房时间"
            width="160px"
          ></el-table-column>
          <el-table-column label="操作" width="200px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                class="viewBtn"
                @click="handleView(scope.row)"
                ><i class="iconfont icon-view"></i>详情</el-button
              >
              <el-button
                size="mini"
                class="updateBtn"
                @click="handleDel(scope.row)"
                ><i class="iconfont icon-update"></i>移除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          :visible.sync="centerDialogVisible"
          width="60%"
          center
          title="订房详情"
        >
          <span class="roomImg-infos" v-if="roomList.length !== 0">
            <div class="kind-infos">
              <div class="info-wrapper">
                <div class="name">房间号：</div>
                <div class="content">{{ detailBook.roomInfo.num }}</div>
              </div>
              <div class="info-wrapper">
                <div class="name">房间名称：</div>
                <div class="content">{{ detailBook.roomInfo.name }}</div>
              </div>
            </div>
            <div class="kind-infos">
              <div class="info-wrapper">
                <div class="name">房间类型：</div>
                <div class="content">{{ detailBook.roomInfo.kind }}</div>
              </div>
              <div class="info-wrapper">
                <div class="name">单价：</div>
                <div class="content">{{ detailBook.roomInfo.price }}</div>
              </div>
            </div>
            <div class="kind-infos">
              <div class="info-wrapper">
                <div class="name">入住人1：</div>
                <div class="content">{{ detailBook.order1Name }}</div>
              </div>
              <div class="info-wrapper">
                <div class="name">性别1：</div>
                <div class="content">{{ detailBook.order1Sex }}</div>
              </div>
            </div>
            <div class="kind-infos">
              <div class="info-wrapper">
                <div class="name">证件号1：</div>
                <div class="content">{{ detailBook.order1IdCard }}</div>
              </div>
            </div>
            <div class="kind-infos">
              <div class="info-wrapper">
                <div class="name">入住人2：</div>
                <div class="content">{{ detailBook.order2Name }}</div>
              </div>
              <div class="info-wrapper">
                <div class="name">性别2：</div>
                <div class="content">{{ detailBook.order2Sex }}</div>
              </div>
            </div>
            <div class="kind-infos">
              <div class="info-wrapper">
                <div class="name">证件号2：</div>
                <div class="content">{{ detailBook.order2IdCard }}</div>
              </div>
            </div>
            <div class="kind-infos">
              <div class="info-wrapper">
                <div class="name">入住人3：</div>
                <div class="content">{{ detailBook.order3Name }}</div>
              </div>
              <div class="info-wrapper">
                <div class="name">性别3：</div>
                <div class="content">{{ detailBook.order3Sex }}</div>
              </div>
            </div>
            <div class="kind-infos">
              <div class="info-wrapper">
                <div class="name">证件号3：</div>
                <div class="content">{{ detailBook.order3IdCard }}</div>
              </div>
            </div>
            <div class="kind-infos">
              <div class="info-wrapper">
                <div class="name">入住人4：</div>
                <div class="content">{{ detailBook.order4Name }}</div>
              </div>
              <div class="info-wrapper">
                <div class="name">性别4：</div>
                <div class="content">{{ detailBook.order4Sex }}</div>
              </div>
            </div>
            <div class="kind-infos">
              <div class="info-wrapper">
                <div class="name">证件号4：</div>
                <div class="content">{{ detailBook.order4IdCard }}</div>
              </div>
            </div>
            <div class="kind-infos">
              <div class="info-wrapper">
                <div class="name">入住时间：</div>
                <div class="content">{{ detailBook.orderTime }}</div>
              </div>
              <div class="info-wrapper">
                <div class="name">预退房时间：</div>
                <div class="content">{{ detailBook.expectedCheckout }}</div>
              </div>
            </div>
            <div class="kind-infos">
              <div class="info-wrapper">
                <div class="name">费用：</div>
                <div class="content">{{ detailBook.totalCost }}</div>
              </div>
            </div>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="updateBookInfo">修改</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <div class="total-wrapper">
      <van-submit-bar
        :price="totalPrice"
        button-text="提交订单"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>

<script>
import tool from "../../utils/tool";
export default {
  data() {
    return {
      roomList: [],
      centerDialogVisible: false,
      detailBook: {},
      totalPrice: 0,
    };
  },
  mounted() {
    // let rooms = this.$route.query.rooms;
    // console.log(rooms);
    // if (typeof rooms == 'string') {
    //   console.log(rooms);
    // } else {
    //   for (let key of Object.keys(rooms)) {
    //     console.log(rooms[key]);
    //   }
    // }
    this.getList();
    console.log(this.roomList.length);
  },
  methods: {
    // order() {
    //   // 多行数据路由跳转
    //   console.log(this.multipleSelection);
    //   let num = {};
    //   for (let i = 0; i < this.multipleSelection.length; i++) {
    //     num[`roomId${i}`] = this.multipleSelection[i].roomId;
    //   }
    //   console.log(num);
    //   this.$router.push({
    //     path: "/settlement",
    //     query: {
    //       rooms: num,
    //     },
    //   });
    // },
    getList() {
      let username = JSON.parse(localStorage.getItem("token")).username;
      console.log(username);
      this.$http
        .getBookList({
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
          let totalPrice = 0;
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].remark =
              res.data[i].remark === "" ? "无" : res.data[i].remark;
            res.data[i].roomInfo.drinkings = res.data[
              i
            ].roomInfo.drinkings.join(" 、");
            totalPrice = totalPrice + Number(res.data[i].totalCost);
          }
          this.roomList = res.data;
          this.detailBook = res.data[0];
          this.totalPrice = totalPrice * 100;
          console.log(this.totalPrice);
          console.log(this.roomList);
        });
    },
    handleDel(info) {
      console.log(info);
      this.$http
        .cancelBook({
          roomId: info.roomId,
          orderId: info.orderId,
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
          this.getList();
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success",
          });
        });
    },
    handleView(info) {
      console.log(info);
      this.detailBook = info;
      this.centerDialogVisible = true;
    },
    updateBookInfo() {
      console.log(this.detailBook.orderId);
      this.$router.push({
        path: "/updatedBook",
        query: {
          orderId: this.detailBook.orderId,
        },
      });
    },
    onSubmit: tool.throttle(function () {
      console.log(this.roomList);
      let orderList = [];
      for (let i = 0; i < this.roomList.length; i++) {
        orderList.push(this.roomList[i].orderId);
      }
      console.log(orderList);
      this.$http
        .orderRoom({
          orderList: orderList,
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
          // 结算成功
          this.getList()
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success",
          });
          this.$router.push('/orderManagement')
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

.checkOut-wrapper {
  height: 680px;
}

.queryRoom-wrapper {
  height: 630px;
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

.viewBtn {
  color: rgb(239, 179, 54);
}

.adjustBtn {
  color: #12db2d;
}

/deep/.van-popup {
  padding: 20px;
  width: 60%;
}

.btn-wrapper /deep/.el-form-item__content {
  display: flex;
  justify-content: center;
}

// .btn-wrapper /deep/.el-button + .el-button {
//   margin-left: 50px;
// }

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

.kind-infos {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: #8d8d8d;
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

.total-wrapper {
  height: 50px;
  bottom: 0;
  background: #fff;
}

.van-submit-bar {
  position: static;
}

.el-button--mini, .el-button--mini.is-round {
  padding: 7px 5px;
}
</style>