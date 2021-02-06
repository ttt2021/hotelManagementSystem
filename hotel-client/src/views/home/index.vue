<template>
  <div class="home">
    <el-container>
      <Aside></Aside>
      <el-container>
          <Header :userinfo.sync="userinfo"></Header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "../../components/header.vue";
import Aside from "../../components/aside.vue";
export default {
  components: {
    Header,
    Aside
  },
  data() {
    return {
      userinfo: {}, // 用户信息
      auth: null, // 权限
    };
  },
  mounted() {
    // 进入页面时 获取用户权限级别
    let token = localStorage.getItem("token");
    if (token !== null) {
      let userinfo = JSON.parse(token);
      this.auth = userinfo.auth;
      // userinfo.avatar = userinfo.avatar === '' ? '../assets/top.jpg' : userinfo.avatar
      this.userinfo = userinfo;
    }
    console.log(this.userinfo);
  },
};
</script>

<style lang="less" scoped>
.el-container {
  width: 100%;
  height: 100vh;
}
</style>