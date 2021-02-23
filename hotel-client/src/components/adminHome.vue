<template>
  <div class="home-container">
    7532
  </div>
</template>

<script>
export default {
  props: ['auth'],
  data() {
    return {
      userinfo: {},
      auth: null
    }
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
  },
}
</script>

<style lang="less" scoped>

</style>