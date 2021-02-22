<template>
  <div class="week-statics">
    <div class="tab-wrapper">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="今日统计" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="昨日统计" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="近7天" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="近30天" name="fourth">定时任务补偿</el-tab-pane>
        <!-- <el-tab-pane>
          <span slot="label"
            ><el-date-picker
              v-model="time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker
          ></span>
          我的行程
        </el-tab-pane> -->
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      time: "",
    };
  },
  methods: {
    // handleClick(tab, event) {
    //   console.log(tab, event);
    // },
  },
};
</script>

<style lang="less" scoped>
</style>