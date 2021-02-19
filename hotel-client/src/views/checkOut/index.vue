<template>
  <div class="addRoom-wrapper">
    <div class="title">订单信息</div>
    <div class="content-wrapper">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="客房号">
          <el-input v-model="form.num"></el-input>
        </el-form-item>
        <!-- <el-form-item label="客房名称">
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
        </el-form-item> -->
        <el-form-item class="btn-wrapper">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">立即添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    let roomId= this.$route.query.roomId
    console.log(roomId)
  },
  methods: {
    onSubmit() {
      if (
        this.form.num === null ||
        this.form.name === "" ||
        this.form.price === null
      ) {
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
        .addRoom({
          username: username,
          num: this.form.num,
          name: this.form.name,
          price: this.form.price,
          remark: this.form.remark,
          region: this.form.region,
          drinkings: this.form.type,
          kind: this.form.kind,
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
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success",
          });
          this.$router.push('/home/queryRoom')
          this.handleCancel()
        });
    },
    handleCancel() {
      console.log(this.form);
      this.form.num = null;
      this.form.name = "";
      this.form.price = null;
      this.form.remark = "";
      this.form.region = "清洁";
      this.form.kind = this.form.kindList[0];
      this.form.type = [];
    },
  },
};
</script>

<style lang="less" scoped>
.display() {
  display: flex;
  align-items: center;
}

.title {
  .display();
  justify-content: center;
  color: #8d8d8d;
  font-size: 24px;
  font-family: "楷体";
  font-weight: bold;
}

.content-wrapper {
  .display();
  justify-content: center;
  margin-top: 20px;
  width: 100%;
}

.btn-wrapper /deep/.el-form-item__content {
  text-align: center;
}

/deep/.el-button + .el-button {
  margin-left: 50px;
}
</style>