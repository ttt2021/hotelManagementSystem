<template>
  <div class="drink-wrapper">
    <div class="title-container">
      <div class="title-wrapper">
        <i class="el-icon-edit-outline"></i>
        <div class="title">资讯列表</div>
      </div>
    </div>
    <div class="search-wrapper">
      <div class="search-title search-username">
        <span class="info-title">主题：</span
        ><el-input v-model="inputTheme" placeholder="请输入主题"></el-input>
      </div>
      <div class="search-title search-username">
        <span class="info-title">状态：</span
        ><el-select v-model="inputStatus" placeholder="请输入文章状态">
          <el-option label="已发表" value="已发表"></el-option>
          <el-option label="未发表" value="未发表"></el-option>
          <el-option label="审核中" value="审核中"></el-option>
          <el-option label="不允许发表" value="不允许发表"></el-option>
        </el-select>
      </div>
      <el-button
        type="primary"
        icon="el-icon-search"
        plain
        @click="searchArticle"
      ></el-button>
    </div>
    <div class="drink-list">
      <el-table
        style="width: 100%"
        :data="
          articleList.slice(
            (currentPage - 1) * pagesize,
            currentPage * pagesize
          )
        "
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="主题">
          <template slot-scope="scope">
            <span
              v-html="scope.row.theme"
              @click="handleDetail(scope.row)"
            ></span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="120px">
          <template slot-scope="scope">
            <span v-html="scope.row.status"></span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              class="updateBtn"
              @click="handleUpdate(scope.row)"
              ><i class="iconfont icon-update"></i>修改</el-button
            >
            <el-button
              size="mini"
              class="deleteBtn"
              @click="handleDel(scope.row)"
              ><i class="iconfont icon-del"></i>删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="articleList.length"
        class="pageCount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import tool from "../../utils/tool";
export default {
  data() {
    return {
      articleList: [],
      currentPage: 1, //初始页
      pagesize: 5, // 每页数据
      inputTheme: "",
      inputStatus: "",
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.$http.getArticleList({}).then((res) => {
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
        this.articleList = res.data;
        console.log(this.articleList);
      });
    },
    handleDel(info) {
      console.log(info);
      this.$http
        .delArticle({
          articleId: info.articleId,
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
    handleUpdate(info) {
      this.$router.push({
        path: "/writeArticle",
        query: {
          articleId: info.articleId,
        },
      });
    },
    handleDetail(info) {
      console.log(info);
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
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },
    searchArticle: tool.throttle(function () {
      this.$http
        .searchArticle({
          theme: this.inputTheme,
          status: this.inputStatus,
        })
        .then((res) => {
          console.log(res);
          res = JSON.parse(res);
          this.articleList = res.data;
          if (res.code == 0) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error",
            });
            return;
          }
          // 结果高亮显示
          for (let i = 0; i < res.data.length; i++) {
            const themeReg = new RegExp(this.inputTheme, "i");
            if (themeReg && this.inputTheme !== "") {
              res.data[i].theme = res.data[i].theme.replace(
                themeReg,
                `<span style="color: #FF0033;font-weight: bold;">${this.inputTheme}</span>`
              );
            }
            const statusReg = new RegExp(this.inputStatus, "i");
            if (statusReg && this.inputStatus !== "") {
              res.data[i].status = res.data[i].status.replace(
                statusReg,
                `<span style="color: #FF0033;font-weight: bold;">${this.inputStatus}</span>`
              );
            }
          }
          this.inputTheme = "";
          this.inputStatus = "";
        });
    }),
  },
};
</script>

<style lang="less" scoped>
.display() {
  display: flex;
  align-items: center;
}

.drink-wrapper {
  height: 650px;
}

.title-container {
  margin-bottom: 20px;
  .display();
  justify-content: space-between;
}

.title-wrapper {
  font-size: 16px;
  font-family: "楷体";
  font-weight: bold;
  color: #8d8d8d;
  .display();
}

.title {
  margin-left: 5px;
}

.el-table thead {
  font-weight: bold;
}

.add-title {
  margin: 25px 0 10px 0;
  text-align: center;
  font-family: "楷体";
  font-weight: bold;
  color: #8d8d8d;
  font-size: 24px;
}

/deep/.van-button--mini {
  margin: 10px auto;
  display: flex;
}

/deep/.has-gutter th,
/deep/.el-table__row td {
  text-align: center;
}

.pageCount.el-pagination {
  padding: 15px 5px;
  text-align: center;
  color: #8d8d8d;
}

/deep/.el-button {
  border: 0;
  font-size: 14px;
}

.iconfont {
  margin-right: 3px;
}

.deleteBtn {
  color: rgb(255, 61, 72);
}

.updateBtn {
  color: #1296db;
}

.search-wrapper {
  margin-bottom: 10px;
  justify-content: center;
}

.search-wrapper,
.search-title {
  .display();
}

.search-username {
  margin-right: 15px;
}

.search-wrapper /deep/.el-input__inner {
  width: 150px;
  height: 35px !important;
}

.info-title {
  width: 60px;
}

.workNum-title {
  width: 90px;
}
</style>