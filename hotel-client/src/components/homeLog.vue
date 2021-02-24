<template>
  <div class="log-wrapper">
    <div class="title-wrapper">
      <div class="title">日志记录</div>
      <div class="more" @click="goDetail" v-if="auth == 1">更多</div>
    </div>
    <div class="log-content">
      <div class="content-wrapper" v-for="(item, logIdx) in logList">
        <div class="content">{{ logIdx + 1 }}. {{ item.text }}</div>
        <div class="time">{{ item.logTime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "../utils/bus.js"; // 总线机制，非父子组件之间通信
export default {
  data() {
    return {
      auth: null,
      logList: [],
    };
  },
  mounted() {
    bus.$on("auth", (data) => {
      this.auth = data;
    });
    this.getList();
  },
  methods: {
    getList() {
      this.$http.getHomeLogList().then((res) => {
        console.log(res);
        res = JSON.parse(res);
        this.logList = res.data;
        console.log(this.logList);
      });
    },
    goDetail() {
      this.$router.push('/logManagement')
    }
  },
};
</script>

<style lang="less" scoped>
.title-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border-bottom: 1px solid #c0c0c0;
  font-family: "楷体";
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #731cc5;
}

.more {
  font-size: 14px;
  font-weight: bold;
  color: #c51c1c;
  cursor: pointer;
}

.log-content {
  padding: 10px 15px 20px 15px;
}

.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 25px;
  font-size: 14px;
}
</style>