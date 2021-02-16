<template>
  <div class="room-style">
    <div class="title-container">
      <div class="title-wrapper">
        <i class="el-icon-edit-outline"></i>
        <div class="title">客房类型列表</div>
      </div>
      <!-- <div class="add-btn">
        <el-button type="primary" @click="addPosition">新增</el-button>
        <van-popup v-model="show" closeable close-icon="close">
          <div class="add-title">{{ title }}</div>
          <van-field
            v-model="newPosition"
            label="职位"
            placeholder="请输入职位名"
          />
          <van-field
            readonly
            clickable
            name="picker"
            :value="newAuth"
            label="权限"
            placeholder="点击选择权限"
            @click="showPicker = true"
          />
          <van-popup v-model="showPicker" position="bottom">
            <van-picker
              show-toolbar
              :columns="columns"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
          <van-field
            v-model="newPosDesc"
            label="职位描述"
            placeholder="请输入描述信息"
          />
          <van-button round block type="info" @click="add" v-if="isAdd"
            >确定增加</van-button
          >
          <van-button round block type="info" @click="update" v-else
            >确定修改</van-button
          >
        </van-popup>
      </div> -->
    </div>
    <!-- <div class="position-list">
      <el-table :data="positionList" stripe style="width: 100%">
        <el-table-column
          type="index"
          :index="indexMethod"
          label="序号"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="position"
          label="职位"
          width="150"
        ></el-table-column>
        <el-table-column prop="auth" label="权限" width="60"></el-table-column>
        <el-table-column
          prop="addTime"
          label="添加时间"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="addUsername"
          label="添加人"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="positionDesc"
          label="职位描述"
          width="250"
        ></el-table-column>
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
              class="stopBtn"
              @click="handleClick(scope.row)"
              v-if="scope.row.status == 1"
              ><i class="iconfont icon-stop"></i>停用</el-button
            >
            <el-button
              size="mini"
              class="startBtn"
              @click="handleClick(scope.row)"
              v-else
              ><i class="iconfont icon-start"></i>启用</el-button
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
    </div> -->
    <div class="count">共{{ count }}种房间类型</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
}
</script>

<style lang="less" scoped>
.display() {
  display: flex;
  align-items: center;
}

.room-style {
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

.count {
  font-size: 16px;
  font-family: "楷体";
  color: #8d8d8d;
  text-align: right;
  margin-top: 10px;
}
</style>