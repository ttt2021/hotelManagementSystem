<template>
  <div class="myComment-wrapper" v-if="listData.length !== 0">
    <el-card class="box-card" v-for="(item, idx) in listData">
      <div class="articleInfo-wrapper info" @click="handleClick(item)">
        <div class="title">{{item.theme}}</div>
        <div class="time">{{item.time}}</div>
      </div>
      <div class="comment-content info" @click="handleClick(item)">评论内容：<div class="content" v-html="item.content"></div></div> 
    </el-card>
    </div>
  </div>
  <div class="no-wrapper"  v-else>
    <i class="iconfont icon-caise-kuqi"></i>亲，你还没有评论过喲！！！</div>
</template>

<script>
export default {
  data() {
    return {
      listData: [],
    };
  },
  mounted() {
    let auth = JSON.parse(localStorage.getItem("token")).auth;
    console.log(auth);

    if (auth == 1 || auth == 4 || auth == 7) {
      this.getAdminList()
    } else {
    this.getList();
    }
  },
  methods: {
    getList() {
      let username = JSON.parse(localStorage.getItem("token")).username;
      this.$http
        .getMyComments({
          name: username,
        })
        .then((res) => {
          console.log(res);
          res = JSON.parse(res);
          this.listData = res.data;
        });
    },
    getAdminList() {
      let username = JSON.parse(localStorage.getItem("token")).username;
      this.$http
        .getMyCommentsList({
          name: username,
        })
        .then((res) => {
          console.log(res);
          res = JSON.parse(res);
          this.listData = res.data;
        });
    },
    handleClick(info) {
      console.log(info)
      this.$http
        .updateView({
          articleId: info.articleId,
          viewCount: Number(info.viewCount) + 1,
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
          this.$router.push({
            path: "/articleDetail",
            query: {
              articleId: info.articleId,
            },
          });
        });
    }
  },
};
</script>

<style>
.myComment-wrapper {
  height: 680px;
}

.articleInfo-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-family: "楷体";
  font-weight: bold;
}

.info {
  height: 30px;
  line-height: 30px;
}

.comment-content {
  font-size: 16px;
  font-family: "楷体";
  color: #aaa;
  display: flex;
  align-items: center;
}

.box-card {
  width: 100%;
  margin-bottom: 20px;
}

.time {
  color: #aaa;
}

.no-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 660px;
  line-height: 660px;
  color: #aaa;
}

.icon-caise-kuqi {
  color: blueviolet;
  font-size: 40px;
  margin-right: 5px;
}
</style>