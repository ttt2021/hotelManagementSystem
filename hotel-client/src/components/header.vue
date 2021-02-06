<template>
  <el-header>
    <el-radio-button>
      <van-icon name="bars" @click="changeAside" />
    </el-radio-button>
    <div class="user-wrapper">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userinfo.username }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="">锁定系统</el-dropdown-item>
          <el-dropdown-item command="">退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="user-avatar">
        <img :src="userinfo.avatar" alt="" v-if="userinfo.avatar" />
        <img :src="avatar" v-else />
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
    };
  },
  props: {
    userinfo: {
      type: Object,
      default: {},
    },
  },
  mounted() {
    // 挂载时获取导航栏状态信息
    this.asideStatus = localStorage.getItem("asideStatus");
    if (this.asideStatus === null) {
      this.asideStatus = false;
    } else {
      this.asideStatus = this.asideStatus === "false" ? false : true;
    }
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
  background: #F5F5DC;
  .display();
  justify-content: space-between;
  padding-left: 10px;
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