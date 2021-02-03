<template>
  <div class="wrapper">
    <div class="slanty-top">
      <img class="bg-img" src="@/assets/top.gif" />
    </div>
    <div class="like-logo">
      <img class="like" src="@/assets/like.png" />
    </div>
    <div class="welcome">
      <div class="hotel-title">暖心居家酒店</div>
      <div class="come">欢迎您</div>
    </div>
    <div class="slanty-down">
      <div class="block">
        <div class="login-wrapper">
          <van-cell-group class="login-box">
            <van-field
              v-model="tel"
              clearable
              label="手机号"
              left-icon="phone-circle-o"
              placeholder="请输入手机号"
              type="tel"
            />
            <van-field
              v-model="password"
              clearable
              label="密码"
              left-icon="music-o"
              placeholder="请输入密码"
              type="password"
            />
          </van-cell-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tel: "",
      password: "",
    };
  },
};
</script>

<style lang="less" scoped>
.slanty-top {
  height: 40vh;
  width: 100%;
  -webkit-transform: skew(0, 20deg);
  -ms-transform: skew(0, 10deg);
  transform: skew(0, 0deg);
  margin-bottom: -5em;
}

.bg-img {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -100;
}

.like {
  position: absolute;
  width: 55px;
  height: 55px;
  z-index: 1;
  margin-top: -30px;
  margin-left: 160px;
}

.welcome {
  position: absolute;
  z-index: 10;
}

.hotel-title {
  width: 2px;
  height: 16px;
  margin-left: 320px;
  font-size: 18px;
  color: #ff0592;
}

.come {
  width: 2px;
  height: 18px;
  margin-left: 290px;
  font-size: 16px;
  color: #ee00ee;
  margin-top: 15px;
}

.slanty-down {
  background: white;
  -webkit-transform: skew(0, -10deg);
  -ms-transform: skew(0, -10deg);
  transform: skew(0, -10deg);
  height: 100vh;
  z-index: -10;
}

.block {
  background: linear-gradient(
    to bottom right,
    rgba(0, 178, 238, 0.5),
    rgba(125, 206, 255, 0.5)
  );
  z-index: -1;
  height: 100vh;
}

.login-wrapper {
  -webkit-transform: skew(0, 10deg);
  -ms-transform: skew(0, 10deg);
  transform: skew(0, 10deg);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 25vh;
  overflow: auto;
}

.login-box {
  width: 280px;
  margin-bottom: 20px;
}

//     .van-cell {
//         background: linear-gradient(to bottom right,
//                 rgba(0, 40, 89, 0.5),
//                 rgba(35, 109, 134, 0.5));
//     }

//     .btn-login {
//         margin-left: 20px;
//         background: linear-gradient(to bottom right,
//                 rgba(0, 40, 89, 0.5),
//                 rgba(35, 109, 134, 0.5));
//     }
// }

// .thirdLogin {
//     z-index: 999;
//     margin-top: 20px;
// }

// .name {
//     float: right;
//     margin-top: 10px;
// }
</style>