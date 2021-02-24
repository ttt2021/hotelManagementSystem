<template>
  <div class="home-container">
    <topData></topData>
    <div class="log-conatiner">
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content bg-purple" v-if="auth == 1 || auth == 6">
            <sevenDays></sevenDays>
          </div>
          <div class="grid-content bg-purple" v-if="auth == 2">
            <latestOrder></latestOrder>
          </div>
          <div class="grid-content bg-purple" v-if="auth == 3">
            <latestUser></latestUser>
          </div>
          <div class="grid-content bg-purple" v-if="auth == 4">
            <hotelImg></hotelImg>
          </div>
          <div class="grid-content bg-purple" v-if="auth == 5">
            <restRoom></restRoom>
          </div>
        </el-col>
         <el-col :span="8">
          <div class="grid-content bg-purple">
            <homeLog></homeLog>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import topData from "@/components/topData";
import homeLog from "@/components/homeLog";
import sevenDays from "@/components/sevenDays";
import restRoom from "@/components/homeRestRoom";
import latestOrder from "@/components/latestOrder";
import latestUser from "@/components/latestUser";
import hotelImg from "@/components/hotelImg";
import bus from "../utils/bus.js"; // 总线机制，非父子组件之间通信
export default {
  components: {
    topData,
    homeLog,
    sevenDays,
    restRoom,
    latestOrder,
    latestUser,
    hotelImg
  },
  data() {
    return {
      userinfo: {},
      auth: null,
    };
  },
  mounted() {
    // 进入页面时 获取用户权限级别
    let token = localStorage.getItem("token");
    if (token !== null) {
      let userinfo = JSON.parse(token);
      this.auth = userinfo.auth;
      this.userinfo = userinfo;
    }
    console.log(this.userinfo);
    bus.$emit("auth", this.auth);
  },
};
</script>

<style lang="less" scoped>
.log-conatiner {
  margin-top: 30px;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple {
  background: #fff;
}

.grid-content {
  border-radius: 4px;
  // min-height: 36px;
}
</style>