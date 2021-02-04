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
              v-model="username"
              clearable
              label="用户名"
              left-icon="phone-circle-o"
              placeholder="请输入用户名"
              type="username"
              :rules="[{ required: true, message: '请输入用户名' }]"
            />
            <van-field
              v-model="pwd"
              clearable
              label="密码"
              left-icon="music-o"
              placeholder="请输入密码"
              type="password"
              :rules="[{ required: true, message: '请输入密码' }]"
            />
            <van-field
              v-model="rePwd"
              v-show="!isForget"
              clearable
              label="重复密码"
              left-icon="smile-o"
              placeholder="请再次输入密码"
              type="password"
              :rules="[{ required: true, message: '请再次输入密码' }]"
            />
            <van-field
              class="label-verify"
              v-model="verify"
              left-icon="passed"
              label="验证码"
              placeholder="输验证码"
            >
              <template #button>
                <img-verify ref="verifyRef"></img-verify>
              </template>
            </van-field>
          </van-cell-group>

          <van-row>
            <van-button type="default" size="small" @click="forgetPassowrd" v-if="!isForget">返回登录</van-button>
            <van-button
              type="primary"
              size="small"
              :class="[!isForget ? 'btn-login' : 'forget-btn']"
              @click="handleLogin"
              >{{ isForget ? "登录" : "修改并登录" }}</van-button
            >
          </van-row>

          <div class="remember-wrapper">
            <van-checkbox v-model="checked" shape="square">记住我</van-checkbox>
            <span class="forget-pwd" @click="forgetPassowrd">忘记密码</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imgVerify from "../../components/imgVerify.vue";
export default {
  components: {
    imgVerify,
  },
  data() {
    return {
      username: "",
      pwd: "",
      rePwd: "", 
      isForget: true, // 是否忘记
      verifyRef: null, 
      verify: "", // 验证码
      checked: false // 记住我
    };
  },
  mounted() {
    // 进入页面时判断是否"记住我"这个用户，如果有，就填充表单
    let RememberUser = localStorage.getItem('RememberUser');
    
  },
  methods: {
    forgetPassowrd() {
      this.isForget = !this.isForget;
      // console.log(this.$refs.verifyRef.identifyCode) // 获取验证码图片上字符串
      this.$refs.verifyRef.handleDraw(); // 父组件调用子组件方法
    },
    handleLogin() {
      // 校验
      if (
        this.username.trim() === "" ||
        this.pwd.trim() === "" ||
        this.verify.trim() === ""
      ) {
        this.$toast.fail("用户名或密码或验证码不能为空");
        return;
      }
      if (
        this.verify.toLowerCase() !==
        this.$refs.verifyRef.identifyCode.toLowerCase()
      ) {
        this.$toast.fail("验证码输入有误");
        return;
      }

      if (this.isForget) {
        // 登录
        this.showLoginTip("登录中..."); // 登录加载
        // 发起接口请求
      } else {
        // 忘记密码
        if (this.rePwd !== this.pwd) {
          this.$toast.fail("两次输入密码不一致！");
          return;
        }
        this.showLoginTip("修改登录中...");
      }
    },
    showLoginTip() {
      this.$toast.loading({
        message: status,
        forbidClick: true, // 禁止点击
        loadingType: "spinner",
        duration: 0,
      });
    },
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
  padding-top: 22vh;
  overflow: auto;
}

.login-box {
  width: 300px;
  margin-bottom: 20px;
}

.van-cell {
  background: linear-gradient(
    to bottom right,
    rgba(250, 250, 210, 0.5),
    rgba(255, 255, 224, 0.5)
  );
}

.btn-login {
  margin-left: 20px;
  background: linear-gradient(
    to bottom right,
    rgba(0, 178, 238, 0.5),
    rgba(125, 206, 255, 0.5)
  );
}

.forget-btn {
  background: linear-gradient(
    to bottom right,
    rgba(0, 178, 238, 0.5),
    rgba(125, 206, 255, 0.5)
  );
  width: 100%;
}

.remember-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
  width: 240px;
}

.forget-pwd {
  font-size: 12px;
  color: #0000ff;
}

/deep/.van-row {
  width: 300px;
  text-align: center;
}

/deep/.van-field__label {
  width: 4em;
}

.label-verify /deep/.van-field__label {
  line-height: 48px;
}

.label-verify /deep/.van-field__left-icon .van-icon,
.van-field__right-icon .van-icon {
  margin-top: 12px;
}

/deep/.van-field__control {
  font-size: 12px;
}

/deep/.van-checkbox__icon {
  font-size: 12px;
}

/deep/.van-checkbox__label {
  font-size: 12px;
}
</style>