<template>
  <div class="addRoom-wrapper">
    <div class="title">订单信息</div>
    <div class="content-wrapper">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="info">
          <el-form-item label="客房号">
            <el-input v-model="roomInfo.num" readonly></el-input>
          </el-form-item>
          <el-form-item label="客房名称">
            <el-input v-model="roomInfo.name" readonly></el-input>
          </el-form-item>
        </div>
        <div class="info">
          <el-form-item label="房间类型">
            <el-input v-model="roomInfo.kind" readonly></el-input>
          </el-form-item>
          <el-form-item label="单价">
            <el-input v-model="roomInfo.price" readonly></el-input>
          </el-form-item>
        </div>
        <div class="info">
          <el-form-item label="入住人">
            <el-input v-model="form.name1"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="form.sex1">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号">
            <el-input v-model="form.idCard1"></el-input>
          </el-form-item>
        </div>
        <div class="info">
          <el-form-item label="入住人">
            <el-input v-model="form.name2"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="form.sex2">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号">
            <el-input v-model="form.idCard2"></el-input>
          </el-form-item>
        </div>
        <div class="info">
          <el-form-item label="入住人">
            <el-input v-model="form.name3"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="form.sex3">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号">
            <el-input v-model="form.idCard3"></el-input>
          </el-form-item>
        </div>
        <div class="info">
          <el-form-item label="入住人">
            <el-input v-model="form.name4"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="form.sex4">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号">
            <el-input v-model="form.idCard4"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="退房时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.checkOutTime"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item class="btn-wrapper">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">生成订单</el-button>
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
      form: {
        name1: "",
        sex1: "",
        idCard1: "",
        name2: "",
        sex2: "",
        idCard2: "",
        name3: "",
        sex3: "",
        idCard3: "",
        name4: "",
        sex4: "",
        idCard4: "",
        checkOutTime: "",
        remark: "",
      },
      roomInfo: {},
    };
  },
  mounted() {
    let roomId = this.$route.query.roomId;
    console.log(roomId);
    this.$http
      .getRoomInfo({
        roomId: roomId,
      })
      .then((res) => {
        console.log(res);
        res = JSON.parse(res);
        if (res.code == 1) {
          this.roomInfo = res.data;
          console.log(this.roomInfo);
        }
      });
  },
  methods: {
    onSubmit: tool.throttle(function () {
      if (
        (this.form.name1 !== "" && this.form.idCard1 === "") ||
        (this.form.name1 === "" && this.form.idCard1 !== "") ||
        (this.form.name2 !== "" && this.form.idCard2 === "") ||
        (this.form.name2 === "" && this.form.idCard2 !== "") ||
        (this.form.name3 !== "" && this.form.idCard3 === "") ||
        (this.form.name3 === "" && this.form.idCard3 !== "") ||
        (this.form.name4 !== "" && this.form.idCard4 === "") ||
        (this.form.name4 === "" && this.form.idCard4 !== "") ||
        this.form.checkOutTime === ""
      ) {
        this.$message({
          showClose: true,
          message: "内容不能为空",
          type: "error",
        });
        return;
      }

      if (this.form.idCard1 !== "") {
        if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(this.form.idCard1)) {
          this.$message({
            showClose: true,
            message: "身份证错误",
            type: "error",
          });
          return;
        }
      }

      if (this.form.idCard2 !== "") {
        if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(this.form.idCard2)) {
          this.$message({
            showClose: true,
            message: "身份证错误",
            type: "error",
          });
          return;
        }
      }

      if (this.form.idCard3 !== "") {
        if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(this.form.idCard3)) {
          this.$message({
            showClose: true,
            message: "身份证错误",
            type: "error",
          });
          return;
        }
      }

      if (this.form.idCard4 !== "") {
        if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(this.form.idCard4)) {
          this.$message({
            showClose: true,
            message: "身份证错误",
            type: "error",
          });
          return;
        }
      }

      let username = JSON.parse(localStorage.getItem("token")).username;
      console.log(username);
      
      this.$http
        .bookRoomInfo({
          roomId: this.roomInfo.roomId,
          addUser: username,
          order1Name: this.form.name1,
          order1Sex: this.form.sex1,
          order1IdCard: this.form.idCard1,
          order2Name: this.form.name2,
          order2Sex: this.form.sex2,
          order2IdCard: this.form.idCard2,
          order3Name: this.form.name3,
          order3Sex: this.form.sex3,
          order3IdCard: this.form.idCard3,
          order4Name: this.form.name4,
          order4Sex: this.form.sex4,
          order4IdCard: this.form.idCard4,
          expectedCheckout: this.form.checkOutTime,
          price: this.roomInfo.price,
          remark: this.form.remark,
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
          this.handleCancel();
        });
    }),
    handleCancel() {
      this.form.name1 = "";
      this.form.sex1 = "";
      this.form.idCard1 = "";
      this.form.name2 = "";
      this.form.sex2 = "";
      this.form.idCard2 = "";
      this.form.name3 = "";
      this.form.sex3 = "";
      this.form.idCard3 = "";
      this.form.name4 = "";
      this.form.sex4 = "";
      this.form.idCard4 = "";
      this.form.checkOutTime = "";
      this.form.remark = "";
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