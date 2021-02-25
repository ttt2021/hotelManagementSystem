<template>
  <div class="article-wrapper" v-infinite-scroll="load" style="overflow:auto">
    <div class="title">{{title}}</div>
    <div class="infos">
      <div class="author">作者：{{addUser}}</div>
      <div class="time msg">发表时间：{{addTime}}</div>
      <div class="views">浏览次数：{{viewCount}}</div>
    </div>
    <div class="html-wrapper" v-html="content"></div>
    <div class="comment-wrapper">
      <div class="commtent-title"><i class="iconfont icon-pinglun"></i>我来说两句</div>
      <div class="comment-content">
        <comment :articleId="articleId"></comment>
      </div>
    </div>
  </div>
</template>

<script>
import comment from '@/components/comment.vue'
export default {
  data() {
    return {
      articleId: "",
      content: "",
      viewCount: 0,
      addUser: '',
      addTime: '',
      title: '',
      load: false
    };
  },
  components: {
    comment
  },
  mounted() {
    let articleId = this.$route.query.articleId;
    console.log(articleId);
    this.articleId = articleId;
    this.getList();
  },
  methods: {
    getList() {
      this.$http
        .getArticleInfo({
          articleId: this.articleId,
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
          this.content = res.data.content
          this.title = res.data.theme
          this.addTime = res.data.addTime
          this.addUser = res.data.addUser
          this.viewCount = res.data.viewCount
        });
    },
  },
};
</script>

<style lang="less">
.article-wrapper {
  height: 670px;
}

.title {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}

.infos {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9c9c9c;
}

.msg {
  margin: 0 15px;
}

.html-wrapper {
  padding: 10px 30px 0 30px;
}

.html-wrapper /deep/img {
  display: block;
  margin: 0 auto;
  width: 80% !important;
  height: 60% !important;
}

.html-wrapper /deep/p {
  text-indent: 2em;
  line-height: 30px;
  margin-bottom: 10px;
}

.comment-wrapper {
  margin: 30px 0;
  padding: 0 30px;
}

.commtent-title {
  font-size: 18px;
  font-family: '楷体';
  font-weight: bold;
}

.icon-pinglun {
  margin-right: 5px;
  color: #e91437;
}
</style>