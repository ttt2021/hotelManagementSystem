<template>
  <el-aside :style="`width: ${asideWidth}px; height: 100vh;`">
    <div class="hotel-logo" v-if="!asideStatus">
      <div class="hotel-title">
        暖
        <div class="like-logo">
          <img class="like" src="@/assets/like.png" />
        </div>
        居家酒店
      </div>
    </div>
    <div class="hotel-foldLogo" v-else>
      <div class="like-logo">
        <img class="like" src="@/assets/like.png" />
      </div>
    </div>
    <div class="menu">
      <el-menu
        :default-active="bMenuIndex"
        class="el-menu-vertical-demo"
        :collapse="asideStatus"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span slot="title">个人中心</span>
          </template>
          <el-menu-item index="2-1">修改资料</el-menu-item>
          <el-menu-item index="2-2">设置头像</el-menu-item>
          <!-- <router-link to="/home/updatePwd"> -->
            <el-menu-item index="2-3">
              <i class="el-icon-key"></i>
              <span slot="title">修改密码</span>
            </el-menu-item>
          <!-- </router-link> -->
        </el-submenu>
        <!-- <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item-group>
            <span slot="title">分组一</span>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <span slot="title">选项4</span>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu> -->
        <!-- <router-link >
        <el-menu-item index="1">
          <i class="el-icon-setting"></i>
          <span slot="title">首页</span>
        </el-menu-item>
      </router-link> -->
      </el-menu>
    </div>
  </el-aside>
</template>

<script>
import bus from "../utils/bus.js"; // 总线机制，非父子组件之间通信
export default {
  data() {
    return {
      asideWidth: 200,
      asideStatus: false,
      bMenuIndex: '2-3'
    };
  },
  mounted() {
    let router = this.$route.path;
    switch (router) {
    //   case "/updateInfo":
    //     this.menuIndex = "2-1";
    //     break;
    //   case "/setAvatar":
    //     this.menuIndex = "2-2";
    //     break;
      case "/home/updatePwd":
        this.bMenuIndex = '2-3';
        break;
      default:
        this.bMenuIndex = "2-3";
    }
    console.log(router)
    this.asideStatus = localStorage.getItem("asideStatus");
    console.log(this.asideStatus);
    if (this.asideStatus === null) {
      this.asideStatus = false;
    } else {
      this.asideStatus = this.asideStatus === "false" ? false : true;
    }
    if (this.asideStatus) {
      this.asideWidth = 65;
    } else {
      this.asideWidth = 200;
    }
    bus.$on("changeStatus", (data) => {
      this.asideStatus = data;
      if (this.asideStatus) {
        this.asideWidth = 65;
      } else {
        this.asideWidth = 200;
      }
    });
  },
};
</script>

<style lang="less" scoped>
.display() {
  display: flex;
  align-items: center;
}

.hotel-logo {
  .display();
}

.el-aside {
  overflow: hidden;
}

.menu {
  background: #4682b4;
  height: calc(100vh - 50px);
}

.hotel-title {
  width: 200px;
  height: 50px;
  .display();
  font-family: "楷体";
  font-size: 18px;
  font-weight: bold;
  color: #ff0592;
  justify-content: center;
  background: #f5f5dc;
}

.hotel-foldLogo {
  width: 65px;
  height: 50px;
  background: #f5f5dc;
  .display();
  justify-content: center;
}

.like {
  width: 30px;
  height: 30px;
}

.el-menu-item {
  background: #fff;
}

/deep/.el-menu {
  background-color: #4682b4;
  opacity: .9;
}

/deep/.el-submenu__title {
  color: #ffffff;
}

/deep/.el-submenu__title i {
  color: #ffffff;
  opacity: .9;
}

/deep/.el-submenu__icon-arrow {
  color: #ffffff;
}

// /deep/.el-submenu__title {
//   border-bottom: 1px solid #ffffff;
// }

/deep/.el-submenu__title:focus, /deep/.el-submenu__title:hover {
  background-color: #ffffff;
  color: #4682b4;
}

/deep/.el-submenu__title:focus /deep/.el-submenu__icon-arrow, 
/deep/.el-submenu__title:hover /deep/.el-submenu__icon-arrow {
  color: #4682b4;
}

/deep/.el-submenu__title:focus i, 
/deep/.el-submenu__title:hover i {
  color: #4682b4;
}
</style>