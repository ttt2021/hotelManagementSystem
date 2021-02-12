<template>
  <div class="updateInfo-wrapper">
    <div class="title-wrapper">
      <i class="el-icon-edit-outline"></i>
      <div class="title">用户信息修改</div>
    </div>
    <div class="update-wrapper">
      <van-field v-model="userinfo.workNum" label="员工号" readonly />
      <van-field v-model="userinfo.username" label="姓名" readonly />
      <van-field v-model="userinfo.sex" label="性别" readonly />
      <van-field v-model="userinfo.age" label="年龄" readonly />
      <van-field v-model="userinfo.brith" label="出生日期" readonly />
      <van-field v-model="userinfo.idCard" label="身份证号" readonly />
      <van-field v-model="userinfo.job" label="职务" readonly />
      <van-field v-model="userinfo.entryData" label="入职日期" readonly />
      <van-field v-model="userinfo.tel" label="电话号码" />
      <van-field v-model="userinfo.email" label="电子邮箱" />
      <van-field v-model="userinfo.address" label="家庭住址" />
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
      <van-button round block type="info" @click="updatedInfo"
        >修改信息</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userinfo: {},
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
      value: "",
    };
  },
  mounted() {
    let userinfo = JSON.parse(localStorage.getItem("token"));
    console.log(userinfo);
    this.userinfo = userinfo;
    this.value = userinfo.status;
  },
  methods: {
    updatedInfo() {
      console.log(this.userinfo, this.value);
      // 验证电子邮箱
      let emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      if (!emailReg.test(this.userinfo.email)) {
        this.$message({
          showClose: true,
          message: "邮箱错误",
          type: "error",
        });
        return;
      }
      // 验证手机号
      if (!/^1[3456789]\d{9}$/.test(this.userinfo.tel)) {
        this.$message({
          showClose: true,
          message: "手机号错误",
          type: "error",
        });
        return;
      }
      this.$http
        .userUpdateInfo({
          userId: this.userinfo.userId,
          username: this.userinfo.username,
          tel: this.userinfo.tel,
          email: this.userinfo.email,
          address: this.userinfo.address,
          status: this.value,
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
          this.userinfo.status = this.value
          localStorage.setItem('token', JSON.stringify(this.userinfo))
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success",
          });
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

.update-wrapper {
  margin-top: 20px;
  background: #f8f8f8;
  font-weight: bold;
}

/deep/.van-field__label {
  width: 4.8em;
  width: 40%;
  text-align: right;
}

/deep/.van-button {
  margin-top: 20px;
}

/deep/.el-input__inner {
  height: 24px;
  line-height: 24px;
}

/deep/.el-input__icon {
  height: 24px;
  line-height: 24px;
}

/deep/.van-field__control {
  font-weight: normal;
}
</style>