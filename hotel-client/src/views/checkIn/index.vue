<template>
  <div class="queryRoom-wrapper">
    <div class="title-container">
      <div class="title-wrapper">
        <i class="el-icon-edit-outline"></i>
        <div class="title">历史订单列表</div>
      </div>
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
        <span class="info-title workNum-title">入住人：</span
        ><el-input
          v-model="inputOrderName"
          placeholder="请输入入住人姓名"
        ></el-input>
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
      <el-table
        style="width: 100%"
        :data="
          roomList.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="房间号">
          <template slot-scope="scope">
            <span v-html="scope.row.roomInfo.num"></span>
          </template>
        </el-table-column>
        <el-table-column label="房间名称">
          <template slot-scope="scope">
            <span v-html="scope.row.roomInfo.name"></span>
          </template>
        </el-table-column>
        <el-table-column label="房间类型" width="100px">
          <template slot-scope="scope">
            <span v-html="scope.row.roomInfo.kind"></span>
          </template>
        </el-table-column>
        <el-table-column label="入住人1">
          <template slot-scope="scope">
            <span v-html="scope.row.order1Name"></span>
          </template>
        </el-table-column>
        <el-table-column label="入住人2">
          <template slot-scope="scope">
            <span v-html="scope.row.order2Name"></span>
          </template>
        </el-table-column>
        <el-table-column label="入住人3">
          <template slot-scope="scope">
            <span v-html="scope.row.order3Name"></span>
          </template>
        </el-table-column>
        <el-table-column label="入住人4">
          <template slot-scope="scope">
            <span v-html="scope.row.order4Name"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="orderTime"
          label="入住时间"
          width="160px"
        ></el-table-column>
        <el-table-column
          prop="expectedCheckout"
          label="预退时间"
          width="160px"
        ></el-table-column>
        <el-table-column prop="totalCost" label="总费用" v-if="auth == 1 || auth == 6"></el-table-column>
        <el-table-column label="操作" v-if="auth == 1 || auth == 6">
          <template slot-scope="scope">
            <el-button
              size="mini"
              class="viewBtn"
              @click="handleView(scope.row)"
              ><i class="iconfont icon-view"></i>详情</el-button
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
      <el-dialog
        :visible.sync="centerDialogVisible"
        width="50%"
        center
        title="入住详情"
        v-if="roomList.length !== 0"
      >
        <span class="roomImg-infos">
          <div class="kind-infos">
            <div class="info-wrapper">
              <div class="name">房间号：</div>
              <div class="content">{{ detailBook.roomInfo.num }}</div>
            </div>
            <div class="info-wrapper">
              <div class="name">房间名称：</div>
              <div class="content">{{ detailBook.roomInfo.name }}</div>
            </div>
          </div>
          <div class="kind-infos">
            <div class="info-wrapper">
              <div class="name">房间类型：</div>
              <div class="content">{{ detailBook.roomInfo.kind }}</div>
            </div>
            <div class="info-wrapper">
              <div class="name">单价：</div>
              <div class="content">{{ detailBook.roomInfo.price }}</div>
            </div>
          </div>
          <div class="kind-infos">
            <div class="info-wrapper">
              <div class="name">入住人1：</div>
              <div class="content">{{ detailBook.order1Name }}</div>
            </div>
            <div class="info-wrapper">
              <div class="name">性别1：</div>
              <div class="content">{{ detailBook.order1Sex }}</div>
            </div>
          </div>
          <div class="kind-infos">
            <div class="info-wrapper">
              <div class="name">证件号1：</div>
              <div class="content">{{ detailBook.order1IdCard }}</div>
            </div>
          </div>
          <div class="kind-infos">
            <div class="info-wrapper">
              <div class="name">入住人2：</div>
              <div class="content">{{ detailBook.order2Name }}</div>
            </div>
            <div class="info-wrapper">
              <div class="name">性别2：</div>
              <div class="content">{{ detailBook.order2Sex }}</div>
            </div>
          </div>
          <div class="kind-infos">
            <div class="info-wrapper">
              <div class="name">证件号2：</div>
              <div class="content">{{ detailBook.order2IdCard }}</div>
            </div>
          </div>
          <div class="kind-infos">
            <div class="info-wrapper">
              <div class="name">入住人3：</div>
              <div class="content">{{ detailBook.order3Name }}</div>
            </div>
            <div class="info-wrapper">
              <div class="name">性别3：</div>
              <div class="content">{{ detailBook.order3Sex }}</div>
            </div>
          </div>
          <div class="kind-infos">
            <div class="info-wrapper">
              <div class="name">证件号3：</div>
              <div class="content">{{ detailBook.order3IdCard }}</div>
            </div>
          </div>
          <div class="kind-infos">
            <div class="info-wrapper">
              <div class="name">入住人4：</div>
              <div class="content">{{ detailBook.order4Name }}</div>
            </div>
            <div class="info-wrapper">
              <div class="name">性别4：</div>
              <div class="content">{{ detailBook.order4Sex }}</div>
            </div>
          </div>
          <div class="kind-infos">
            <div class="info-wrapper">
              <div class="name">证件号4：</div>
              <div class="content">{{ detailBook.order4IdCard }}</div>
            </div>
          </div>
          <div class="kind-infos">
            <div class="info-wrapper">
              <div class="name">入住时间：</div>
              <div class="content">{{ detailBook.orderTime }}</div>
            </div>
            <div class="info-wrapper">
              <div class="name">预退房时间：</div>
              <div class="content">{{ detailBook.expectedCheckout }}</div>
            </div>
          </div>
          <div class="kind-infos">
            <div class="info-wrapper">
              <div class="name">费用：</div>
              <div class="content">{{ detailBook.totalCost }}</div>
            </div>
          </div>
        </span>
      </el-dialog>
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
      inputNum: "",
      inputName: "",
      inputKind: "",
      inputOrderName: "",
      centerDialogVisible: false,
      detailBook: {},
      auth: -1
    };
  },
  mounted() {
    this.auth = JSON.parse(localStorage.getItem("token")).auth;
    console.log(this.auth);
    this.getList();
  },
  methods: {
    getList() {
      this.$http.getOrderList().then((res) => {
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
        this.roomList = res.data;
        this.detailBook = res.data[0]
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
    handleView(info) {
      console.log(info);
      if (info.roomInfo.num.length > 5) {
        info.roomInfo.num = info.roomInfo.num.replace(/<[^>]+>/g, "");
      }
      if (info.roomInfo.name.length > 5) {
        info.roomInfo.name = info.roomInfo.name.replace(/<[^>]+>/g, "");
      }
      if (info.roomInfo.kind.length > 5) {
        info.roomInfo.kind = info.roomInfo.kind.replace(/<[^>]+>/g, "");
      }
      if (info.order1Name.length > 5) {
        info.order1Name = info.order1Name.replace(/<[^>]+>/g, "");
      }
      if (info.order2Name.length > 5) {
        info.order2Name = info.order2Name.replace(/<[^>]+>/g, "");
      }
      if (info.order3Name.length > 5) {
        info.order1Name = info.order3Name.replace(/<[^>]+>/g, "");
      }
      if (info.order3Name.length > 5) {
        info.order3Name = info.order3Name.replace(/<[^>]+>/g, "");
      }
      this.detailBook = info;
      this.centerDialogVisible = true;
    },
    searchRoom: tool.throttle(function () {
      console.log(this.inputNum, this.inputName, this.inputKind);
      this.$http
        .searchOrderList({
          num: this.inputNum,
          name: this.inputName,
          kind: this.inputKind,
          ordername: this.inputOrderName,
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
          this.roomList = res.data;
          // 结果高亮显示
          for (let i = 0; i < res.data.length; i++) {
            const numReg = new RegExp(this.inputNum, "i");
            if (numReg && this.inputNum !== "") {
              res.data[i].roomInfo.num = res.data[i].roomInfo.num.replace(
                numReg,
                `<span style="color: #FF0033;font-weight: bold;">${this.inputNum}</span>`
              );
            }
            const nameReg = new RegExp(this.inputName, "i");
            if (nameReg && this.inputName !== "") {
              res.data[i].roomInfo.name = res.data[i].roomInfo.name.replace(
                nameReg,
                `<span style="color: #FF0033;font-weight: bold;">${this.inputName}</span>`
              );
            }
            const kindReg = new RegExp(this.inputKind, "i");
            if (kindReg && this.inputKind !== "") {
              res.data[i].roomInfo.kind = res.data[i].roomInfo.kind.replace(
                kindReg,
                `<span style="color: #FF0033;font-weight: bold;">${this.inputKind}</span>`
              );
            }
            const orderNameReg = new RegExp(this.inputOrderName, "i");
            if (orderNameReg && this.inputOrderName !== "") {
              res.data[i].order1Name = res.data[i].order1Name.replace(
                orderNameReg,
                `<span style="color: #FF0033;font-weight: bold;">${this.inputOrderName}</span>`
              );
              res.data[i].order2Name = res.data[i].order2Name.replace(
                orderNameReg,
                `<span style="color: #FF0033;font-weight: bold;">${this.inputOrderName}</span>`
              );
              res.data[i].order3Name = res.data[i].order3Name.replace(
                orderNameReg,
                `<span style="color: #FF0033;font-weight: bold;">${this.inputOrderName}</span>`
              );
              res.data[i].order4Name = res.data[i].order4Name.replace(
                orderNameReg,
                `<span style="color: #FF0033;font-weight: bold;">${this.inputOrderName}</span>`
              );
            }
          }
          this.inputNum = "";
          this.inputName = "";
          this.inputKind = "";
          this.inputOrderName = "";
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

.viewBtn {
  color: rgb(239, 179, 54);
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

.kind-infos {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: #8d8d8d;
  padding: 5px 0;
}

.info-wrapper {
  flex: 1;
  display: flex;
}

.infos-wrapper {
  display: flex;
  word-break: break-all;
  word-wrap: break-word;
  white-space: pre-wrap;
}

/deep/.el-dialog--center .el-dialog__body {
  padding: 25px 25px 15px;
}
</style>