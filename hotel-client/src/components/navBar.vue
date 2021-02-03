<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item to="/home" icon="home-o">预订</van-tabbar-item>
      <van-tabbar-item to="/catering" icon="shop-o">餐饮</van-tabbar-item>
      <van-tabbar-item to="/mine" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
    <router-view />
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
};
</script>

<style lang="less">
</style>
