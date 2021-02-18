<template>
  <div class="drink-wrapper">
    <div class="title-container">
      <div class="title-wrapper">
        <i class="el-icon-edit-outline"></i>
        <div class="title">酒水列表</div>
      </div>
      <div class="add-btn">
        <el-button type="primary" @click="addDrink">新增</el-button>
        <van-popup
          v-model="show"
          closeable
          close-icon="close"
          @click-close-icon="close"
        >
          <div class="add-title">{{ title }}</div>
          <van-field v-model="name" label="名称" readonly v-if="!isAdd" />
          <van-field
            v-model="name"
            label="名称"
            placeholder="请输入酒水名称"
            v-else
          />
          <van-field
            v-model="price"
            label="单价"
            placeholder="请输入酒水单价"
          />
          <van-button size="mini" type="info" @click="add" v-if="isAdd"
            >确定增加</van-button
          >
          <van-button size="mini" type="info" @click="update" v-else
            >确定修改</van-button
          >
        </van-popup>
      </div>
    </div>
    <div class="drink-list">
      <el-table
        style="width: 100%"
        :data="
          drinkList.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="名称">
          <template slot-scope="scope">
            <span v-html="scope.row.name"></span>
          </template>
        </el-table-column>
        <el-table-column label="单价">
          <template slot-scope="scope">
            <span v-html="scope.row.price"></span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
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
        :total="drinkList.length"
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
      title: "新增酒水",
      show: false,
      name: "",
      price: "",
      isAdd: true,
      drinkList: [],
      currentPage: 1, //初始页
      pagesize: 5, // 每页数据
      drinkInfo: {},
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    handleDel(info) {
      this.drinkInfo = info;
      console.log(this.drinkInfo);
      this.$http
        .delDrink({
          drinkId: info.drinkId,
          name: info.name,
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
    close() {
      setTimeout(() => {
        this.name = "";
        this.price = "";
        this.title = "新增酒水";
        this.isAdd = true;
        this.show = false;
      }, 1000);
    },
    getList() {
      this.$http.getDrinkList({}).then((res) => {
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
        this.drinkList = res.data;
        console.log(this.drinkList);
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
    handleUpdate(info) {
      console.log(info);
      this.drinkInfo = info;
      this.price = info.price;
      this.name = info.name;
      this.title = "修改酒水信息";
      this.isAdd = false;
      this.show = true;
    },
    addDrink() {
      this.show = true;
    },
    update: tool.throttle(function () {
      if (this.name === "" || this.price === "") {
        this.$message({
          showClose: true,
          message: "内容不能为空",
          type: "error",
        });
        return;
      }
      this.$http
        .updateDrink({
          drinkId: this.drinkInfo.drinkId,
          price: this.price,
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
          this.show = false;
          setTimeout(() => {
            this.title = "新增酒水";
            this.name = "";
            this.price = "";
            this.isAdd = true;
          }, 1000);
        });
    }),
    add: tool.throttle(function () {
      if (this.name === "" || this.price === "") {
        this.$message({
          showClose: true,
          message: "内容不能为空",
          type: "error",
        });
        return;
      }

      let username = JSON.parse(localStorage.getItem("token")).username;
      console.log(username);

      this.$http
        .addDrinking({
          addUser: username,
          name: this.name,
          price: this.price,
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
          this.show = false;
          this.getList();
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success",
          });
          this.name = "";
          this.price = "";
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
</style>