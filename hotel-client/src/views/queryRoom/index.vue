<template>
  <div class="queryRoom-wrapper">
    <div class="title-container">
      <div class="title-wrapper">
        <i class="el-icon-edit-outline"></i>
        <div class="title">客房信息列表</div>
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
      <div class="search-title search-username">
        <span class="info-title">状态：</span
        ><el-select v-model="inputRegion">
          <el-option label="清洁" value="清洁"></el-option>
          <el-option label="有客" value="有客"></el-option>
          <el-option label="清理中" value="清理中"></el-option>
          <el-option label="待修理" value="待修理"></el-option>
          <el-option label="有预约" value="有预约"></el-option>
        </el-select>
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
        <el-table-column prop="addUser" label="添加人"></el-table-column>
        <el-table-column
          prop="addTime"
          label="添加时间"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="drinkings"
          label="酒水配置"
          width="350px"
        ></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
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
        :total="roomList.length"
        class="pageCount"
      >
      </el-pagination>
      <van-popup v-model="show">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="客房号">
            <el-input v-model="form.num" readonly></el-input>
          </el-form-item>
          <el-form-item label="客房名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="房间类型">
            <el-select v-model="form.kind">
              <template v-for="(item, kindIndex) in form.kindList">
                <el-option :label="item" :value="item"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="form.price"></el-input>
          </el-form-item>
          <el-form-item label="房态">
            <el-select v-model="form.region">
              <el-option label="清洁" value="清洁"></el-option>
              <el-option label="有客" value="有客"></el-option>
              <el-option label="清理中" value="清理中"></el-option>
              <el-option label="待修理" value="待修理"></el-option>
              <el-option label="有预约" value="有预约"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="酒水服务">
            <el-checkbox-group v-model="form.type">
              <template v-for="(item, kindIndex) in form.drinkList">
                <el-checkbox :label="item" name="type"></el-checkbox>
              </template>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.remark"></el-input>
          </el-form-item>
          <el-form-item class="btn-wrapper">
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="onSubmit">立即修改</el-button>
          </el-form-item>
        </el-form>
      </van-popup>
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
      inputRegion: "",
      form: {
        num: null,
        name: "",
        price: null,
        remark: "",
        region: "清洁",
        kindList: [],
        kind: "",
        type: [],
        drinkList: [],
      },
      roomKindId: "",
    };
  },
  mounted() {
    // console.log(this.$route.query.roomKindId)
    let roomKindId = this.$route.query.roomKindId || "";
    console.log(roomKindId);
    this.roomKindId = roomKindId;
    if (roomKindId === "") {
      this.getList();
    } else {
      this.getGoalList();
    }
  },
  methods: {
    getList() {
      this.$http.getRoomList({}).then((res) => {
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
    getGoalList() {
      this.$http
        .getKindRoom({
          roomKindId: this.roomKindId,
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
    handleDel(info) {
      console.log(info);
      this.$http
        .delRoom({
          roomId: info.roomId,
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
          if (this.roomKindId === "") {
            this.getList();
          } else {
            this.getGoalList();
          }
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success",
          });
        });
    },
    handleUpdate(info) {
      console.log(info);
      if (info.num.length > 5) {
        info.num = info.num.replace(/<[^>]+>/g, "");
      }
      if (info.name.length > 5) {
        info.name = info.name.replace(/<[^>]+>/g, "");
      }
      if (info.kind.length > 5) {
        info.kind = info.kind.replace(/<[^>]+>/g, "");
      }
      if (info.region.length > 5) {
        info.region = info.region.replace(/<[^>]+>/g, "");
      }
      this.form.num = info.num;
      this.form.name = info.name;
      this.form.price = info.price;
      this.form.remark = info.remark;
      this.form.region = info.region;
      this.form.kind = info.kind;
      this.form.type = info.drinkings.split(" 、");
      console.log(this.form);
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
        let list = [];
        for (let i = 0; i < res.data.length; i++) {
          list.push(res.data[i].name);
        }
        this.form.drinkList = list;
        console.log(this.form.drinkList);
      });
      this.$http.getRoomKind({}).then((res) => {
        console.log(res);
        res = JSON.parse(res);
        if (res.code == 0) {
          this.$message({
            showClose: true,
            message: "请重新刷新网络",
            type: "error",
          });
          return;
        }
        let list = res.data;
        let dataList = [];
        for (let i = 0; i < list.length; i++) {
          dataList.push(list[i].kind);
        }
        this.form.kindList = dataList;
        console.log(this.form.kindList);
      });
      this.show = true;
    },
    handleCancel() {
      if (this.roomKindId === "") {
        this.getList();
      } else {
        this.getGoalList();
      }
      this.show = false;
    },
    onSubmit() {
      console.log(this.form.price);
      this.$http
        .updatedRoom({
          num: this.form.num,
          name: this.form.name,
          kind: this.form.kind,
          price: this.form.price,
          region: this.form.region,
          drinkings: this.form.type,
          remark: this.form.remark,
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
          if (this.roomKindId === "") {
            this.getList();
          } else {
            this.getGoalList();
          }
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success",
          });
          this.show = false;
        });
    },
    searchRoom: tool.throttle(function () {
      this.$http
        .searchRoom({
          num: this.inputNum,
          name: this.inputName,
          kind: this.inputKind,
          region: this.inputRegion,
          roomKindId: this.roomKindId,
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
            const regionReg = new RegExp(this.inputRegion, "i");
            if (regionReg && this.inputRegion !== "") {
              res.data[i].region = res.data[i].region.replace(
                regionReg,
                `<span style="color: #FF0033;font-weight: bold;">${this.inputRegion}</span>`
              );
            }
          }
          this.inputNum = "";
          this.inputName = "";
          this.inputKind = "";
          this.inputRegion = "";
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