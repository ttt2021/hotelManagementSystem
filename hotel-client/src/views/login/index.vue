<template>
  <div class="wrapper">
    <div class="slanty-top">
      <img class="bg-img" src="@/assets/top.jpg" />
      <div class="welcome">
      <div class="hotel-title">暖
        <div class="like-logo">
          <img class="like" src="@/assets/like.png" />
        </div>居家酒店
      </div>
      <div class="come">欢迎您</div>
    </div>
    </div>
    <!-- <div class="like-logo">
      <img class="like" src="@/assets/like.png" />
    </div> -->
    <!-- <div class="welcome">
      <div class="hotel-title">暖心居家酒店</div>
      <div class="come">欢迎您</div>
    </div> -->
    <div class="slanty-right">
      <div class="slanty-down">
        <div class="block">
          <div class="login-wrapper">
            <van-cell-group class="login-box">
              <van-field
                v-model="workNum"
                label="工号"
                left-icon="user-circle-o"
                placeholder="请输入工号"
                type="text"
                :rules="[{ required: true, message: '请输入工号' }]"
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
              <van-button
                type="default"
                size="small"
                @click="forgetPassowrd"
                v-if="!isForget"
                >返回登录</van-button
              >
              <van-button
                type="primary"
                size="small"
                :class="[!isForget ? 'btn-login' : 'forget-btn']"
                @click="isForget ? handleLogin() : modifyPwd()"
                >{{ isForget ? "登录" : "立即修改" }}</van-button
              >
            </van-row>

            <div class="remember-wrapper" v-if="isForget">
              <van-checkbox v-model="checked" shape="square"
                >记住我</van-checkbox
              >
              <span class="forget-pwd" @click="forgetPassowrd">忘记密码</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imgVerify from "../../components/imgVerify.vue";
import crypto from "crypto";
export default {
  components: {
    imgVerify,
  },
  data() {
    return {
      workNum: "",
      pwd: "",
      rePwd: "",
      isForget: true, // 是否忘记
      verifyRef: null,
      verify: "", // 验证码
      // radio: "1",
      checked: false, // 记住我
    };
  },
  mounted() {
    // 进入页面时判断是否"记住我"这个用户，如果有，就填充表单
    let RememberUser = localStorage.getItem("RememberUser");
    // console.log(RememberUser)
    if (RememberUser !== null) {
      let userinfo = JSON.parse(RememberUser);
      console.log(userinfo);
      //根据给定的算法和密钥，创建并返回解密对象
      let decipher = crypto.createDecipher("aes192", "hotelAdmin");
      let tmpPass = decipher.update(userinfo.password, "hex", "utf8");
      tmpPass += decipher.final("utf8"); // 密码
      // console.log(tmpPass)

      this.workNum = userinfo.workNum;
      this.pwd = tmpPass;
    }
  },
  methods: {
    modifyPwd() {
      // 校验
      if (
        this.workNum.trim() === "" ||
        this.pwd.trim() === "" ||
        this.verify.trim() === "" ||
        this.rePwd.trim() === ""
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
      if (this.rePwd !== this.pwd) {
        this.$toast.fail("两次输入密码不一致！");
        return;
      }
      this.showLoginTip("修改中..."); // 修改加载
      this.modify();
    },
    modify() {
      this.$http
        .modifyPwd({
          workNum: this.workNum,
          password: this.pwd,
        })
        .then((res) => {
          console.log(res);
          this.$toast.clear(); // 修改加载消失
          res = JSON.parse(res);
          if (res.code == 1) {
            // 转到登录状态
            this.isForget = !this.isForget;
            // 清空信息，更新验证码
            this.workNum = "";
            this.pwd = "";
            this.rePwd = "";
            this.verify = "";
            this.$refs.verifyRef.handleDraw();
            this.$toast.success("修改成功，请登录");
          }
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: "网络请求失败",
            type: "error",
          });
        });
    },
    forgetPassowrd() {
      this.isForget = !this.isForget;
      // console.log(this.$refs.verifyRef.identifyCode) // 获取验证码图片上字符串
      this.$refs.verifyRef.handleDraw(); // 父组件调用子组件方法
    },
    login() {
      this.$http
        .login({
          workNum: this.workNum,
          password: this.pwd,
        })
        .then((res) => {
          console.log(res);
          // 将字符串对象转成对象
          res = JSON.parse(res);

          // 账号不存在情况下
          if (res.code === 0) {
            this.$toast.fail(res.msg);
            this.pwd = "";
            this.workNum = "";
            this.verify = "";
            this.$refs.verifyRef.handleDraw();
          }

          // 账号密码均匹配
          if (this.checked) {
            // 如果选择了remember，将账号密码存入本地存储中
            //根据给定的算法和密钥，创建并返回加密对象
            let obj = crypto.createCipher("aes192", "hotelAdmin"); //第二个参数为密钥，所有密钥都要相同
            //输入数据为utf8格式，输出格式为hex
            let aesPassword = obj.update(this.pwd, "utf8", "hex");
            //返回所有加密过的内容
            aesPassword += obj.final("hex");
            // console.log(aesPassword)
            let workNum = res.data.workNum;
            let password = aesPassword;
            let user = {
              workNum: workNum,
              password: password,
            };
            // console.log(user)
            // 保存到本地
            localStorage.setItem("RememberUser", JSON.stringify(user));
          }
          this.$toast.clear(); // 登录加载消失
          // 临时存储在本地，关闭系统时移除
          localStorage.setItem("token", JSON.stringify(res.data));
          // 获取路由携带的参数，若无则跳到首页
          let redirect = decodeURIComponent(this.$route.query.redirect || '/home')
          // 路由跳转
          this.$router.push(redirect);
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: "网络请求失败",
            type: "error",
          });
        });
    },
    handleLogin() {
      // 校验
      if (
        this.workNum.trim() === "" ||
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
        this.login();
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
  height: 60vh;
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

// .like {
//   position: absolute;
//   width: 55px;
//   height: 55px;
//   z-index: 1;
//   margin-top: -300px;
//   margin-left: 508px;
// }

.welcome {
  position: absolute;
  z-index: 10;
  height: 30vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hotel-title {
  display: flex;
  align-items: center;
  font-family: '楷体';
  font-size: 48px;
  color: #ff0592;
}

.come {
  margin-left: 10px;
  font-size: 28px;
  font-family: '楷体';
  color: #ee00ee;
  margin-top: 15px;
}

.slanty-right {
  -webkit-transform: skew(0, 10deg);
  -ms-transform: skew(0, 10deg);
  transform: skew(0, 10deg);
  background: linear-gradient(
    to bottom right,
    rgba(0, 178, 238, 0.5),
    rgba(125, 206, 255, 0.5)
  );
  z-index: -999;
  height: 100vh;
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
  width: 100%;
  position: absolute;
  margin-top: -134px;
  // -webkit-transform: skew(0, 10deg);
  // -ms-transform: skew(0, 10deg);
  // transform: skew(0, 10deg);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // padding-top: 22vh;
  overflow: auto;
  background: rgba(0, 178, 238, 0.5);
  padding: 20px 0;
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

.radio-left {
  margin-right: 60px;
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

/deep/.van-radio-group {
  background: linear-gradient(
    to bottom right,
    rgba(250, 250, 210, 0.5),
    rgba(255, 255, 224, 0.5)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
}

/deep/.van-radio__label {
  margin-left: 3px;
}

/deep/.van-radio {
  font-size: 12px;
}

/deep/.van-radio-group .van-icon-success {
  font-size: 12px;
  margin-top: 3px;
}
</style>