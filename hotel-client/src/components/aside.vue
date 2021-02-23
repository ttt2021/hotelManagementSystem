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
        :default-active="$route.path"
        router
        class="el-menu-vertical-demo"
        :collapse="asideStatus"
        @select="handleSelect"
      >
        <el-menu-item index="/home" class="firstMenu">
          <i class="el-icon-key"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2" v-if="auth == 5">
          <template slot="title">
            <i class="iconfont icon-guanli"></i>
            <span slot="title">开退房管理</span>
          </template>
          <el-menu-item index="/orderRoom">
            <i class="iconfont icon-dingfang"></i>
            <span slot="title">开房功能</span>
          </el-menu-item>
          <el-menu-item index="/bookRoom">
            <i class="iconfont icon-dd_active"></i>
            <span slot="title">生成订单</span>
          </el-menu-item>
          <el-menu-item index="/updatedBook">
            <i class="iconfont icon-updatedBook"></i>
            <span slot="title">修改订单</span>
          </el-menu-item>
          <el-menu-item index="/settlement">
            <i class="iconfont icon-jiezhang"></i>
            <span slot="title">订单结算</span>
          </el-menu-item>
          <el-menu-item index="/transferRoom">
            <i class="iconfont icon-tiaofang-"></i>
            <span slot="title">调房功能</span>
          </el-menu-item>
          <el-menu-item index="/checkOut">
            <i class="iconfont icon-tuifang"></i>
            <span slot="title">退房功能</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="/orderManagement" class="firstMenu" v-if="auth == 5">
          <i class="iconfont icon-guanli1"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>
        <el-submenu index="3" v-if="auth == 5">
          <template slot="title">
            <i class="iconfont icon-room"></i>
            <span slot="title">客房信息查询</span>
          </template>
          <el-menu-item index="/roomKind">
            <i class="iconfont icon-leixing"></i>
            <span slot="title">客房类型</span>
          </el-menu-item>
          <el-menu-item index="/viewRoom">
            <i class="iconfont icon-chaxun"></i>
            <span slot="title">查询客房</span>
          </el-menu-item>
          <el-menu-item index="/drinkRoom">
            <i class="iconfont icon-jiushuiyinliao"></i>
            <span slot="title">客房酒水</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="/staff" class="firstMenu" v-if="auth == 5">
          <i class="iconfont icon-user-cog"></i>
          <span slot="title">职员信息查询</span>
        </el-menu-item>
        <el-submenu index="4" v-if="auth == 4 || auth == 1">
          <template slot="title">
            <i class="iconfont icon-introduction"></i>
            <span slot="title">酒店介绍</span>
          </template>
          <el-menu-item index="/home/hotelInfo">
            <i class="iconfont icon-gaikuang"></i>
            <span slot="title">酒店概况</span>
          </el-menu-item>
          <el-menu-item index="/home/updateHotelInfo">
            <i class="el-icon-edit"></i>
            <span slot="title">修改酒店信息</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="/home/hotelInfo" class="firstMenu" v-if="auth == 2 || auth == 3 || auth > 4">
          <i class="iconfont icon-gaikuang"></i>
          <span slot="title">酒店概况</span>
        </el-menu-item>
        <el-submenu index="5" v-if="auth == 3 || auth == 1">
          <template slot="title">
            <i class="iconfont icon-peopleInfo"></i>
            <span slot="title">员工信息管理</span>
          </template>
          <el-menu-item index="/home/userInfo" v-if="auth == 3 || auth == 1">
            <i class="iconfont icon-user-cog"></i>
            <span slot="title">员工管理</span>
          </el-menu-item>
          <el-menu-item index="/home/position" v-if="auth == 1">
            <i class="iconfont icon-position"></i>
            <span slot="title">职位管理</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="6" v-if="auth == 2 || auth == 1">
          <template slot="title">
            <i class="iconfont icon-room"></i>
            <span slot="title">客房信息管理</span>
          </template>
          <el-menu-item index="/room/styleRoom">
            <i class="iconfont icon-leixing"></i>
            <span slot="title">客房类型</span>
          </el-menu-item>
          <el-menu-item index="/home/queryRoom">
            <i class="iconfont icon-chaxun"></i>
            <span slot="title">查询客房</span>
          </el-menu-item>
          <el-menu-item index="/home/addRoom">
            <i class="iconfont icon-tianjia"></i>
            <span slot="title">添加客房</span>
          </el-menu-item>
          <el-menu-item index="/home/drink">
            <i class="iconfont icon-jiushuiyinliao"></i>
            <span slot="title">客房酒水</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="/checkIn" class="firstMenu" v-if="auth == 2 || auth == 1 || auth == 6">
          <i class="iconfont icon-ruzhuguanli"></i>
          <span slot="title">入住信息管理</span>
        </el-menu-item>
        <el-menu-item index="/statistics" class="firstMenu" v-if="auth == 1 || auth == 6">
          <i class="iconfont icon-lishi"></i>
          <span slot="title">收入统计汇总</span>
        </el-menu-item>
        <el-menu-item index="/historicalOrder" class="firstMenu" v-if="auth == 2 || auth == 1 || auth == 6">
          <i class="iconfont icon-lishi"></i>
          <span slot="title">历史订单管理</span>
        </el-menu-item>
        <el-submenu index="8">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span slot="title">个人中心</span>
          </template>
          <el-menu-item index="/home/updateInfo" v-if="auth !== 1">
            <i class="el-icon-edit"></i>
            <span slot="title">修改资料</span>
          </el-menu-item>
          <el-menu-item index="/home/updateAvatar">
            <i class="el-icon-picture-outline"></i>
            <span slot="title">设置头像</span>
          </el-menu-item>
          <el-menu-item index="/home/updatePassword">
            <i class="el-icon-key"></i>
            <span slot="title">修改密码</span>
          </el-menu-item>
        </el-submenu>
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
      auth: -1,
    };
  },
  mounted() {
    this.auth = JSON.parse(localStorage.getItem("token")).auth;
    console.log(this.auth);
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
  methods: {
    // 导航栏选项事件
    handleSelect(key, keyPath) {
      this.$router.push(key);
    },
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

.el-menu {
  background-color: #4682b4;
  opacity: 0.9;
}

/deep/.el-submenu__title {
  color: #ffffff;
}

/deep/.el-submenu__title i {
  color: #ffffff;
  opacity: 0.9;
}

/deep/.el-submenu__title:focus,
/deep/.el-submenu__title:hover {
  background-color: #ffffff;
  color: #4682b4;
}

/deep/.el-submenu__title:focus i,
/deep/.el-submenu__title:hover i {
  color: #4682b4;
}

.firstMenu.el-menu-item {
  background: #4682b4;
  color: #fff;
}

.firstMenu.el-menu-item i {
  color: #fff;
}

.firstMenu.el-menu-item.is-active {
  background: #fff;
  color: #409eff;
}

.el-menu-item.is-active i {
  color: #409eff;
}

.iconfont {
  margin: 0 10px 0 5px;
  font-size: 18px;
}
</style>