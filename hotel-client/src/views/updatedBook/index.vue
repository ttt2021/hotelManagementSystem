<template>
  <div class="addRoom-wrapper">
    <div class="title">修改订单信息</div>
    <div class="content-wrapper">
      <el-form ref="form" label-width="80px">
        <div class="info">
          <el-form-item label="客房号">
            <el-input v-if="orderId === ''"></el-input>
            <el-input
              v-model="orderInfo.roomInfo.num"
              readonly
              v-else
            ></el-input>
          </el-form-item>
          <el-form-item label="客房名称">
            <el-input v-if="orderId === ''"></el-input>
            <el-input v-model="orderInfo.roomInfo.name" readonly v-else></el-input>
          </el-form-item>
        </div>
        <div class="info">
          <el-form-item label="房间类型">
            <el-input v-if="orderId === ''"></el-input>
            <el-input v-model="orderInfo.roomInfo.kind" readonly v-else></el-input>
          </el-form-item>
          <el-form-item label="单价">
            <el-input v-if="orderId === ''"></el-input>
            <el-input v-model="orderInfo.roomInfo.price" readonly v-else></el-input>
          </el-form-item>
        </div>
        <div class="info">
          <el-form-item label="入住人">
            <el-input v-model="orderInfo.order1Name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="orderInfo.order1Sex">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号">
            <el-input v-model="orderInfo.order1IdCard"></el-input>
          </el-form-item>
        </div>
        <div class="info">
          <el-form-item label="入住人">
            <el-input v-model="orderInfo.order2Name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="orderInfo.order2Sex">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号">
            <el-input v-model="orderInfo.order2IdCard"></el-input>
          </el-form-item>
        </div>
        <div class="info">
          <el-form-item label="入住人">
            <el-input v-model="orderInfo.order3Name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="orderInfo.order3Sex">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号">
            <el-input v-model="orderInfo.order3IdCard"></el-input>
          </el-form-item>
        </div>
        <div class="info">
          <el-form-item label="入住人">
            <el-input v-model="orderInfo.order4Name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="orderInfo.order4Sex">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号">
            <el-input v-model="orderInfo.order4IdCard"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="退房时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="orderInfo.expectedCheckout"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="orderInfo.remark"></el-input>
        </el-form-item>
        <el-form-item class="btn-wrapper">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import tool from "../../utils/tool";
export default {
  data() {
    return {
      orderInfo: {},
      orderId: "",
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      let orderId = this.$route.query.orderId || "";
      console.log(orderId);
      this.orderId = orderId;

      if (orderId !== "") {
        this.$http
          .getBookInfo({
            orderId: orderId,
          })
          .then((res) => {
            console.log(res);
            res = JSON.parse(res);
            if (res.code == 1) {
              this.orderInfo = res.data;
              console.log(this.orderInfo);
            }
          });
      }
    },
    onSubmit: tool.throttle(function () {
      if (
        (this.orderInfo.order1Name !== "" &&
          this.orderInfo.order1IdCard === "") ||
        (this.orderInfo.order1Name === "" &&
          this.orderInfo.order1IdCard !== "") ||
        (this.orderInfo.order2Name !== "" &&
          this.orderInfo.order2IdCard === "") ||
        (this.orderInfo.order2Name === "" &&
          this.orderInfo.order2IdCard !== "") ||
        (this.orderInfo.order3Name !== "" &&
          this.orderInfo.order3IdCard === "") ||
        (this.orderInfo.order3Name === "" &&
          this.orderInfo.order3IdCard !== "") ||
        (this.orderInfo.order4Name !== "" &&
          this.orderInfo.order4IdCard === "") ||
        (this.orderInfo.order4Name === "" &&
          this.orderInfo.order4IdCard !== "") ||
        this.orderInfo.expectedCheckout === ""
      ) {
        this.$message({
          showClose: true,
          message: "内容不能为空",
          type: "error",
        });
        return;
      }

      if (this.orderInfo.order1IdCard !== "") {
        if (
          !/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(this.orderInfo.order1IdCard)
        ) {
          this.$message({
            showClose: true,
            message: "身份证错误",
            type: "error",
          });
          return;
        }
      }

      if (this.orderInfo.order2IdCard !== "") {
        if (
          !/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(this.orderInfo.order2IdCard)
        ) {
          this.$message({
            showClose: true,
            message: "身份证错误",
            type: "error",
          });
          return;
        }
      }

      if (this.orderInfo.order3IdCard !== "") {
        if (
          !/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(this.orderInfo.order3IdCard)
        ) {
          this.$message({
            showClose: true,
            message: "身份证错误",
            type: "error",
          });
          return;
        }
      }

      if (this.orderInfo.order4IdCard !== "") {
        if (
          !/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(this.orderInfo.order4IdCard)
        ) {
          this.$message({
            showClose: true,
            message: "身份证错误",
            type: "error",
          });
          return;
        }
      }
      console.log(this.orderInfo);

      this.$http
        .updatedBookInfo({
          orderId: this.orderInfo.orderId,
          orderTime: this.orderInfo.orderTime,
          price: this.orderInfo.roomInfo.price,
          order1Name: this.orderInfo.order1Name,
          order1Sex: this.orderInfo.order1Sex,
          order1IdCard: this.orderInfo.order1IdCard,
          order2Name: this.orderInfo.order2Name,
          order2Sex: this.orderInfo.order2Sex,
          order2IdCard: this.orderInfo.order2IdCard,
          order3Name: this.orderInfo.order3Name,
          order3Sex: this.orderInfo.order3Sex,
          order3IdCard: this.orderInfo.order3IdCard,
          order4Name: this.orderInfo.order4Name,
          order4Sex: this.orderInfo.order4Sex,
          order4IdCard: this.orderInfo.order4IdCard,
          expectedCheckout: this.orderInfo.expectedCheckout,
          remark: this.orderInfo.remark,
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
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success",
          });
          this.$router.push("/settlement");
          this.orderInfo = {};
        });
    }),
    handleCancel() {
      this.getInfo();
    },
  },
};
</script>

<style lang="less" scoped>
.display() {
  display: flex;
  align-items: center;
}

.title {
  .display();
  justify-content: center;
  color: #8d8d8d;
  font-size: 24px;
  font-family: "楷体";
  font-weight: bold;
}

.content-wrapper {
  .display();
  justify-content: center;
  margin-top: 20px;
  width: 100%;
}

.btn-wrapper /deep/.el-form-item__content {
  text-align: center;
}

/deep/.el-button + .el-button {
  margin-left: 50px;
}

/deep/.el-form {
  width: 80%;
}

.info {
  .display();
}

/deep/.el-form-item {
  flex: 1;
}
</style>