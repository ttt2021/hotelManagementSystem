<template>
  <div class="write-wrapper">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="主题">
        <el-input v-model="form.theme" />
      </el-form-item>
      <el-form-item label="内容">
        <quill-editor v-model="form.content"></quill-editor>
      </el-form-item>
      <el-form-item>
        <div class="btn-wrapper">
          <el-button type="primary" @click="onSave">保存</el-button>
          <el-button type="primary" @click="onSubmit">发表</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import tool from "../../utils/tool";
import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      form: {
        theme: "",
        content: "",
      },
      articleId: ''
    };
  },
  components: {
    quillEditor,
  },
  mounted() {
    let articleId = this.$route.query.articleId || ''
    this.articleId = articleId
    console.log(articleId)
    if (articleId !== '') {
      this.getInfo()
    }
  },
  methods: {
    getInfo() {
      this.$http.getArticleInfo({
        articleId: this.articleId
      }).then(res => {
        console.log(res)
        res = JSON.parse(res);
          if (res.code == 0) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error",
            });
            return;
          }
          this.form.theme = res.data.theme
          this.form.content = res.data.content
      })
    },
    onSubmit: tool.throttle(function () {
      console.log(this.form.theme, this.form.content);
      if (this.form.theme === "" || this.form.content === "") {
        this.$message({
          showClose: true,
          message: "内容不能为空",
          type: "error",
        });
        return;
      }
      let status = "发表";

      if (this.articleId == '') {
        this.submit(status);
      } else {
        this.updated(status)
      }
    }),
    updated(status) {
      let username = JSON.parse(localStorage.getItem("token")).username;
      console.log(username);
      this.$http.updatedArticle({
        articleId: this.articleId,
        theme: this.form.theme,
        content: this.form.content,
        updatedUser: username,
        status: status,
      }).then((res) => {
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
          this.handleCancel();
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success",
          });
          // 进行页面跳转 跳转得到文章列表中
          this.$router.push("/articleList");
        });
    },
    submit(status) {
      let username = JSON.parse(localStorage.getItem("token")).username;
      console.log(username);
      this.$http
        .uploadArticle({
          theme: this.form.theme,
          content: this.form.content,
          status: status,
          addUser: username,
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
          this.handleCancel();
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success",
          });
          // 进行页面跳转 跳转得到文章列表中
          this.$router.push("/articleList");
        });
    },
    handleCancel() {
      this.form.theme = "";
      this.form.content = "";
      console.log(this.form.theme, this.form.content);
    },
    onSave: tool.throttle(function () {
      if (this.form.theme === "" || this.form.content === "") {
        this.$message({
          showClose: true,
          message: "内容不能为空",
          type: "error",
        });
        return;
      }
      let status = "保存";

      if (this.articleId == '') {
        this.submit(status);
      } else {
        this.updated(status)
      }
    }),
  },
};
</script>

<style lang="less" scoped>
.quill-editor {
  height: 480px;
}

.btn-wrapper {
  margin-top: 50px;
  text-align: right;
}

/deep/.ql-editor,
/deep/.ql-toolbar.ql-snow {
  background: #fff;
}
</style>