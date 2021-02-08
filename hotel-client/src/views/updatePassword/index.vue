<template>
  <div class="wrapper">
    <div class="title-wrapper">
      <i class="el-icon-edit-outline"></i>
      <div class="title">修改密码</div>
    </div>
    <div class="password-wrapper">
      <van-field v-model="oldPwd" type="password" label="原密码" />
      <van-field v-model="newPwd" type="password" label="新密码" />
      <van-field v-model="reNewPwd" type="password" label="确认密码" />
    </div>
    <div class="updateBtn">
      <van-button type="info" @click="updatePwd">确定修改</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldPwd: "",
      newPwd: "",
      reNewPwd: "",
    };
  },
  methods: {
    updatePwd() {
      if (this.oldPwd.trim() === '' || this.newPwd.trim() === '' || this.reNewPwd.trim() === '') {
        this.$message({
          showClose: true,
          message: "输入不能为空",
          type: "error",
        });
        return
      }
      if (this.newPwd.trim() !== this.reNewPwd.trim()) {
        this.newPwd = ''
        this.reNewPwd = ''
        this.$message({
          showClose: true,
          message: "新密码与确认密码不一致",
          type: "error",
        });
        return
      }
      let userId = JSON.parse(localStorage.getItem("token")).userId;
      this.$http
        .updatePassword({
          userId: userId,
          oldPassword: this.oldPwd,
          newPassword: this.newPwd,
        })
        .then((res) => {
          console.log(res);
          res = JSON.parse(res);
          if (res.code == 0) {
            this.oldPwd = ''
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error",
            });
            return
          }
          this.newPwd = ''
          this.oldPwd = ''
          this.reNewPwd = ''
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
.title-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 16px;
  font-family: "楷体";
  font-weight: bold;
  color: #8d8d8d;
}

.title {
  margin-left: 5px;
}

.password-wrapper {
  background-color: #fff;
  padding-top: 10px;
}

/deep/.van-field__label {
  font-weight: bold;
  width: 4.8em;
}

/deep/.van-field__control {
  border: 1px solid #ddd;
}

/deep/.van-cell {
  align-items: center;
}

/deep/.van-field__control {
  padding: 5px;
}

.updateBtn {
  padding: 20px 0;
  text-align: center;
  background-color: #fff;
}
</style>