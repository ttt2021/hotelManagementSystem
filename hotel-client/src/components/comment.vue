<template>
  <div class="comment-wrap">
    <textarea
      class="comment-input"
      placeholder="请输入内容"
      id="textpanel"
      v-model="content"
    ></textarea>
    <div class="opration">
      <div class="emoji-panel-btn" @click="showEmojiPanel">
        <img src="../assets/face_logo.png" />
      </div>
      <div
        @click="saveComment"
        class="comment-send-btn comment-send-btn-bounce"
      >
        发表评论
      </div>
      <emoji-panel
        @emojiClick="appendEmoji"
        v-if="isShowEmojiPanel"
      ></emoji-panel>
    </div>
    <div class="comments-list">
      <div class="comments-list-item" v-for="(item, idx) in comments">
        <div class="username-wrapper">
          <div class="comments-list-item-heading">
            <img src="../assets/heading.jpg" />
            <span class="comments-list-item-username">{{ item.name }}</span>
          </div>
          <div class="time-wrapper">
            <div class="time">{{ item.time }}</div>
            <div class="operation" @click="handleDel(item)">删除</div>
            <div class="resever" @click="handleResponse(item)">回复</div>
          </div>
        </div>
        <div class="comments-list-item-content" v-html="item.content"></div>
        <div class="response-list-item" v-for="(item, idx) in responses[idx]">
          <div class="username-wrapper">
            <div class="comments-list-item-heading">
              <img src="../assets/admin.jpg" />
              <span class="comments-list-item-username">{{ item.name }}</span>
            </div>
            <div class="time-wrapper">
              <div class="time">{{ item.time }}</div>
              <div class="operation" @click="handleDeleted(item)">删除</div>
            </div>
          </div>
          <div class="comments-list-item-content" v-html="item.content"></div>
        </div>
      </div>
    </div>
    <el-dialog title="回复" :visible.sync="dialogVisible" width="60%">
      <span>
        <textarea
          class="comment-input"
          placeholder="请输入回复内容"
          id="showpanel"
          v-model="resContent"
        ></textarea>
        <div class="opration">
          <div class="emoji-panel-btn" @click="showResEmojiPanel">
            <img src="../assets/face_logo.png" />
          </div>
          <div class="comment-btn">
            <el-button type="primary" @click="saveResponse">发表评论</el-button>
          </div>
          <emoji-panel
            @emojiClick="resAppendEmoji"
            v-if="isShowResEmojiPanel"
          ></emoji-panel>
        </div>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import EmojiPanel from "./emojiPanel.vue";
import tool from "../utils/tool";
export default {
  props: ["articleId"],
  data() {
    return {
      content: "",
      isShowEmojiPanel: false,
      comments: [],
      dialogVisible: false,
      resContent: "",
      isShowResEmojiPanel: false,
      commentInfo: {},
      responses: [],
    };
  },
  components: {
    EmojiPanel,
  },
  mounted() {
    this.$nextTick(function () {
      this.getList();
    });
  },
  methods: {
    getList() {
      console.log(this.articleId);
      this.$http
        .getCommentList({
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
          this.comments = res.data.result;
          this.responses = res.data.list;
          console.log(res.data);
        });
    },
    handleDel(info) {
      console.log(info.commentId);
      this.$http
        .delComment({
          commentId: info.commentId,
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
          this.getList();
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success",
          });
        });
    },
    handleDeleted(info) {
      console.log(info.responseId);
      this.$http
        .delResponse({
          responseId: info.responseId,
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
          this.getList();
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success",
          });
        });
    },
    handleResponse(info) {
      console.log(info);
      this.resContent = "";
      this.commentInfo = info;
      this.dialogVisible = true;
    },
    saveResponse: tool.throttle(function () {
      // 发表评论
      if (this.resContent == "") {
        this.$message({
          showClose: true,
          message: "回复不能为空",
          type: "error",
        });
        return;
      }
      let content = this.resContent.replace(/:.*?:/g, this.emoji); // 替换":"符号包含的字符串,通过emoji方法生成表情<span></span>
      let username = JSON.parse(localStorage.getItem("token")).username;
      console.log(
        content,
        username,
        this.articleId,
        this.commentInfo.commentId
      );
      this.$http
        .getResponse({
          content: content,
          name: username,
          articleId: this.articleId,
          commentId: this.commentInfo.commentId,
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
          this.getList();
          this.resContent = "";
          this.isShowResEmojiPanel = false;
          this.dialogVisible = false;
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success",
          });
        });
    }),
    saveComment: tool.throttle(function () {
      // 发表评论
      if (this.content == "") {
        this.$message({
          showClose: true,
          message: "评论不能为空",
          type: "error",
        });
        return;
      }
      let content = this.content.replace(/:.*?:/g, this.emoji); // 替换":"符号包含的字符串,通过emoji方法生成表情<span></span>
      let username = JSON.parse(localStorage.getItem("token")).username;
      console.log(content, username, this.articleId);
      this.$http
        .getComment({
          content: content,
          name: username,
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
          this.getList();
          this.content = "";
          this.isShowEmojiPanel = false;
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success",
          });
        });
    }),
    showEmojiPanel() {
      this.isShowEmojiPanel = !this.isShowEmojiPanel;
    },
    showResEmojiPanel() {
      this.isShowResEmojiPanel = !this.isShowResEmojiPanel;
    },
    emoji(word) {
      // 生成html
      const type = word.substring(1, word.length - 1);
      return `<span class="emoji-item-common emoji-${type} emoji-size-small" ></span>`;
    },
    appendEmoji(text) {
      const el = document.getElementById("textpanel");
      this.content = el.value + ":" + text + ":";
    },
    resAppendEmoji(text) {
      const el = document.getElementById("showpanel");
      this.resContent = el.value + ":" + text + ":";
    },
  },
};
</script>
<style  lang="less">
@import "../static/emoji.css"; // 导入精灵图样式

.comment-wrap {
  margin: 20px auto 180px auto;
  width: 90%;
}

.comment-input {
  height: 100px;
  width: 100%;
  border: 1px solid #cccccc;
  border-radius: 5px;
  padding: 10px;
  resize: none;
}

.comment-input:focus {
  outline: none;
}

.emoji-size-small {
  // 表情大小
  zoom: 0.3;
}

.el-dialog {
  padding-right: 20px;
}

.emoji-item-common:hover {
  cursor: pointer;
}

.emoji-item-common {
  background: url("../assets/emoji_sprite.png");
  display: inline-block;
}

.username-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.emoji-size-large {
  zoom: 0.5; // emojipanel表情大小
  margin: 4px;
}
.comments-list {
  margin-top: 20px;
}
.comments-list-item {
  margin-bottom: 20px;
}

.response-list-item {
  margin-bottom: 20px;
  margin-left: 30px;
}

.comments-list-item-heading,
.time-wrapper {
  display: flex;
  align-items: center;
}

.time {
  color: #8c8c8c;
  margin-right: 10px;
}

.operation {
  color: red;
  cursor: pointer;
}

.resever {
  color: #1da1f2;
  cursor: pointer;
  margin-left: 10px;
}

.comments-list-item-heading img {
  height: 32px;
  width: 32px;
  border-radius: 50%;
  vertical-align: middle;
}

.comments-list-item-username {
  margin-left: 5px;
  font-weight: bold;
}

.comments-list-item-content {
  margin: 10px 0px 10px 30px;
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc !important;
}

.comments-list-item-content:last-child {
  border-bottom: 0;
}

span {
  vertical-align: top;
}

.opration {
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  position: relative;
  .emoji-panel-btn:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  img {
    height: 24px;
    width: 24px;
  }
  .comment-send-btn {
    width: 80px;
    height: 30px;
    line-height: 30px;
    margin-right: -20px;
    text-align: center;
    border: 1px solid #1da1f2;
    border-radius: 100px;
    box-sizing: border-box;
    font-weight: bold;
    font-size: 13px;
    color: #ffffff;
    background-color: #4ab3f4;
  }
  .comment-send-btn:hover {
    cursor: pointer;
  }
  .comment-send-btn-bounce {
    position: relative;
  }
  .comment-send-btn-bounce:focus {
    outline: none;
  }
  .comment-send-btn-bounce:after {
    content: "";
    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    border-radius: 100px;
    border: 0px solid #1da1f2;
    opacity: 0.7;
    transition: all 0.1s;
  }
  .comment-send-btn-bounce:active:after {
    //.bounce active时 伪元素:after的样式
    opacity: 1;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: 100px;
    border: 2px solid #1da1f2;
    transition: all 0.2s;
  }
}
</style>