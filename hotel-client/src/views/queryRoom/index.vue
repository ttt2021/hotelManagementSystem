<template>
  <div class="queryRoom-wrapper">
    <div class="title-container">
      <div class="title-wrapper">
        <i class="el-icon-edit-outline"></i>
        <div class="title">客房信息列表</div>
      </div>
      <!-- <div class="add-btn">
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
      </div> -->
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
              <el-checkbox :label="item" :name="type"></el-checkbox>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomList: [],
      currentPage: 1, //初始页
      pagesize: 5, // 每页数据
      show: false,
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
    };
  },
  mounted() {
    this.getList();
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
          this.getList();
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success",
          });
        });
    },
    handleUpdate(info) {
      console.log(info);
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
        for (let i = 0; i < list.length - 1; i++) {
          dataList.push(list[i].kind);
        }
        this.form.kindList = dataList;
        console.log(this.form.kindList);
      });
      console.log(this.form.drinkList, this.form.type);
      this.show = true;
    },
    handleCancel() {
      this.show = false;
    },
    onSubmit() {
      console.log(this.form.price)
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
          this.getList()
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success",
          });
          this.show = false
        });
    },
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
</style>