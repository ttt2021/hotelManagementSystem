<template>
  <div class="queryRoom-wrapper">
    <div class="title-container">
      <div class="title-wrapper">
        <i class="el-icon-edit-outline"></i>
        <div class="title">未开客房信息列表</div>
      </div>
      <!-- <div class="add-btn">
        <el-button @click="toggleSelection">取消</el-button>
        <el-button type="primary" @click="order">开房</el-button>
      </div> -->
    </div>
    <div class="search-wrapper">
      <div class="search-title">
        <span class="info-title workNum-title">房间号：</span
        ><el-input v-model="inputNum" placeholder="请输入房间号"></el-input>
      </div>
      <div class="search-title search-username">
        <span class="info-title">名称：</span
        ><el-input v-model="inputName" placeholder="请输入房间名称"></el-input>
      </div>
      <div class="search-title">
        <span class="info-title">类型：</span
        ><el-input v-model="inputKind" placeholder="请输入房间类型"></el-input>
      </div>
      <el-button
        type="primary"
        icon="el-icon-search"
        plain
        @click="searchRoom"
      ></el-button>
    </div>
    <div class="drink-list">
      <!-- <el-table
        ref="multipleTable"
        style="width: 100%"
        :data="
          roomList.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        @selection-change="handleSelectionChange"
      > -->
      <el-table
        style="width: 100%"
        :data="
          roomList.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
      >
        <!-- <el-table-column type="selection"> </el-table-column> -->
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="房间号">
          <template slot-scope="scope">
            <span v-html="scope.row.num"></span>
          </template>
        </el-table-column>
        <el-table-column label="房间名称">
          <template slot-scope="scope">
            <span v-html="scope.row.name"></span>
          </template>
        </el-table-column>
        <el-table-column label="房间类型" width="100px">
          <template slot-scope="scope">
            <span v-html="scope.row.kind"></span>
          </template>
        </el-table-column>
        <el-table-column label="房间状态">
          <template slot-scope="scope">
            <span v-html="scope.row.region"></span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价"></el-table-column>
        <el-table-column
          prop="drinkings"
          label="酒水配置"
          width="350px"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              class="updateBtn"
              @click="handleOpen(scope.row)"
              ><i class="iconfont icon-update"></i>开房</el-button
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
        :total="roomList.length"
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
      roomList: [],
      currentPage: 1, //初始页
      pagesize: 5, // 每页数据
      show: false,
      inputNum: "",
      inputName: "",
      inputKind: "",
      // multipleSelection: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // order() {
      // // 多行数据路由跳转
      // console.log(this.multipleSelection);
      // let num = {};
      // for (let i = 0; i < this.multipleSelection.length; i++) {
      //   num[`roomId${i}`] = this.multipleSelection[i].roomId;
      // }
      // console.log(num);
      // this.$router.push({
      //   path: "/settlement",
      //   query: {
      //     rooms: num
      //   }
      // });
    // },
    // toggleSelection() {
    //   this.$refs.multipleTable.clearSelection();
    // },
    // handleSelectionChange(val) {
    //   console.log(val);
    //   this.multipleSelection = val;
    // },
    getList() {
      this.$http.getOrderRoom({}).then((res) => {
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
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].remark =
            res.data[i].remark === "" ? "无" : res.data[i].remark;
          res.data[i].drinkings = res.data[i].drinkings.join(" 、");
        }
        this.roomList = res.data;
        console.log(this.roomList);
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
    handleOpen(info) {
      console.log(info);
      this.$router.push({
        path: "/bookRoom",
        query: {
          roomId: info.roomId,
        },
      });
      // this.$router.push({
      //   path: "/settlement",
      //   query: {
      //     rooms: info.roomId,
      //   },
      // });
    },
    searchRoom: tool.throttle(function () {
      console.log(this.inputNum, this.inputName, this.inputKind);
      this.$http
        .searchOrderRoom({
          num: this.inputNum,
          name: this.inputName,
          kind: this.inputKind,
        })
        .then((res) => {
          console.log(res);
          res = JSON.parse(res);
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].remark =
              res.data[i].remark === "" ? "无" : res.data[i].remark;
            res.data[i].drinkings = res.data[i].drinkings.join(" 、");
          }
          this.roomList = res.data;
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
            const numReg = new RegExp(this.inputNum, "i");
            if (numReg && this.inputNum !== "") {
              res.data[i].num = res.data[i].num.replace(
                numReg,
                `<span style="color: #FF0033;font-weight: bold;">${this.inputNum}</span>`
              );
            }
            const nameReg = new RegExp(this.inputName, "i");
            if (nameReg && this.inputName !== "") {
              res.data[i].name = res.data[i].name.replace(
                nameReg,
                `<span style="color: #FF0033;font-weight: bold;">${this.inputName}</span>`
              );
            }
            const kindReg = new RegExp(this.inputKind, "i");
            if (kindReg && this.inputKind !== "") {
              res.data[i].kind = res.data[i].kind.replace(
                kindReg,
                `<span style="color: #FF0033;font-weight: bold;">${this.inputKind}</span>`
              );
            }
          }
          this.inputNum = "";
          this.inputName = "";
          this.inputKind = "";
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

.queryRoom-wrapper {
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

/deep/.van-popup {
  padding: 20px;
  width: 60%;
}

.btn-wrapper /deep/.el-form-item__content {
  display: flex;
  justify-content: center;
}

.btn-wrapper /deep/.el-button + .el-button {
  margin-left: 50px;
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