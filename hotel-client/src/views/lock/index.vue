<template>
  <div class="lock">
    <van-button type="default"></van-button>
    <div class="lock-wrapper" @click="showPopup">
      <div class="lock-message" v-if="!show">
        <i class="el-icon-lock"></i>
        <div class="tip">锁定系统中~~~</div>
      </div>
    </div>
    <van-popup v-model="show">
      <div class="wrapper">
        <div class="block">
          <div class="cancel">
            <van-icon name="cross" @click="cancelLogin" />
          </div>
          <div class="user-avatar">
            <img :src="userinfo.avatar" alt="" v-if="userinfo.avatar" />
            <img :src="avatar" v-else />
          </div>
          <div class="input-password">
            <i class="el-icon-lock"></i>
            <el-input v-model="password" placeholder="请输入密码"></el-input>
          </div>
          <el-row>
            <el-button type="primary" @click="unlock">解锁</el-button>
          </el-row>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      password: "",
      avatar: require("../../assets/top.jpg"),
      userinfo: {},
    };
  },
  mounted() {
    let token = localStorage.getItem("token");
    console.log(token);
    if (token !== null) {
      let userinfo = JSON.parse(token);
      this.$http
        .getAvatar({
          userId: userinfo.userId,
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
          this.avatar = res.data.avatar;
        });
      this.userinfo = userinfo;
    }
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    cancelLogin() {
      this.show = false;
    },
    unlock() {
      this.$http
        .unlock({
          userId: this.userinfo.userId,
          password: this.password,
        })
        .then((res) => {
          console.log(res);
          res = JSON.parse(res);
          this.password = "";
          if (res.code == 0) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error",
            });
          } else {
            localStorage.setItem("lock", false); //改变系统锁定状态
            let redirect = decodeURIComponent(
              this.$route.query.redirect || "/home"
            );
            // 路由跳转
            this.$router.push(redirect);
          }
        });
    },
  },
};
</script>

<style  lang="less" scoped>
.display() {
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper {
  .display();
  height: 100%;
}

.block {
  padding: 20px;
  width: 300px;
  height: 200px;
  background-color: #fff;
  cursor: pointer;
}

.van-button {
  height: 100vh;
  width: 100%;
  background-image: url("../../assets/top.jpg");
  background-size: cover;
  -webkit-filter: blur(2px);
  filter: blur(2px);
  position: relative;
}

.lock-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .display();
  text-align: center;
  color: #fff;
  cursor: pointer;
}

.lock-wrapper /deep/.el-icon-lock {
  font-size: 80px;
}

.tip {
  margin-top: 10px;
  font-size: 24px;
  font-weight: bold;
  font-family: "楷体";
}

.user-avatar {
  .display();
}

.user-avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.cancel {
  position: relative;
  margin-bottom: 20px;
}

.van-icon-cross {
  position: absolute;
  right: 0;
  cursor: pointer;
}

.input-password {
  .display();
  margin: 15px 0 25px 0;
}

.input-password /deep/.el-icon-lock {
  font-size: 25px;
  margin-right: 10px;
}

/deep/.el-button {
  width: 100%;
}
</style>