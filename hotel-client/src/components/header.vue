<template>
  <el-header>
    <el-radio-button>
      <van-icon name="bars" @click="changeAside" />
    </el-radio-button>
    <div class="user-wrapper">
      <el-dropdown trigger="click" @command="dropdownComm">
        <span class="el-dropdown-link">
          {{ userinfo.username }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="lock">锁定系统</el-dropdown-item>
          <el-dropdown-item command="logout">退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="user-avatar">
        <img :src="avatar" />
      </div>
    </div>
  </el-header>
</template>

<script>
import bus from "../utils/bus.js"; // 总线机制，非父子组件之间通信
export default {
  data() {
    return {
      avatar: require("../assets/top.jpg"),
      isCollapse: false, // 是否展开，默认展开
      userinfo: {},
    };
  },
  mounted() {
    let userinfo = JSON.parse(localStorage.getItem("token"));
    console.log(userinfo);
    this.userinfo = userinfo;
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
    // 挂载时获取导航栏状态信息
    this.asideStatus = localStorage.getItem("asideStatus");
    if (this.asideStatus === null) {
      this.asideStatus = false;
    } else {
      this.asideStatus = this.asideStatus === "false" ? false : true;
    }
    bus.$on("avatar", (data) => {
      this.avatar = data;
    });
  },
  methods: {
    changeAside() {
      this.asideStatus = !this.asideStatus;
      if (this.asideStatus) {
        bus.$emit("changeStatus", true);
        localStorage.setItem("asideStatus", true);
      } else {
        bus.$emit("changeStatus", false);
        localStorage.setItem("asideStatus", false);
      }
    },
    dropdownComm(command) {
      console.log(command);
      switch (command) {
        case "lock": //锁定系统
          localStorage.setItem("lock", true);
          // this.$message({
          //   showClose: true,
          //   message: "系统已被锁定",
          //   type: "success"
          // });
          this.$router.push({
            path: "/lock",
            query: {
              redirect: this.$route.fullPath, // 把要跳转的页面路径作为参数传到锁定页面
            },
          });
          break;
        case "logout": //退出系统
          this.$http.logout({}).then((res) => {
            console.log(res);
            res = JSON.parse(res);
            if (res.code == 0) {
              this.$message({
                showClose: true,
                message: res.msg,
                type: "error",
              });
            } else {
              this.$message({
                showClose: true,
                message: res.msg,
                type: "success",
              });
              localStorage.removeItem("token");
              this.$router.push({ path: "/login" });
            }
          });
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.display() {
  display: flex;
  align-items: center;
}

.el-header {
  width: 100%;
  height: 50px !important;
  background: #f5f5dc;
  .display();
  justify-content: space-between;
  padding-left: 10px;
  border-left: 1px solid #fff;
}

.user-wrapper {
  .display();
}

.el-dropdown-link {
  cursor: pointer;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.user-avatar {
  margin-left: 10px;
}

.user-avatar img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

/deep/.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  border: none;
  background: transparent;
  color: #606266;
}

/deep/.el-radio-button:first-child .el-radio-button__inner {
  border-radius: none;
}

/deep/.el-radio-button__inner {
  padding-left: 10px;
}
</style>