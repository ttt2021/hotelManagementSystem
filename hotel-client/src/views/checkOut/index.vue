<template>
  <div class="checkOut-wrapper">
    <div class="queryRoom-wrapper">
      <div class="title-container">
        <div class="title-wrapper">
          <i class="el-icon-edit-outline"></i>
          <div class="title">退房信息列表</div>
        </div>
      </div>
      <div class="drink-list">
        <el-table style="width: 100%" :data="roomList">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="roomInfo.num" label="房间号"></el-table-column>
          <el-table-column
            prop="roomInfo.kind"
            label="房间类型"
          ></el-table-column>
          <el-table-column prop="roomInfo.price" label="单价"></el-table-column>
          <el-table-column
            prop="orderInfo.orderTime"
            label="入住时间"
            width="160px"
          ></el-table-column>
          <el-table-column
            prop="orderInfo.expectedCheckout"
            label="预退时间"
            width="160px"
          ></el-table-column>
          <el-table-column prop="drinkings" label="酒水消费"></el-table-column>
          <el-table-column
            prop="drinkingsCost"
            label="酒水费用"
          ></el-table-column>
          <el-table-column
            prop="orderInfo.totalCost"
            label="已支付"
          ></el-table-column>
          <el-table-column prop="totalCost" label="总费用"></el-table-column>
          <el-table-column label="操作" width="250px">
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
                @click="handleUpdated(scope.row)"
                ><i class="iconfont icon-update"></i>修改</el-button
              >
              <el-button
                size="mini"
                class="deleteBtn"
                @click="handleCancel(scope.row)"
                ><i class="iconfont icon-quxiao"></i>取消</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          :visible.sync="centerDialogVisible"
          width="60%"
          center
          title="订房详情"
          v-if="roomList.length !== 0"
        >
          <span class="roomImg-infos">
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
                <div class="content">{{ detailBook.roomInfo.price }}元</div>
              </div>
            </div>
            <div class="kind-infos">
              <div class="info-wrapper">
                <div class="name">入住人1：</div>
                <div class="content">{{ detailBook.orderInfo.order1Name }}</div>
              </div>
              <div class="info-wrapper">
                <div class="name">性别1：</div>
                <div class="content">{{ detailBook.orderInfo.order1Sex }}</div>
              </div>
            </div>
            <div class="kind-infos">
              <div class="info-wrapper">
                <div class="name">证件号1：</div>
                <div class="content">
                  {{ detailBook.orderInfo.order1IdCard }}
                </div>
              </div>
            </div>
            <div class="kind-infos">
              <div class="info-wrapper">
                <div class="name">入住人2：</div>
                <div class="content">{{ detailBook.orderInfo.order2Name }}</div>
              </div>
              <div class="info-wrapper">
                <div class="name">性别2：</div>
                <div class="content">{{ detailBook.orderInfo.order2Sex }}</div>
              </div>
            </div>
            <div class="kind-infos">
              <div class="info-wrapper">
                <div class="name">证件号2：</div>
                <div class="content">
                  {{ detailBook.orderInfo.order2IdCard }}
                </div>
              </div>
            </div>
            <div class="kind-infos">
              <div class="info-wrapper">
                <div class="name">入住人3：</div>
                <div class="content">{{ detailBook.orderInfo.order3Name }}</div>
              </div>
              <div class="info-wrapper">
                <div class="name">性别3：</div>
                <div class="content">{{ detailBook.orderInfo.order3Sex }}</div>
              </div>
            </div>
            <div class="kind-infos">
              <div class="info-wrapper">
                <div class="name">证件号3：</div>
                <div class="content">
                  {{ detailBook.orderInfo.order3IdCard }}
                </div>
              </div>
            </div>
            <div class="kind-infos">
              <div class="info-wrapper">
                <div class="name">入住人4：</div>
                <div class="content">{{ detailBook.orderInfo.order4Name }}</div>
              </div>
              <div class="info-wrapper">
                <div class="name">性别4：</div>
                <div class="content">{{ detailBook.orderInfo.order4Sex }}</div>
              </div>
            </div>
            <div class="kind-infos">
              <div class="info-wrapper">
                <div class="name">证件号4：</div>
                <div class="content">
                  {{ detailBook.orderInfo.order4IdCard }}
                </div>
              </div>
            </div>
            <div class="kind-infos">
              <div class="info-wrapper">
                <div class="name">入住时间：</div>
                <div class="content">{{ detailBook.orderInfo.orderTime }}</div>
              </div>
              <div class="info-wrapper">
                <div class="name">预退房时间：</div>
                <div class="content">
                  {{ detailBook.orderInfo.expectedCheckout }}
                </div>
              </div>
            </div>
            <div class="kind-infos">
              <div class="info-wrapper">
                <div class="name">已付费用：</div>
                <div class="content">
                  {{ detailBook.orderInfo.totalCost }}元
                </div>
              </div>
              <div class="info-wrapper">
                <div class="name">实际房费：</div>
                <div class="content">{{ detailBook.actualCost }}元</div>
              </div>
            </div>
            <div class="kind-infos">
              <div class="info-wrapper">
                <div class="name">酒水消费：</div>
                <div class="content">{{ detailBook.drinkings }}</div>
              </div>
              <div class="info-wrapper">
                <div class="name">酒水费用：</div>
                <div class="content">{{ detailBook.drinkingsCost }}元</div>
              </div>
            </div>
            <div class="kind-infos">
              <div class="info-wrapper">
                <div class="name">最终总消费：</div>
                <div class="content">{{ detailBook.totalCost }}元</div>
              </div>
              <div class="info-wrapper">
                <div class="name">还需付费：</div>
                <div class="content">{{ totalPrice / 100 }}元</div>
              </div>
            </div>
          </span>
        </el-dialog>
        <el-dialog
          :visible.sync="show"
          width="60%"
          center
          title="酒水消费"
          v-if="roomList.length !== 0"
        >
          <span class="roomImg-infos" v-for="(item, drinkIndex) in drinkList">
            <div class="kind-infos">
              <div class="info-wrapper">
                <div class="name">名称：</div>
                <div class="content">{{ item.name }}</div>
              </div>
              <div class="info-wrapper">
                <div class="name">单价：</div>
                <div class="content">{{ item.price }}</div>
              </div>
              <div class="info-wrapper">
                <div class="name">数量：</div>
                <div class="content">
                  <el-input-number
                    v-model="item.count"
                    @change="handleChange(item.count, drinkIndex)"
                    :min="0"
                  ></el-input-number>
                </div>
              </div>
            </div>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="updateDrinks">确定修改</el-button>
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
      show: false,
      detailBook: {},
      totalPrice: 0,
      drinkList: [],
    };
  },
  mounted() {
    console.log(this.roomList);
    this.getList();
  },
  methods: {
    getList() {
      let username = JSON.parse(localStorage.getItem("token")).username;
      console.log(username);
      this.$http
        .getCheckOutList({
          checkOutUser: username,
        })
        .then((res) => {
          console.log(res);
          res = JSON.parse(res);
          // if (res.code == 0) {
          //   this.$message({
          //     showClose: true,
          //     message: res.msg,
          //     type: "error",
          //   });
          //   return;
          // }
          if (res.code != 0) {
            this.totalPrice = 0;
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].drinkings.length === 0) {
                res.data[i].drinkings = "无";
              } else {
                for (let j = 0; j < res.data[i].drinkings.length; j++) {
                  res.data[i].drinkings[
                    j
                  ] = `${res.data[i].drinkings[j].name} * ${res.data[i].drinkings[j].count}`;
                }
                res.data[i].drinkings = res.data[i].drinkings.join(" 、");
              }
              res.data[i].totalCost =
                res.data[i].actualCost + res.data[i].drinkingsCost;
              // console.log(res.data[i].drinkings, this.totalPrice,
              // res.data[i].totalCost
              // ,res.data[i].orderInfo.totalCost)
              this.totalPrice =
                this.totalPrice +
                res.data[i].totalCost -
                res.data[i].orderInfo.totalCost;
            }
            // 还需支付
            this.totalPrice = this.totalPrice * 100;
            this.roomList = res.data;
            this.detailBook = res.data[0];
            console.log(this.roomList);
          } else {
            this.roomList = [];
          }
        });
    },
    handleCancel(info) {
      console.log(info);
      this.$http
        .cancelCheckOut({
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
    handleUpdated(info) {
      console.log(info);
      this.detailBook = info;
      let drinks = info.roomInfo.drinkings;
      console.log(drinks);
      if (info.drinkings == "无") {
        this.$http
          .checkDrinkList({
            drinks: drinks,
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
            this.drinkList = res.data;
            console.log(this.drinkList);
            this.show = true;
          });
      } else {
        this.$http
          .updateDrinkList({
            orderId: info.orderId,
            drinks: drinks,
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
            this.drinkList = res.data;
            console.log(this.drinkList);
            this.show = true;
          });
      }
    },
    handleView(info) {
      console.log(info);
      this.detailBook = info;
      this.centerDialogVisible = true;
    },
    handleChange(value, index) {
      console.log(value, index);
      this.drinkList[index].count = value;
    },
    updateDrinks: tool.throttle(function () {
      console.log(this.drinkList);
      let drinkings = [],
        drinkingsCost = 0;
      for (let i = 0; i < this.drinkList.length; i++) {
        if (this.drinkList[i].count !== 0) {
          // 酒水消费情况
          drinkings.push({
            name: this.drinkList[i].name,
            count: this.drinkList[i].count,
          });
          // 酒水花费
          drinkingsCost =
            drinkingsCost + this.drinkList[i].price * this.drinkList[i].count;
        }
      }
      console.log(drinkings, drinkingsCost);
      this.$http
        .updateCheckInfo({
          orderId: this.detailBook.orderId,
          drinkings: drinkings,
          drinkingsCost: drinkingsCost,
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
          this.show = false;
        });
    }),
    onSubmit: tool.throttle(function () {
      console.log(this.roomList);
      let orderList = [];
      for (let i = 0; i < this.roomList.length; i++) {
        orderList.push({
          orderId: this.roomList[i].orderId,
          actualCost: this.roomList[i].actualCost,
          totalCost: this.roomList[i].totalCost,
        });
      }
      console.log(orderList);

      this.$http
        .checkedOut({
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
          this.getList();
          this.totalPrice = 0
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success",
          });
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

/deep/.van-popup {
  padding: 20px;
  width: 60%;
}

.btn-wrapper /deep/.el-form-item__content {
  display: flex;
  justify-content: center;
}

.btn-wrapper /deep/.el-button + .el-button {
  margin-left: 50px;
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

.kind-infos {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #8d8d8d;
  padding: 5px 0;
}

.info-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
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

.el-button--mini,
.el-button--mini.is-round {
  padding: 7px 5px;
}
</style>